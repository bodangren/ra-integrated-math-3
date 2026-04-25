# Implementation Plan: Problem Families & Practice Items — All Apps

## Phase 1: IM1 Problem Families

- [ ] Task: Create problem family files for Modules 1-7
    - [ ] `problem_families/module_01.ts` through `problem_families/module_07.ts`
    - [ ] Each file defines problem families with IDs, names, descriptions, objectives, difficulty, component keys
- [ ] Task: Create problem family files for Modules 8-14
    - [ ] `problem_families/module_08.ts` through `problem_families/module_14.ts`
- [ ] Task: Create IM1 practice item blueprints
    - [ ] `seed_practice_items.ts` linking problem families to activity components
    - [ ] Verify all component keys are valid

## Phase 2: IM2 Problem Families

- [ ] Task: Create problem family files for Units 1-7
    - [ ] `problem_families/unit_01.ts` through `problem_families/unit_07.ts`
- [ ] Task: Create problem family files for Units 8-13
    - [ ] `problem_families/unit_08.ts` through `problem_families/unit_13.ts`
- [ ] Task: Create IM2 practice item blueprints
    - [ ] `seed_practice_items.ts` linking problem families to activity components

## Phase 3: PreCalc Problem Families

- [ ] Task: Create problem family files for all 4 units
    - [ ] `problem_families/unit_01.ts` through `problem_families/unit_04.ts`
- [ ] Task: Create PreCalc practice item blueprints
    - [ ] `seed_practice_items.ts` linking problem families to activity components

## Phase 4: Verification

- [ ] Task: Type check all problem family files
    - [ ] Run `npx tsc --noEmit` in each app
    - [ ] Verify no duplicate problem family IDs within each app
    - [ ] Verify all objective mappings reference valid standards
