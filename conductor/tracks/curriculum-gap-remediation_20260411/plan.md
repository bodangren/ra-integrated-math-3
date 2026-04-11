# Implementation Plan - Curriculum Gap Remediation

## Phase 1: Audit Harness and Baseline

- [ ] Task: Add repeatable curriculum audit command
    - [ ] Write tests: audit detects the expected 9 modules, 52 lessons, 105 objectives, and 180 planned periods
    - [ ] Write tests: audit flags heading hierarchy violations, placeholders, truncations, ALEKS count mismatches, missing phase packages, and missing non-instruction artifacts
    - [ ] Implement deterministic audit script under `scripts/` or `lib/curriculum/`
    - [ ] Document how to run the audit and interpret failures

- [ ] Task: Capture baseline audit report
    - [ ] Run the audit against the current curriculum
    - [ ] Store a baseline report in the agreed curriculum audit location
    - [ ] Verify the report reflects known gaps from the initial curriculum review

- [ ] Task: Conductor - Phase Completion Verification 'Audit Harness and Baseline' (Protocol in workflow.md)

## Phase 2: ALEKS Extraction Repair

- [ ] Task: Repair ALEKS extraction logic
    - [ ] Write tests with representative ALEKS HTML snippets covering hidden or nested lesson topics
    - [ ] Update `scripts/extract_aleks_module_md.py` or create a deterministic replacement extractor
    - [ ] Verify declared-vs-listed topic totals can be computed by script

- [ ] Task: Regenerate ALEKS module exports
    - [ ] Run the extractor against `curriculum/ALEKS-practice-problems.htm`
    - [ ] Update `curriculum/aleks/module-*.md`
    - [ ] Update `curriculum/aleks/README.md` coverage table
    - [ ] Document any unrecoverable source-export gaps explicitly

- [ ] Task: Repair ALEKS references in class-period plans
    - [ ] Update `curriculum/module-*-class-period-plan.md` ALEKS SRS maps using repaired topic IDs
    - [ ] Replace avoidable `No direct ALEKS topic exported` rows with aligned topic references
    - [ ] Preserve worked-example-derived SRS substitutes where no ALEKS topic genuinely aligns

- [ ] Task: Conductor - Phase Completion Verification 'ALEKS Extraction Repair' (Protocol in workflow.md)

## Phase 3: Lesson Source Quality Repairs

- [ ] Task: Resolve known online-only example placeholders
    - [ ] Write audit expectation: no unresolved online-only placeholders remain without an exception record
    - [ ] Repair `curriculum/modules/module-1-lesson-5` Example 6
    - [ ] Repair `curriculum/modules/module-2-lesson-3` Example 6
    - [ ] Repair `curriculum/modules/module-4-lesson-1` Example 3
    - [ ] Update affected objective alignment notes and class-period plan notes if needed

- [ ] Task: Fix known truncations and malformed prompts
    - [ ] Write audit expectation: known truncated line patterns are rejected
    - [ ] Fix truncated CAP reflection in `curriculum/modules/module-1-lesson-6`
    - [ ] Scan all lesson files for similar malformed endings and repair or record exceptions

- [ ] Task: Normalize lesson heading hierarchy
    - [ ] Write tests: each lesson source file has exactly one top-level `#` heading
    - [ ] Write tests: examples, steps, parts, key concepts, study tips, and watch-outs use allowed heading levels
    - [ ] Repair all Module 5 lesson heading violations
    - [ ] Audit and repair remaining lesson heading issues across Modules 1-9

- [ ] Task: Conductor - Phase Completion Verification 'Lesson Source Quality Repairs' (Protocol in workflow.md)

## Phase 4: Instruction Day Phase Packages

- [ ] Task: Define phase-package schema and location
    - [ ] Write tests or schema validation for required fields
    - [ ] Document the file layout and naming convention
    - [ ] Implement schema validation in the curriculum audit

- [ ] Task: Author phase packages for Modules 1-3
    - [ ] Create packages for all Module 1 instruction periods
    - [ ] Create packages for all Module 2 instruction periods
    - [ ] Create packages for all Module 3 instruction periods
    - [ ] Verify objective, source lesson, worked examples, ALEKS/SRS, assessment, and CAP/closing fields

- [ ] Task: Author phase packages for Modules 4-6
    - [ ] Create packages for all Module 4 instruction periods
    - [ ] Create packages for all Module 5 instruction periods
    - [ ] Create packages for all Module 6 instruction periods
    - [ ] Verify objective, source lesson, worked examples, ALEKS/SRS, assessment, and CAP/closing fields

- [ ] Task: Author phase packages for Modules 7-9
    - [ ] Create packages for all Module 7 instruction periods
    - [ ] Create packages for all Module 8 instruction periods
    - [ ] Create packages for all Module 9 instruction periods
    - [ ] Verify objective, source lesson, worked examples, ALEKS/SRS, assessment, and CAP/closing fields

- [ ] Task: Conductor - Phase Completion Verification 'Instruction Day Phase Packages' (Protocol in workflow.md)

## Phase 5: Non-Instruction Day Curriculum Artifacts

- [ ] Task: Define non-instruction artifact schema and location
    - [ ] Write tests or schema validation for mastery, jigsaw, review, and test artifact types
    - [ ] Document the file layout and naming convention
    - [ ] Implement schema validation in the curriculum audit

- [ ] Task: Author mastery day artifacts
    - [ ] Create all 36 mastery day artifacts
    - [ ] Include objective scope, SRS sources, remediation grouping, extension options, and evidence requirements
    - [ ] Verify mastery artifacts draw from worked-example-derived practice, ALEKS topics, and spiral review where applicable

- [ ] Task: Author jigsaw day artifacts
    - [ ] Create all 18 jigsaw/group-work artifacts
    - [ ] Include group task, source worked examples, deliverable, facilitation notes, and rubric/completion criteria

- [ ] Task: Author review and test day artifacts
    - [ ] Create all 9 review artifacts
    - [ ] Create all 9 test artifacts
    - [ ] Include objective coverage, assessment structure, misconception targets, grading expectations, and retake/remediation relationship

- [ ] Task: Conductor - Phase Completion Verification 'Non-Instruction Day Curriculum Artifacts' (Protocol in workflow.md)

## Phase 6: `practice.v1` Activity Mapping

- [ ] Task: Define activity mapping schema
    - [ ] Write tests or schema validation for stable IDs, source references, component keys, modes, objective codes, props, grading config, and SRS eligibility
    - [ ] Document approved component keys and proposed-key workflow
    - [ ] Implement mapping validation in the curriculum audit

- [ ] Task: Map instruction day activities
    - [ ] Create `practice.v1` mappings for all worked examples
    - [ ] Create mappings for guided practice, independent practice, and exit-ticket/assessment items
    - [ ] Link each mapping to objective codes and source references

- [ ] Task: Map ALEKS and SRS practice
    - [ ] Create mappings for every listed ALEKS topic used by class-period plans
    - [ ] Create mappings for worked-example-derived SRS substitutes
    - [ ] Mark SRS eligibility and intended proficiency evidence for each item

- [ ] Task: Map non-instruction day activities
    - [ ] Create mappings for mastery artifacts
    - [ ] Create mappings for jigsaw artifacts
    - [ ] Create mappings for review and test artifacts
    - [ ] Document any required component-key gaps

- [ ] Task: Conductor - Phase Completion Verification '`practice.v1` Activity Mapping' (Protocol in workflow.md)

## Phase 7: Documentation, Final Audit, and Handoff

- [ ] Task: Synchronize curriculum documentation
    - [ ] Update `curriculum/README.md`
    - [ ] Update `curriculum/course-spec.md`
    - [ ] Update `curriculum/aleks/README.md`
    - [ ] Add dependency notes for downstream curriculum seed tracks where needed

- [ ] Task: Run final automated verification
    - [ ] Run curriculum audit and confirm all required checks pass or have documented exceptions
    - [ ] Run relevant unit tests for audit, extraction, and mapping validation
    - [ ] Run `npm run lint`

- [ ] Task: Produce final remediation report
    - [ ] Summarize remaining documented exceptions, if any
    - [ ] Summarize generated artifacts and stable ID conventions
    - [ ] Identify next implementation tracks unlocked by the remediation

- [ ] Task: Conductor - Phase Completion Verification 'Documentation, Final Audit, and Handoff' (Protocol in workflow.md)

