# Module 5 Curriculum Seed - Specification

## Context

Module 5 covers exponential functions, special exponential functions, geometric sequences and series, and exponential modeling. The source curriculum lives in `curriculum/modules/module-5-exponential-functions.md` and lesson files `module-5-lesson-1` through `module-5-lesson-5`.

## Lesson Inventory

| Lesson | Title | Required phase sequence |
|--------|-------|-------------------------|
| 5-1 | Graphing Exponential Functions | explore, vocabulary, learn, worked_example x4, learn, worked_example x4, discourse, reflection |
| 5-2 | Solving Exponential Equations and Inequalities | explore, vocabulary, learn, worked_example x3, learn, worked_example, discourse, reflection |
| 5-3 | Special Exponential Functions | explore, vocabulary, learn, worked_example x4, discourse, reflection |
| 5-4 | Geometric Sequences and Series | explore, vocabulary, learn, worked_example x6, learn, worked_example x3, discourse, reflection |
| 5-5 | Modeling Data | explore, vocabulary, learn, worked_example x2, discourse, reflection |

## Requirements

1. Treat `curriculum/modules/module-5-lesson-*` as canonical.
2. Create idempotent seed mutations for all five lessons.
3. Preserve exponential notation, sequence notation, and modeling contexts.
4. Identify activity-component gaps for exponential graphing or modeling before inventing new props.
5. Add Module 5 standards and lesson-standard links once source mapping is confirmed.

## Acceptance Criteria

1. All five Module 5 lessons seed without duplicates.
2. Phase counts and order match curriculum headings.
3. Exponential, sequence, series, and modeling examples are represented faithfully.
4. Module 5 standards are seeded or explicitly documented as blocked by missing mapping.
5. `npm run lint` and relevant tests pass.

## Out Of Scope

- Modules 6-9 seed implementation.
- New statistics or trigonometry components.

