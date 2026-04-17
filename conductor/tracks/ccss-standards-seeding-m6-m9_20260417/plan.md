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

- [ ] **Task: Add missing standards and improve weak descriptions**
  - [ ] Add only missing M6-M9 standards to `seed-standards.ts` with idempotent insert behavior.
  - [ ] Improve `studentFriendlyDescription` where current text is incomplete or unclear.
  - [ ] Keep naming and coding format aligned with M1-M5 standards.

- [ ] **Task: Verify lesson-standard link seeders for modules 6-9**
  - [ ] Confirm `seedModule6LessonStandards` through `seedModule9LessonStandards` reference only valid seeded codes.
  - [ ] Confirm all four seeders are still called in `seed.ts` orchestration.
  - [ ] Fix any broken or duplicate links discovered during validation.

- [ ] **Task: Conductor - User Manual Verification 'Phase 2: Reconciliation and Seed Updates' (Protocol in workflow.md)**

## Phase 3: Validation and Handoff

### Tasks

- [ ] **Task: Run verification commands and targeted seed validation**
  - [ ] Run `npm run typecheck`.
  - [ ] Run `npm run lint`.
  - [ ] Run the relevant seed/validation command path to confirm no runtime lookup failures for M6-M9 standards.

- [ ] **Task: Document final coverage and closeout**
  - [ ] Update `reconciliation-notes.md` with before/after coverage.
  - [ ] List every added or changed standard code.
  - [ ] Record any intentional deferrals and owner.

- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Validation and Handoff' (Protocol in workflow.md)**
