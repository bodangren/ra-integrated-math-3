# Module 7 Curriculum Seed - Specification

## Context

Module 7 covers rational expressions, reciprocal and rational graphs, variation, and rational equations/inequalities. The source curriculum lives in `curriculum/modules/module-7-rational-functions.md` and lesson files `module-7-lesson-1` through `module-7-lesson-6`.

## Lesson Inventory

| Lesson | Title | Required phase sequence |
|--------|-------|-------------------------|
| 7-1 | Multiplying and Dividing Rational Expressions | explore, vocabulary, learn, worked_example x2, learn, worked_example x3, discourse, reflection |
| 7-2 | Adding and Subtracting Rational Expressions | explore, vocabulary, learn, worked_example x3, learn, worked_example x2, discourse, reflection |
| 7-3 | Graphing Reciprocal Functions | explore, vocabulary, learn, worked_example x3, learn, worked_example x2, discourse, reflection |
| 7-4 | Graphing Rational Functions | explore, vocabulary, learn, worked_example x3, learn, worked_example x2, discourse, reflection |
| 7-5 | Variation | explore, vocabulary, learn, worked_example x2, learn, worked_example x3, discourse, reflection |
| 7-6 | Solving Rational Equations and Inequalities | explore, vocabulary, learn, worked_example x5, learn, worked_example x2, discourse, reflection |

## Requirements

1. Treat `curriculum/modules/module-7-lesson-*` as canonical.
2. Create idempotent seed mutations for all six lessons.
3. Preserve domain restrictions, excluded values, holes, asymptotes, and extraneous-solution checks.
4. Identify graphing/activity gaps for rational function behavior before inventing props.
5. Add Module 7 standards and lesson-standard links once source mapping is confirmed.

## Acceptance Criteria

1. All six Module 7 lessons seed without duplicates.
2. Phase counts and order match curriculum headings.
3. Rational expression and rational graph examples preserve restrictions and interpretation.
4. Module 7 standards are seeded or explicitly documented as blocked by missing mapping.
5. `npm run lint` and relevant tests pass.

## Out Of Scope

- Module 8-9 seed implementation.
- Advanced symbolic simplification beyond current component capabilities.

