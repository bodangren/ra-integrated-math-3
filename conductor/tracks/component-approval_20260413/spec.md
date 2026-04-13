# Specification - Component Approval

## Context

The course needs a developer-only workflow for reviewing generated or authored examples, activities, and practice components before they are treated as approved curriculum assets. This must not become part of the live student, teacher, public, or production site.

The current activity system stores interactive components in Convex `activities`, renders them through `lib/activities/registry.ts`, and submits student work through the `practice.v1` contract. Lesson content is stored through `lesson_versions`, `phase_versions`, and `phase_sections`; worked examples and practice placements may be represented as phase sections, activities, or activity placements depending on the component type.

Approval must remain manual. The database should retain structured reviewer feedback so a later LLM audit can query unresolved improvement notes, propose repairs, and send repaired components back through the same manual review queue.

## Goals

1. Add persistent approval metadata for example, activity, and practice components.
2. Store detailed review history and improvement feedback separately from the component approval summary.
3. Build a developer-only review queue with preview and test harnesses for each component type.
4. Detect stale approvals when component content changes after review.
5. Provide LLM-readable unresolved review context without letting an LLM approve or silently resolve comments.

## Non-Goals

1. Do not expose this workflow on the live site.
2. Do not add student-facing, teacher-facing, public, or production navigation for component approval.
3. Do not allow automated approval by an LLM or background process.
4. Do not implement the later LLM repair automation in this track.
5. Do not port business-domain review tools or components from `bus-math-v2`.

## Component Kinds

The approval system must support these review kinds:

| Kind | Meaning |
|------|---------|
| `example` | Worked-example or textbook-style instructional component, including mode-aware examples rendered in lesson phases. |
| `activity` | Interactive component registered by `componentKey`, usually stored in `activities`. |
| `practice` | Practice-mode component or placement using the `practice.v1` contract, including independent-practice variants. |

If practice components share the same underlying `activities` row as a broader activity component, the data model may store one source approval summary on the activity while the review queue presents practice placements as `componentKind: "practice"` based on lesson/phase context.

## Data Model Requirements

### Approval Summary

Each persisted component source must have a lightweight approval summary in the database. For normalized component rows, add the summary directly to the source record. For embedded lesson sections without a dedicated component row, add the summary to the persisted section or to a dedicated approval summary table keyed by stable component identity.

Recommended summary shape:

```typescript
type ComponentApprovalStatus = "unreviewed" | "approved" | "needs_changes" | "rejected";

type ComponentApprovalSummary = {
  status: ComponentApprovalStatus;
  contentHash?: string;
  reviewedAt?: number;
  reviewedBy?: Id<"profiles">;
  reviewId?: Id<"component_reviews">;
};
```

Implementation should prefer a single `approval` object field where Convex validators make that practical. If the existing table shape requires separate fields, keep the same semantics.

### Review History

Create a separate review history table, tentatively `component_reviews`, instead of storing mutable comment blobs on the component itself.

Recommended fields:

```typescript
componentKind: "example" | "activity" | "practice";
componentId: string;
componentKey?: string;
componentContentHash: string;
status: "approved" | "needs_changes" | "rejected";
comment?: string;
issueTags?: string[];
priority?: "low" | "medium" | "high";
placement?: {
  lessonId?: string;
  lessonVersionId?: string;
  phaseId?: string;
  phaseNumber?: number;
  sectionId?: string;
};
createdBy: Id<"profiles">;
createdAt: number;
resolvedAt?: number;
resolvedBy?: Id<"profiles">;
resolutionReviewId?: Id<"component_reviews">;
```

Comments are required for `needs_changes` and `rejected`. Comments are optional for `approved`.

### Issue Tags

Support a constrained tag set so audits can group repair work:

```typescript
type ComponentReviewIssueTag =
  | "math_correctness"
  | "curriculum_alignment"
  | "pedagogy"
  | "wording"
  | "ui_behavior"
  | "answer_validation"
  | "feedback_quality"
  | "algorithmic_variation"
  | "accessibility";
```

The implementation may allow multiple tags per review.

### Content Hashing and Stale Approval

Approval freshness must be derived from content, not stored as an independent mutable state.

1. Compute a deterministic content hash for each reviewed component.
2. Exclude approval metadata, timestamps, reviewer IDs, and review history from the hash.
3. Include component kind, component key, props/content, grading configuration, and any deterministic solution/evaluation configuration.
4. A component is stale when the stored `approval.contentHash` does not match the current hash.
5. The UI may display stale approved components as "Stale approval", but the canonical stored statuses remain `unreviewed`, `approved`, `needs_changes`, and `rejected`.

## Developer-Only Access Requirements

The review site must be developer-only.

1. Place the review UI under a development route such as `app/dev/component-approval`.
2. The route must return `notFound()` or an equivalent hard block in production by default.
3. The route must require an authenticated `admin` or equivalent developer-capable user when auth is available.
4. Mutations and API routes for review decisions must enforce the same developer-only guard server-side.
5. Do not add links to the student dashboard, teacher dashboard, public curriculum pages, landing page, or live production navigation.
6. Do not expose review comments, component repair notes, or approval metadata to student-facing APIs.

If an environment flag is introduced, default it to disabled for production and document the behavior in `conductor/tech-stack.md` only if the implementation adds a new required environment variable.

## Developer Review Site Requirements

### Review Queue

The dev site must provide a queue with filters for:

1. Component kind: `example`, `activity`, `practice`.
2. Approval status: `unreviewed`, `approved`, `needs_changes`, `rejected`.
3. Stale approval.
4. Unit, lesson, phase, or placement where available.
5. Issue tag and priority for unresolved review notes.

Each queue item should show:

1. Component kind.
2. Component key or human-readable title.
3. Current approval status.
4. Stale indicator when current hash differs from approved hash.
5. Last reviewer and review timestamp when available.
6. Unresolved comments and issue tags.
7. Lesson/phase placement context where available.

### Review Actions

The reviewer can:

1. Approve the current component hash.
2. Mark the component as `needs_changes`.
3. Reject the component.
4. Add issue tags and priority.
5. Add required comments for `needs_changes` and `rejected`.
6. Add optional comments for `approved`.

Review actions must write both:

1. The component approval summary.
2. A new immutable-ish review history row.

Existing review rows should not be overwritten during normal review submission.

### Example Review Harness

For example components, the review page must support testing all three user-facing modes:

1. `teaching`
2. `guided`
3. `practice`

Approval should be disabled until the reviewer has opened or exercised all required modes. If the example has practice behavior, the reviewer must be able to generate multiple variants and confirm that practice mode is algorithmic rather than a static replay.

### Practice Review Harness

For practice components, the review page must allow the reviewer to:

1. Render the component in practice context.
2. Submit at least one correct attempt.
3. Submit at least one incorrect attempt where feasible.
4. Inspect the emitted `practice.v1` submission envelope.
5. Confirm answer validation, feedback, score fields, and part-level evidence.
6. Generate multiple variants for randomized practice when supported.

### Activity Review Harness

For activity components, the review page must allow the reviewer to:

1. Render the activity from its stored props.
2. Exercise interactive behavior.
3. Inspect completion and submission callbacks.
4. Confirm the component behaves correctly in the relevant mode or placement.
5. Approve, request changes, or reject based on observed behavior.

## LLM Audit Support

The system should expose developer-only query helpers that let an audit process fetch unresolved review feedback without exposing student data.

The audit context should include:

1. Component kind, ID, key, and current content hash.
2. Current approval status and stale state.
3. Unresolved `needs_changes` or `rejected` review rows.
4. Comments, issue tags, priority, and placement context.
5. Enough component props/content to propose a repair.

The audit process must not:

1. Mark components approved.
2. Resolve comments without a new human review.
3. Treat comments for an old content hash as automatically resolved unless the implementation explicitly records that relationship.

## Acceptance Criteria

1. Example, activity, and practice components have persistent approval summaries in the database.
2. Review decisions are stored in a separate review history table with comments, tags, priority, reviewer, timestamp, component kind, component ID, content hash, and placement context.
3. `needs_changes` and `rejected` decisions require comments.
4. Stale approval is derived by comparing the current content hash to the stored approval hash.
5. The developer review site is inaccessible on the live site by default and has no public/student/teacher navigation entry.
6. Example review supports all three modes and requires practice-variant checks before approval when practice behavior exists.
7. Practice review supports component execution, submission inspection, feedback/validation checks, and randomized variant checks where supported.
8. Activity review supports rendering stored props, exercising interactions, and inspecting completion/submission behavior.
9. Developer-only audit queries can fetch unresolved review notes for later LLM repair workflows.
10. Unit and integration tests cover data validators, hash freshness, review mutations, route guards, and review UI gating.
11. `npm run lint` and relevant tests pass before implementation completion.

## Implementation Notes

1. Convex implementation work must begin by reading `convex/_generated/ai/guidelines.md` if that file exists, per project instructions.
2. Use Convex validators for all new review fields and mutations.
3. Prefer internal Convex functions and server-side guards for review data access.
4. Keep the review UI operational and developer-focused; do not optimize it for student-facing polish.
5. If adding a content hash utility, keep it deterministic and unit tested with stable key ordering.
