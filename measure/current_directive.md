# Current Directive

> Updated: 2026-04-29 (Code review #27 — loginRateLimits security, SRS validator types, rating union, .env.example completeness)

## Mission

Monorepo migration complete (Waves 0-6). All major feature tracks done. Three new course apps scaffolded (IM1, IM2, PreCalc). All rate limiters now use internalMutation with race condition handling. SRS validators fully centralized with typed rating union and card state literal. Current focus: remaining Convex schema type safety, test coverage gaps, performance hardening, curriculum authoring for new apps.

## Priority Order (Execute In This Order)

1. **srs/cards.ts saveCards: sequential await** — CRITICAL: 2N sequential DB operations for N cards; batch via Promise.all
2. **teacher/srs_queries.ts: N+1 parallel fan** — Each fires 30+ parallel queries per class; batch via broader queries
3. **RSC bundle optimization** — page chunk still large; needs further code-splitting
4. **SRS engine studentId type alignment** — Package defines `studentId: string` but Convex uses `Id<"profiles">`; bridging casts needed in convexReviewLogStore.ts
5. **srs_reviews.ts: NaN on invalid reviewedAt** — `new Date(invalid).getTime()` silently stores NaN; add validation
6. **BM2 governance test re-enablement** — 9 skipped suites need monorepo-aware path fixes
7. **objectiveProficiency.ts: sequential outer loop** — Flatten to single Promise.all over all (objective, student) pairs
8. **Rate limiter test coverage** — No tests for IM3 rateLimits.ts or BM2 rateLimits.ts (chatbot)
9. **Rate limiter duplication** — IM3/BM2 chatbot rate limiters diverge; extract to shared package
10. **Convex unique index alternatives** — No unique constraints on rate limit tables; duplicates can still occur
11. **Curriculum content authoring — IM1, IM2, PreCalc** — Seed complete curriculum for all three new apps
12. **Activity component extraction** — Extract generic IM3 activity components to shared package for cross-app reuse
13. **Chatbot prompt injection defense** — sanitizeInput too weak; needs system prompt guard or LLM filter
14. **Convex schema strict validation** — 16 v.any() fields remain; priority: submissionData, props, content, config

## Non-Negotiable Rules

1. AI tutoring and workbook work in IM3 must be completed via BM2-derived package adoption
2. No dependency manager/install changes without explicit approval
3. Shared packages must not import from `apps/*` or app `convex/_generated/*`
4. BM2 business-domain code/assets remain app-local
5. Always run `npx tsc --noEmit` alongside `npm run build` — vinext build does not enforce TypeScript types
6. After extracting a package, **delete the app-local copy immediately** and rewire imports — duplicated code diverges silently
7. Never return `error.message` in API error responses — use generic messages + server-side logging
8. All rate limiters must be `internalMutation`/`internalQuery` — never public `mutation`/`query`

## Required Source Documents

- `measure/monorepo-plan.md` — Roadmap and strategy
- `measure/tracks.md` — Track registry and dependency order
- `measure/tech-debt.md` — Tech debt backlog
- `measure/workflow.md` — Core Measure protocol

## Immediate Next Actions Checklist

- [x] Waves 0-6 complete (all packages extracted, IM3+BM2 imports migrated, CI/CD hardened)
- [x] Review #11-26 fixes (all security, auth, SRS, N+1, objectiveIds, tech-debt triage, scaffolded apps, rate limiters)
- [x] Fix apiRateLimits race condition (try/catch upsert pattern)
- [x] Add .env.example to all apps
- [x] SRS reviews.ts test coverage
- [x] BM2 loginRateLimits: mutation → internalMutation, race condition handling, Math.max clamp, violation logging (review-27)
- [x] Login route: remove `as any` casts, use proper `internal.loginRateLimits` reference (review-27)
- [x] Lesson-chatbot route: remove `as any` casts, typed userId (review-27)
- [x] SRS rating: `v.string()` → `srsRatingValidator` (union of 4 FSRS literals) (review-27)
- [x] SRS card state: inline union → `srsCardStateLiteralValidator` (shared across schema, cards.ts, processReview.ts, validators.ts) (review-27)
- [x] reviews.ts: `cardId`/`studentId` `v.string()` → `v.id()`, remove `as Id<>` casts (review-27)
- [x] reviews.ts: `reviewId`/`submissionId` `v.string()` → `v.optional(v.string())`, remove `|| undefined` (review-27)
- [x] processReview.ts: same reviewId/submissionId/rating fixes (review-27)
- [x] srs_mutations.ts: `"manual_reset"` → `"Again"` (invalid rating value) (review-27)
- [x] convexReviewLogStore.ts: add `Id<>` casts for cardId/studentId bridging (review-27)
- [x] IM3/BM2 rateLimits.ts: Math.max(0, ...) on all remaining paths (review-27)
- [x] BM2 rateLimits.ts: cleanup uses `.filter().take(100)` instead of `.collect()` (review-27)
- [x] IM3 rateLimits.ts: remove unnecessary `ctx.db.get(args.userId)` — use `args.userId` directly (review-27)
- [x] BM2 .env.example: added 13+ missing env vars with documentation (review-27)
- [x] All 5 app .env.example: added `NEXT_PUBLIC_SITE_URL` (review-27)
- [x] Reviews test: added `stateBefore`/`stateAfter` assertions (review-27)
- [ ] srs/cards.ts saveCards: sequential await → batch
- [ ] teacher/srs_queries.ts: N+1 parallel fan → broader batched queries
- [ ] BM2 9 governance tests re-enablement
- [ ] Rate limiter test coverage (IM3 + BM2 chatbot)
- [ ] Activity component extraction for cross-app reuse
- [ ] Convex schema strict validation (16 v.any() fields remain)

## Code Review Summary (2026-04-29 — Review #27)

Audit of the past 6 work phases: SRS reviews.ts test coverage, review-26 (rate limiter race conditions, .env.example, SRS validators), Convex Schema Strict Validation Phase 2, review-25 (BM2 internalMutation migration), .env.example track creation, and apiRateLimits race condition fix.

### Verification Results

| Check | Result |
|-------|--------|
| Typecheck (IM3) | Pass (0 errors) |
| Typecheck (BM2) | Pass (0 errors) |
| Typecheck (IM1/IM2/PC) | Pass (0 errors each) |
| Lint (IM3) | Pass (0 warnings) |
| Lint (BM2) | Pass (0 warnings) |
| Tests (IM3) | 3311 passed, 2 todo |
| Tests (BM2) | 2307 passed, 35 skipped |
| Build (IM3) | Pass |
| Build (BM2) | Pass |

### Issues Fixed in This Review (Review #27)

| Issue | Severity | Fix |
|-------|----------|-----|
| BM2 `loginRateLimits.ts` uses public `mutation` (exposes login rate limiter to direct client invocation) | CRITICAL | Converted both `checkAndIncrementLoginRateLimit` and `cleanupStaleLoginRateLimits` to `internalMutation` |
| BM2 login route uses `as any` + `?.` optional chaining — rate limit silently bypassed | HIGH | Replaced with proper `internal.loginRateLimits.checkAndIncrementLoginRateLimit` reference; removed `as any` and optional chaining |
| BM2 lesson-chatbot route uses `as any` for rateLimits | HIGH | Replaced with proper `internal.rateLimits.checkAndIncrementRateLimit`; typed `userId` as `Id<"profiles">` |
| BM2 `loginRateLimits.ts` no concurrent insert handling | HIGH | Added try/catch upsert pattern around `ctx.db.insert` |
| BM2 `loginRateLimits.ts` no violation logging | MEDIUM | Added `console.error` JSON logging on login rate limit exceeded |
| BM2 `loginRateLimits.ts` cleanup uses `.collect()` | MEDIUM | Changed to `.filter().take(100)` for scalability |
| `srsRatingValidator` missing — `rating` is `v.string()` everywhere | CRITICAL | Added `srsRatingValidator` (union of 4 FSRS literals) to `validators.ts`; applied in schema.ts, reviews.ts, processReview.ts |
| `srsCardStateLiteralValidator` missing — 5 copies of state union | HIGH | Added `srsCardStateLiteralValidator` to `validators.ts`; replaced inline unions in schema.ts, cards.ts, processReview.ts |
| `reviews.ts` uses `v.string()` for `cardId`/`studentId` with `as Id<>` casts | HIGH | Changed to `v.id("srs_cards")` / `v.id("profiles")`; removed unsafe casts |
| `reviews.ts` `reviewId`/`submissionId` required but optional in schema | MEDIUM | Changed to `v.optional(v.string())`; removed `|| undefined` workarounds |
| `processReview.ts` same `reviewId`/`submissionId` mismatch | MEDIUM | Changed to `v.optional(v.string())`; updated `ProcessReviewArgs` type |
| `srs_mutations.ts` uses `"manual_reset"` as rating — not a valid FSRS value | HIGH | Changed to `"Again"` |
| `convexReviewLogStore.ts` string vs Id type mismatch | HIGH | Added `as Id<>` casts for cardId/studentId bridging |
| IM3 `rateLimits.ts` unnecessary `ctx.db.get(args.userId)` | LOW | Removed; use `args.userId` directly |
| IM3/BM2 `rateLimits.ts` remaining not clamped on early-return paths | LOW | Added `Math.max(0, ...)` on all `remaining` computations |
| BM2 `apiRateLimits.ts` remaining not clamped on early-return paths | LOW | Added `Math.max(0, ...)` on all `remaining` computations |
| BM2 `.env.example` missing 13+ env vars | CRITICAL | Added all missing vars with documentation |
| All 5 app `.env.example` missing `NEXT_PUBLIC_SITE_URL` | MEDIUM | Added to all apps |
| BM2 generated `api.d.ts` missing `loginRateLimits` module | HIGH | Added import and module entry |
| Reviews test missing `stateBefore`/`stateAfter` assertions | HIGH | Added equality assertions for both state objects |
| Reviews test uses empty string for optional fields | MEDIUM | Changed to omit optional fields entirely |

### Issues Found (Deferred)

| Issue | Severity | Notes |
|-------|----------|-------|
| No unique constraints on any rate limit table | HIGH | Convex indexes aren't unique; try/catch upsert handles concurrent inserts but duplicates can still be created under high concurrency |
| Rate limiters duplicated across IM3 and BM2 | MEDIUM | Same logic diverges in error-prone ways; should extract to shared package |
| No test coverage for IM3 rateLimits.ts or BM2 rateLimits.ts (chatbot) | MEDIUM | Only apiRateLimits.ts and loginRateLimits.ts have tests |
| srs_reviews.ts: NaN on invalid reviewedAt date string | HIGH | `new Date(invalid).getTime()` returns NaN — silently stored in DB |
| getReviewsByStudent filters by `since` in JS instead of using index | MEDIUM | `by_reviewed_at` index exists but unused; should add compound index |
| 16 v.any() fields remain in IM3 schema | MEDIUM | Priority: submissionData, props, content, config |
| BM2 apiRateLimits endpoint arg is v.string() with unsafe cast | MEDIUM | Typos in endpoint name silently bypass rate limiting |
| BM2 `formatRateLimitError` constructs HTTP Response in Convex module | LOW | Should move to Next.js utility |
