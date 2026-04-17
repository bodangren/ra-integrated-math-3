# SRS Core Library — Developer Handoff Notes

> Track 2: Reusable SRS Core Library — Phase 5
> Model: MiniMax-M2.7

## Overview

The SRS Core Library (`lib/srs/`) provides a pure TypeScript implementation of the FSRS spaced repetition algorithm, review processing pipeline, and queue ordering primitives. All code is free of Convex, React, or browser API imports — fully testable in isolation.

## Module Map

| File | Purpose |
|------|---------|
| `lib/srs/contract.ts` | Canonical type exports — `SrsCardState`, `SrsReviewLogEntry`, `SrsSessionConfig`, `SrsRating` (re-exported from srs-rating.ts) |
| `lib/srs/scheduler.ts` | FSRS wrapper — `createCard`, `reviewCard`, `getDueCards`, `previewInterval` |
| `lib/srs/review-processor.ts` | Submission → rating → card update pipeline |
| `lib/srs/queue.ts` | `buildDailyQueue` with priority ordering |
| `lib/srs/adapters.ts` | `CardStore` / `ReviewLogStore` interfaces + in-memory implementations |

## Scheduler (`scheduler.ts`)

### Creating Cards

```typescript
import { createCard } from '@/lib/srs/scheduler';

const card = createCard({
  studentId: 'student_abc123',
  objectiveId: 'obj_polynomial_roots',
  problemFamilyId: 'pf_quadratic_formula',
});
// card.state === 'new', card.dueDate === now, card.stability === 0
```

### Reviewing Cards

```typescript
import { reviewCard } from '@/lib/srs/scheduler';

const updatedCard = reviewCard(card, 'Good', nowISOString);
// updatedCard.dueDate is in the future
// updatedCard.reps === card.reps + 1
// updatedCard.state transitions: new → learning → review → relearning (on Again)
```

### Filtering Due Cards

```typescript
import { getDueCards } from '@/lib/srs/scheduler';

const dueCards = getDueCards(allStudentCards, nowISOString);
// Returns only cards where card.dueDate <= now
```

### Rating Mapping (SrsRating → ts-fsrs Grade)

| SrsRating | ts-fsrs Grade | Effect |
|-----------|---------------|--------|
| `Again` | `Rating.Again` (1) | Card enters relearning; stability drops; lapses++ |
| `Hard` | `Rating.Hard` (2) | Short interval; stability reduced |
| `Good` | `Rating.Good` (3) | Normal interval; stability maintained |
| `Easy` | `Rating.Easy` (4) | Long interval; stability increased |

```typescript
import { mapSrsRatingToGrade, mapGradeToSrsRating } from '@/lib/srs/scheduler';
// Bidirectional mapping available
```

## Review Processor (`review-processor.ts`)

The `processReview` function orchestrates the full pipeline:

```typescript
import { processReview } from '@/lib/srs/review-processor';

const result = processReview({
  card,
  submission: practiceSubmissionEnvelope,
  baseline: optionalTimingBaseline,
  now: new Date().toISOString(),
});

// result.rating       // final SrsRating
// result.updatedCard // card state after FSRS update
// result.reviewLog   // immutable audit entry
```

### Pipeline Stages

1. **Extract parts** from `PracticeSubmissionEnvelope`
2. **Derive timing features** via `deriveTimingFeatures(submission.timing, baseline)` — skipped if no timing
3. **Compute rating** via `mapPracticeToSrsRating(parts, timingFeatures)` — correctness first, then timing modifier
4. **Apply to card** via `reviewCard(card, rating)` — FSRS computes new interval
5. **Build review log** with before/after state snapshot

### Rating Derivation Rules (from `srs-rating.ts`)

```
Any incorrect part          → baseRating: Again
Any misconception tag       → baseRating: Again
Hints or reveals used      → baseRating: Hard
All correct, no aids        → baseRating: Good

Timing modifier (applied to baseRating):
  Again + any timing  → stays Again (correctness wins)
  Hard + any timing  → stays Hard (already penalized)
  Good + fast timing → Easy (upgraded)
  Good + slow/very_slow → Hard (downgraded)
```

## Queue Primitives (`queue.ts`)

```typescript
import { buildDailyQueue } from '@/lib/srs/queue';

const queue = buildDailyQueue(
  allStudentCards,           // SrsCardState[]
  policiesMap,              // Map<objectiveId, ObjectivePracticePolicy>
  { newCardsPerDay: 20, maxReviewsPerDay: 100, prioritizeOverdue: true },
  nowISOString
);
// Returns QueueItem[] ordered: essential new → supporting new → extension new → overdue → due
```

### Queue Ordering Rules

1. **Triaged objectives excluded** — cards with `policy.priority === 'triaged'` are dropped
2. **New cards first** — essential → supporting → extension, up to `newCardsPerDay`
3. **Overdue cards next** — sorted by days overdue descending (or due date if `prioritizeOverdue: false`)
4. **Due cards last** — sorted by due date ascending
5. **Capped** — total length limited to `maxReviewsPerDay`

### Helper Functions

```typescript
import { isOverdue, daysOverdue } from '@/lib/srs/queue';

isOverdue(card, now)   // true if dueDate < now AND state !== 'new'/'learning'
daysOverdue(card, now) // Math.floor((nowMs - dueMs) / msPerDay), 0 if not overdue
```

## Adapter Interfaces (`adapters.ts`)

### CardStore Interface

```typescript
interface CardStore {
  getCard(id: string): Promise<SrsCardState | null>;
  getCardsByStudent(studentId: string): Promise<SrsCardState[]>;
  getCardsByObjective(objectiveId: string): Promise<SrsCardState[]>;
  getDueCards(studentId: string, now: string): Promise<SrsCardState[]>;
  saveCard(card: SrsCardState): Promise<void>;
  saveCards(cards: SrsCardState[]): Promise<void>;
}
```

### ReviewLogStore Interface

```typescript
interface ReviewLogStore {
  saveReview(entry: SrsReviewLogEntry): Promise<void>;
  getReviewsByCard(cardId: string): Promise<SrsReviewLogEntry[]>;
  getReviewsByStudent(studentId: string, since?: string): Promise<SrsReviewLogEntry[]>;
}
```

### In-Memory Implementations (for testing)

```typescript
import { InMemoryCardStore, InMemoryReviewLogStore } from '@/lib/srs/adapters';

const cardStore = new InMemoryCardStore();
const reviewStore = new InMemoryReviewLogStore();
```

## Convex Adapter Implementation Guide (for Track 5)

Track 5 (`convex-srs-schema`) must implement `CardStore` and `ReviewLogStore` backed by Convex tables.

### Suggested Convex Schema

```typescript
// convex/schema.ts
defineTable({
  srs_cards: {
    cardId: string,
    studentId: string,
    objectiveId: string,
    problemFamilyId: string,
    stability: number,
    difficulty: number,
    state: string,  // 'new' | 'learning' | 'review' | 'relearning'
    dueDate: string,
    elapsedDays: number,
    scheduledDays: number,
    reps: number,
    lapses: number,
    lastReview: string | null,
    createdAt: string,
    updatedAt: string,
  }).index('by_student_due', ['studentId', 'dueDate'])
    .index('by_objective', ['objectiveId'])
    .index('by_student', ['studentId']),

  srs_review_log: {
    reviewId: string,
    cardId: string,
    studentId: string,
    rating: string,
    submissionId: string,
    evidence: string,  // JSON stringified
    stateBefore: string,  // JSON stringified
    stateAfter: string,  // JSON stringified
    reviewedAt: string,
  }).index('by_card', ['cardId'])
    .index('by_student_reviewedAt', ['studentId', 'reviewedAt']),

  srs_sessions: {
    sessionId: string,
    studentId: string,
    startedAt: string,
    completedAt: string | null,
    plannedCards: number,
    completedCards: number,
    config: string,  // JSON stringified
  }).index('by_student', ['studentId']),
});
```

### Key Implementation Notes

1. **Upsert semantics** — `saveCard` should use `ctx.db.insert_or_replace` (Convex idiom)
2. **ISO strings** — all date fields stored as ISO strings, never `Date` objects
3. **JSON serialization** — `evidence`, `stateBefore`, `stateAfter` are stored as JSON strings in Convex `string` fields (no nested objects in table columns)
4. **Index queries** — use `by_student_due` index for `getDueCards`, filter `dueDate <= now` in query
5. **Review log ordering** — always sort by `reviewedAt` ascending in query results

## FSRS Parameter Tuning

```typescript
import { DEFAULT_SCHEDULER_CONFIG } from '@/lib/srs/scheduler';

DEFAULT_SCHEDULER_CONFIG;
// { requestRetention: 0.9, maximumInterval: 365, enableShortTermPreview: false }
```

### `requestRetention` (default: 0.9)

- Higher → shorter intervals (more conservative, more reviews)
- Lower → longer intervals (more aggressive, fewer reviews)
- Educational content: 0.85–0.92 typical

### `maximumInterval` (default: 365)

- Caps all intervals at this many days
- Set to school year length for curriculum alignment
- Prevents cards from scheduling beyond a planning horizon

### Per-Card Override

```typescript
const card = reviewCard(card, 'Good', now, {
  requestRetention: 0.92,  // more conservative for this student
  maximumInterval: 180,
});
```

## Import Guidelines

All SRS code should import from `@/lib/srs/contract` for types:

```typescript
// Correct
import type { SrsCardState, SrsSessionConfig } from '@/lib/srs/contract';

// Avoid importing from internal modules in SRS-specific code
import { mapPracticeToSrsRating } from '@/lib/practice/srs-rating'; // OK for rating logic
```

## Test Coverage

| Module | Tests | Location |
|--------|-------|----------|
| scheduler | 32 | `__tests__/lib/srs/scheduler.test.ts` |
| review-processor | 12 | `__tests__/lib/srs/review-processor.test.ts` |
| queue | 23 | `__tests__/lib/srs/queue.test.ts` |
| adapters | 14 | `__tests__/lib/srs/adapters.test.ts` |
| contract | 26 | `__tests__/lib/srs/contract.test.ts` |
| **Total** | **107** | |

Run: `npm test -- lib/srs`

## Dependencies

- `ts-fsrs` — FSRS algorithm implementation (MIT license, installed)
- `lib/practice/srs-rating.ts` — rating derivation from practice evidence
- `lib/practice/timing-baseline.ts` — timing feature extraction
- `lib/practice/objective-proficiency.ts` — objective priority types
- `lib/practice/contract.ts` — `PracticeSubmissionEnvelope` type

## What's NOT in This Library (Track 5 scope)

- Convex table definitions and adapters
- Student UI for daily practice
- Teacher dashboard and interventions
- Card creation triggers (when does a new card get created for a student?)
- Proficiency aggregation from card states

## Common Patterns

### End-to-End Review Flow

```typescript
// 1. Get student's due cards from CardStore
const dueCards = await cardStore.getDueCards(studentId, now);

// 2. Build daily queue
const queue = buildDailyQueue(dueCards, policiesMap, sessionConfig, now);

// 3. For each card in queue (student completes activity):
const submission = await captureSubmission(activityId, studentId);
const result = processReview({
  card,
  submission,
  baseline: await getBaseline(studentId, card.problemFamilyId),
  now,
});

// 4. Persist updated card and review log
await cardStore.saveCard(result.updatedCard);
await reviewStore.saveReview(result.reviewLog);
```

### Preview Interval (no mutation)

```typescript
import { previewInterval } from '@/lib/srs/scheduler';

const daysIfGood = previewInterval(card, 'Good');
const daysIfEasy = previewInterval(card, 'Easy');
// Useful for "what if I answer well?" UI hints
```
