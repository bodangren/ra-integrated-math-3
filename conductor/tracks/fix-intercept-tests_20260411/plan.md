# Implementation Plan — Fix InterceptIdentification Tests

## Phase 1: Diagnose Test Failures

- [ ] Task: Run tests with verbose output to understand failure patterns
    - [ ] Run `npm test -- components/activities/graphing/InterceptIdentification.test.tsx -- --verbose`
    - [ ] Document which tests fail and why
    - [ ] Identify common failure patterns (coordinate issues, callback issues, etc.)

- [ ] Task: Review test coordinate expectations vs actual canvas coordinates
    - [ ] Read test file to understand expected click coordinates
    - [ ] Review `transformDataToCanvas` function to understand coordinate mapping
    - [ ] Compare test coordinates with expected mathematical coordinates

- [ ] Task: Debug click handling in InterceptIdentification
    - [ ] Add console.log to understand click coordinates received
    - [ ] Verify snap threshold logic is working
    - [ ] Verify intercept detection logic is working

- [ ] Task: Conductor — Phase Completion Verification 'Diagnose Test Failures' (Protocol in workflow.md)

## Phase 2: Fix Coordinate Snapping Issues

- [ ] Task: Fix coordinate transformation for test click coordinates
    - [ ] Write tests: verify click coordinates map correctly to mathematical coordinates
    - [ ] Adjust `transformDataToCanvas` or add inverse transform if needed
    - [ ] Ensure test coordinates (e.g., (100, 300)) correctly map to mathematical coordinates (e.g., x=-3)

- [ ] Task: Adjust snap threshold for test reliability
    - [ ] Write tests: clicks within reasonable distance of intercept are detected
    - [ ] Adjust minDistance threshold if 50px is too tight for test click precision
    - [ ] Verify snap threshold doesn't affect UX negatively

- [ ] Task: Conductor — Phase Completion Verification 'Fix Coordinate Snapping Issues' (Protocol in workflow.md)

## Phase 3: Fix Callback Invocation

- [ ] Task: Fix onInterceptIdentified callback invocation
    - [ ] Write tests: callback is called when intercept is identified
    - [ ] Verify click handler correctly calls callback with intercept data
    - [ ] Ensure callback includes all required fields (type, x, y, timestamp)

- [ ] Task: Fix visual feedback rendering
    - [ ] Write tests: intercept markers render correctly after identification
    - [ ] Verify marker class names and positioning
    - [ ] Ensure feedback text renders correctly

- [ ] Task: Conductor — Phase Completion Verification 'Fix Callback Invocation' (Protocol in workflow.md)

## Phase 4: Fix Linear Function Handling

- [ ] Task: Fix linear function intercept calculation
    - [ ] Write tests: linear functions return correct x-intercept
    - [ ] Verify regex pattern matches linear forms (e.g., `y = 2x + 4`)
    - [ ] Verify intercept calculation for linear functions works correctly

- [ ] Task: Verify all function types work
    - [ ] Write tests: 0, 1, and 2 intercept cases for quadratics
    - [ ] Write tests: linear functions with positive and negative slopes
    - [ ] Ensure "No Real Solutions" option works for non-intersecting functions

- [ ] Task: Conductor — Phase Completion Verification 'Fix Linear Function Handling' (Protocol in workflow.md)

## Phase 5: Final Verification

- [ ] Task: Run full test suite and fix any remaining failures
    - [ ] Run `npm test -- components/activities/graphing/InterceptIdentification.test.tsx`
    - [ ] Verify all 23 tests pass
    - [ ] Fix any remaining edge cases

- [ ] Task: Update tech-debt.md
    - [ ] Mark "InterceptIdentification has 13/23 failing tests" as Resolved
    - [ ] Remove from tech-debt.md if all tests pass

- [ ] Task: Conductor — Phase Completion Verification 'Final Verification' (Protocol in workflow.md)
