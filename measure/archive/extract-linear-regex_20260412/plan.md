# Implementation Plan — Extract Linear Regex to Shared Utility

## Phase 1: Create Shared Parser Utility [checkpoint: 7a14107]

- [x] Task: Create `linear-parser.ts` utility module [7a14107]
    - [x] Write tests: `parseLinear()` correctly extracts m, b coefficients
    - [x] Write tests: handles implicit coefficients (e.g., "x" → m=1, b=0)
    - [x] Write tests: handles negative coefficients and signs with spaces
    - [x] Write tests: returns null for non-linear expressions
    - [x] Implement `lib/activities/graphing/linear-parser.ts`

- [x] Task: Measure — Phase Completion Verification 'Create Shared Parser Utility' (Protocol in workflow.md) [7a14107]

## Phase 2: Update canvas-utils.ts [completed]

- [x] Task: Refactor `evaluateFunction()` to use shared parser [95911de]
    - [x] Write tests: verify `evaluateFunction()` still works with linear expressions
    - [x] Import `parseLinear()` from new utility
    - [x] Replace inline regex with call to shared parser
    - [x] Verify coefficient extraction logic matches original

- [x] Task: Measure — Phase Completion Verification 'Update canvas-utils.ts' (Protocol in workflow.md) [95911de]

## Phase 3: Update InterceptIdentification.tsx [completed]

- [x] Task: Refactor `calculateXIntercepts()` to use shared parser [d042a3e]
    - [x] Write tests: verify intercept identification still works correctly for linear functions
    - [x] Import `parseLinear()` from new utility
    - [x] Replace inline regex with call to shared parser
    - [x] Verify intercept calculation logic matches original

- [x] Task: Measure — Phase Completion Verification 'Update InterceptIdentification.tsx' (Protocol in workflow.md) [d042a3e]

## Phase 4: Final Verification [completed]

- [x] Task: Run full test suite [5c289ab]
    - [x] Run `npm test` to ensure all tests pass (883/883)
    - [x] Run `npm run lint` to ensure no lint errors (pass)
    - [x] Run `npm run typecheck` to ensure no TypeScript errors (1 pre-existing error in PhaseCompleteButton.test.tsx, unrelated)

- [x] Task: Verify no regressions [5d02245]
    - [x] Test graphing canvas with linear functions (existing tests pass)
    - [x] Test intercept identification with linear functions (existing tests pass)

- [x] Task: Update tracks.md and tech-debt.md [5d02245]
    - [x] Add new track to tracks.md
    - [x] Mark "Linear regex duplicated in canvas-utils.ts and InterceptIdentification.tsx" as Resolved in tech-debt.md

- [x] Task: Measure — Phase Completion Verification 'Final Verification' (Protocol in workflow.md) [5d02245]
