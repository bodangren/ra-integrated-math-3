# Current Directive

> Updated: 2026-04-24 (Code review #21 — audit of tech-debt triage Phases 1-6, fixes for deploy config, teacher.ts crash, governance tests)

## Mission

Monorepo migration complete (Waves 0-6). All major feature tracks done. Current focus: tech debt reduction (Phase 7 in-progress, Phase 8 pending), then new feature development.

## Priority Order (Execute In This Order)

1. **Monorepo tech-debt triage Phase 7** — UI & Minor Items: SubmissionDetailModal React key, StepByStepper flaky test, versionByLessonId first-version, Convex types regeneration
2. **Monorepo tech-debt triage Phase 8** — Tech Debt Registry Cleanup & Final Verification: prune tech-debt.md, full monorepo health check
3. **getTeacherClassProficiencyHandler N+1** — S*O*3 queries (~1800 for 30S/20O); pre-fetch problem_families, baselines, submissions outside loops
4. **SRS dashboard.ts + reviews.ts test coverage** — streak calculation and review persistence have zero tests
5. **BM2 rate limiting track** — 5 endpoints lack rate limiting (track created, pending)
6. **N+1 queries in public.ts** — lesson_versions queried per lesson in getCurriculum and getUnitSummaries
7. **Convex generated types stale** — 5 production `as any` casts; run `npx convex dev` to regenerate
8. **RSC bundle optimization** — page chunk 785 KB; vendor-charts 830 KB; needs further code-splitting
9. **SRS engine studentId type alignment** — Package defines `studentId: string` but Convex uses `Id<"profiles">`; 7 bridging casts
10. **Equivalence checker negative leading coefficients** — factoredPattern4 regex can't match `(-2x+3)(x+1)`
11. **Convex schema strict validation track** — 21 v.any() fields + 5 as any casts (track created, pending)
12. **BM2 governance test re-enablement** — 9 skipped suites need monorepo-aware path fixes

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
- [x] Review #11-18 fixes (all security, auth, SRS, N+1, objectiveIds fixes)
- [x] CI: Remove BM2 double-silencing (removed `|| true`; `continue-on-error` preserved)
- [x] Lazy-load activity components + Suspense boundaries (registry.ts, ActivityRenderer.tsx)
- [x] Bundle-size CI audit step added to workflow
- [x] Tech-debt triage Phases 1-6 complete (BM2 TS, SRS correctness, N+1, CI/CD, packages, AI tutoring)
- [x] Cloudflare deploy: fix partial npm install to root-level npm ci
- [x] teacher.ts: fix concurrent array mutation and empty activityIds crash
- [x] BM2 governance tests: add TODO(monorepo) comments to 9 skipped suites
- [ ] Monorepo tech-debt triage Phase 7 (UI & Minor Items)
- [ ] Monorepo tech-debt triage Phase 8 (Final Verification)
- [ ] getTeacherClassProficiencyHandler N+1 (S*O*3 queries)
- [x] N+1 queries: public.ts lesson_versions per-lesson fetch
- [ ] SRS engine studentId type alignment (string → branded type)
- [ ] Convex generated types regeneration
- [ ] RSC bundle: page chunk 785 KB → < 500 KB
- [ ] BM2 9 governance tests re-enablement

## Code Review Summary (2026-04-23 — Review #16)

Full monorepo audit covering the last 6 work phases (monorepo-repair, hyphenated module rename, harden-test-suite, high-priority tech debt, security audit review-14/15, tech-debt triage track).

### Verification Results

| Check | Result |
|-------|--------|
| Typecheck (IM3) | Pass (0 errors) |
| Typecheck (BM2) | Pass (0 errors) |
| Lint (IM3) | Pass (0 warnings) |
| Tests (IM3) | 3293 passed, 6 todo |
| Build (IM3) | Pass |

### Issues Fixed in This Review

| Issue | Severity | Fix |
|-------|----------|-----|
| lesson-title-consistency.test.ts regex matches old hyphenated filenames — passes vacuously | HIGH | Updated 3 regex patterns from `seed-lesson-` to `seed_lesson_` to match renamed Convex modules |

### Code Review Summary (2026-04-23 — Review #17)

Post-extraction import audit covering SRS module migration, BM2 auth hardening, and track metadata reconciliation.

### Verification Results

| Check | Result |
|-------|--------|
| Typecheck (IM3) | Pass (0 errors) |
| Typecheck (BM2) | Pass (0 errors) |
| Lint (IM3) | Pass (0 warnings) |
| Tests (IM3) | 3223 passed, 6 todo (266 test files) |
| Build (IM3) | Pass |

### Issues Fixed in This Review (Review #17)

| Issue | Severity | Fix |
|-------|----------|-----|
| SRS extraction left 14 dangling imports in Convex files and components | CRITICAL | Added exports to packages/srs-engine/src/index.ts; rewired all imports to @math-platform/srs-engine |
| BM2 auth routes used `!claims` check but requireActive* returns `SessionClaims \| Response` | HIGH | Changed to `instanceof Response` pattern in all 8 BM2 API routes |
| BM2 test files passed plain Request where NextRequest expected | MEDIUM | Added NextRequest type casts in test helpers |
| SRS test files string studentId vs Id<"profiles"> type mismatch | MEDIUM | Added Id<"profiles"> casts in cards.test.ts and processReview.test.ts |
| Track metadata drift (3/6 tracks had wrong status) | LOW | Updated bm2-deactivated-user-access and monorepo-tech-debt-triage metadata |

### Issues Found (Deferred)

| Issue | Severity | Notes |
|-------|----------|-------|
| BM2 CI double-silencing (continue-on-error + || true) | Medium | BM2 job has job-level `continue-on-error: true` AND step-level `|| true` on 4 steps; failures completely hidden |
| 7 BM2 endpoints allow deactivated-user access | High | Need requireActive*SessionClaims |
| BM2 chatbot sanitizeInput too weak for prompt injection | Medium | Needs system prompt guard or LLM filter |
| 5 BM2 endpoints lack rate limiting | Medium | phases/complete, assessment, activities, error-summary, ai-error-summary |
| 21 `v.any()` fields in IM3 Convex schema | Medium | Incrementally add Zod schemas |
| N+1 queries: phase sections + teacher SRS | High | One DB query per phase; teacher handlers iterate students + collect |
| RSC entry chunk 750 KB | Medium | Code-splitting needed to get under 500 KB |

### Code Review Summary (2026-04-23 — Review #18)

Full code audit covering the last 6 work phases (BM2 deactivated-user access, tech debt triage Phases 1-3, N+1 query performance, SRS correctness).

### Verification Results

| Check | Result |
|-------|--------|
| Typecheck (IM3) | Pass (0 errors) |
| Typecheck (BM2) | Pass (0 errors) |
| Lint (IM3) | Pass (0 warnings) |
| Tests (IM3) | 3223 passed, 6 todo (266 test files) |
| Tests (BM2) | 2293 passed, 35 skipped (339 test files) |
| Build (IM3) | Pass |
| Build (BM2) | Pass |

### Issues Fixed in This Review (Review #18)

| Issue | Severity | Fix |
|-------|----------|-----|
| objectiveIds array index query: eq() passed array instead of element — returned 0 results | CRITICAL | Removed `as unknown as string[]` cast; Convex multi-entry array index expects single element. Fixed in objectiveProficiency.ts (2 locations) and srs_mutations.ts (1 location) |

### Issues Found (Deferred)

| Issue | Severity | Notes |
|-------|----------|-------|
| SRS dashboard.ts streak calc untested | High | Non-trivial logic with zero test coverage |
| SRS reviews.ts untested | Medium | saveReview, getReviewsByCard, getReviewsByStudent — no tests |
| isStudentEnrolledInClassForLesson N+1 | Medium | 2 sequential queries per enrollment in loop; batch with Promise.all |
| 40+ seed lesson tests vacuous | Low | Test hardcoded data against itself; convert to data-driven validator |

### Code Review Summary (2026-04-24 — Review #19)

Post-Phase-4 audit covering tech debt triage Phases 1-4 (BM2 TS fix, SRS correctness, N+1 perf, CI/CD hardening) plus lazy-loading, Suspense boundaries, and bundle-size CI.

### Verification Results

| Check | Result |
|-------|--------|
| Typecheck (IM3) | Pass (0 errors) |
| Lint (IM3) | Pass (0 warnings) |
| Tests (IM3) | 3226 passed, 6 todo (266 test files) |
| Build (IM3) | Pass (6.54s) |

### Issues Fixed in This Review (Review #19)

| Issue | Severity | Fix |
|-------|----------|-----|
| `readFileSync` unused import in bundle-size-audit.mjs | LOW | Removed unused import |
| Dead ternary branch in bundle-size-audit.mjs findFiles | LOW | Simplified to direct string ops |
| Orphaned check-bundle-size.mjs (not referenced anywhere) | LOW | Deleted file |
| registry.ts: rate-of-change-calculator registered twice (placeholder + real) | LOW | Removed from PLACEHOLDER_KEYS; renamed constant |

### Issues Found (Deferred)

| Issue | Severity | Notes |
|-------|----------|-------|
| N+1: lesson_versions per-lesson in public.ts getCurriculum | Medium | Fetch all versions upfront, build map |
| N+1: class_lessons per-enrollment in student.ts isStudentEnrolledInClassForLesson | Medium | 2 sequential queries per loop iteration |
| N+1: saveCards loop in srs/cards.ts | Medium | Query+write per card; batch queries |
| Auth: internal Convex functions rely on action wrapper for auth | Medium | Architectural pattern; defense-in-depth missing |
| error.message returned from seed.ts internal mutations | Low | 13 locations; internal-only risk |
| Page chunk 785 KB, vendor-charts 830 KB | Medium | Further code-splitting needed |
| CI: inconsistent --prefix vs --workspace vs cd && patterns | Low | Cosmetic; works but confusing |

### Code Review Summary (2026-04-24 — Review #21)

Comprehensive audit of tech-debt triage Phases 1-6 (BM2 TS fix, SRS correctness, N+1 perf, CI/CD hardening, package quality, AI tutoring quality). Also reviewed 3 newly-created pending tracks.

### Verification Results

| Check | Result |
|-------|--------|
| Typecheck (IM3) | Pass (0 errors) |
| Typecheck (BM2) | Pass (app code; pre-existing test-file readonly errors) |
| Lint (IM3) | Pass (0 warnings) |
| Lint (BM2) | Pass (0 warnings) |
| Tests (IM3) | 3230 passed, 2 todo (266 test files) |
| Tests (BM2) | 2293 passed, 35 skipped (339 test files) |
| Tests (packages) | All 11 packages pass (495 tests total) |
| Build (IM3) | Pass (24.29s) |
| Build (BM2) | Pass (10.29s) |

### Issues Fixed in This Review (Review #21)

| Issue | Severity | Fix |
|-------|----------|-----|
| teacher.ts getLessonErrorSummary: activityIds[0] undefined crash when activityIds empty | HIGH | Added early return guard; flattened to single Promise.all over all activityIds |
| teacher.ts getLessonErrorSummary: concurrent mutation of shared array in Promise.all | MEDIUM | Replaced with filter/map pattern returning null for non-matching |
| cloudflare-deploy.yml: `npm ci --prefix` misses workspace deps | MEDIUM | Changed to root-level `npm ci` |
| 9 BM2 governance test suites skipped without explanation | MEDIUM | Added `TODO(monorepo)` comments documenting why each is skipped |

### Issues Found (Deferred)

| Issue | Severity | Notes |
|-------|----------|-------|
| getTeacherClassProficiencyHandler: S*O*3 queries (~1800 for 30S/20O) | High | Pre-fetch problem_families, baselines, submissions outside loops |
| getDueCards: fetches all cards then filters by date in-memory | Medium | by_student_and_due index has dueDate but no range query |
| Session history: fetches all then paginates client-side | Medium | Use Convex cursor pagination |
| equivalence.ts: factoredPattern4 can't match negative leading coefficients | Medium | (\d*\.?\d*) groups miss `-` prefix |
| SRS dashboard.ts streak calc: zero test coverage | High | Non-trivial logic needs tests |
| Rate limiting track modifies BM2 (violates AGENTS.md scope) | Medium | Needs scope decision |
| BM2 governance tests: all need monorepo-aware path fixes | Medium | TODO comments added; actual fixes deferred
