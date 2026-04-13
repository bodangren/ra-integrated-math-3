# Current Directive

> Updated: 2026-04-14 (post-code-review)

## Status Summary

- **Tests**: 1354 passing, 6 known equivalence failures (pattern-matching limits, 88% — exceeds 80% target), 1 flaky (StepByStepper-guided hint tracking — passes in isolation)
- **Build**: passing (RSC chunk 708 KB — above 500 KB warning threshold; pre-existing)
- **Lint**: passing
- **TypeScript**: passing (0 errors — resolved 16 TS errors from prior tracks)
- **Completed Tracks**: supporting-activities Phase 1-4, component-approval (all 6 phases), algebraic-examples (all 4 phases), extract-linear-regex, extract-quadratic-regex, curriculum-gap-remediation, reconcile-activity-schemas, wire-step-by-step-solver (Phase 1-2), module-1-seed Phase 1

## Code Review Findings (2026-04-14)

### Fixed (this review session)
- **16 TypeScript errors** across seed tests, registry, activity components, discriminant-analyzer, rate-of-change-calculator, comprehension-quiz, vite config
- **activityId prop type mismatch** — DiscriminantAnalyzer and RateOfChangeCalculator destructured `activityId` but schema-derived types didn't include it; moved `activityId` injection to Activity wrapper level
- **ActivityComponent registry type** — widened to `ComponentType<any>` to accept components with varying required props
- **ShortAnswerQuestion onChange** — added missing `onChange` type to function signature
- **Seed test import path** — fixed `../../convex/seed/types` → `@/convex/seed/types`
- **convex/seed.ts** — removed unused argument `demo` passed to `seedDemo()`
- **vite.config.ts** — added `@ts-expect-error` for optional Cloudflare plugin import
- **Division by zero NaN scores** — FillInTheBlank and ComprehensionQuiz now guard against empty arrays
- **NaN from parseFloat** — ROC and DiscriminantAnalyzer now check `isNaN` before computing `isCorrect`
- **DiscriminantAnalyzer silent fallback** — shows error message when equation can't be parsed and no coefficients provided

### Pre-existing (from prior reviews, still open)
- Placeholder hash for example/practice components (`convex/dev.ts:113`)
- `createdBy` accepted as mutation arg, not derived from auth context
- Guided mode submissions not recorded (no onSubmit call for guided practice)
- No tests for Convex dev functions (listReviewQueue, submitReview, getAuditContext)
- Algebraic test coverage structurally weak (20-50% step assertion coverage)
- Unbounded `take(500)` in listReviewQueue with N+1 hash computation
- Approval status overwritten without version/lock — race condition on concurrent reviews

## Immediate Priorities

1. **Track 8: Module 1 Curriculum Seed (Phase 2-5)**
   - Phase 1 infrastructure complete (types, utils, entry point)
   - Phase 2: Lesson 1-7 content authoring
   - Phase 3: Competency standards and demo environment
   - Phase 4-5: Lesson seeds 1-1 through 1-8
   - Depends on Tracks 1, 4 (both complete)

2. **Track 5: Graphing Components — Explore Mode**
   - Deferred from earlier; parameter slider interaction

3. **Track 9: Student Lesson Flow**
   - End-to-end: dashboard → lesson → phases → activities → completion → progress persistence
   - Depends on: Tracks 3, 5, 6, 7, 8

4. **Track 10: Teacher Module 1 Experience**
   - Dashboard, gradebook, student detail, submission review, lesson preview
   - Depends on: Tracks 3, 5, 6, 7, 8

## Medium-Term

5. **Add Convex dev function tests** — listReviewQueue, submitReview, getAuditContext
6. **Replace placeholder content hash for example/practice** — `convex/dev.ts:113`
7. **Guided mode submission recording** — FillInTheBlank and ComprehensionQuiz should call onSubmit in guided mode
8. **Resolve approval race condition** — add compare-and-swap or conflict detection to submitReview
9. **Optimize listReviewQueue** — use indexes for pre-filtering, limit hash computation

## Tech Debt to Address

- ~~16 TypeScript errors from prior tracks~~ — **RESOLVED** (2026-04-14)
- ~~NaN scores from division by zero~~ — **RESOLVED** (2026-04-14)
- ~~NaN from parseFloat in submissions~~ — **RESOLVED** (2026-04-14)
- ~~DiscriminantAnalyzer silent coefficient fallback~~ — **RESOLVED** (2026-04-14)
- Placeholder hash for example/practice components
- `createdBy` should be derived from auth at public API boundaries
- Algebraic test coverage needs strengthening (88% but structural weakness)
- Consider symbolic math library for equivalence validation (production)
- Unbounded `take(500)` in listReviewQueue — performance concern for Convex billing
