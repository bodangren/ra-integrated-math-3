# Module 9 Curriculum Seed - Specification

## Context

Module 9 covers trigonometric functions, angle measure, unit-circle relationships, periodic functions, graphing trigonometric functions, transformations, and inverse trigonometric functions. The source curriculum lives in `curriculum/modules/module-9-trigonometric-functions.md` and lesson files `module-9-lesson-1` through `module-9-lesson-7`.

## Lesson Inventory

| Lesson | Title | Required phase sequence |
|--------|-------|-------------------------|
| 9-1 | Angles and Angle Measure | explore, vocabulary, learn, worked_example x3, learn, worked_example x3, discourse, reflection |
| 9-2 | Trigonometric Functions of General Angles | explore, vocabulary, learn, worked_example x2, learn, worked_example x2, learn, worked_example x3, discourse, reflection |
| 9-3 | Circular and Periodic Functions | explore, vocabulary, learn, worked_example x2, learn, worked_example x3, discourse, reflection |
| 9-4 | Graphing Sine and Cosine Functions | explore, vocabulary, learn, worked_example x4, learn, worked_example x2, discourse, reflection |
| 9-5 | Graphing Other Trigonometric Functions | explore, vocabulary, learn, worked_example x2, learn, worked_example x3, discourse, reflection |
| 9-6 | Translations of Trigonometric Graphs | explore, vocabulary, learn, worked_example x2, learn, worked_example x3, discourse, reflection |
| 9-7 | Inverse Trigonometric Functions | explore, vocabulary, learn, worked_example x4, discourse, reflection |

## Requirements

1. Treat `curriculum/modules/module-9-lesson-*` as canonical.
2. Create idempotent seed mutations for all seven lessons.
3. Preserve degree/radian notation, unit-circle values, amplitude/period/midline/phase-shift language, and inverse trig domain restrictions.
4. Identify trigonometric graphing or unit-circle component gaps before inventing new props.
5. Add Module 9 standards and lesson-standard links once source mapping is confirmed.

## Acceptance Criteria

1. All seven Module 9 lessons seed without duplicates.
2. Phase counts and order match curriculum headings.
3. Trigonometric examples preserve notation, transformations, and interpretation.
4. Module 9 standards are seeded or explicitly documented as blocked by missing mapping.
5. `npm run lint` and relevant tests pass.

## Out Of Scope

- Post-course modules beyond Module 9.
- New interactive unit-circle/graphing engine unless separately tracked.

