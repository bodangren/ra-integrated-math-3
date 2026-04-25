# Implementation Plan: Extract Workbook Pipeline Package and Adopt in IM3

> Execution detail packet: see `measure/monorepo-jr-execution-spec.md`, section `extract-workbook-pipeline-and-adopt-im3_20260417`.

## Phase 1: Extract BM2 Workbook Pipeline Primitives

### Tasks

- [x] **Task: Create `packages/workbook-pipeline`**
  - [x] Scaffold package and exports.
  - [x] Port manifest generation/parsing/path resolver/client lookup helpers.
  - [x] Add package tests for filename parsing and traversal protection.

- [x] **Task: Define app-local asset integration contract**
  - [x] Document required asset directory conventions per app.
  - [x] Document route helper usage patterns.
  - [x] Document security constraints for download paths.

- [x] **Task: Measure - User Manual Verification 'Phase 1: Extract BM2 Workbook Pipeline Primitives' (Protocol in workflow.md)**

## Phase 2: BM2 Adoption

### Tasks

- [x] **Task: Migrate BM2 workbook imports**
  - [x] Replace BM2 workbook pipeline helper imports with package imports.
  - [x] Keep BM2 workbook files and route wiring local.
  - [x] Run BM2 workbook route/component tests.

- [x] **Task: Validate BM2 parity**
  - [x] Verify manifest generation output parity.
  - [x] Verify download route behavior parity.
  - [x] Document any compatibility shim.

- [x] **Task: Measure - User Manual Verification 'Phase 2: BM2 Adoption' (Protocol in workflow.md)**

## Phase 3: IM3 Adoption and Completion

### Tasks

- [x] **Task: Implement IM3 workbook system via package**
  - [x] Update IM3 workbook track implementation to use package helpers.
  - [x] Keep IM3 workbook assets local.
  - [x] Add IM3 workbook route/component tests.

- [x] **Task: Run cross-app verification**
  - [x] Run workbook-related tests in both apps.
  - [x] Run both app lint/test/build/typecheck.
  - [x] Mark IM3 workbook deferred track as completed-by-package path.

- [x] **Task: Measure - User Manual Verification 'Phase 3: IM3 Adoption and Completion' (Protocol in workflow.md)**