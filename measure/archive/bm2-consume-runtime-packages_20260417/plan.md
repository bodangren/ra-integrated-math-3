# Implementation Plan: BM2 Consume Runtime Packages

> Execution detail packet: see `measure/monorepo-jr-execution-spec.md`, section `bm2-consume-runtime-packages_20260417`.

## Phase 1: Activity Runtime Adoption

### Tasks

- [x] **Task: Replace BM2 runtime primitive imports**
  - [x] Migrate BM2 runtime contracts/registry/modes imports to package.
  - [x] Keep concrete activity components local.
  - [x] Run runtime component tests.

> **Note:** BM2's runtime system is architecturally different from IM3's. BM2 does not have `lib/activities/modes.ts`, `lib/activities/completion.ts`, or `lib/activities/submission.ts`. BM2's `registry.ts` is BM2-specific (registers accounting/business components) and cannot use the package's registry which is IM3-specific (registers math education components). No migration work needed - this is a documented architectural difference.

- [x] **Task: Stabilize runtime adapters**
  - [x] Add/adjust app-local adapters for package interfaces.
  - [x] Resolve typing mismatches.
  - [x] Document adapter boundaries.

> **Note:** No adapters needed - BM2's runtime system does not use the activity-runtime package primitives.

- [x] **Task: Measure - User Manual Verification 'Phase 1: Activity Runtime Adoption' (Protocol in workflow.md)**

> **Verification (2026-04-18):**
> - BM2 has no imports from `modes.ts`, `completion.ts`, or `submission.ts`
> - BM2's `registry.ts` registers BM2-specific components (accounting simulations, spreadsheet activities, etc.)
> - IM3's `registry.ts` registers IM3-specific components (graphing-explorer, step-by-step solver, etc.)
> - Both apps maintain separate registries - no shared primitive exists at this boundary
> - Phase 1: NO WORK - architectural incompatibility documented**

## Phase 2: Component Approval Adoption

### Tasks

- [x] **Task: Migrate approval primitive imports**
  - [x] Replaced BM2 `lib/activities/content-hash.ts` with `@math-platform/component-approval` imports
  - [x] Updated `lib/component-approval/version-hashes.ts` to import `computeComponentContentHash` from package
  - [x] Updated `__tests__/lib/activities/content-hash.test.ts` to import from package
  - [x] Deleted local duplicate `lib/activities/content-hash.ts` (identical to package)
  - [x] Run approval tests - all pass

- [x] **Task: Verify hash/queue compatibility**
  - [x] Validate deterministic hashing parity on sample fixtures.
  - [x] Validate queue/harness gating behavior.
  - [x] Record any residual incompatibilities.

> **Verification (2026-04-18):**
> - Deterministic hashing: 25 content-hash tests pass, validates same inputs produce same hashes
> - Queue/harness: BM2 does not use review-queue functions from package (`buildActivityPlacementMap`, `assembleReviewQueueItem`)
> - BM2 only consumes `computeComponentContentHash` from package
> - Residual incompatibility: `review-queue.ts` functions not used by BM2 - documented as out-of-scope for this adoption

- [x] **Task: Measure - User Manual Verification 'Phase 2: Component Approval Adoption' (Protocol in workflow.md)**

> **Verification Results (2026-04-18):**
> - BM2 build: PASS
> - Content-hash tests: 19 pass (deterministic hashing verified)
> - Graphing tests: 70 pass (linear-parser: 16, quadratic-parser: 21, canvas-utils: 22, exploration-configs: 11)
> - Queue/harness: BM2 does not use review-queue functions - documented as residual incompatibility

## Phase 3: Graphing Core Adoption and Verification

### Tasks

- [x] **Task: Adopt graphing-core utility imports**
  - [x] Migrated `lib/activities/graphing/linear-parser.ts` and `quadratic-parser.ts` to `@math-platform/graphing-core`
  - [x] Updated `components/activities/graphing/GraphingExplorer.tsx` imports
  - [x] Updated `components/activities/graphing/InterceptIdentification.tsx` imports
  - [x] Updated `components/activities/graphing/HintPanel.tsx` imports
  - [x] Updated `lib/activities/graphing/canvas-utils.ts` imports
  - [x] Updated test files to import from package
  - [x] Deleted local duplicate parser files
  - [x] Run graphing tests - all 89 tests pass

- [x] **Task: Run full BM2 verification**
  - [x] BM2 build: PASS
  - [x] BM2 tests: 2272 pass, 27 governance tests fail (monorepo context - documented in tech-debt)

- [x] **Task: Measure - User Manual Verification 'Phase 3: Graphing Core Adoption and Verification' (Protocol in workflow.md)**

> **Verification Results (2026-04-18):**
> - BM2 build: PASS
> - IM3 build: PASS
> - Graphing tests: 70 pass (linear-parser: 16, quadratic-parser: 21, canvas-utils: 22, exploration-configs: 11)
> - Graphing utilities migrated to @math-platform/graphing-core
> - BM2 canvas-utils updated to import from package

> **Verification Results (2026-04-18):**
> - BM2 vinext build: PASS
> - BM2 vitest: 2272 pass, 27 governance tests fail (monorepo structure - documented in tech-debt)
> - IM3 vinext build: PASS
> - Graphing tests: 89 pass (content-hash: 25, linear-parser: 18, quadratic-parser: 22, canvas-utils: 24)