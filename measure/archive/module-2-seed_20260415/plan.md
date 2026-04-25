# Module 2 Curriculum Seed — Implementation Plan

## Phase 1: Seed Lesson 2-1 (Polynomial Functions)

- [x] Task: Author curriculum content for lesson 2-1 (if not complete)
  - [x] Verify curriculum/modules/module-2-lesson-1 has required sections
  - [x] Ensure Explore, Learn, Worked Examples, Discourse, Reflection phases have content

- [x] Task: Create seed function `convex/seed/seed-lesson-2-1.ts`
  - [x] Write test: correct phase sequence (explore, vocabulary, learn, worked_example ×2, learn, worked_example ×4, discourse, reflection)
  - [x] Write test: section content extracted correctly from curriculum markdown
  - [x] Write test: idempotent insert (skip if exists)
  - [x] Implement `seedLesson2_1()` following module-1-seed pattern

## Phase 2: Seed Lesson 2-2 (Analyzing Graphs of Polynomial Functions)

- [x] Task: Author curriculum content for lesson 2-2 (if not complete)
  - [x] Verify curriculum/modules/module-2-lesson-2 has required sections
  - [x] Ensure content covers the Location Principle, approximate zeros, extrema, and graph analysis

- [x] Task: Create seed function `convex/seed/seed-lesson-2-2.ts`
  - [x] Write test: correct phase sequence (explore, vocabulary, learn, worked_example, learn, worked_example ×4, discourse, reflection)
  - [x] Write test: idempotent insert
  - [x] Implement `seedLesson2_2()`

## Phase 3: Seed Lesson 2-3 (Operations with Polynomials)

- [x] Task: Author curriculum content for lesson 2-3 (if not complete)
  - [x] Verify curriculum/modules/module-2-lesson-3 has required sections

- [x] Task: Create seed function `convex/seed/seed-lesson-2-3.ts`
  - [x] Write test: correct phase sequence (explore, vocabulary, learn, worked_example ×3, learn, worked_example ×4, discourse, reflection)
  - [x] Write test: idempotent insert
  - [x] Implement `seedLesson2_3()`

## Phase 4: Seed Lessons 2-4 and 2-5

- [x] Task: Author curriculum content for lessons 2-4 and 2-5 (if not complete)
  - [x] Verify curriculum/modules/module-2-lesson-4 has Dividing Polynomials content
  - [x] Verify curriculum/modules/module-2-lesson-5 has Powers of Binomials content

- [x] Task: Create seed function `convex/seed/seed-lesson-2-4.ts`
  - [x] Write test: correct phase sequence (explore, vocabulary, learn, worked_example ×3, learn, worked_example ×2, discourse, reflection)
  - [x] Write test: idempotent insert
  - [x] Implement `seedLesson2_4()`

- [x] Task: Create seed function `convex/seed/seed-lesson-2-5.ts`
  - [x] Write test: correct phase sequence (explore, vocabulary, learn, worked_example ×3, discourse, reflection)
  - [x] Write test: idempotent insert
  - [x] Implement `seedLesson2_5()`

## Phase 5: Update seed.ts and Verify

- [x] Task: Update `convex/seed.ts` to call new lesson seed functions
   - [x] Add case statements for module-2-lesson-1 through module-2-lesson-5
   - [x] Import new seed internal mutations

- [x] Task: Update `convex/seed/seed-standards.ts` for Module 2 standards
   - [x] Write test: all 4 Module 2 standards inserted with correct codes
   - [x] Implement HSA-APR.A.1, HSA-APR.B.2, HSA-APR.B.3, HSA-CED.A.1

- [x] Task: Run full seed verification
   - [x] Run `npx convex run seed:main` or equivalent
   - [x] Verify all 5 Module 2 lessons appear in database
   - [x] Verify phase counts and types are correct
   - [x] Verify lesson_standards links exist

- [x] Task: Measure — Phase Completion Verification (Protocol in workflow.md)
