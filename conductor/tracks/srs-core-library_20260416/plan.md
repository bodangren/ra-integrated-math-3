# Reusable SRS Core Library — Implementation Plan

## Phase 1: FSRS Dependency and Scheduler Foundation

- [x] Task: Install and validate `ts-fsrs` dependency
  - [x] Evaluate `ts-fsrs` npm package API and types
  - [ ] Add dependency to package.json (requires user approval per AGENTS.md) **BLOCKED**
  - [x] Verify license (MIT) and bundle size compatibility
  - [x] Create a smoke test that imports and exercises basic ts-fsrs functions
- [x] Task: Write scheduler unit tests
  - [x] Test `createCard` returns valid `SrsCardState` with state="new", reps=0, lapses=0
  - [x] Test `reviewCard` with `Again` rating increments lapses, reduces stability
  - [x] Test `reviewCard` with `Good` rating increases stability and scheduledDays
  - [x] Test `reviewCard` with `Easy` rating produces longest interval
  - [x] Test maximum interval cap is respected
  - [x] Test `getDueCards` returns only cards with dueDate <= now
  - [x] Test `previewInterval` returns scheduled days without mutating card
  - [x] Test rating mapping: SrsRating.Again → Rating.Again, etc.
- [x] Task: Implement scheduler wrapper
  - [x] Create `lib/srs/scheduler.ts`
  - [x] Implement `createCard` using `ts-fsrs` `createEmptyCard` + metadata mapping
  - [x] Implement `reviewCard` using `ts-fsrs` `fsrs().next`
  - [x] Implement `getDueCards` with ISO string date comparison
  - [x] Implement `previewInterval` as a non-mutating preview
  - [x] Map between `SrsCardState` and `ts-fsrs` internal `Card` type
- [x] Task: Document scheduler configuration
  - [x] Add JSDoc for `SchedulerConfig` and its defaults
  - [x] Document why default `requestRetention` is 0.9
  - [x] Document `maximumInterval` rationale (365 days = school year)
- [ ] Task: Conductor - Phase Completion Verification 'FSRS Dependency and Scheduler Foundation' (Protocol in workflow.md)

**Note:** ts-fsrs npm package not yet installed — requires user approval per AGENTS.md. Implementation and tests written and ready; will pass once package is installed.

## Phase 2: Review Processor

- [ ] Task: Write review processor tests
  - [ ] Test incorrect submission → card state enters relearning
  - [ ] Test correct submission, no hints → card state advances with `Good` rating
  - [ ] Test correct submission with hints → card state advances with `Hard` rating
  - [ ] Test timing modifier: fast timing may upgrade to `Easy`
  - [ ] Test missing timing does not block review processing
  - [ ] Test review log captures correct before/after state
  - [ ] Test review log captures evidence (baseRating, timingAdjusted, reasons)
- [ ] Task: Implement review processor
  - [ ] Create `lib/srs/review-processor.ts`
  - [ ] Import `mapPracticeToSrsRating` from `lib/practice/srs-rating.ts`
  - [ ] Import `deriveTimingFeatures` from `lib/practice/timing-baseline.ts`
  - [ ] Import `reviewCard` from scheduler
  - [ ] Implement full pipeline: submission → timing features → rating → card update → review log
- [ ] Task: Document review processor pipeline
  - [ ] Add JSDoc showing the processing stages
  - [ ] Include example of a typical correct answer review flow
  - [ ] Include example of an incorrect answer review flow
- [ ] Task: Conductor - Phase Completion Verification 'Review Processor' (Protocol in workflow.md)

## Phase 3: Queue Primitives

- [ ] Task: Write queue tests
  - [ ] Test new cards for essential objectives appear before supporting
  - [ ] Test overdue cards sorted by days overdue descending
  - [ ] Test due cards sorted by due date ascending
  - [ ] Test triaged objectives excluded from queue entirely
  - [ ] Test `newCardsPerDay` cap respected
  - [ ] Test `maxReviewsPerDay` cap respected
  - [ ] Test empty input returns empty queue
  - [ ] Test mix of new, overdue, and due cards produces correct ordering
- [ ] Task: Implement queue builder
  - [ ] Create `lib/srs/queue.ts`
  - [ ] Implement `buildDailyQueue` with multi-pass sorting
  - [ ] Implement `isOverdue` and `daysOverdue` helpers
  - [ ] Use `SrsSessionConfig` for queue parameters
  - [ ] Keep pure — accept all data as parameters, no side effects
- [ ] Task: Conductor - Phase Completion Verification 'Queue Primitives' (Protocol in workflow.md)

## Phase 4: Adapter Interfaces

- [ ] Task: Write adapter tests
  - [ ] Test `InMemoryCardStore` implements `CardStore` interface
  - [ ] Test `InMemoryReviewLogStore` implements `ReviewLogStore` interface
  - [ ] Test scheduler + processor + in-memory stores work end-to-end
  - [ ] Test card store `getDueCards` filters correctly
- [ ] Task: Implement adapter interfaces
  - [ ] Create `lib/srs/adapters.ts`
  - [ ] Define `CardStore` and `ReviewLogStore` interfaces
  - [ ] Implement `InMemoryCardStore` and `InMemoryReviewLogStore`
  - [ ] Document how Convex adapters should implement these (for Track 5)
- [ ] Task: Conductor - Phase Completion Verification 'Adapter Interfaces' (Protocol in workflow.md)

## Phase 5: Verification and Handoff

- [ ] Task: Run validation commands
  - [ ] Run focused SRS core library tests
  - [ ] Run `npm run lint`
  - [ ] Run `npm run typecheck` or document known pre-existing failures
- [ ] Task: Update Conductor planning artifacts
  - [ ] Mark completed tasks and phases in this plan
  - [ ] Update `conductor/tracks.md`
- [ ] Task: Write junior developer handoff notes
  - [ ] Document how to use `createCard`, `reviewCard`, `getDueCards`
  - [ ] Document the review processor pipeline with code examples
  - [ ] Document how Track 5 should implement `CardStore`/`ReviewLogStore` with Convex
  - [ ] Document FSRS parameter tuning guidance
  - [ ] Document the SrsRating → ts-fsrs Grade mapping
- [ ] Task: Conductor - Phase Completion Verification 'Verification and Handoff' (Protocol in workflow.md)
