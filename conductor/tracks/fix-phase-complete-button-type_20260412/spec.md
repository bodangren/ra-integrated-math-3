# Specification — Fix PhaseCompleteButton.test.tsx Promise Type Mismatch

## Problem
1 TypeScript error in `__tests__/components/lesson/PhaseCompleteButton.test.tsx` at line 125:
```
Type '(value: CompletePhaseResponse | PromiseLike<CompletePhaseResponse>) => void' is not assignable to type '(v: unknown) => void'.
Types of parameters 'value' and 'v' are incompatible.
Type 'unknown' is not assignable to type 'CompletePhaseResponse | PromiseLike<CompletePhaseResponse>'.
```

## Status
**RESOLVED** - Error no longer present. Likely resolved by recent changes to test infrastructure or by the fix-graphing-test-types_20260412 track.

## Verification
- Full typecheck passes with 0 errors
- All tests pass (8 pre-existing failures in equivalence.test.ts)
- No changes required to PhaseCompleteButton.test.tsx

## Acceptance Criteria
1. ✅ TypeScript error in PhaseCompleteButton.test.tsx is resolved
2. ✅ Full typecheck passes (`npm run typecheck`)
3. ✅ All existing tests continue to pass
4. ✅ Test behavior remains unchanged

## Dependencies
None

## Risks
None - Error resolved without changes.

