# Implementation Plan: CCSS Standards Seeding for M6-M9

## Phase 1: Coverage Audit

### Tasks

- [x] **Task: Build canonical standard-code inventory for modules 6-9**
  - [x] Extract all unique `standardCode` values used in module 6-9 lesson standard arrays.
  - [x] Save the inventory in this track folder as `reconciliation-notes.md` for traceability.
  - [x] Group codes by module and lesson for quick verification.

- [x] **Task: Compare inventory against `seed-standards.ts`**
  - [x] Check each module 6-9 standard code against seeded competency standards.
  - [x] Mark each code as present, missing, or ambiguous.
  - [x] Call out any description-quality gaps where seeded text is too vague for students.

- [x] **Task: Conductor - User Manual Verification 'Phase 1: Coverage Audit' (Protocol in workflow.md)**

**Phase 1 Conclusion:** All M6-M9 standards are present in seed-standards.ts. No missing standards found. The lesson_standards linking should work correctly.

## Phase 2: Reconciliation and Seed Updates

### Tasks

- [x] **Task: Add missing standards and improve weak descriptions**
  - [x] Add only missing M6-M9 standards to `seed-standards.ts` with idempotent insert behavior. **N/A - Phase 1 found all standards present**
  - [x] Improve `studentFriendlyDescription` where current text is incomplete or unclear. **N/A - Phase 1 found all descriptions adequate**
  - [x] Keep naming and coding format aligned with M1-M5 standards. **Verified**

- [x] **Task: Verify lesson-standard link seeders for modules 6-9**
  - [x] Confirm `seedModule6LessonStandards` through `seedModule9LessonStandards` reference only valid seeded codes.
  - [x] Confirm all four seeders are still called in `seed.ts` orchestration. **Verified at lines 307, 326, 345, 364**
  - [x] Fix any broken or duplicate links discovered during validation. **None found**

- [x] **Task: Conductor - User Manual Verification 'Phase 2: Reconciliation and Seed Updates' (Protocol in workflow.md)****

## Phase 3: Validation and Handoff

### Tasks

- [x] **Task: Run verification commands and targeted seed validation**
  - [x] Run `npm run typecheck`. **Pre-existing errors in unrelated files (workflow-validation.test.ts, teacher.ts, SubmissionDetailModal.tsx)**
  - [x] Run `npm run lint`. **35 pre-existing @typescript-eslint/no-explicit-any errors in test files (documented in tech-debt.md)**
  - [x] Run the relevant seed/validation command path to confirm no runtime lookup failures for M6-M9 standards. **All seeders wired and standards verified**

- [x] **Task: Document final coverage and closeout**
  - [x] Update `reconciliation-notes.md` with before/after coverage. **Updated**
  - [x] List every added or changed standard code. **None - all standards already present**
  - [x] Record any intentional deferrals and owner. **None**

- [x] **Task: Conductor - User Manual Verification 'Phase 3: Validation and Handoff' (Protocol in workflow.md)****
