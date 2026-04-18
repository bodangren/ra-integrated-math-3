# Implementation Plan: BM2 Consume Core Packages

> Execution detail packet: see `conductor/monorepo-jr-execution-spec.md`, section `bm2-consume-core-packages_20260417`.

## Phase 1: Practice and SRS Adoption

### Tasks

- [x] **Task: Migrate BM2 practice imports**
  - [x] Replace BM2 practice primitive imports with `@math-platform/practice-core`.
  - [x] Resolve compile/test breakages.
  - [x] Keep `lib/practice/engine` local and untouched.

- [ ] **Task: Migrate BM2 SRS imports**
  - [ ] Replace BM2 SRS engine imports with `@math-platform/srs-engine`.
  - [ ] Preserve BM2-only analytics/answer input mappings locally if not yet packaged.
  - [ ] Run SRS-focused tests.

- [ ] **Task: Conductor - User Manual Verification 'Phase 1: Practice and SRS Adoption' (Protocol in workflow.md)**

> **Note:** SRS migration is blocked by contract incompatibility. BM2's SRS implementation uses a legacy card state (`card: Record<string, unknown>`, numeric timestamps) while the package uses FSRS-aligned types (`stability`, `difficulty`, `state`, ISO string timestamps). This requires a larger refactoring effort.

## Phase 2: Auth and Convex Adoption

### Tasks

- [x] **Task: Migrate BM2 auth imports**
  - [x] Replace shared auth helper imports with `@math-platform/core-auth`.
  - [x] Validate session revocation and role guard behavior.
  - [x] Run auth route tests.

- [ ] **Task: Migrate BM2 Convex wrapper imports**
  - [ ] Replace shared convex wrapper imports with `@math-platform/core-convex`.
  - [ ] Keep Supabase compatibility helpers app-local.
  - [ ] Run API route and wrapper tests.

- [ ] **Task: Conductor - User Manual Verification 'Phase 2: Auth and Convex Adoption' (Protocol in workflow.md)**

> **Note:** Auth migration partial complete. Middleware and basic session functions migrated. `lib/auth/server.ts` remains local (BM2-specific Convex integration). Phase 2 Convex migration is a larger effort due to app-specific query patterns.

## Phase 3: Cleanup and Verification

### Tasks

- [ ] **Task: Prune duplicate local core modules**
  - [ ] Delete or deprecate duplicated local modules replaced by packages.
  - [ ] Keep temporary shims only if required and documented.
  - [ ] Update docs/import examples.

- [ ] **Task: Run full BM2 verification**
  - [ ] Run BM2 lint/test/build/typecheck.
  - [ ] Run root multi-app command checks.
  - [ ] Publish adoption completion report.

- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Cleanup and Verification' (Protocol in workflow.md)**
