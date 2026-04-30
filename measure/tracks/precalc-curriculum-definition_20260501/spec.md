# Specification: AP Precalculus Curriculum Definition

## Overview

Define the canonical AP Precalculus curriculum artifact pipeline using the Integrated Math 3 curriculum folder as the model. This track precedes broad lesson authoring and should convert the new local AP Precalculus source documents into a durable course/unit/lesson/class-period definition that later seed, standards, problem-family, and activity work can consume.

## Context

AP Precalculus currently has a lightweight curriculum overview and three local source PDFs:

- `apps/pre-calculus/curriculum/overview.md`
- `apps/pre-calculus/curriculum/APPC  Unit 1 Passwater.pdf`
- `apps/pre-calculus/curriculum/APPC  Unit 2 Passwater.pdf`
- `apps/pre-calculus/curriculum/APPC  Unit 3 Passwater.pdf`

Integrated Math 3 has a fuller planning stack: `README.md`, `course-spec.md`, per-module source files, class-period plans, implementation JSON packages, reusable problem-family mapping, exceptions, and audit output. AP Precalculus should follow that architecture while using AP course language: course, units, topics/lessons, class periods, phase packages, AP-aligned practice families.

The existing `curriculum-authoring-precalc_20260425` track assumes broad hand-authored lesson content. This track should define the evidence-backed planning layer first so that later authoring and seeding work does not invent structure disconnected from the source documents.

## Functional Requirements

1. Create a canonical AP Precalculus curriculum folder structure modeled on Integrated Math 3.
2. Extract and normalize source evidence from the Unit 1-3 PDFs into auditable text/markdown artifacts.
3. Document source gaps, especially the missing Unit 4 source PDF despite Unit 4 appearing in `overview.md` and `product.md`.
4. Define AP Precalculus course-level planning rules in `course-spec.md`, including:
   - class period as the atomic instructional object
   - canonical day types
   - lesson/topic source references
   - worked-example references
   - phase/package expectations
   - assessment and AP practice expectations
5. Create unit summary files and lesson/topic source files that preserve source titles, examples, worksheets/quizzes/tests where available, and AP topic numbering.
6. Create unit-level class-period plans that map source topics to instruction, practice, review, quiz/test, and AP task-model days.
7. Create implementation bridge artifacts equivalent to IM3's planning layer:
   - `implementation/class-period-packages/unit-*.json`
   - `implementation/practice-v1/activity-map.json`
   - `implementation/exceptions.json`
   - `implementation/audit/latest.json`
8. Define a reusable AP Precalculus problem-family registry and course-plan map, modeled on IM3's ALEKS layer but named for AP Precalculus unless a real ALEKS export is provided.
9. Update Precalculus curriculum documentation so future seed and authoring tracks know which files are canonical.
10. Identify how the Precalculus Convex seed layer should later consume the canonical curriculum artifacts, without implementing full seeding in this track unless explicitly approved.

## Non-Functional Requirements

- Preserve source provenance for extracted content and planning decisions.
- Prefer deterministic, auditable artifacts over one-off hand-authored content.
- Keep AP Precalculus terminology separate from IM3 terminology where student/teacher-facing labels differ.
- Keep generated artifacts stable enough for tests, seeders, and future audits.
- Do not introduce dependency changes or `npm install`.
- Do not perform destructive git operations.
- If Convex code is touched in a later phase, first resolve the missing `convex/_generated/ai/guidelines.md` issue or document the blocker.

## Acceptance Criteria

- [ ] `apps/pre-calculus/curriculum/README.md` and `course-spec.md` exist and define the canonical AP Precalculus planning model.
- [ ] Source extraction artifacts exist for all provided Unit 1-3 PDFs.
- [ ] Unit 4 source absence is documented in `implementation/exceptions.json`.
- [ ] Unit summary and lesson/topic source files exist for the AP Precalculus curriculum covered by available source evidence.
- [ ] Class-period plans exist for available units and use the same planning discipline as IM3.
- [ ] Implementation package JSON exists and validates against a documented schema.
- [ ] A problem-family registry and course-plan map exist for AP Precalculus practice planning.
- [ ] An audit artifact reports counts, source coverage, package coverage, and documented exceptions.
- [ ] Existing broad curriculum-authoring and seed tracks have a clear dependency relationship to this definition track.

## Out of Scope

- Full student-facing lesson authoring for all phases.
- Full Convex lesson, phase, standard, and activity seeding.
- New activity component implementation.
- Dependency installation.
- Unit 4 source reconstruction beyond documenting the missing source and preserving overview/product metadata.

