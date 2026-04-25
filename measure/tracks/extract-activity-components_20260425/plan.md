# Implementation Plan: Activity Component Extraction

## Phase 1: Package Scaffold and Core Types

- [ ] Task: Create `packages/activity-components/` scaffold
    - [ ] Initialize package with `package.json`, `tsconfig.json`, `vitest.config.ts`
    - [ ] Set up `src/` directory structure: `components/`, `registry/`, `schemas/`, `renderer/`, `types/`
    - [ ] Configure build (vinext library mode or tsc)
- [ ] Task: Extract shared types to package
    - [ ] Move `ActivityComponentProps` interface to `src/types/index.ts`
    - [ ] Resolve flat vs nested prop interface inconsistency (standardize on flat)
    - [ ] Export `ActivityMode`, `ActivityType` from `@math-platform/activity-runtime`
    - [ ] Write tests for type exports
- [ ] Task: Extract registry to package
    - [ ] Move `registerActivity`, `getActivityComponent`, `getRegisteredActivityKeys`, `clearActivityRegistry` to `src/registry/index.ts`
    - [ ] Write unit tests for registry API

## Phase 2: Extract Activity Components

- [ ] Task: Extract ComprehensionQuiz component
    - [ ] Move `ComprehensionQuiz.tsx` and `ComprehensionQuizActivity.tsx` to `src/components/quiz/`
    - [ ] Move Zod schema to `src/schemas/comprehension-quiz.schema.ts`
    - [ ] Write tests for component rendering and schema validation
- [ ] Task: Extract FillInTheBlank component
    - [ ] Move `FillInTheBlank.tsx` and `FillInTheBlankActivity.tsx` to `src/components/blanks/`
    - [ ] Move Zod schema to `src/schemas/fill-in-the-blank.schema.ts`
    - [ ] Write tests
- [ ] Task: Extract RateOfChangeCalculator component
    - [ ] Move `RateOfChangeCalculator.tsx` and `RateOfChangeCalculatorActivity.tsx` to `src/components/roc/`
    - [ ] Move Zod schema to `src/schemas/rate-of-change.schema.ts`
    - [ ] Write tests
- [ ] Task: Extract DiscriminantAnalyzer component
    - [ ] Move `DiscriminantAnalyzer.tsx` and `DiscriminantAnalyzerActivity.tsx` to `src/components/discriminant/`
    - [ ] Move Zod schema to `src/schemas/discriminant.schema.ts`
    - [ ] Write tests
- [ ] Task: Extract StepByStepSolver component
    - [ ] Move `StepByStepper.tsx`, `MathInputField.tsx`, `StepByStepSolverActivity.tsx` to `src/components/algebraic/`
    - [ ] Move Zod schema to `src/schemas/step-by-step-solver.schema.ts`
    - [ ] Write tests
- [ ] Task: Extract GraphingExplorer component
    - [ ] Move `GraphingExplorer.tsx`, `GraphingExplorerActivity.tsx`, `GraphingCanvas.tsx`, `HintPanel.tsx`, `InterceptIdentification.tsx`, `InteractiveTableOfValues.tsx` to `src/components/graphing/`
    - [ ] Move Zod schema to `src/schemas/graphing-explorer.schema.ts`
    - [ ] Write tests

## Phase 3: Extract ActivityRenderer

- [ ] Task: Extract ActivityRenderer to package
    - [ ] Move `ActivityRenderer.tsx` to `src/renderer/ActivityRenderer.tsx`
    - [ ] Ensure Suspense wrapping and timing injection logic is generic
    - [ ] Write tests for renderer lookup and fallback behavior

## Phase 4: Package Exports and IM3 Migration

- [ ] Task: Define package exports
    - [ ] Create `src/index.ts` with all public exports
    - [ ] Verify tree-shaking works (only imported components are bundled)
- [ ] Task: Migrate IM3 to use shared package
    - [ ] Replace local activity component imports with `@math-platform/activity-components`
    - [ ] Replace local registry with shared registry
    - [ ] Replace local ActivityRenderer with shared ActivityRenderer
    - [ ] Keep `equivalence.ts` and `distractors.ts` as IM3-local
    - [ ] Run IM3 test suite — all tests must pass
- [ ] Task: Update IM3 activity registration
    - [ ] Update `lib/activities/registry.ts` to re-export from package or delegate
    - [ ] Verify lazy loading still works

## Phase 5: IM2 and PreCalculus Adoption

- [ ] Task: Register shared components in IM2
    - [ ] Create `apps/integrated-math-2/lib/activities/registry.ts`
    - [ ] Import and register all 6 shared activity types
    - [ ] Verify components render in IM2 lesson context
- [ ] Task: Register shared components in PreCalculus
    - [ ] Create `apps/pre-calculus/lib/activities/registry.ts`
    - [ ] Import and register all 6 shared activity types
    - [ ] Verify components render in PreCalculus lesson context
- [ ] Task: Verify cross-app isolation
    - [ ] Confirm IM2 registrations don't affect IM3 or PreCalculus
    - [ ] Confirm PreCalculus registrations don't affect IM3 or IM2
