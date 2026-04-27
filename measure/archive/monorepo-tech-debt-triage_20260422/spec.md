# Spec: Monorepo Tech Debt Triage & Resolution

## Overview

Investigate and resolve all 45 open tech debt items in `measure/tech-debt.md`
to solidify the monorepo migration before moving to new feature work. Each item
will be triaged (confirmed real vs false positive), fixed if needed, or
reclassified/closed. The goal is a clean, stable monorepo with zero high-severity
tech debt.

## Functional Requirements

### FR-1: Triage Protocol
Every tech debt item MUST go through:
1. **Investigate** — Confirm the item is real and still relevant
2. **Classify** — Valid fix needed / Already resolved / Won't fix (with reason) / Reprioritized
3. **Fix** — If valid, implement the minimal correct fix with tests
4. **Close** — Update `tech-debt.md` status to `Resolved` or remove with reason documented

### FR-2: Phase Grouping
Items are grouped into phases by area for focused execution:

- **Phase 1: BM2 TypeScript & Runtime Correctness** (7 items)
  - BM2 fetchInternalQuery untyped unknown (~130 TS errors)
  - BM2 convex/activities.ts calls non-existent ctx.transaction()
  - BM2 CashFlowChallenge type drift (~31 TS errors)
  - BM2 lib/auth ~250 lines duplicated from core-auth
  - BM2 lib/practice ~1305 lines duplicated from practice-core
  - BM2 governance tests fail in monorepo context (27 tests)
  - BM2 296 TypeScript errors (superset of above)

- **Phase 2: SRS & Practice Correctness** (8 items)
  - SRS sessions: by_student_and_status undefined sorting
  - SRS CardStore: studentId type mismatch
  - SRS: card + review log saved non-atomically
  - Misconception tags not persisted in review evidence
  - Misconception summary fetches ALL reviews before date filter
  - Approval status race condition (no version/lock)
  - practice-core dual schema files
  - objective-proficiency.ts + objective-policy.ts unmigrated

- **Phase 3: N+1 Query Performance** (2 items)
  - Phase sections N+1 in progress/preview/monitoring queries
  - Teacher SRS queries N+1 per-student unbounded .collect()

- **Phase 4: CI/CD & Deployment Hardening** (4 items)
  - CI: package test/lint continue-on-error swallows failures
  - CI: BM2 redundant || true + continue-on-error
  - Cloudflare deploys to production on every push
  - RSC entry chunk 750 KB

- **Phase 5: Package Quality & Consistency** (4 items)
  - 5 packages missing vitest.config files
  - teacher-reporting-core .js import inconsistency
  - IM3 lib/study not wired to study-hub-core types
  - Equivalence checker: 6 aspirational .todo tests

- **Phase 6: AI Tutoring & Workbook Quality** (4 items)
  - ai-tutoring: resolveOpenRouterProviderFromEnv untested
  - ai-tutoring: as any cast in providers.ts
  - workbook-pipeline: capstone filename hardcoded to BM2 domain
  - workbook-pipeline: workbooks.client.ts double-cast

- **Phase 7: UI & Minor Items** (4 items)
  - SubmissionDetailModal: array index as React key
  - StepByStepper-guided hint tracking test flaky
  - teacher-reporting: versionByLessonId picks first silently
  - IM3 Convex types stale

- **Phase 8: Tech Debt Registry Cleanup**
  - Prune resolved items, ensure all open items have accurate severity
  - Final verification: `npm run lint`, `npm run test`, `npx tsc --noEmit` pass for both apps

## Non-Functional Requirements

### NFR-1: No Regressions
Every fix must include a test. No fix should break existing passing tests.

### NFR-2: Minimal Scope
Each fix should be the minimal correct change. No refactoring tangents.

### NFR-3: Documentation
Items that are "won't fix" must have the reason documented in the tech debt
registry or removed entirely.

## Acceptance Criteria

1. All 45 items triaged: each classified as Fixed, Already Resolved, Won't Fix,
   or Reprioritized
2. All "Fixed" items have corresponding test coverage
3. `npm run lint` passes for both apps
4. `npm run test` passes for both apps and all packages
5. `npx tsc --noEmit` passes for IM3; BM2 TS error count reduced to <50
6. `tech-debt.md` updated: resolved items marked, won't-fix items documented
7. No high-severity items remain that block monorepo stability

## Out of Scope

- New feature development
- Performance optimization beyond fixing N+1 queries
- UI/UX changes beyond bug fixes
- Adding new packages to the monorepo
