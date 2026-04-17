# Implementation Plan: Monorepo Readiness Gate

> Execution detail packet: see `conductor/monorepo-jr-execution-spec.md`, section `monorepo-readiness_20260417`.

## Phase 1: Audit and Triage

### Tasks

- [x] **Task: Capture current git state for both repos**
  - [x] Run `git status --short` in IM3 and BM2 and paste results into `reconciliation-notes.md`.
  - [x] For each changed path, assign an action: complete now, defer intentionally, or stash.
  - [x] Record owner and target track for each deferred item.

- [x] **Task: Identify hard blockers for structural migration**
  - [x] Mark any in-flight changes under `conductor/`, CI config, path alias files, or app root folders as blockers.
  - [x] Create a one-page blocker table with clear unblock condition.
  - [x] Confirm no blocker is ambiguous or unowned.

- [x] **Task: Conductor - User Manual Verification 'Phase 1: Audit and Triage' (Protocol in workflow.md)**

**Phase 1 Status:** COMPLETE
**Artifacts Created:**
- `conductor/tracks/monorepo-readiness_20260417/reconciliation-notes.md`
- `conductor/monorepo-migration-index.md`

## Phase 2: Tooling and Governance Decision

### Tasks

- [ ] **Task: Record approved workspace toolchain**
  - [ ] Document chosen package manager/workspace strategy.
  - [ ] List required root config files and command examples.
  - [ ] State why alternatives were not chosen for this migration.

- [ ] **Task: Define branch and rollback protocol**
  - [ ] Set branch naming convention for migration tracks.
  - [ ] Define checkpoint cadence for large moves.
  - [ ] Document rollback command sequence for failed move tracks.

- [ ] **Task: Conductor - User Manual Verification 'Phase 2: Tooling and Governance Decision' (Protocol in workflow.md)**

## Phase 3: Conductor Control Artifacts

### Tasks

- [ ] **Task: Create migration index and dependency checklist**
  - [ ] Create migration index doc listing all monorepo tracks and dependencies.
  - [ ] Link this track and the monorepo plan/playbook.
  - [ ] Add status placeholders for each track.

- [ ] **Task: Baseline verification and handoff**
  - [ ] Verify no source-tree move occurred in this track.
  - [ ] Run `npm run lint` and `npm run test` in IM3 to ensure baseline remains stable.
  - [ ] Summarize blockers cleared and blockers remaining.

- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Conductor Control Artifacts' (Protocol in workflow.md)**
