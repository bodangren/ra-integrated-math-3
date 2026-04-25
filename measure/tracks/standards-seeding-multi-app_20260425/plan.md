# Implementation Plan: Standards & Objective Seeding — All Apps

## Phase 1: IM1 Standards

- [ ] Task: Define IM1 competency standards
    - [ ] Research Common Core standards for Integrated Math 1
    - [ ] Create `apps/integrated-math-1/convex/seed/seed_standards.ts` with ~40-50 standards
    - [ ] Include standard code, description, and category for each
- [ ] Task: Create IM1 lesson-standards mapping
    - [ ] Create `apps/integrated-math-1/convex/seed/seed_lesson_standards.ts`
    - [ ] Map all ~99 lesson slugs to their primary and supporting standards
- [ ] Task: Create IM1 objective policies
    - [ ] Create `apps/integrated-math-1/convex/seed/seed_objective_policies.ts`
    - [ ] Assign `essential`/`supporting`/`extension` priority to each standard

## Phase 2: IM2 Standards

- [ ] Task: Define IM2 competency standards
    - [ ] Research Common Core standards for Integrated Math 2
    - [ ] Create `apps/integrated-math-2/convex/seed/seed_standards.ts` with ~40-50 standards
- [ ] Task: Create IM2 lesson-standards mapping
    - [ ] Create `apps/integrated-math-2/convex/seed/seed_lesson_standards.ts`
    - [ ] Map all ~67 lesson slugs to their primary and supporting standards
- [ ] Task: Create IM2 objective policies
    - [ ] Create `apps/integrated-math-2/convex/seed/seed_objective_policies.ts`

## Phase 3: PreCalc Standards

- [ ] Task: Define PreCalc competency standards
    - [ ] Research AP Precalculus standards
    - [ ] Create `apps/pre-calculus/convex/seed/seed_standards.ts` with ~30-40 standards
- [ ] Task: Create PreCalc lesson-standards mapping
    - [ ] Create `apps/pre-calculus/convex/seed/seed_lesson_standards.ts`
    - [ ] Map all ~54 lesson slugs to their primary and supporting standards
- [ ] Task: Create PreCalc objective policies
    - [ ] Create `apps/pre-calculus/convex/seed/seed_objective_policies.ts`

## Phase 4: Verification

- [ ] Task: Type check all seed files
    - [ ] Run `npx tsc --noEmit` in each app
    - [ ] Verify no orphaned standards (every standard mapped to at least one lesson)
    - [ ] Verify no orphaned lessons (every lesson mapped to at least one standard)
