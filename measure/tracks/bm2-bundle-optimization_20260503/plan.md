# Plan: BM2 Worker-Entry Bundle Optimization

## Phase 1: Analysis and Baseline [ ]

- [ ] Write test: CI bundle size check script exits non-zero if worker-entry > 5 MB
- [ ] Run `npx wrangler deploy --dry-run --outdir=.worker-analysis` to capture bundle
- [ ] Profile bundle with `npx source-map-explorer` or `wrangler minify` analysis
- [ ] Document top 10 largest contributors and their sizes
- [ ] Establish baseline size metric for regression comparison

## Phase 2: Tree-Shaking and Import Cleanup [ ]

- [ ] Write test: shared packages export only consumed symbols (barrel audit)
- [ ] Audit `@math-platform/practice-core`, `@math-platform/srs-engine`, `@math-platform/ai-tutoring` for unused exports
- [ ] Replace barrel re-exports with direct path imports in BM2
- [ ] Remove dead code paths in BM2 lib/ modules
- [ ] Verify bundle size reduction after each package cleanup

## Phase 3: Dynamic Imports [ ]

- [ ] Write test: AI tutoring route is not included in initial chunk
- [ ] Write test: workbook pipeline route is not included in initial chunk
- [ ] Lazy-load `app/(dashboard)/ai-tutoring/**` with `next/dynamic`
- [ ] Lazy-load `app/(dashboard)/workbooks/**` with `next/dynamic`
- [ ] Lazy-load study hub games routes with `next/dynamic`
- [ ] Verify lazy-loaded routes still function correctly

## Phase 4: Duplicate Dependency Dedup [ ]

- [ ] Write test: single instance of React, Convex, Zod in bundle
- [ ] Run `npx depcheck` and `npm ls react` to find duplicate instances
- [ ] Add `overrides` or `resolutions` in root package.json if duplicates found
- [ ] Verify Convex client singleton is not duplicated across packages

## Phase 5: Verification and Handoff [ ]

- [ ] Verify worker-entry bundle under 3 MB target
- [ ] Run full BM2 test suite — all tests pass
- [ ] Run `npm run lint` — no errors
- [ ] Deploy to Cloudflare preview — verify no runtime regressions
- [ ] Document findings in tech-debt.md
- [ ] Handoff
