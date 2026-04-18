# Implementation Plan: Monorepo Docs and Cleanup

> Execution detail packet: see `conductor/monorepo-jr-execution-spec.md`, section `monorepo-docs-and-cleanup_20260417`.

## Phase 1: Author Final Documentation

### Tasks

- [x] **Task: Write root integration documentation**
  - [x] Create/finish `INTEGRATION.md` with package creation/adoption flow.
  - [x] Document app-specific deploy/Convex commands.
  - [x] Document boundary rules and review checklist.

- [x] **Task: Write package authoring template docs**
  - [x] Document required file layout for new packages.
  - [x] Provide import/export conventions.
  - [x] Provide testing requirements per package change.

- [x] **Task: Conductor - User Manual Verification 'Phase 1: Author Final Documentation' (Protocol in workflow.md)**

## Phase 2: Remove Migration Residue

> Validation scans confirm no stale imports or path references exist.
> No shims, deprecated paths, or duplicate modules found.
> Ownership map is documented in INTEGRATION.md.

### Tasks

- [x] **Task: Remove temporary shims and deprecated paths**
  - [x] Find and remove temporary compatibility shims. (None found)
  - [x] Replace stale old-root path references in code/docs/scripts. (None found)
  - [x] Run search checks for stale patterns. (Clean)

- [x] **Task: Finalize ownership mapping**
  - [x] Create clear map of package-owned vs app-owned modules. (In INTEGRATION.md)
  - [x] Document BM2 domain modules that must remain local. (In INTEGRATION.md)
  - [x] Link ownership map from monorepo docs. (In INTEGRATION.md)

- [x] **Task: Conductor - User Manual Verification 'Phase 2: Remove Migration Residue' (Protocol in workflow.md)**

## Phase 3: Final Validation and Handoff

### Tasks

- [x] **Task: Run final cross-repo verification**
  - [x] Run both app lint/test/build/typecheck. (IM3: PASS; BM2: build PASS, tests have 27 pre-existing failures)
  - [x] Run root CI command fanout locally.
  - [x] Confirm boundary guards and docs references pass checks.

- [x] **Task: Publish final migration closeout**
  - [x] Summarize delivered tracks and remaining known issues.
  - [x] Link all monorepo track artifacts.
  - [x] Mark migration program complete in tracks registry.

- [x] **Task: Conductor - User Manual Verification 'Phase 3: Final Validation and Handoff' (Protocol in workflow.md)

## Closeout Summary (2026-04-19)

### Delivered
- Root `INTEGRATION.md` covering: monorepo structure, package creation, app adoption, boundary rules, local dev, testing, Convex projects, deployment, ownership map
- Updated `packages/_template/README.md` with package authoring guide
- Validation scans confirm no stale imports or path references
- No migration shims found (none needed)

### Known Issues
- BM2: 27 pre-existing test failures (deferred, per current_directive.md)
- BM2: No lint script configured
- BM2: 296 TypeScript errors (deferred type health sweep)

### Migration Program Status
All Wave 6 tracks complete. Monorepo migration fully transitioned from extraction phase to maintenance phase.**
