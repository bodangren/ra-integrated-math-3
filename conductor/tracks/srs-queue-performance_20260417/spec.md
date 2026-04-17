# Specification: SRS Queue Performance Fixes

## Overview

The daily practice queue resolver (`convex/queue/queue.ts`) contains critical N+1 query patterns that cause severe performance degradation as student card counts grow. This track replaces sequential per-item database round-trips with batched bulk reads and adds bounded result limits.

## Issues Addressed

1. **Unbounded `.collect()` on `srs_cards`** — fetches ALL cards for a student regardless of session limits.
2. **N+1 policy resolution** — loops over `objective_policies` records and calls `ctx.db.get(standardId)` for each.
3. **N+1 queue item resolution** — for each queue item, calls `resolveQueueItem` which makes 2 sequential DB queries (`practice_items` + `activities`).

## Functional Requirements

### 1. Bounded Card Queries

- The SRS card query must not use unbounded `.collect()`.
- Use `.take(100)` as a defensive upper bound (well above `maxReviewsPerDay = 20` while avoiding unbounded loads).

### 2. Batched Policy Resolution

- Fetch all required `competency_standards` documents in a single batch instead of N sequential `db.get` calls.
- Maintain existing behavior: skip policies whose standard is missing.

### 3. Bulk Queue Item Resolution

- Collect all unique `problemFamilyId`s from the built queue.
- Resolve matching `practice_items` in bulk (single query or parallel indexed queries).
- Resolve matching `activities` in bulk via `Promise.all`.
- Maintain existing null-safety: skip items with missing practice items or activities.
- Preserve queue item ordering.

## Acceptance Criteria

- [ ] `getDailyPracticeQueueHandler` makes no sequential per-card or per-policy DB round trips.
- [ ] All existing queue tests pass without regression.
- [ ] New tests verify batched resolution behavior.
- [ ] TypeScript compiles without errors.
- [ ] No new lint errors.

## Out of Scope

- Schema migrations (indexes already exist).
- Changes to `buildDailyQueue` pure logic in `lib/srs/queue.ts`.
- Teacher dashboard N+1 fixes (tracked separately in tech-debt).
