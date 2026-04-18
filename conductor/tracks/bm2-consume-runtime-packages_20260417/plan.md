# Implementation Plan: BM2 Consume Runtime Packages

> Execution detail packet: see `conductor/monorepo-jr-execution-spec.md`, section `bm2-consume-runtime-packages_20260417`.

## Phase 1: Activity Runtime Adoption

### Tasks

- [ ] **Task: Replace BM2 runtime primitive imports**
  - [ ] Migrate BM2 runtime contracts/registry/modes imports to package.
  - [ ] Keep concrete activity components local.
  - [ ] Run runtime component tests.

- [ ] **Task: Stabilize runtime adapters**
  - [ ] Add/adjust app-local adapters for package interfaces.
  - [ ] Resolve typing mismatches.
  - [ ] Document adapter boundaries.

- [ ] **Task: Conductor - User Manual Verification 'Phase 1: Activity Runtime Adoption' (Protocol in workflow.md)**

## Phase 2: Component Approval Adoption

### Tasks

- [x] **Task: Migrate approval primitive imports**
  - [x] Replaced BM2 `lib/activities/content-hash.ts` with `@math-platform/component-approval` imports
  - [x] Updated `lib/component-approval/version-hashes.ts` to import `computeComponentContentHash` from package
  - [x] Updated `__tests__/lib/activities/content-hash.test.ts` to import from package
  - [x] Deleted local duplicate `lib/activities/content-hash.ts` (identical to package)
  - [x] Run approval tests - all pass

- [ ] **Task: Verify hash/queue compatibility**
  - [ ] Validate deterministic hashing parity on sample fixtures.
  - [ ] Validate queue/harness gating behavior.
  - [ ] Record any residual incompatibilities.

- [ ] **Task: Conductor - User Manual Verification 'Phase 2: Component Approval Adoption' (Protocol in workflow.md)**

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

- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Graphing Core Adoption and Verification' (Protocol in workflow.md)**

> **Verification Results (2026-04-18):**
> - BM2 vinext build: PASS
> - BM2 vitest: 2272 pass, 27 governance tests fail (monorepo structure - documented in tech-debt)
> - IM3 vinext build: PASS
> - Graphing tests: 89 pass (content-hash: 25, linear-parser: 18, quadratic-parser: 22, canvas-utils: 24)