# Daily Practice SRS Product Contract — Specification

## Context

The daily practice SRS system needs a unified contract that consolidates existing partial implementations and defines the remaining types for the full scheduling pipeline.

**Already implemented** (from `practice-timing-telemetry` and `practice-timing-baselines` tracks):
- `lib/practice/contract.ts` — `practice.v1` envelope, timing summary, submission parts
- `lib/practice/srs-rating.ts` — `SrsRating` type, `computeBaseRating`, `applyTimingToRating`, `mapPracticeToSrsRating`
- `lib/practice/objective-proficiency.ts` — `ObjectivePracticePolicy`, `PRIORITY_DEFAULTS`, `computeObjectiveProficiency`, student/teacher views
- `lib/practice/timing-baseline.ts` — `PracticeTimingBaseline`, `PracticeTimingFeatures`, speed bands

**Not yet implemented** (this track and downstream):
- SRS card state types (FSRS-specific stability, difficulty, due dates)
- Session and review log types
- Daily practice queue configuration
- Consolidated versioning and re-exports

The guiding design:

```
practice.v1 submission evidence
  -> deterministic system-derived review rating (srs-rating.ts)
  -> SRS card state (NEW)
  -> objective proficiency interpreted by objective policy (objective-proficiency.ts)
```

Students should answer math problems. They should not self-select FSRS ratings.

## Goals

1. Consolidate existing SRS types into a canonical `lib/srs/contract.ts` module with re-exports.
2. Define the **missing** types that downstream tracks need: card state, session, review log, queue config.
3. Version the SRS system as `srs.contract.v1`.
4. Document the triage handling contract and instructional language guidelines.
5. Produce a single import surface (`lib/srs/contract.ts`) that every downstream track uses.

## Functional Requirements

### Re-export Existing Types

`lib/srs/contract.ts` must re-export (not re-define) the following from existing modules:

| Source Module | Re-exported Types |
|--------------|-------------------|
| `lib/practice/srs-rating.ts` | `SrsRating`, `SrsRatingInput`, `SrsRatingResult` |
| `lib/practice/objective-proficiency.ts` | `ObjectivePriority`, `ObjectivePracticePolicy`, `PRIORITY_DEFAULTS`, `EvidenceConfidence`, `ObjectiveProficiencyResult`, `StudentProficiencyView`, `TeacherProficiencyView` |
| `lib/practice/timing-baseline.ts` | `PracticeTimingBaseline`, `PracticeTimingFeatures`, `TimingSpeedBand` |
| `lib/practice/contract.ts` | `PracticeSubmissionEnvelope`, `PracticeSubmissionPart`, `PracticeTimingSummary` |

### New Card State Types

Define FSRS card state for the scheduling engine (Track 2):

```typescript
type SrsCardId = string;

type SrsCardState = {
  cardId: SrsCardId;
  studentId: string;
  objectiveId: string;
  problemFamilyId: string;
  stability: number;
  difficulty: number;
  state: "new" | "learning" | "review" | "relearning";
  dueDate: string;              // ISO timestamp
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  lastReview: string | null;
  createdAt: string;
  updatedAt: string;
};
```

### New Review Log Types

Define immutable review log entries:

```typescript
type SrsReviewLogEntry = {
  reviewId: string;
  cardId: SrsCardId;
  studentId: string;
  rating: SrsRating;
  submissionId: string;
  evidence: {
    baseRating: SrsRating;
    timingAdjusted: boolean;
    reasons: string[];
  };
  stateBefore: Pick<SrsCardState, "stability" | "difficulty" | "state" | "reps" | "lapses">;
  stateAfter: Pick<SrsCardState, "stability" | "difficulty" | "state" | "reps" | "lapses">;
  reviewedAt: string;
};
```

### New Session Types

Define a daily practice session:

```typescript
type SrsSessionConfig = {
  newCardsPerDay: number;
  maxReviewsPerDay: number;
  prioritizeOverdue: boolean;
};

type SrsSession = {
  sessionId: string;
  studentId: string;
  startedAt: string;
  completedAt: string | null;
  plannedCards: number;
  completedCards: number;
  config: SrsSessionConfig;
};
```

### Triage Handling

Triaged objectives are explicitly excluded from daily practice queues and proficiency calculations unless a teacher overrides. They:
- Do not generate SRS cards.
- Do not appear in student proficiency dashboards as incomplete.
- Can be reactivated by changing the priority field.

This behavior already exists in `computeObjectiveProficiency` (returns `isProficient: false` with `objective_triaged` reason). The card creation logic in Track 5 must skip triaged objectives.

### Instructional Language Guidelines

Define copy guidelines (constants, not hardcoded strings) for student and teacher surfaces. Existing guidance strings in `objective-proficiency.ts` (`deriveStudentGuidance`, `deriveTeacherGuidance`) serve as the starting point.

Additional copy for daily practice:
- "You have N items to review today."
- "All done for today! Come back tomorrow for your next review."
- "You're building strong recall on this skill."

Never show:
- Speed rankings or "You're slower than average."
- Raw FSRS stability/difficulty numbers to students.
- Comparative language between students.

## Non-Functional Requirements

1. `lib/srs/contract.ts` is a pure TypeScript module — no Convex, no React, no browser APIs.
2. No duplication of types from existing `lib/practice/*.ts` modules. Use re-exports only.
3. All new types must be serializable (no `Date` objects, use ISO strings).
4. Version constant: `SRS_CONTRACT_VERSION = 'srs.contract.v1'`.
5. Module must be importable from both server-side and client-side code.

## Acceptance Criteria

1. `lib/srs/contract.ts` exists and re-exports all existing types from `lib/practice/srs-rating.ts`, `lib/practice/objective-proficiency.ts`, `lib/practice/timing-baseline.ts`.
2. New types `SrsCardState`, `SrsReviewLogEntry`, `SrsSessionConfig`, `SrsSession` are defined.
3. `SRS_CONTRACT_VERSION` constant is defined.
4. Unit tests verify re-exports are consistent with source modules (compile-time check).
5. Unit tests verify new types accept valid data and reject invalid data.
6. Instructional language constants are defined and tested for absence of punitive phrasing.
7. Triage handling rules are documented in module-level JSDoc.
8. `npm run lint` and `npm run typecheck` pass.

## Dependencies

- `practice-timing-telemetry_20260415` (completed) — timing types
- `practice-timing-baselines_20260415` (completed) — baseline types, rating adapter

## Out Of Scope

- FSRS algorithm implementation (Track 2).
- Convex table schema (Track 5).
- Practice item blueprint model (Track 4).
- UI components (Track 9, Track 11).
