# Current Directive

> Updated: 2026-04-17 (Code review: Track 11 Phases 1-4, CCSS seeding, submitReviewHandler fix)

## Status Summary

- **Tests**: 2920 total, 6 known failures (equivalence validator — fraction/radical expressions). All others passing.
- **Build**: Passing.
- **Lint**: Passing.
- **TypeScript**: No new TS errors.
- **Module 1-9 Roadmap**: All modules seeded (M1-M9 complete). CCSS standards and lesson_standards links for M1-M5 seeded.
- **SRS Waves**: Waves 0-3 complete. Wave 4: Tracks 9, 10 complete. Track 11 Phases 1-4 complete, Phase 5 (Dashboard UI) next.
- **BM2 Alignment**: Wave A tracks (Security, CI/CD) pending. Wave B (Practice Test, Gradebook) pending.

## Code Review: Track 11 Phases 1-4 (2026-04-17)

### Scope

Reviewed commits `521fb6e..538b186` covering Track 11 Phases 1-4 (Class Health Queries, Weak Objectives and Struggling Students, Misconception Diagnostics, Intervention Mutations), CCSS Standards Seeding M1-M5, and submitReviewHandler componentKind fix.

### Fixes Applied

1. **MEDIUM: `resetStudentCardsHandler` return type inconsistency** — Handler declared `Promise<{ success: boolean; cardId: ... }>` but error branches cast to `{ success: false; error: string; cardId: null }` via `as`. Introduced discriminated union `ResetStudentCardsResult` to make error shapes type-safe. Updated test assertion to match.
2. **LOW: Fragile test timing in `getClassSrsHealthHandler` test** — Test used `earlierMs = todayMs - 2h` for a "practiced today" assertion. At midnight boundary this could miscount. Fixed: use `yesterdayMs = todayMs - 24h` to clearly represent "not today".

### Issues Logged (tracked in tech-debt.md)

- `by_objectiveId` index on `problem_families.objectiveIds` uses unsafe `as unknown as string[]` cast (High)
- N+1 queries in teacher SRS queries: per-student card/session/profile loops (Critical — pre-existing)
- `resetStudentCardsHandler` drops `lastReview` field on reset (Low — intentional but undocumented)

### No Issues Found In

- CCSS Standards Seeding M1-M5: clean implementation, properly wired into seed.ts
- submitReviewHandler componentKind fix: correct `resolveComponentKind` usage from `placement.phaseType`
- Track 11 Phase 1-3 queries: auth guards, class ownership validation all correct
- Track 11 test coverage: 47 tests with comprehensive edge cases (empty class, no cards, sorting, limits)

## High-Priority Next Steps

1. **Track 11 Phase 5: Dashboard UI Components** — SrsDashboardPanel, WeakObjectivesPanel, StrugglingStudentsPanel, MisconceptionPanel, InterventionActions, student detail SRS section, dashboard page
2. **Track 11 Phase 6: Verification and Handoff** — full test suite, docs, track completion
3. **Track 12: Cross-Course Extraction and Developer Docs** — boundary audit, INTEGRATION.md, adapter verification
4. **Security & Auth Hardening (BM2 Wave A)** — port fail-closed auth guards, Convex-layer authorization
5. **SRS queue: batch resolution** — Replace N+1 per-card reads with bulk reads (Critical perf, tracked in tech-debt.md)
6. **PracticeSessionProvider: send sessionId with completion** — Prevents wrong-session completion (High, tracked in tech-debt.md)

See `conductor/daily-practice-srs-roadmap.md` for the post-Module-9 daily practice SRS sequence.
See `conductor/tech-debt.md` for full issue registry.
