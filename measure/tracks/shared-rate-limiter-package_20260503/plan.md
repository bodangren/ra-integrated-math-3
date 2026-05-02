# Plan: Extract Shared Rate Limiter Package

## Phase 1: Package Scaffold and Core Logic [ ]

- [ ] Write test: `checkRateLimit` returns allowed=true when under limit
- [ ] Write test: `checkRateLimit` returns allowed=false when over limit
- [ ] Write test: `getRateLimitStatus` returns current count and reset time
- [ ] Write test: `cleanupStaleEntries` removes entries older than maxAge
- [ ] Create `packages/rate-limiter/` with package.json, tsconfig.json
- [ ] Extract core sliding-window logic from IM3 `lib/rate-limits.ts`
- [ ] Define `RateLimitAdapter` interface for Convex table operations
- [ ] Implement `checkRateLimit`, `getRateLimitStatus`, `cleanupStaleEntries`

## Phase 2: Convex Adapter and Integration [ ]

- [ ] Write test: IM3 adapter correctly delegates to Convex mutations
- [ ] Write test: BM2 adapter correctly delegates to Convex mutations
- [ ] Create IM3 Convex adapter in `apps/integrated-math-3/lib/rate-limits/adapter.ts`
- [ ] Create BM2 Convex adapter in `apps/bus-math-v2/lib/rate-limits/adapter.ts`
- [ ] Wire adapters to existing Convex `apiRateLimits` table
- [ ] Verify adapter interface handles concurrent inserts correctly (try/catch upsert)

## Phase 3: App Migration [ ]

- [ ] Write test: IM3 rate limiter endpoints still function after migration
- [ ] Write test: BM2 rate limiter endpoints still function after migration
- [ ] Update IM3 `lib/rate-limits.ts` to re-export from `@math-platform/rate-limiter`
- [ ] Update BM2 `lib/rate-limits.ts` to re-export from `@math-platform/rate-limiter`
- [ ] Remove duplicated logic from both apps
- [ ] Run `npx tsc --noEmit` in both apps — no type errors

## Phase 4: BM2 Test Coverage [ ]

- [ ] Write tests for BM2 `rateLimits.ts` — `checkAndIncrementRateLimit`, `getRateLimitStatus`, `cleanupStaleRateLimits`
- [ ] Port IM3 rate limiter test patterns to BM2
- [ ] Verify BM2 rate limiter handlers pass with shared package
- [ ] Target: 20+ total tests across package and app-level adapters

## Phase 5: Verification and Handoff [ ]

- [ ] Run full IM3 test suite — all tests pass
- [ ] Run full BM2 test suite — all tests pass
- [ ] Run `npm run lint` in both apps — no errors
- [ ] Verify no behavioral changes in rate limiting endpoints
- [ ] Update tech-debt.md — mark rate limiter duplication as Resolved
- [ ] Document package API in README.md
- [ ] Handoff
