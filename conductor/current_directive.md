# Current Directive

> Updated: 2026-04-17 (Code review: Track 11 Phases 5-6, Track 12 Phases 1-4)

## Status Summary

- **Tests**: 2920+ total, 6 known failures (equivalence validator — fraction/radical expressions). All others passing.
- **Build**: Passing.
- **Lint**: 22 pre-existing `any` errors in test files (not from reviewed tracks).
- **TypeScript**: No new TS errors.
- **Module 1-9 Roadmap**: All modules seeded (M1-M9 complete). CCSS standards and lesson_standards links for M1-M5 seeded.
- **SRS Waves**: Waves 0-4 complete. Wave 5: Track 12 (Cross-Course Extraction) Phases 1-4 complete. Phase 5 (Verification and Handoff) remaining.
- **BM2 Alignment**: Wave A tracks (Security, CI/CD) pending. Wave B (Practice Test, Gradebook) pending.

## Code Review: Track 11 Phases 5-6 + Track 12 Phases 1-4 (2026-04-17)

### Scope

Reviewed commits `99dfc16..43c640d` covering Track 11 Phases 5-6 (Dashboard UI Components, Verification and Handoff) and Track 12 Phases 1-4 (Boundary Audit, Interface Documentation, Integration Guide, Adapter Verification).

### Fixes Applied

1. **CRITICAL: `resetStudentCardsHandler` only resets one card** — Used `.first()` but a student can have multiple cards per objective (different problem families). Changed to `.collect()` with iteration. Updated return type to `{ success: true; resetCount: number }` for clarity.
2. **MEDIUM: Dialog `.close()` throws on already-closed dialog** — Added `if (dialog.open)` guard before calling `.close()` in `components/ui/dialog.tsx`.
3. **MEDIUM: `new Date()` created inside per-card filter loop** — Hoisted ISO string computation before the loop in `convex/teacher.ts` dashboard query.
4. **MEDIUM: No error handling in InterventionActions** — Added `catch` blocks with user-visible error state to all three intervention handlers.
5. **MEDIUM: Missing keyboard handler on StudentCard** — Added `onKeyDown` for Enter/Space to StrugglingStudentsPanel.
6. **HIGH: INTEGRATION.md policy example uses wrong fields** — Replaced `newCardsPerDay`/`maxReviewsPerDay`/`prioritizeOverdue` with correct `minProblemFamilies`/`minCoverageThreshold`/`minRetentionThreshold` fields.
7. **HIGH: INTEGRATION.md ConvexCardStore references undeclared `ctx`** — Added `constructor(private ctx)` to adapter classes and used `this.ctx`.
8. **HIGH: INTEGRATION.md submission adapter accesses `submission.studentId`** — Added `studentId` as explicit parameter to `processPracticeSubmission`.
9. **LOW: INTEGRATION.md ConvexCardStore.saveCard uses insert instead of upsert** — Changed to query-then-patch/insert pattern.

### Issues Logged (tracked in tech-debt.md)

- Teacher SRS dashboard returns empty arrays for weakObjectives/strugglingStudents/misconceptions (High — individual queries exist, combined dashboard not wired)
- Misconception summary query has N+1 card resolution depth (Critical — will timeout with large data)
- `stability` field used as `avgRetention` — FSRS stability is days-until-90%-retrievability, not a percentage (Medium — semantic mismatch in UI)
- `longestIdleMs` underreported for blur/visibility-hidden events in timing.ts (Medium — affects confidence scoring)
- `addEvent` doesn't guard against events after `pagehide` (Medium — corrupts wall-clock timing)
- `mapGradeToSrsRating`/`mapCardState` silently map unknown values (Medium — should exhaust or throw)
- Missing test files: InterventionActions, StudentSrsDetail, srs-queries backend tests (Medium)
- Handoff doc claims test files that don't exist at stated paths (Low)

### No Issues Found In

- Track 12 Boundary Audit: thorough, zero course-specific leaks
- Track 12 JSDoc quality: comprehensive, usage examples compile
- Track 12 REST adapter stub: clean implementation with in-memory maps
- Track 12 export verification test: validates public interface completeness
- Track 12 integration guide test: validates examples compile and run
- SrsDashboardPanel, WeakObjectivesPanel tests: solid coverage with edge cases
- Build: clean production build, no TypeScript errors

## High-Priority Next Steps

1. **Track 12 Phase 5: Verification and Handoff** — Run full test suite, update metadata.json, finalize track
2. **Security & Auth Hardening (BM2 Wave A)** — port fail-closed auth guards, Convex-layer authorization
3. **SRS queue: batch resolution** — Replace N+1 per-card reads with bulk reads (Critical perf, tracked in tech-debt.md)
4. **PracticeSessionProvider: send sessionId with completion** — Prevents wrong-session completion (High, tracked in tech-debt.md)
5. **Wire combined dashboard query** — Replace empty array stubs in getTeacherSrsDashboardData with actual data from individual queries
6. **Fix `stability` → `avgRetention` semantic mismatch** — Convert FSRS stability to actual retention percentage in dashboard and proficiency views
7. **timing.ts: guard addEvent after pagehide** — Prevent wall-clock corruption from post-pagehide events
8. **CI/CD Hardening (BM2 Wave A)** — GitHub Actions pipeline with lint/test/build gates

See `conductor/daily-practice-srs-roadmap.md` for the post-Module-9 daily practice SRS sequence.
See `conductor/tech-debt.md` for full issue registry.
