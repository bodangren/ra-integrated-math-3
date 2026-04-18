# Reconciliation Notes

## Canonical Source Decision
- Canonical source: IM3
- Reason: activity-runtime is IM3-derived; BM2 has different lesson runtime structure

## Delta Classification
- required behavior: teacher/admin role takes precedence over activity mode override (bug fix in modes.ts)
- bug/security hardening: N/A for this phase
- domain-specific (must remain app-local): registry, submission, lesson components
- docs/comments only: N/A

## App-Local Keep List
- IM3:
  - `lib/curriculum/phase-types.ts` (re-exports from package)
  - `lib/activities/modes.ts` (re-exports from package)
  - `lib/activities/completion.ts` (re-exports from package)
  - `lib/activities/registry.ts` (has concrete activity imports - app-specific)
  - `lib/activities/submission.ts` (has app-specific API calls)
  - `components/lesson/*` (have app-specific UI imports and hooks)
- BM2: N/A (not in scope for this track)

## Package API Decisions
- exported symbols:
  - `@math-platform/activity-runtime/phase-types`: PHASE_TYPES, SKIPPABLE_PHASE_TYPES, getPhaseDisplayInfo, isSkippable, isValidPhaseType, PhaseType, PhaseDisplayInfo
  - `@math-platform/activity-runtime/modes`: resolveActivityMode, ActivityMode, ResolveModeParams, UserRole, PhaseType
  - `@math-platform/activity-runtime/completion`: PhaseActivityTracker
- intentionally not exported:
  - Activity registry (has concrete activity component imports)
  - Submission utilities (require app-specific API calls)
  - Lesson component implementations (require app-specific UI and hooks)

## Bug Fix Applied
- `resolveActivityMode`: teacher/admin role now correctly takes precedence over activityModeOverride (was checking override first, contradicting docstring)

## Verification Results
- commands run:
  - `npm test` in packages/activity-runtime: 37 tests pass
  - `npm test` in apps/integrated-math-3: 3356/3362 pass (6 pre-existing equivalence failures)
  - `npm run lint`: CLEAN
  - `npm run typecheck`: CLEAN
  - `npm run build`: PASS
  - boundary guard check: PASS
- outcome: SUCCESS