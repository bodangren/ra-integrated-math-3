# Specification — Fix GraphingExplorer Test Type Errors

## Problem

11 TypeScript errors in `__tests__/components/activities/graphing/GraphingExplorer.test.tsx` caused by incorrect type for `comparisonAnswer` prop in test fixtures. The component expects `"first" | "second" | undefined`, but tests are providing `string`.

## Impact

- TypeScript compilation fails, blocking CI/CD and development
- Tests cannot run in strict mode
- Type safety is compromised

## Acceptance Criteria

1. All 11 TypeScript errors in GraphingExplorer.test.tsx are resolved
2. `npm run typecheck` passes with no errors
3. `npm run test` passes with no regressions
4. No changes to component logic or production code (only test fixtures)

## Technical Notes

- Error lines: 792, 807, 819, 834, 848, 867, 894, 921, 958, 974, 996
- Root cause: Test fixtures use `comparisonAnswer: "first"` as string literal instead of typed literal
- Solution: Ensure test fixtures properly type the comparisonAnswer prop as `"first" | "second" | undefined`
