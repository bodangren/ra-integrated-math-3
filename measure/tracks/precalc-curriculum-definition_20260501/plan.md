# Implementation Plan: AP Precalculus Curriculum Definition

## Phase 1: Source Inventory and Canonical Contract

- [ ] Task: Write source inventory tests and checks
    - [ ] Add or update validation coverage for expected Precalculus source files and documented missing sources
    - [ ] Confirm Unit 1-3 PDFs are readable through existing local tooling
    - [ ] Confirm Unit 4 source absence is represented as an expected documented exception
- [ ] Task: Define Precalculus curriculum contract
    - [ ] Create `apps/pre-calculus/curriculum/README.md`
    - [ ] Create `apps/pre-calculus/curriculum/course-spec.md`
    - [ ] Define course, unit, topic/lesson, class-period, phase-package, and practice-family terminology
    - [ ] Document relationship to `curriculum-authoring-precalc_20260425`, standards seeding, lesson seeding, and problem-family tracks
- [ ] Task: Measure - User Manual Verification 'Source Inventory and Canonical Contract' (Protocol in workflow.md)

## Phase 2: PDF Extraction and Source Normalization

- [ ] Task: Write extraction fixture tests
    - [ ] Validate extracted text includes expected unit/topic headings for Unit 1
    - [ ] Validate extracted text includes expected unit/topic headings for Unit 2
    - [ ] Validate extracted text includes expected unit/topic headings for Unit 3
- [ ] Task: Extract and normalize Unit 1-3 source evidence
    - [ ] Create a deterministic extraction script or documented command path using existing local Python/PDF tooling
    - [ ] Store normalized source markdown or text artifacts under `apps/pre-calculus/curriculum/source/`
    - [ ] Preserve PDF filename, page count, topic headings, examples, worksheets, quizzes/tests, and pacing cues where extractable
- [ ] Task: Document source limitations
    - [ ] Create `apps/pre-calculus/curriculum/implementation/exceptions.json`
    - [ ] Record missing Unit 4 source PDF
    - [ ] Record extraction quality limitations for malformed OCR/text, diagrams, graphs, and formula loss
- [ ] Task: Measure - User Manual Verification 'PDF Extraction and Source Normalization' (Protocol in workflow.md)

## Phase 3: Unit, Lesson, and Class-Period Planning

- [ ] Task: Write structural validation tests for curriculum artifacts
    - [ ] Validate required Precalculus curriculum directories and files
    - [ ] Validate unit/topic counts against source evidence and documented exceptions
    - [ ] Validate class-period plans include required fields for instruction and non-instruction days
- [ ] Task: Create unit and lesson/topic source layer
    - [ ] Create unit summary files for available source-backed units
    - [ ] Create lesson/topic source files preserving AP topic numbering and source titles
    - [ ] Include examples and assessment artifacts as references, not necessarily fully authored app phases
- [ ] Task: Create class-period plans
    - [ ] Create `unit-*-class-period-plan.md` files for source-backed units
    - [ ] Map topics to instruction, practice, review, quiz/test, and AP task-model days
    - [ ] Keep class-period planning aligned with `course-spec.md`
- [ ] Task: Measure - User Manual Verification 'Unit, Lesson, and Class-Period Planning' (Protocol in workflow.md)

## Phase 4: Implementation Bridge and Audit

- [ ] Task: Write implementation artifact validation tests
    - [ ] Validate `class-period-package.v1` shape for Precalculus unit packages
    - [ ] Validate practice activity map entries reference known units, periods, and problem families
    - [ ] Validate documented exceptions are consumed by the audit
- [ ] Task: Create implementation bridge artifacts
    - [ ] Create `apps/pre-calculus/curriculum/implementation/README.md`
    - [ ] Create `implementation/class-period-packages/unit-*.json`
    - [ ] Create `implementation/practice-v1/activity-map.json`
    - [ ] Create `implementation/audit/latest.json`
- [ ] Task: Create AP Precalculus problem-family planning layer
    - [ ] Create `apps/pre-calculus/curriculum/practice/README.md`
    - [ ] Create `practice/problem-family-registry.md`
    - [ ] Create `practice/course-plan-map.md`
    - [ ] Use source-backed AP topic families and mark implementation status conservatively
- [ ] Task: Run verification and update downstream planning
    - [ ] Run relevant tests and validation scripts
    - [ ] Update `measure/tracks.md` so downstream Precalculus authoring/seeding tracks depend on this track where appropriate
    - [ ] Record any discovered tech debt or unresolved source questions
- [ ] Task: Measure - User Manual Verification 'Implementation Bridge and Audit' (Protocol in workflow.md)

