# Module 3 Curriculum Seed - Specification

## Context

Module 3 covers polynomial equations. The source curriculum lives in `curriculum/modules/module-3-polynomial-equations.md` and lesson files `module-3-lesson-1` through `module-3-lesson-5`. This track seeds the module into Convex after Module 2 seed integration is complete.

## Lesson Inventory

| Lesson | Title | Required phase sequence |
|--------|-------|-------------------------|
| 3-1 | Solving Polynomial Equations by Graphing | explore, vocabulary, learn, worked_example x2, discourse, reflection |
| 3-2 | Solving Polynomial Equations Algebraically | explore, vocabulary, learn, worked_example x5, learn, worked_example x2, discourse, reflection |
| 3-3 | Proving Polynomial Identities | explore, vocabulary, learn, worked_example x2, discourse, reflection |
| 3-4 | The Remainder and Factor Theorems | explore, vocabulary, learn, worked_example x2, learn, worked_example, discourse, reflection |
| 3-5 | Roots and Zeros | explore, vocabulary, learn, worked_example x2, learn, worked_example x3, discourse, reflection |

## Requirements

1. Treat `curriculum/modules/module-3-lesson-*` as canonical for lesson titles, phase counts, and phase order.
2. Create idempotent `convex/seed/seed-lesson-3-N.ts` mutations for all five lessons.
3. Add focused seed tests before implementation.
4. Use valid registered activity component keys and props.
5. Add or verify Module 3 competency standards and lesson-standard links.
6. Update seed orchestration so Module 3 can be seeded through the same entry point as Modules 1-2.
7. Keep seed implementation aligned with the curriculum consistency guardrails.

## Acceptance Criteria

1. All five Module 3 lesson seed functions are present and idempotent.
2. Seed tests and curriculum consistency tests pass.
3. `convex/seed.ts` can invoke Module 3 seed functions.
4. Module 3 standards and lesson links are present or documented if source mapping is incomplete.
5. `npm run lint` and relevant tests pass.

## Out Of Scope

- Module 4-9 seed implementation.
- New activity component families unless a lesson cannot be represented with existing components.

