# Implementation Plan: Extract Graphing Core Package

> Execution detail packet: see `conductor/monorepo-jr-execution-spec.md`, section `extract-graphing-core_20260417`.

## Phase 1: Extract Utility Primitives

### Tasks

- [x] **Task: Create `packages/graphing-core` scaffold**
  - [x] Create package config, exports, and tests.
  - [x] Add parser and coordinate utility exports.
  - [x] Set up baseline parser tests.

- [x] **Task: Port IM3 graphing utility modules**
  - [x] Move linear parser, quadratic parser, and canvas utility logic.
  - [x] Preserve utility signatures and semantics.
  - [x] Add regression tests for key parsing/canvas cases.

- [x] **Task: Conductor - User Manual Verification 'Phase 1: Extract Utility Primitives' (Protocol in workflow.md)**

## Phase 2: Reconcile Deltas

### Tasks

- [x] **Task: Diff BM2 graphing utility equivalents**
  - [x] Classify deltas into required behavior vs domain config.
  - [x] Merge required utility behavior.
  - [x] Exclude BM2 exploration config data from package.

- [x] **Task: Document retained app-local graphing config**
  - [x] List config files that stay in each app.
  - [x] Document package integration boundary for configs.
  - [x] Add notes for BM2 runtime adoption track.

- [x] **Task: Conductor - User Manual Verification 'Phase 2: Reconcile Deltas' (Protocol in workflow.md)** [checkpoint: 834d202]

## Phase 3: IM3 Migration and Verification

### Tasks

- [x] **Task: Migrate IM3 utility imports**
  - [x] Replace IM3 graphing utility imports with package imports.
  - [x] Keep graphing components in app path.
  - [x] Fix compile issues due to module moves.

- [x] **Task: Run graphing verification**
  - [x] Run graphing utility and component tests.
  - [x] Run IM3 lint/test/build/typecheck.
  - [x] Publish final reconciliation summary.

- [x] **Task: Conductor - User Manual Verification 'Phase 3: IM3 Migration and Verification' (Protocol in workflow.md)**
