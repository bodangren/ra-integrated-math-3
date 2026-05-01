# Implementation Plan: Integrated Math 2 Curriculum Definition

## Phase 1: Source Inventory and Canonical Contract

- [ ] Task: Write source inventory tests and checks
    - [ ] Add or update validation coverage for expected IM2 source files
    - [ ] Confirm all local problem-type PDFs are readable through existing local tooling
    - [ ] Confirm filename anomalies and split module ranges are represented as documented exceptions
- [ ] Task: Define IM2 curriculum contract
    - [ ] Create `apps/integrated-math-2/curriculum/README.md`
    - [ ] Create `apps/integrated-math-2/curriculum/course-spec.md`
    - [ ] Define course, unit, lesson, class-period, phase-package, and problem-family terminology
    - [ ] Document relationship to `curriculum-authoring-im2_20260425`, standards seeding, lesson seeding, and problem-family tracks
- [ ] Task: Measure - User Manual Verification 'Source Inventory and Canonical Contract' (Protocol in workflow.md)

## Phase 2: PDF Extraction and Source Normalization

- [ ] Task: Write extraction fixture tests
    - [ ] Validate extracted text includes expected module/question headings from early geometry PDFs
    - [ ] Validate extracted text includes expected module/question headings from algebra/function PDFs
    - [ ] Validate extracted text includes expected module/question headings from trigonometry PDFs
- [ ] Task: Extract and normalize source evidence
    - [ ] Create a deterministic extraction script or documented command path using existing local Python/PDF tooling
    - [ ] Store normalized source markdown or text artifacts under `apps/integrated-math-2/curriculum/source/`
    - [ ] Preserve PDF filename, page count, module/range label, question count, and visible problem-type text where extractable
- [ ] Task: Document source limitations
    - [ ] Create `apps/integrated-math-2/curriculum/implementation/exceptions.json`
    - [ ] Record typo and range anomalies such as `PRoblem`, split module PDFs, and ambiguous `12-15 to 12-10`
    - [ ] Record extraction quality limitations for diagrams, graphs, construction tasks, and formula loss
- [ ] Task: Measure - User Manual Verification 'PDF Extraction and Source Normalization' (Protocol in workflow.md)

## Phase 3: Unit, Lesson, and Class-Period Planning

- [ ] Task: Write structural validation tests for curriculum artifacts
    - [ ] Validate required IM2 curriculum directories and files
    - [ ] Validate unit/lesson counts against `overview.md` and documented exceptions
    - [ ] Validate class-period plans include required fields for instruction and non-instruction days
- [ ] Task: Create unit and lesson source layer
    - [ ] Create unit summary files for all 13 units
    - [ ] Create lesson source files preserving overview lesson titles and core objectives
    - [ ] Link lessons to source-backed problem-type evidence when available
- [ ] Task: Create class-period plans
    - [ ] Create `unit-*-class-period-plan.md` files for all 13 units
    - [ ] Map lessons to instruction, practice, mastery, review, and test days
    - [ ] Keep class-period planning aligned with `course-spec.md`
- [ ] Task: Measure - User Manual Verification 'Unit, Lesson, and Class-Period Planning' (Protocol in workflow.md)

## Phase 4: Implementation Bridge and Audit

- [ ] Task: Write implementation artifact validation tests
    - [ ] Validate `class-period-package.v1` shape for IM2 unit packages
    - [ ] Validate practice activity map entries reference known units, periods, and problem families
    - [ ] Validate documented exceptions are consumed by the audit
- [ ] Task: Create implementation bridge artifacts
    - [ ] Create `apps/integrated-math-2/curriculum/implementation/README.md`
    - [ ] Create `implementation/class-period-packages/unit-*.json`
    - [ ] Create `implementation/practice-v1/activity-map.json`
    - [ ] Create `implementation/audit/latest.json`
- [ ] Task: Create IM2 problem-family planning layer
    - [ ] Create `apps/integrated-math-2/curriculum/practice/README.md`
    - [ ] Create `practice/problem-family-registry.md`
    - [ ] Create `practice/course-plan-map.md`
    - [ ] Use source-backed problem families and mark implementation status conservatively
- [ ] Task: Run verification and update downstream planning
    - [ ] Run relevant tests and validation scripts
    - [ ] Update `measure/tracks.md` so downstream IM2 authoring/seeding tracks depend on this track where appropriate
    - [ ] Record any discovered tech debt or unresolved source questions
- [ ] Task: Measure - User Manual Verification 'Implementation Bridge and Audit' (Protocol in workflow.md)

