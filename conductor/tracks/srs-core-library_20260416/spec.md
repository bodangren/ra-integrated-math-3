# Reusable SRS Core Library — Specification

## Context

The SRS product contract (Track 1) consolidates existing types and defines new card state types. This track implements the **FSRS scheduling engine** that operates on those card states, plus a review processor that bridges existing `srs-rating.ts` logic with FSRS card state transitions, and queue primitives for daily practice ordering.

**Existing code this track depends on:**
- `lib/practice/srs-rating.ts` — `mapPracticeToSrsRating` derives ratings from evidence
- `lib/practice/timing-baseline.ts` — `deriveTimingFeatures` produces timing features for rating adjustment
- `lib/srs/contract.ts` (Track 1) — `SrsCardState`, `SrsReviewLogEntry`, `SrsSessionConfig`, re-exported types

**What this track builds (all new):**
- FSRS scheduler wrapper (`createCard`, `reviewCard`, `getDueCards`)
- Review processor (submission evidence → FSRS rating → card state update)
- Queue primitives (`buildDailyQueue` with priority ordering)
- Replaceable adapter interfaces for persistence

## Goals

1. Integrate the `ts-fsrs` library as the card scheduling engine.
2. Build a review processor that uses existing `mapPracticeToSrsRating` and applies the result to FSRS card state.
3. Implement queue ordering for daily practice sessions.
4. Keep all core logic in pure TypeScript — no Convex, no React, no browser APIs.
5. Define persistence adapter interfaces so the core is testable in isolation.

## Functional Requirements

### FSRS Scheduler

Wrap the `ts-fsrs` library with a clean interface. The scheduler operates on `SrsCardState` from Track 1.

```typescript
import { createEmptyCard, fsrs, generatorParameters, Rating, type Card, type Grade } from 'ts-fsrs';

type SchedulerConfig = {
  requestRetention: number;     // default 0.9
  maximumInterval: number;      // default 365
  enableShortTermPreview: boolean;  // default false
};
```

Core functions:

- `createCard(params: { studentId, objectiveId, problemFamilyId, now }): SrsCardState` — Initialize a new card with FSRS defaults.
- `reviewCard(card: SrsCardState, rating: SrsRating, now: string): SrsCardState` — Apply a review rating and return updated card state with new due date.
- `getDueCards(cards: SrsCardState[], now: string): SrsCardState[]` — Filter cards where `dueDate <= now`.
- `previewInterval(card: SrsCardState, rating: SrsRating): number` — Preview scheduled days for a rating without mutating state.

Rating mapping (SrsRating → ts-fsrs Grade):
- `Again` → `Rating.Again` (1)
- `Hard` → `Rating.Hard` (2)
- `Good` → `Rating.Good` (3)
- `Easy` → `Rating.Easy` (4)

### Review Processor

Bridge existing rating derivation with FSRS card state updates:

```typescript
type ReviewProcessorInput = {
  card: SrsCardState;
  submission: PracticeSubmissionEnvelope;
  baseline?: PracticeTimingBaseline;
  now: string;
};

type ReviewProcessorResult = {
  rating: SrsRating;
  updatedCard: SrsCardState;
  reviewLog: SrsReviewLogEntry;
};
```

Processing pipeline:
1. Extract `PracticeSubmissionPart[]` from submission.
2. Derive timing features using `deriveTimingFeatures` (if timing present and baseline available).
3. Compute rating using `mapPracticeToSrsRating`.
4. Apply rating to card state using FSRS scheduler.
5. Build immutable `SrsReviewLogEntry` with before/after state.

### Queue Primitives

Order cards for a daily practice session:

```typescript
type QueueItem = {
  card: SrsCardState;
  objectivePriority: ObjectivePriority;
  isOverdue: boolean;
  daysOverdue: number;
};

type QueueConfig = SrsSessionConfig;  // from Track 1

function buildDailyQueue(
  cards: SrsCardState[],
  policies: Map<string, ObjectivePracticePolicy>,
  config: QueueConfig,
  now: string
): QueueItem[];
```

Queue ordering:
1. Exclude cards for triaged objectives.
2. New cards for essential objectives (up to `newCardsPerDay`).
3. Overdue cards sorted by days overdue descending.
4. Due cards sorted by due date ascending.
5. Cap total at `maxReviewsPerDay`.

### Replaceable Adapters

```typescript
interface CardStore {
  getCard(id: string): Promise<SrsCardState | null>;
  getCardsByStudent(studentId: string): Promise<SrsCardState[]>;
  getCardsByObjective(objectiveId: string): Promise<SrsCardState[]>;
  getDueCards(studentId: string, now: string): Promise<SrsCardState[]>;
  saveCard(card: SrsCardState): Promise<void>;
  saveCards(cards: SrsCardState[]): Promise<void>;
}

interface ReviewLogStore {
  saveReview(entry: SrsReviewLogEntry): Promise<void>;
  getReviewsByCard(cardId: string): Promise<SrsReviewLogEntry[]>;
  getReviewsByStudent(studentId: string, since?: string): Promise<SrsReviewLogEntry[]>;
}
```

Include in-memory implementations for testing.

## Non-Functional Requirements

1. Pure TypeScript — no Convex, React, or browser imports in core modules.
2. All functions unit-testable with plain data (no database).
3. FSRS parameters configurable per-course via `SchedulerConfig`.
4. No global state — all functions accept their dependencies.
5. All inputs/outputs serializable (ISO strings, no Date objects).
6. Target >80% test coverage on all new modules.

## Dependencies

- Track 1 (`srs-product-contract_20260416`) — `SrsCardState`, `SrsReviewLogEntry`, `SrsSessionConfig`, re-exported types.
- `lib/practice/srs-rating.ts` — existing rating derivation.
- `lib/practice/timing-baseline.ts` — existing timing features.
- `ts-fsrs` npm package — requires user approval per project rules.

## Acceptance Criteria

1. `lib/srs/scheduler.ts` wraps `ts-fsrs` with `createCard`, `reviewCard`, `getDueCards`.
2. `lib/srs/review-processor.ts` bridges `mapPracticeToSrsRating` → FSRS card update → review log.
3. `lib/srs/queue.ts` implements `buildDailyQueue` with priority ordering.
4. `lib/srs/adapters.ts` defines `CardStore`, `ReviewLogStore` interfaces with in-memory implementations.
5. Rating mapping (`SrsRating` ↔ `ts-fsrs Grade`) is tested.
6. Unit tests cover: new card, first review, subsequent reviews, overdue cards, queue ordering, empty inputs.
7. No Convex or React imports in any core module.
8. `npm run lint` and `npm run typecheck` pass.

## Out Of Scope

- Convex persistence implementation (Track 5).
- Practice item / problem family model (Track 4).
- Student UI (Track 9).
- Teacher dashboard (Track 11).
- Proficiency measurement with FSRS stability (Track 10).
