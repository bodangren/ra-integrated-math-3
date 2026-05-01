# Specification: Integrated Math 2 Curriculum Definition

## Overview

Define the canonical Integrated Math 2 curriculum artifact pipeline using the Integrated Math 3 curriculum folder as the model. This track precedes broad lesson authoring and should convert the existing IM2 overview plus local problem-type PDFs into a durable course/unit/lesson/class-period definition that later seed, standards, problem-family, and activity work can consume.

## Context

Integrated Math 2 currently has a lightweight curriculum overview and a set of local ALEKS-style problem-type PDFs:

- `apps/integrated-math-2/curriculum/overview.md`
- `apps/integrated-math-2/curriculum/Module * Problem Types.pdf`

The overview defines 13 units and about 67 lessons across geometry, algebra, trigonometry, probability, functions, systems, exponents, polynomials, and quadratics. The PDFs appear to be exported problem-type/question banks, not full textbook lesson guides. That means IM2 needs a definition layer that reconciles the human course sequence from `overview.md` with the practice/problem-family evidence from the PDFs.

Integrated Math 3 has a fuller planning stack: `README.md`, `course-spec.md`, per-module source files, class-period plans, implementation JSON packages, reusable problem-family mapping, exceptions, and audit output. IM2 should follow that architecture while preserving IM2's 13-unit structure and using the problem-type PDFs as a practice-family source.

The existing `curriculum-authoring-im2_20260425` track assumes broad hand-authored lesson content. This track should define the evidence-backed planning layer first so that later authoring and seeding work does not invent structure disconnected from the overview and local source documents.

## Functional Requirements

1. Create a canonical Integrated Math 2 curriculum folder structure modeled on Integrated Math 3.
2. Inventory and normalize source evidence from the IM2 overview and all local problem-type PDFs.
3. Document source anomalies, including filename typos, split modules, missing page-count metadata, and any mismatches between PDF module ranges and the 13-unit overview.
4. Define IM2 course-level planning rules in `course-spec.md`, including:
   - class period as the atomic instructional object
   - canonical day types
   - unit and lesson references
   - worked-example or problem-type references
   - phase/package expectations
   - mastery, review, and assessment expectations
5. Create unit summary files and lesson source files that preserve overview titles, core objectives, unit numbering, and any source-backed problem-type evidence.
6. Create unit-level class-period plans that map lessons to instruction, practice, mastery, review, and test days.
7. Create implementation bridge artifacts equivalent to IM3's planning layer:
   - `implementation/class-period-packages/unit-*.json`
   - `implementation/practice-v1/activity-map.json`
   - `implementation/exceptions.json`
   - `implementation/audit/latest.json`
8. Define a reusable IM2 problem-family registry and course-plan map, modeled on IM3's ALEKS layer and sourced from the problem-type PDFs where possible.
9. Update IM2 curriculum documentation so future seed and authoring tracks know which files are canonical.
10. Identify how the IM2 Convex seed layer should later consume the canonical curriculum artifacts, without implementing full seeding in this track unless explicitly approved.

## Non-Functional Requirements

- Preserve source provenance for extracted content and planning decisions.
- Prefer deterministic, auditable artifacts over one-off hand-authored content.
- Keep IM2 unit/lesson terminology aligned with the app product definition and public curriculum page.
- Keep generated artifacts stable enough for tests, seeders, and future audits.
- Do not introduce dependency changes or `npm install`.
- Do not perform destructive git operations.
- If Convex code is touched in a later phase, first resolve the missing `convex/_generated/ai/guidelines.md` issue or document the blocker.

## Acceptance Criteria

- [ ] `apps/integrated-math-2/curriculum/README.md` and `course-spec.md` exist and define the canonical IM2 planning model.
- [ ] Source inventory artifacts exist for `overview.md` and all local problem-type PDFs.
- [ ] Source anomalies are documented in `implementation/exceptions.json`.
- [ ] Unit summary and lesson source files exist for the 13-unit IM2 sequence.
- [ ] Class-period plans exist for all 13 units and use the same planning discipline as IM3.
- [ ] Implementation package JSON exists and validates against a documented schema.
- [ ] A problem-family registry and course-plan map exist for IM2 practice planning.
- [ ] An audit artifact reports counts, source coverage, package coverage, and documented exceptions.
- [ ] Existing broad curriculum-authoring and seed tracks have a clear dependency relationship to this definition track.

## Out of Scope

- Full student-facing lesson authoring for all phases.
- Full Convex lesson, phase, standard, and activity seeding.
- New activity component implementation.
- Dependency installation.
- Reconstructing full textbook source content when only problem-type PDFs are available.

