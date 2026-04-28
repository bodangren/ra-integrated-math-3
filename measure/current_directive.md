# Current Directive

> Updated: 2026-04-29 (Code review #25 — BM2 internalMutation migration fixes, test mock updates, generated types)

## Mission

Monorepo migration complete (Waves 0-6). All major feature tracks done. Three new course apps scaffolded (IM1, IM2, PreCalc). BM2 rate limiting fully wired with internal mutations. Current focus: Convex schema type safety, curriculum authoring for new apps, remaining tech debt.

## Priority Order (Execute In This Order)

1. **Add .env.example to all apps** — No env reference exists for any app
2. **Convex schema strict validation** — 21 v.any() fields; priority: submissionData, props, content (user-facing)
3. **BM2 Convex generated types regeneration** — `apiRateLimits` manually patched into api.d.ts; `rateLimits` still shows as public; full `npx convex dev` regen needed
4. **SRS reviews.ts test coverage** — saveReview, getReviewsByCard, getReviewsByStudent have zero tests
5. **RSC bundle optimization** — page chunk 891 KB; vendor-charts 830 KB; needs further code-splitting
6. **SRS engine studentId type alignment** — Package defines `studentId: string` but Convex uses `Id<"profiles">`; 7 bridging casts
7. **BM2 governance test re-enablement** — 9 skipped suites need monorepo-aware path fixes
8. **srs/cards.ts saveCards: sequential await** — CRITICAL: 2N sequential DB operations for N cards
9. **teacher/srs_queries.ts: N+1 parallel fan** — Each fires 30+ parallel queries per class; batch via broader queries
10. **objectiveProficiency.ts: sequential outer loop** — Flatten to single Promise.all over all (objective, student) pairs
11. **Curriculum content authoring — IM1, IM2, PreCalc** — Seed complete curriculum for all three new apps (depends on activity component extraction)
12. **Activity component extraction** — Extract generic IM3 activity components to shared package for cross-app reuse
13. **Chatbot prompt injection defense** — sanitizeInput too weak; needs system prompt guard or LLM filter

## Non-Negotiable Rules

1. AI tutoring and workbook work in IM3 must be completed via BM2-derived package adoption
2. No dependency manager/install changes without explicit approval
3. Shared packages must not import from `apps/*` or app `convex/_generated/*`
4. BM2 business-domain code/assets remain app-local
5. Always run `npx tsc --noEmit` alongside `npm run build` — vinext build does not enforce TypeScript types
6. After extracting a package, **delete the app-local copy immediately** and rewire imports — duplicated code diverges silently
7. Never return `error.message` in API error responses — use generic messages + server-side logging

## Required Source Documents

- `measure/monorepo-plan.md` — Roadmap and strategy
- `measure/tracks.md` — Track registry and dependency order
- `measure/tech-debt.md` — Tech debt backlog
- `measure/workflow.md` — Core Measure protocol

## Immediate Next Actions Checklist

- [x] Waves 0-6 complete (all packages extracted, IM3+BM2 imports migrated, CI/CD hardened)
- [x] Review #11-22 fixes (all security, auth, SRS, N+1, objectiveIds, tech-debt triage, scaffolded apps)
- [x] Teacher.ts N+1: listActivePhaseIds, listStudentDetailUnits, getTeacherDashboardData, getTeacherStudentCompetencyDetail — all batched via Promise.all (review-23)
- [x] apiRateLimits remaining negative clamp — Math.max(0, ...) added (review-23)
- [x] Wire BM2 apiRateLimits to 5 API routes (complete — all 5 endpoints enforce rate limits)
- [x] Fix apiRateLimits race condition (High — duplicate inserts break .unique())
- [x] Add DESIGN.md + product.md to IM1
- [x] Fix BM2 internalMutation migration (apiRateLimits generated types, test mock updates, unused imports) — review-25
- [ ] Add .env.example to all apps
- [ ] Regenerate BM2 Convex types via `npx convex dev`
- [ ] Convex schema strict validation (21 v.any() fields)
- [ ] SRS reviews.ts test coverage
- [ ] RSC bundle: page chunk 891 KB → < 500 KB
- [ ] srs/cards.ts saveCards: sequential await → batch
- [ ] teacher/srs_queries.ts: N+1 parallel fan → broader batched queries
- [ ] BM2 9 governance tests re-enablement
- [ ] Activity component extraction for cross-app reuse

## Code Review Summary (2026-04-29 — Review #25)

Audit of the past 6 work phases: apiRateLimits race condition fix + rate limiting endpoint integration (WIP), IM1 DESIGN.md/product.md, review-24, rate limiting API endpoints, teacher proficiency N+1 fix, lesson version query optimization.

### Verification Results

| Check | Result |
|-------|--------|
| Typecheck (IM3) | Pass (0 errors) |
| Typecheck (BM2) | Pass (0 errors — all 6 WIP-commit errors fixed) |
| Typecheck (IM1/IM2/PC) | Pass (0 errors each) |
| Lint (IM3) | Pass (0 warnings) |
| Lint (BM2) | Pass (0 warnings) |
| Tests (IM3) | 3301 passed, 2 todo (272 test files) |
| Tests (BM2) | 2307 passed, 35 skipped (340 test files) |
| Build (IM3) | Pass |
| Build (BM2) | Pass |

### Issues Fixed in This Review (Review #25)

| Issue | Severity | Fix |
|-------|----------|-----|
| BM2 `apiRateLimits` missing from generated `api.d.ts` | CRITICAL | Added `apiRateLimits` module import and type entry to `convex/_generated/api.d.ts` |
| BM2 4 test files still using `fetchMutation` + `api.apiRateLimits` pattern | HIGH | Updated error-summary, ai-error-summary, assessment, and phases/complete test mocks to `fetchInternalMutation` + `internal.apiRateLimits` |
| BM2 `rateLimits.ts` unused `Id` import | MEDIUM | Removed unused `import type { Id }` after internalMutation migration |
| BM2 assessment route `userId` type mismatch | MEDIUM | Added `as Id<'profiles'>` cast and `Id` type import |
| README step numbering gap (4→6) | LOW | Fixed step 6→5, 7→6 |

### Issues Found (Deferred)

| Issue | Severity | Notes |
|-------|----------|-------|
| BM2 Convex generated types stale after internalMutation migration | HIGH | Manually patched `apiRateLimits`; `rateLimits` still shows as public; needs full `npx convex dev` regen |
| BM2 chatbot route uses `as any` for rateLimits internal ref | MEDIUM | `(internal as any).rateLimits` cast needed because generated types don't reflect internal conversion |
| srs/cards.ts saveCards: sequential await in for loop | CRITICAL | 2N sequential DB operations for N cards |
| teacher/srs_queries.ts: 5 per-student N+1 parallel fans | HIGH | Each fires 30+ parallel queries per class; should batch via broader queries |
| objectiveProficiency.ts: sequential outer loop over objectives | HIGH | Flattens to single Promise.all over all (objective, student) pairs |
| SRS queue test flaky in full suite | LOW | Passes in isolation; timing/ordering issue in full run |
