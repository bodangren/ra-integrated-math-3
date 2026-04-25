# Track: convex-srs-schema_20260416

## Context

The SRS core library (Track 2) operates on `SrsCardState` in memory. This track adds Convex tables and implements the `CardStore`/`ReviewLogStore` adapter interfaces so card state persists across sessions. The review log must be immutable — append-only, no updates.

## Goals

1. Add `srs_cards`, `srs_review_log`, `srs_sessions` tables to Convex.
2. Implement `CardStore` and `ReviewLogStore` backed by Convex.
3. Wire review processor to persist card state updates.
4. Ensure backward compatibility with existing tables.

## Functional Requirements

### srs_cards table

Map `SrsCardState` to Convex `defineTable`.

- **studentId** — `id("profiles")`
- **objectiveId** — `string` (references `competency_standards` code)
- **problemFamilyId** — `string`
- **stability** — `number`
- **difficulty** — `number`
- **state** — `string` (union literal: `"New" | "Learning" | "Review" | "Relearning"`)
- **dueDate** — `string` (ISO date)
- **elapsedDays** — `number`
- **scheduledDays** — `number`
- **reps** — `number`
- **lapses** — `number`
- **lastReview** — optional `string` (ISO date)
- **createdAt** — `number` (ms epoch)
- **updatedAt** — `number` (ms epoch)

**Indexes:**

| Name | Fields |
|------|--------|
| `by_student` | `studentId` |
| `by_student_and_due` | `studentId`, `dueDate` |
| `by_objective` | `objectiveId` |
| `by_student_and_objective` | `studentId`, `objectiveId` |
| `by_problem_family` | `problemFamilyId` |

### srs_review_log table

Immutable append-only log.

- **cardId** — `id("srs_cards")`
- **studentId** — `id("profiles")`
- **rating** — `string`
- **submissionId** — optional `string` (references `activity_submissions`)
- **evidence** — `any` (baseRating, timingAdjusted, reasons)
- **stateBefore** — `any`
- **stateAfter** — `any`
- **reviewedAt** — `number` (ms epoch)

**Indexes:**

| Name | Fields |
|------|--------|
| `by_card` | `cardId` |
| `by_student` | `studentId` |
| `by_reviewed_at` | `reviewedAt` |

No update or delete mutations for this table.

### srs_sessions table

- **studentId** — `id("profiles")`
- **startedAt** — `number` (ms epoch)
- **completedAt** — optional `number` (ms epoch)
- **plannedCards** — `number`
- **completedCards** — `number`
- **config** — `any` (`newCardsPerDay`, `maxReviewsPerDay`, `prioritizeOverdue`)

**Indexes:**

| Name | Fields |
|------|--------|
| `by_student` | `studentId` |
| `by_student_and_status` | `studentId`, `completedAt` |

### ConvexCardStore adapter

Implement `CardStore` interface from Track 2 using Convex queries/mutations.

- `getCard(cardId)` — query by document ID
- `getCardsByStudent(studentId)` — query with index `by_student`
- `getCardsByObjective(objectiveId)` — query with index `by_objective`
- `getDueCards(studentId, asOfDate)` — query with index `by_student_and_due`
- `saveCard(cardState)` — mutation: upsert card
- `saveCards(cardStates[])` — mutation: batch upsert

### ConvexReviewLogStore adapter

Implement `ReviewLogStore` interface.

- `saveReview(entry)` — mutation: append log entry
- `getReviewsByCard(cardId)` — query with index `by_card`
- `getReviewsByStudent(studentId)` — query with index `by_student`

### Review persistence wiring

When a review is processed, atomically update the card AND append the review log entry in a single Convex mutation. The mutation receives card state and review entry, writes both, and returns the updated card ID and log entry ID.

## Non-Functional Requirements

- All mutations must be atomic (card update + review log append in single transaction).
- Use Convex indexes for hot-path queries.
- Avoid N+1 queries; use batch mutations for `saveCards`.
- No unbounded `collect()` — always `.take(N)` or paginate.
- TypeScript strict mode compliance.

## Acceptance Criteria

- [ ] 3 new tables in `convex/schema.ts` with all specified indexes
- [ ] `CardStore` adapter passes same tests as in-memory store
- [ ] `ReviewLogStore` adapter passes same tests
- [ ] Review log is immutable (no update/delete mutations exposed)
- [ ] Atomic card+log writes in single mutation
- [ ] `npm run lint` passes
- [ ] Typecheck passes
- [ ] All new tests pass

## Dependencies

- Track 1 — SRS types (`lib/srs/contract.ts`)
- Track 2 — Adapter interfaces (`lib/srs/adapters.ts`), scheduler (`lib/srs/scheduler.ts`)
- Track 4 — Problem families, objective policies

## Out of Scope

- Queue engine UI
- Student practice UI
- Teacher dashboard
