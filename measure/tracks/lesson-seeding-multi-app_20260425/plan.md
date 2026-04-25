# Implementation Plan: Lesson Seeding — All Apps

## Phase 1: IM1 Lesson Seeds (Modules 1-7)

- [ ] Task: Create seed files for Module 1 (Expressions, 6 lessons)
    - [ ] `seed_lesson_1_1.ts` through `seed_lesson_1_6.ts`
- [ ] Task: Create seed files for Module 2 (Equations, 7 lessons)
    - [ ] `seed_lesson_2_1.ts` through `seed_lesson_2_7.ts`
- [ ] Task: Create seed files for Module 3 (Relations & Functions, 6 lessons)
    - [ ] `seed_lesson_3_1.ts` through `seed_lesson_3_6.ts`
- [ ] Task: Create seed files for Module 4 (Linear/Nonlinear Functions, 7 lessons)
    - [ ] `seed_lesson_4_1.ts` through `seed_lesson_4_7.ts`
- [ ] Task: Create seed files for Module 5 (Creating Linear Equations, 6 lessons)
    - [ ] `seed_lesson_5_1.ts` through `seed_lesson_5_6.ts`
- [ ] Task: Create seed files for Module 6 (Linear Inequalities, 5 lessons)
    - [ ] `seed_lesson_6_1.ts` through `seed_lesson_6_5.ts`
- [ ] Task: Create seed files for Module 7 (Systems, 5 lessons)
    - [ ] `seed_lesson_7_1.ts` through `seed_lesson_7_5.ts`

## Phase 2: IM1 Lesson Seeds (Modules 8-14)

- [ ] Task: Create seed files for Module 8 (Exponential Functions, 6 lessons)
- [ ] Task: Create seed files for Module 9 (Statistics, 8 lessons)
- [ ] Task: Create seed files for Module 10 (Tools of Geometry, 7 lessons)
- [ ] Task: Create seed files for Module 11 (Angles & Figures, 8 lessons)
- [ ] Task: Create seed files for Module 12 (Logical Arguments, 10 lessons)
- [ ] Task: Create seed files for Module 13 (Transformations, 6 lessons)
- [ ] Task: Create seed files for Module 14 (Triangles & Congruence, 7 lessons)
- [ ] Task: Update IM1 `seed.ts` to orchestrate all lesson seeds

## Phase 3: IM2 Lesson Seeds

- [ ] Task: Create seed files for Units 1-7 (38 lessons)
    - [ ] Unit 1: Relationships in Triangles (6)
    - [ ] Unit 2: Quadrilaterals (5)
    - [ ] Unit 3: Similarity (5)
    - [ ] Unit 4: Right Triangles & Trig (6)
    - [ ] Unit 5: Circles (5)
    - [ ] Unit 6: Measurement (5)
    - [ ] Unit 7: Probability (6)
- [ ] Task: Create seed files for Units 8-13 (29 lessons)
    - [ ] Unit 8: Relations & Functions (6)
    - [ ] Unit 9: Linear Equations/Systems (5)
    - [ ] Unit 10: Exponents & Roots (5)
    - [ ] Unit 11: Polynomials (6)
    - [ ] Unit 12: Quadratic Functions (5)
    - [ ] Unit 13: Trig Identities (5)
- [ ] Task: Update IM2 `seed.ts` to orchestrate all lesson seeds

## Phase 4: PreCalc Lesson Seeds

- [ ] Task: Create seed files for Unit 1 (Polynomial & Rational, 14 lessons)
- [ ] Task: Create seed files for Unit 2 (Exponential & Logarithmic, 15 lessons)
- [ ] Task: Create seed files for Unit 3 (Trigonometric & Polar, 15 lessons)
- [ ] Task: Create seed files for Unit 4 (Parameters/Vectors/Matrices, 14 lessons)
- [ ] Task: Update PreCalc `seed.ts` to orchestrate all lesson seeds

## Phase 5: Verification

- [ ] Task: Type check all seed files
    - [ ] Run `npx tsc --noEmit` in each app
    - [ ] Verify no duplicate lesson slugs within each app
    - [ ] Verify all activity component keys are valid
