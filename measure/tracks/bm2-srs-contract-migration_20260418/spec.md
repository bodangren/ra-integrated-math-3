# Specification: BM2 SRS Contract Migration

## Overview

Migrate BM2's legacy SRS contract (`card: Record<string, unknown>`, numeric timestamps) to the FSRS-aligned contract in `@math-platform/srs-engine` (flat typed fields, ISO timestamps).

## Problem Statement

BM2's `lib/srs/contract.ts` uses a fundamentally incompatible data model:
- `card: Record<string, unknown>` (opaque blob containing ts-fsrs Card)
- Numeric timestamps (`due: number`, `lastReview: number`, etc.)

The `srs-engine` package uses:
- Flat typed fields: `stability`, `difficulty`, `state`
- ISO timestamps: `dueDate: string`, `lastReview: string | null`

This contract incompatibility blocks BM2 from importing `@math-platform/srs-engine`.

## Goals

1. Make BM2's SRS contract compatible with `@math-platform/srs-engine`
2. Preserve all BM2-specific SRS behavior (analytics, answer inputs, domain logic)
3. Enable Phase 1 of `bm2-consume-core-packages` to complete (SRS imports)

## Migration Scope

### Files to Modify

- `apps/bus-math-v2/lib/srs/contract.ts` - rewrite to use srs-engine types
- `apps/bus-math-v2/lib/srs/scheduler.ts` - update to use new contract
- `apps/bus-math-v2/lib/srs/review-processor.ts` - update to use new contract
- `apps/bus-math-v2/lib/srs/queue.ts` - update to use new contract
- `apps/bus-math-v2/lib/srs/family-map.ts` - update references
- `apps/bus-math-v2/convex/schema.ts` - may need schema updates for new card fields

### Files to Keep Local (BM2-specific)

- `apps/bus-math-v2/lib/srs/teacher-analytics.ts` - BM2-specific analytics
- `apps/bus-math-v2/lib/srs/answer-inputs/**` - BM2-specific answer handling

### Contract Delta

| Field | BM2 Legacy | srs-engine Target |
|-------|-----------|------------------|
| card identity | `problemFamilyId + studentId` compound | explicit `cardId: SrsCardId` |
| objective tracking | none | `objectiveId: string` |
| card data | `card: Record<string, unknown>` blob | `stability`, `difficulty`, `state`, `reps`, `lapses` |
| timestamps | `number` (Unix ms) | `string` (ISO 8601) |
| review log | minimal (scheduledAt, reviewedAt, elapsedDays) | `reviewId`, `submissionId`, `evidence`, `stateBefore/After` |

## Non-Functional Requirements

- Must not break BM2 business-domain features (accounting exercises, spreadsheets, simulations)
- Must preserve all existing SRS scheduling behavior
- ts-fsrs library must remain compatible with both contracts during transition

## Dependencies

- `extract-srs-engine_20260417` (must be complete)
- `move-bm2-app-to-apps_20260417` (must be complete)

## Acceptance Criteria

- [ ] BM2 `lib/srs/contract.ts` imports and re-exports from `@math-platform/srs-engine`
- [ ] BM2 SRS scheduler uses flat card state fields
- [ ] Numeric timestamps replaced with ISO strings throughout
- [ ] BM2 SRS tests pass with new contract
- [ ] `bm2-consume-core-packages` Phase 1 can adopt `@math-platform/srs-engine` imports

## Out of Scope

- Convex persistence layer migration (handled in later phase)
- SRS queue engine migration (handled after contract migration)
- BM2-specific answer input handling