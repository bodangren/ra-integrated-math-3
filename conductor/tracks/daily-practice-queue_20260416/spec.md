# Track: Daily Practice Queue Engine

## Context

The queue primitives in Track 2 provide a pure `buildDailyQueue` function. This track wraps it with Convex queries to fetch real card data, problem family metadata, and objective policies. It manages session state (start, progress, complete) and serves the queue to the student UI (Track 9).

## Goals

- Implement Convex-backed queue engine
- Manage daily session lifecycle
- Resolve queue items to actual practice activities
- Handle session limits and completion

## Functional Requirements

### Queue Query

Convex query that fetches a student's SRS cards, joins with problem family and objective policy data, calls `buildDailyQueue` from Track 2, and returns ordered queue items with resolved activity data.

### Session Lifecycle

- **Start session**: Create `srs_session` record, determine queue, return ordered items
- **Progress**: Track which cards have been reviewed in this session
- **Complete**: Mark session as completed, update `completedCards` count

### Queue Item Resolution

Each queue item must resolve to an actual practice activity. Join `srs_cards` → `practice_items` → activities to get `componentKey` and `props`. If no practice item exists for a card's problem family, skip it in the queue.

### Session Config

Use `SrsSessionConfig` defaults (`newCardsPerDay: 5`, `maxReviewsPerDay: 20`, `prioritizeOverdue: true`). Allow teacher overrides per-class in future.

### Daily Reset

A student can only have one active session per day. Starting a new session when one exists resumes the existing one.

## Non-Functional Requirements

- Queue query should use indexed reads (no table scans)
- Session queries bounded by student
- No unbounded `collect()`

## Acceptance Criteria

- Convex query returns ordered queue with resolved activities
- Session create/complete lifecycle works
- Daily session limit enforced
- Missing practice items are skipped gracefully
- Unit and integration tests pass

## Dependencies

- Track 1 (types)
- Track 2 (queue primitives)
- Track 4 (problem families, practice items)
- Track 5 (Convex tables)

## Out of Scope

- Student practice UI (Track 9)
- Teacher dashboard (Track 11)
- Submission processing (Track 6)
