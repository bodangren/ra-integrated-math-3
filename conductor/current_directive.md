# Current Directive

> Updated: 2026-04-15 (code review: module 4 seeds Phases 1-4)

## Status Summary

- **Tests**: 1900 passing, 9 known failures (6 equivalence, 1 flaky StepByStepper-guided, 2 flaky lesson.test.tsx).
- **Build**: Passing; RSC chunk warning remains pre-existing (734 KB).
- **Lint**: Passing.
- **TypeScript**: 25 pre-existing test-file errors remain (students.test.tsx, dashboard.test.ts). No new TS errors.
- **Module 1 Roadmap**: Complete.
- **Module 2 Seed**: Complete; all 5 lessons wired into seed.ts.
- **Module 3 Seed**: Complete; all 5 lessons wired into seed.ts with MPM.3.x standards.
- **Manual Component Approval**: All 5 phases complete.
- **Module 4 Seed**: Phases 1-4 complete (lessons 4-1 through 4-4).

## Current In-Progress Track

### Module 4 Curriculum Seed

Track: `conductor/tracks/module-4-seed_20260415/`

Seed Module 4 inverses and radical functions lessons (4-1 through 4-6) into Convex database.

## Planned Upcoming Tracks

1. **Module 4 Curriculum Seed** — Phases 5-7 remaining (lessons 4-5, 4-6, integration)
2. **Module 5 Curriculum Seed** — `module-5-seed_20260415` (5 lessons)
3. **Module 6 Curriculum Seed** — `module-6-seed_20260415` (5 lessons)
4. **Module 7 Curriculum Seed** — `module-7-seed_20260415` (6 lessons)
5. **Module 8 Curriculum Seed** — `module-8-seed_20260415` (5 lessons)
6. **Module 9 Curriculum Seed** — `module-9-seed_20260415` (7 lessons)

See `conductor/modules-3-9-roadmap.md` for the module inventory and repeated implementation pattern.

## Medium-Term Tech Debt

1. Fix Convex N+1 queries in teacher/student progress paths.
2. Fix incorrect CCSS standard description (HSA-APR.B.2).
3. Build lesson_standards seeding pipeline.
4. Add missing CCSS standards for M2/M3 (HSA-APR.C.4, HSA-APR.C.5, HSA-REI.D.11).
5. Validate componentKind server-side in submitReviewHandler.
6. Resolve approval race condition.
7. Add student/teacher error boundaries.
8. Validate `timeSpent >= 0` in phase completion.
9. Compute real `nextPhaseUnlocked`.
10. Reduce RSC bundle size.
11. Fix pre-existing TypeScript test errors.
