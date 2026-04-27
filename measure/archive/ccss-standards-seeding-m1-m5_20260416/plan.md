# CCSS Standards Seeding for M1-M5 - Implementation Plan

## Phase 1: Analyze and Document Existing Standards Coverage

- [ ] Review existing standards in `seed-standards.ts` (lines 7-253)
- [ ] Map each M1-M5 curriculum topic to existing CCSS codes
- [ ] Document which standards are MISSING vs already present
- [ ] Verify lesson slugs for M1-M5 (e.g., `module-1-lesson-1` through `module-5-lesson-5`)

## Phase 2: Add Missing CCSS Standards to seed-standards.ts

- [ ] Add `HSF-IF.C.7c` - Graph square root, cube root, and piecewise-defined functions
- [ ] Add `HSF-IF.C.7a` - Graph exponential and logarithmic functions (foundational)
- [ ] Add `N-CN.A.2` - Know and apply the fundamental theorem of algebra
- [ ] Add `HSF-LE.A.2` - Solve exponential equations using logarithms
- [ ] Add `HSF-LE.B.5` - Identify discrete and continuous exponential functions
- [ ] Run `npm run typecheck` to verify no type errors

## Phase 3: Add lesson_standards Links for M1-M5

- [ ] Create `module1LessonStandards` array with lesson-to-standard mappings
- [ ] Create `module2LessonStandards` array with lesson-to-standard mappings
- [ ] Create `module3LessonStandards` array with lesson-to-standard mappings
- [ ] Create `module4LessonStandards` array with lesson-to-standard mappings
- [ ] Create `module5LessonStandards` array with lesson-to-standard mappings
- [ ] Create `seedModule1LessonStandards` mutation following M6 pattern
- [ ] Create `seedModule2LessonStandards` mutation following M6 pattern
- [ ] Create `seedModule3LessonStandards` mutation following M6 pattern
- [ ] Create `seedModule4LessonStandards` mutation following M6 pattern
- [ ] Create `seedModule5LessonStandards` mutation following M6 pattern

## Phase 4: Wire Seeders into seed.ts

- [ ] Read existing `seed.ts` to understand orchestration pattern
- [ ] Add new seeder function calls for M1-M5 lesson_standards
- [ ] Verify all seeders are exported and callable
- [ ] Run `npm run lint` to check for issues
