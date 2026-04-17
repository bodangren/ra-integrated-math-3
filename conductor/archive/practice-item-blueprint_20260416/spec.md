# Track: Practice Item Blueprint

## Context

The SRS scheduler needs to know which practice items test which objectives. Currently:

- The `activities` table has `standardId` but no concept of "problem families" or objective practice policies.
- The `timing_baselines` table uses `problemFamilyId` as an opaque string with no referential integrity.
- `lib/practice/objective-proficiency.ts` defines `ObjectivePracticePolicy` and `PRIORITY_DEFAULTS`, but no table assigns policies to competency standards.
- `lib/practice/srs-rating.ts` defines `SrsRating`, ready for use.
- Track 1 (`lib/srs/contract.ts`) defines `SrsCardState` with `problemFamilyId` and `objectiveId` fields, which this track must supply data for.

There is no data model connecting practice activities to stable problem families, no mapping from problem families to learning objectives, and no policy metadata to drive queue prioritization.

## Goals

1. Define the **problem family** and **practice item** data model.
2. Map existing activities to problem families.
3. Assign **objective practice policies** to competency standards.
4. Create seed data for all 9 modules.
5. Validate referential integrity across problem families, practice items, timing baselines, and competency standards.

## Functional Requirements

### FR-1: Problem Family Model

A problem family groups equivalent practice items that test the same objectives. Define a TypeScript type and Zod schema:

```typescript
type ProblemFamily = {
  problemFamilyId: string;   // e.g. "graphing-explorer:quadratic-transformations"
  componentKey: string;       // references activities.componentKey
  displayName: string;
  description: string;
  objectiveIds: string[];     // competency_standards IDs
  difficulty: "introductory" | "standard" | "challenging";
  metadata: Record<string, unknown>;
};
```

Convex table: `problem_families` with indexes on `problemFamilyId`, `componentKey`, and `objectiveIds`.

### FR-2: Practice Item Model

Maps a specific activity to a problem family:

```typescript
type PracticeItem = {
  practiceItemId: string;
  activityId: string;         // references activities table
  problemFamilyId: string;    // references problem_families table
  variantLabel: string;       // e.g. "Set A", "Set B"
};
```

Convex table: `practice_items` with indexes on `activityId`, `problemFamilyId`.

### FR-3: Objective Policy Assignment

Create an `objective_policies` table (or extend `competency_standards`) that assigns `ObjectivePracticePolicy` (`essential` | `supporting` | `extension` | `triaged`) to each standard for this course.

```typescript
type ObjectivePolicy = {
  standardId: string;         // references competency_standards
  policy: ObjectivePracticePolicy;
  courseKey: string;          // e.g. "integrated-math-3"
  priority: number;           // from PRIORITY_DEFAULTS
};
```

### FR-4: Seed Data

Create seed mutations that populate problem families and practice items for all 9 modules. Use existing activity component keys:

- `comprehension-quiz`
- `fill-in-the-blank`
- `graphing-explorer`
- `step-by-step-solver`
- `equation-builder`
- `matching-activity`
- `drag-and-drop`
- `multiple-choice`

Seed data must reference real `activityId` values from the `activities` table and real `standardId` values from `competency_standards`.

### FR-5: Validation

Ensure referential integrity:

- Every `problemFamilyId` referenced in `timing_baselines` has a corresponding `ProblemFamily` record.
- Every `problemFamilyId` in `practice_items` has a corresponding `ProblemFamily` record.
- Every `activityId` in `practice_items` has a corresponding `activities` record.
- Every `objectiveId` in `ProblemFamily.objectiveIds` has a corresponding `competency_standards` record.
- Every `standardId` in `objective_policies` has a corresponding `competency_standards` record.

## Non-Functional Requirements

- **NFR-1**: Pure TypeScript model types — no runtime dependencies beyond Zod.
- **NFR-2**: Zod v4 schemas for all data types, used for validation in seed mutations and tests.
- **NFR-3**: Convex tables for persistence, added to the existing `convex/schema.ts`.
- **NFR-4**: Course-agnostic model with IM3-specific seed data. Types and schemas must not embed IM3-specific assumptions.
- **NFR-5**: All seed mutations must be idempotent.

## Acceptance Criteria

- [ ] `ProblemFamily` and `PracticeItem` types defined in `lib/practice/` with Zod schemas.
- [ ] Zod schemas validate seed data (unit tests pass).
- [ ] `problem_families`, `practice_items`, and `objective_policies` tables added to `convex/schema.ts`.
- [ ] Indexes on `problemFamilyId`, `objectiveId`, `componentKey` for efficient lookups.
- [ ] Seed mutations for at least modules 1–3 populate problem families and practice items.
- [ ] Validation script/mutation checks referential integrity across all linked tables.
- [ ] All new code passes `npm run lint` and `npm run typecheck`.
- [ ] Vitest tests cover type validation, schema validation, and referential integrity checks.

## Dependencies

- **Track 1** (SRS contract types): `SrsCardState.problemFamilyId` and `SrsCardState.objectiveId` fields expect data from this track.
- **Track 2** (Scheduler): Needs problem families for card creation and queue building.

## Out of Scope

- FSRS scheduling algorithm implementation.
- Convex SRS card/schedule tables (Track 1).
- UI components for practice or review.
- Timing telemetry collection or analysis.
- Adaptive difficulty selection logic.
