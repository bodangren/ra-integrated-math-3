# Implementation Plan: Demo Environment & Verification — All Apps

## Phase 1: IM1 Demo Environment

- [ ] Task: Create IM1 demo environment seed
    - [ ] Create `apps/integrated-math-1/convex/seed/seed_demo_env.ts`
    - [ ] Configure class name as "IM1 Period 1"
    - [ ] Create org, teacher, students, class, enrollments
- [ ] Task: Create IM1 demo progress seed
    - [ ] Create `apps/integrated-math-1/convex/seed/seed_demo_progress.ts`
    - [ ] Create sample progress for Module 1 lessons
- [ ] Task: Create IM1 class lessons seed
    - [ ] Create `apps/integrated-math-1/convex/seed/seed_class_lessons.ts`
    - [ ] Assign Module 1 lessons to demo class
- [ ] Task: Update IM1 `seed.ts` to orchestrate demo seeds

## Phase 2: IM2 Demo Environment

- [ ] Task: Create IM2 demo environment seed
    - [ ] Create `apps/integrated-math-2/convex/seed/seed_demo_env.ts`
    - [ ] Configure class name as "IM2 Period 1"
- [ ] Task: Create IM2 demo progress seed
    - [ ] Create `apps/integrated-math-2/convex/seed/seed_demo_progress.ts`
- [ ] Task: Create IM2 class lessons seed
    - [ ] Create `apps/integrated-math-2/convex/seed/seed_class_lessons.ts`
    - [ ] Assign Unit 1 lessons to demo class
- [ ] Task: Update IM2 `seed.ts` to orchestrate demo seeds

## Phase 3: PreCalc Demo Environment

- [ ] Task: Create PreCalc demo environment seed
    - [ ] Create `apps/pre-calculus/convex/seed/seed_demo_env.ts`
    - [ ] Configure class name as "AP Precalc Period 1"
- [ ] Task: Create PreCalc demo progress seed
    - [ ] Create `apps/pre-calculus/convex/seed/seed_demo_progress.ts`
- [ ] Task: Create PreCalc class lessons seed
    - [ ] Create `apps/pre-calculus/convex/seed/seed_class_lessons.ts`
    - [ ] Assign Unit 1 lessons to demo class
- [ ] Task: Update PreCalc `seed.ts` to orchestrate demo seeds

## Phase 4: End-to-End Verification

- [ ] Task: Verify IM1 student lesson flow
    - [ ] Seed demo data into IM1 Convex
    - [ ] Navigate through a complete lesson as demo student
    - [ ] Verify activities render and accept submissions
- [ ] Task: Verify IM1 teacher dashboard
    - [ ] View teacher dashboard with demo students
    - [ ] Verify gradebook and student detail views
- [ ] Task: Verify IM2 student lesson flow
    - [ ] Repeat verification for IM2
- [ ] Task: Verify IM2 teacher dashboard
    - [ ] Repeat verification for IM2
- [ ] Task: Verify PreCalc student lesson flow
    - [ ] Repeat verification for PreCalc
- [ ] Task: Verify PreCalc teacher dashboard
    - [ ] Repeat verification for PreCalc
