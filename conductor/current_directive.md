# Current Directive

> Updated: 2026-04-17 (Code review: Teacher Gradebook Phases 3-4, Study Hub Phases 1-3, Study Hub Games Phase 1)

## Status Summary

- **Tests**: 3346 total, 7 known failures (6 equivalence validator + 1 flaky StepByStepper-guided). All others passing.
- **Build**: Passing.
- **Lint**: 35 `any` errors in test files (pre-existing, not new).
- **TypeScript**: No new TS errors.
- **Module 1-9 Roadmap**: All modules seeded (M1-M9 complete). CCSS standards for M1-M5 seeded.
- **SRS Waves**: Waves 0-5 complete (all tracks done through Wave 5 Track 12).
- **BM2 Alignment**: Wave A complete. Wave B complete (Practice Test Engine, Teacher Gradebook). Wave C: Study Hub Flashcards complete, Games Phase 1 complete.

## Code Review: Teacher Gradebook Phases 3-4, Study Hub Phases 1-3, Games Phase 1 (2026-04-17)

### Scope

Reviewed commits `9ab1e7b..973621f` covering ~6000 new lines across 48 files:
- **Teacher Gradebook** Phase 3: UI Components (CourseOverviewGrid, GradebookGrid, SubmissionDetailModal)
- **Teacher Gradebook** Phase 4: Competency Heatmaps (pure logic, Convex queries, heatmap UI, route pages)
- **Study Hub** Phase 1: Glossary and SRS Core (708-term glossary, SRS utilities, types)
- **Study Hub** Phase 2: Convex Tables and Mutations (term_mastery, due_reviews, study_preferences tables)
- **Study Hub** Phase 3: UI Components and Routes (BaseReviewSession, FlashcardPlayer, ReviewSession, study hub home)
- **Study Hub Games** Phase 1: MatchingGame component and route

### Fixes Applied

1. **CRITICAL: FlashcardsPage "All Modules" only loaded Module 1 terms** — `app/student/study/flashcards/page.tsx:146` used `getGlossaryTermsByModule(1)` instead of `GLOSSARY`. Fixed: restructured page into RSC parent + client component, passing full glossary.
2. **CRITICAL: Flashcard session results never persisted** — `handleComplete` only `console.log`'d results. MatchingPageClient and ReviewPageClient both call `fetchInternalMutation(internal.study.recordStudySession)`. Fixed: added same persistence pattern to FlashcardsPageClient.
3. **CRITICAL: `getTeacherLessonPreview` missing auth check** — `convex/teacher.ts:1166` was `internalQuery` with no `getAuthorizedTeacher` guard. Any authenticated user could enumerate lesson content. Fixed: added `userId` arg and auth guard.
4. **CRITICAL: `getStandardsCoverage` missing auth check** — `convex/teacher.ts:1247` exposed all standards and lesson mappings without auth. Fixed: added `userId` arg and auth guard.
5. **HIGH: BaseReviewSession stale closure in `onComplete`** — `itemsSeen`, `itemsCorrect`, `itemsIncorrect` read from closure after functional updater calls. In concurrent mode, closure values lag behind. Fixed: compute final values using local variables before calling `onComplete`.
6. **HIGH: BaseReviewSession stale `currentIndex`** — `setCurrentIndex(nextIndex)` captured stale closure value. Fixed: use `setCurrentIndex((prev) => prev + 1)` per lessons-learned gotcha.
7. **MEDIUM: MatchingGame wrong-answer timer orphaned** — Clicking wrong pair before 800ms timer fires left first timer orphaned. Fixed: clear previous timer before setting new one.
8. **MEDIUM: Lint fix** — Removed unused `_activityType` destructuring from BaseReviewSession (1 lint error resolved).

### No Issues Found In

- Gradebook pure logic (assembleGradebookRows, assembleCourseOverviewRows, assembleCompetencyHeatmapRows): well-structured, comprehensive test coverage
- Competency heatmap pure logic: clean edge case handling (inactive standards, null displayName, empty inputs)
- Convex handlers: correctly use `internalQuery`/`internalMutation` with auth guards
- Glossary data: 708 terms across 9 modules, well-structured
- MatchingGame: correct Fisher-Yates shuffle, proper cleanup in useEffect
- Test coverage: 13 new test files with thorough edge case coverage

### Issues Logged (tracked in tech-debt.md)

- N+1 queries in `getTeacherDashboardData`, `getTeacherSrsDashboardData` (Critical perf)
- Unbounded `.collect()` on `lesson_versions`, `competency_standards`, `lesson_standards` tables (High)
- `as never` casts in `convex/teacher.ts` suppressing type safety (Medium)
- Array index used as React key in SubmissionDetailModal evidence list (Low)
- `handleCellClick` discards `standardId` param in CompetencyHeatmapClient (Low)
- Convex handlers executed sequentially that could use `Promise.all` (Medium)
- `fetchInternalMutation` called from `'use client'` components (Medium — review for security)

## High-Priority Next Steps

1. **Complete Study Hub Games Phase 2: SpeedRoundGame** — Timer-based speed round with lives, streaks, multiple-choice (in-progress track)
2. **Study Hub Games Phase 3: Polish** — Shared infrastructure verification, session recording, final walkthrough
3. **SRS queue: batch resolution** — Replace N+1 per-card reads with bulk reads (Critical perf, tracked in tech-debt.md)
4. **PracticeSessionProvider: send sessionId with completion** — Prevents wrong-session completion (High)
5. **Wire combined dashboard query** — Replace empty array stubs in getTeacherSrsDashboardData with actual data
6. **Fix `stability` → `avgRetention` semantic mismatch** — Convert FSRS stability to actual retention percentage
7. **Address lint `any` errors in test files** — 35 violations (pre-existing, primarily in study.test.ts, gradebook-queries.test.ts, timing-baseline.test.ts)
8. **New Convex queries: use `.withIndex()` not `.filter()`** — Several handlers in teacher.ts use `.filter()` after index queries

See `conductor/daily-practice-srs-roadmap.md` for the post-Module-9 daily practice SRS sequence.
See `conductor/tech-debt.md` for full issue registry.
