# Specification — Fix InterceptIdentification Tests

## Track Overview

Fix the 13 failing tests in `InterceptIdentification.test.tsx` related to coordinate snapping, intercept detection, and callback invocation.

## Problem Statement

The `InterceptIdentification` component has 13/23 failing tests. The main issues are:

1. **Coordinate snapping**: Tests click at specific canvas coordinates (e.g., (100, 300) for x=-3), but the component doesn't detect intercepts correctly. The minDistance threshold of 50px may be too tight for test click coordinates.

2. **Callback not invoked**: The `onInterceptIdentified` callback is not being called in tests, suggesting the click handling or intercept detection logic is broken.

3. **Linear functions**: Tests for linear functions fail, indicating the linear form handling is not working correctly.

## Acceptance Criteria

- [ ] All 23 tests in `InterceptIdentification.test.tsx` pass
- [ ] Clicking at canvas coordinates within snap threshold of actual intercept coordinates triggers correct intercept identification
- [ ] `onInterceptIdentified` callback is invoked with correct intercept data (type, x, y, timestamp)
- [ ] Linear functions work correctly (e.g., `y = 2x + 4` with intercept at x=-2)
- [ ] Quadratic functions work correctly for 0, 1, and 2 intercept cases

## Dependencies

- Track 4: Activity Infrastructure (completed)
- Track 5: Graphing Components (Phase 2 completed)

## Out of Scope

- Changing the snap threshold logic for user-facing UX (only adjust for test reliability if needed)
- Refactoring the entire component architecture
- Adding new features to InterceptIdentification

## Success Metrics

- 23/23 tests passing in `InterceptIdentification.test.tsx`
- Test execution time < 5 seconds
