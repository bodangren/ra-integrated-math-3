# Module 4 Curriculum Seed - Specification

## Context

Module 4 covers operations on functions, inverses, radicals, rational exponents, and radical equations. The source curriculum lives in `curriculum/modules/module-4-inverses-radicals.md` and lesson files `module-4-lesson-1` through `module-4-lesson-6`.

## Lesson Inventory

| Lesson | Title | Required phase sequence |
|--------|-------|-------------------------|
| 4-1 | Operations on Functions | explore, vocabulary, learn, worked_example x2, learn, worked_example x4, discourse, reflection |
| 4-2 | Inverse Relations and Functions | explore, vocabulary, learn, worked_example x4, learn, worked_example x2, discourse, reflection |
| 4-3 | nth Roots and Rational Exponents | explore, vocabulary, learn, worked_example x2, learn, worked_example x4, discourse, reflection |
| 4-4 | Graphing Radical Functions | explore, vocabulary, learn, worked_example x4, learn, worked_example x3, discourse, reflection |
| 4-5 | Operations with Radical Expressions | explore, vocabulary, learn, worked_example x2, learn, worked_example x3, learn, worked_example x2, discourse, reflection |
| 4-6 | Solving Radical Equations | explore, vocabulary, learn, worked_example x4, learn, worked_example x3, discourse, reflection |

## Requirements

1. Treat `curriculum/modules/module-4-lesson-*` as canonical for titles and phase structure.
2. Create idempotent seed mutations for all six lessons.
3. Write tests before seed implementation.
4. Use existing activity components where possible; document any proposed component gaps.
5. Add Module 4 standards and lesson-standard links once source mapping is confirmed.
6. Update seed orchestration and curriculum consistency coverage.

## Acceptance Criteria

1. All six Module 4 lessons seed without duplicates.
2. Phase counts and order match curriculum headings.
3. Radical, inverse, and function-operation examples preserve mathematical notation.
4. Module 4 standards are seeded or explicitly documented as blocked by missing mapping.
5. `npm run lint` and relevant tests pass.

## Out Of Scope

- Modules 5-9 seed implementation.
- New symbolic algebra engine work beyond current component capabilities.

