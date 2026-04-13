# Current Directive

> Updated: 2026-04-14 (post-code-review, Phases 5-5b review)

## Status Summary

- **Tests**: 1505 passing, 6 known equivalence failures (pattern-matching limits, 88% — exceeds 80% target), 0 flaky
- **Build**: passing (RSC chunk 715 KB — above 500 KB warning threshold; pre-existing)
- **Lint**: passing
- **TypeScript**: passing (0 errors)
- **Completed Tracks**: supporting-activities Phase 1-4, component-approval (all 6 phases), algebraic-examples (all 4 phases), extract-linear-regex, extract-quadratic-regex, curriculum-gap-remediation, reconcile-activity-schemas, wire-step-by-step-solver (Phase 1-2), module-1-seed (all 5 phases), graphing-explore-mode (Phase 1)

## Code Review Findings (2026-04-14, Phases 5-5b)

### Fixed (this review session)
- **seed.ts ctx.runMutation type error** — passed RegisteredMutation instead of FunctionReference; now uses `internal` from `_generated/api`
- **seed-demo-env.ts TypeScript error** — profileId possibly undefined after guard; added non-null assertion
- **Explore equation formatting** — showed `1x^2 + 0x + 0`; now uses smart coefficient formatting

### Pre-existing (from prior reviews, still open)
- Placeholder hash for example/practice components (`convex/dev.ts:113`)
- `createdBy` accepted as mutation arg, not derived from auth context
- Guided mode submissions not recorded (no onSubmit call for guided practice)
- No tests for Convex dev functions (listReviewQueue, submitReview, getAuditContext)
- Algebraic test coverage structurally weak (20-50% step assertion coverage)
- Unbounded `take(500)` in listReviewQueue with N+1 hash computation
- Approval status overwritten without version/lock — race condition on concurrent reviews
- StepByStepSolverActivity submission data incomplete (hintsUsed: 0, userAnswer: null)

## Immediate Priorities

1. **Track 9: Student Lesson Flow**
   - End-to-end: dashboard → lesson → phases → activities → completion → progress persistence
   - Depends on: Tracks 3, 5, 6, 7, 8 (all complete)
   - **Status**: Ready to start — all dependencies met

2. **Track 10: Teacher Module 1 Experience**
   - Dashboard, gradebook, student detail, submission review, lesson preview
   - Depends on: Tracks 3, 5, 6, 7, 8 (all complete)
   - **Status**: Ready to start — all dependencies met

3. **Track 5b: Graphing Explorer Explore Mode (Phase 2+)**
   - Phase 1 complete; consider adding more exploration types beyond quadratic
   - Low priority — current implementation sufficient for Module 1

## Medium-Term

4. **Add Convex dev function tests** — listReviewQueue, submitReview, getAuditContext
5. **Replace placeholder content hash for example/practice** — `convex/dev.ts:113`
6. **Guided mode submission recording** — FillInTheBlank and ComprehensionQuiz should call onSubmit in guided mode
7. **Resolve approval race condition** — add compare-and-swap or conflict detection to submitReview
8. **Optimize listReviewQueue** — use indexes for pre-filtering, limit hash computation
9. **Regenerate Convex types** — run `npx convex dev` to include seed module in generated API types

## Tech Debt to Address

- ~~16 TypeScript errors from prior tracks~~ — **RESOLVED** (2026-04-14)
- ~~NaN scores from division by zero~~ — **RESOLVED** (2026-04-14)
- ~~NaN from parseFloat in submissions~~ — **RESOLVED** (2026-04-14)
- ~~DiscriminantAnalyzer silent coefficient fallback~~ — **RESOLVED** (2026-04-14)
- ~~seed.ts infinite loop~~ — **RESOLVED** (2026-04-14)
- ~~Security risk in RateOfChangeCalculator~~ — **RESOLVED** (2026-04-14)
- ~~seed.ts ctx.runMutation type error~~ — **RESOLVED** (2026-04-14)
- ~~seed-demo-env.ts TypeScript error~~ — **RESOLVED** (2026-04-14)
- ~~Explore equation formatting~~ — **RESOLVED** (2026-04-14)
- Placeholder hash for example/practice components
- `createdBy` should be derived from auth at public API boundaries
- Algebraic test coverage needs strengthening (88% but structural weakness)
- Consider symbolic math library for equivalence validation (production)
- Unbounded `take(500)` in listReviewQueue — performance concern for Convex billing
