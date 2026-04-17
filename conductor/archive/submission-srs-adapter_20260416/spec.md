# Submission-to-SRS Adapter — Specification

## Context

The `srs-rating.ts` module already maps practice evidence (correctness, hints, reveals, misconceptions) to `SrsRating`. The `review-processor.ts` module (Track 2) applies those ratings to FSRS card state, producing updated cards and review logs. The `scheduler.ts` module (Track 2) provides `createCard` and `reviewCard` primitives.

This track wires those pieces together end-to-end: a practice submission comes in → look up the student's card for this problem family → derive rating → update card → persist. Currently, submissions are stored in `activity_submissions` but no SRS card state is updated as a result.

## Goals

- Create the adapter that bridges submission events to SRS card state transitions.
- Handle first-seen items (create new card via `scheduler.createCard`).
- Handle existing cards (apply review via scheduler/review-processor).
- Use timing baselines when available for rating derivation.
- Produce review log entries for every SRS state change.
- Ensure SRS processing never blocks submission persistence.

## Functional Requirements

### Submission-to-Card Pipeline

1. Receive a `practice.v1` submission from the activity submission flow.
2. Extract `problemFamilyId` from the activity (via Track 4 blueprint data).
3. Look up the student's existing SRS card for this problem family.
4. If no card exists, create one using `scheduler.createCard`.
5. Derive timing features using baseline if available.
6. Derive rating using `mapPracticeToSrsRating`.
7. Apply rating via `reviewCard` from the scheduler.
8. Persist updated card and review log entry atomically (Track 5 Convex adapter).

### Problem Family Resolution

Map an activity (`componentKey` + `standardId`) to a `problemFamilyId`. Use Track 4 blueprint data. If no blueprint entry exists for the activity, skip SRS processing entirely (graceful degradation — the submission is still stored).

### First-Seen Handling

When a student's first submission for a problem family arrives, create a new card. Card state starts as `"new"`, due immediately. The first review immediately transitions the card out of `"new"` based on the derived rating.

### Timing Baseline Integration

Look up the timing baseline for the problem family. If available, derive timing features via `deriveTimingFeatures(timing, baseline)` and pass to rating derivation. If no baseline exists, proceed without timing influence — `mapPracticeToSrsRating` must accept absent timing features.

### Error Handling

If SRS processing fails (missing card after creation, invalid state, persistence error), log the error but do **NOT** block the submission. SRS is additive — submission storage is the primary concern. The adapter should catch errors at the boundary and report them without propagating.

## Non-Functional Requirements

- SRS processing must be async/non-blocking relative to submission storage.
- Must not add >100ms p95 latency to the submission path.
- Must be idempotent: processing the same submission twice produces the same card state.
- Pure adapter logic must be testable with in-memory stores (no Convex required for unit tests).

## Acceptance Criteria

1. **End-to-end test**: submit practice → card created → rating derived → card updated → review log persisted.
2. **First-seen items**: new problem family submissions create cards correctly with `"new"` state.
3. **Missing timing baseline**: adapter degrades gracefully, still derives rating from correctness evidence alone.
4. **SRS errors don't block submissions**: adapter catches errors; submission storage succeeds independently.
5. **Idempotent on replay**: identical submission processed twice yields identical card state.
6. **Missing blueprint**: activities without a problem family mapping are skipped without error.

## Dependencies

- **Track 1** (`srs-core-library`): `SrsCardState`, `SrsRating`, `SrsReviewLog`, scheduler types.
- **Track 2** (`srs-core-library`): `scheduler.createCard`, `scheduler.reviewCard`, `review-processor`.
- **Track 4** (`practice-item-blueprint`): problem family blueprint data for activity → `problemFamilyId` mapping.
- **Track 5** (`convex-srs-schema`): Convex tables `srs_cards`, `srs_review_log`, `activity_submissions` and persistence adapters.

## Out of Scope

- Student UI for SRS status.
- Teacher dashboard for SRS data.
- Queue engine for daily practice (separate track: `daily-practice-queue`).
