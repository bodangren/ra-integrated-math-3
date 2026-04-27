# Implementation Plan: Extract Teacher Reporting Core Package

> Execution detail packet: see `measure/monorepo-jr-execution-spec.md`, section `extract-teacher-reporting-core_20260417`.

## Phase 1: Pure Logic Extraction

### Tasks

- [x] **Task: Create `packages/teacher-reporting-core`**
  - [x] Scaffold package and exports.
  - [x] Define reporting helper interfaces.
  - [x] Add baseline helper tests.

- [x] **Task: Extract gradebook/overview/heatmap pure helpers**
  - [x] Port pure helper functions and transformers.
  - [x] Strip backend or app routing assumptions.
  - [x] Add regression tests for helper outputs.

- [x] **Task: Measure - User Manual Verification 'Phase 1: Pure Logic Extraction' (Protocol in workflow.md)****

## Phase 2: Package Adoption in IM3 and BM2

### Tasks

- [x] **Task: Adopt package in IM3 (full adoption)**
  - [x] Update all imports from `@/lib/teacher/*` to `@math-platform/teacher-reporting-core`
  - [x] Delete local gradebook.ts, course-overview.ts, competency-heatmap.ts
  - [x] Convert gradebook-export.ts to re-export shim (keeps downloadGradebookCsv local)
  - [x] Run typecheck/build/tests — all pass

- [x] **Task: Adopt package in BM2 (partial adoption)**
  - [x] Update imports for course-overview and competency-heatmap to use package
  - [x] Keep lib/teacher/gradebook.ts local — BM2-specific wider GradebookCell interface
  - [x] Run build — PASS

- [x] **Task: Measure - User Manual Verification 'Phase 2: Package Adoption' (Protocol in workflow.md)**

### Note
Phase 2 in the original plan was labeled "UI Primitive Extraction" but the actual work was package adoption.
Phase 2 (UI Primitive Extraction) remains open for future work.

## Phase 3: Adoption and Verification

### Tasks

- [ ] **Task: Adopt package in IM3 and BM2**
  - [ ] Replace shared reporting helper imports in both apps.
  - [ ] Keep app query handlers local.
  - [ ] Fix type mismatches.

- [ ] **Task: Run reporting verification**
  - [ ] Run reporting unit/component tests in both apps.
  - [ ] Run full lint/test/build/typecheck in both apps.
  - [ ] Publish parity and residual-risk summary.

- [ ] **Task: Measure - User Manual Verification 'Phase 3: Adoption and Verification' (Protocol in workflow.md)**
