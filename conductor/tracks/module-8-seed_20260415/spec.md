# Module 8 Curriculum Seed - Specification

## Context

Module 8 covers inferential statistics: random sampling, experiments, population data, normal distributions, and parameter estimation. The source curriculum lives in `curriculum/modules/module-8-inferential-statistics.md` and lesson files `module-8-lesson-1` through `module-8-lesson-5`.

## Lesson Inventory

| Lesson | Title | Required phase sequence |
|--------|-------|-------------------------|
| 8-1 | Random Sampling | explore, vocabulary, learn, worked_example x3, learn, worked_example x4, discourse, reflection |
| 8-2 | Using Statistical Experiments | explore, vocabulary, learn, worked_example, learn, worked_example x2, discourse, reflection |
| 8-3 | Analyzing Population Data | explore, vocabulary, learn, worked_example x3, discourse, reflection |
| 8-4 | Normal Distributions | explore, vocabulary, learn, worked_example x3, learn, worked_example x2, learn, worked_example x3, discourse, reflection |
| 8-5 | Estimating Population Parameters | explore, vocabulary, learn, worked_example x2, learn, worked_example x2, discourse, reflection |

## Requirements

1. Treat `curriculum/modules/module-8-lesson-*` as canonical.
2. Create idempotent seed mutations for all five lessons.
3. Preserve statistical terminology, sample/population distinctions, z-score notation, and inference context.
4. Identify whether statistics-specific activity components are needed or whether text plus existing activities is sufficient.
5. Add Module 8 standards and lesson-standard links once source mapping is confirmed.

## Acceptance Criteria

1. All five Module 8 lessons seed without duplicates.
2. Phase counts and order match curriculum headings.
3. Statistical examples preserve interpretation and units.
4. Module 8 standards are seeded or explicitly documented as blocked by missing mapping.
5. `npm run lint` and relevant tests pass.

## Out Of Scope

- Module 9 seed implementation.
- Building a full statistics simulation engine unless separately tracked.

