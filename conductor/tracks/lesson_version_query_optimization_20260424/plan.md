# Plan: Lesson Version Query Optimization

## Phase 1: Curriculum Query Batching

- [x] Task: Batch lesson version lookups in public.ts
    - [x] Write tests verifying batch equivalence (public-curriculum-batching.test.ts — 6 tests)
    - [x] Refactor getCurriculum to fetch all lesson_versions in one query using buildLatestPublishedLessonVersionMap
    - [x] Build lessonId→version Map for O(1) lookup
    - [x] Refactor getUnitSummaries with same batching pattern

## Phase 2: Enrollment Query Batching

- [x] Task: Batch isStudentEnrolledInClassForLesson
    - [x] Use by_lesson index to fetch all class_lessons for lesson in one query
    - [x] Replace sequential loop with Set-based classId membership check
    - [x] Parallelize remaining per-class checks with Promise.all
    - [x] Verify identical return behavior

## Phase 3: Verification

- [x] Task: Full suite validation
    - [x] Run `npm run lint` — zero errors
    - [x] Run `npx tsc --noEmit` — zero errors
    - [x] Run `npm run test` — 3237 passed, 2 todo
    - [x] Run `npm run build` — clean build (6.96s)
