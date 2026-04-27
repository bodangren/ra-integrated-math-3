# Reconciliation Notes

## Canonical Source Decision
- Canonical source: IM3 (packages extracted from IM3)
- BM2 consumes packages extracted from IM3

## Delta Classification
- **required behavior:** BM2 SRS contract uses legacy card state incompatible with package FSRS types
- **bug/security hardening:** Package versions have hardened `timingSafeEquals` (no early return on length mismatch)
- **domain-specific (must remain app-local):** BM2 `lib/practice/engine/**`, `lib/srs/answer-inputs/registry`, `lib/auth/server.ts`, `lib/auth/ip-hash.ts`, `lib/convex/server.ts`
- **docs/comments only:** N/A

## App-Local Keep List
- **IM3:** N/A (packages extracted from IM3)
- **BM2:**
  - `lib/practice/engine/**` (BM2-specific accounting practice families)
  - `lib/practice/simulation-submission.ts` (simulation envelope helpers)
  - `lib/practice/error-analysis/providers.ts` (BM2-specific AI provider)
  - `lib/srs/contract.ts` (legacy contract - incompatible with package)
  - `lib/srs/scheduler.ts` (legacy scheduler)
  - `lib/srs/review-processor.ts` (uses legacy card state)
  - `lib/srs/answer-inputs/registry.ts` (BM2-specific answer inputs)
  - `lib/auth/server.ts` (BM2-specific auth guards with Convex integration)
  - `lib/auth/ip-hash.ts` (BM2-specific IP hashing)
  - `lib/convex/server.ts` (BM2-specific Convex wrappers)

## Package API Decisions
- **exported symbols:** All practice-core, srs-engine, core-auth, core-convex exports
- **intentionally not exported:** BM2-specific providers, engines, guards

## Verification Results
- **commands run:** `npx tsc --noEmit`
- **outcome:** No new errors introduced by migrations. Pre-existing errors in DailyPracticeSession.tsx (SRS contract mismatch) remain unaddressed.
- **Files migrated:**
  - `middleware.ts` - auth session/constants to package
  - `app/api/progress/assessment/route.ts` - practice/contract to package
  - `app/api/teacher/ai-error-summary/route.ts` - practice/error-analysis to package
  - `components/practice-timing.tsx` - practice/timing to package
  - `components/activities/quiz/ReflectionJournal.tsx` - practice/contract to package
  - `components/activities/quiz/ComprehensionCheck.tsx` - practice/contract to package
  - `components/activities/quiz/FillInTheBlank.tsx` - practice/contract to package
  - `components/activities/quiz/PeerCritiqueForm.tsx` - practice/contract to package
  - `components/activities/quiz/TieredAssessment.tsx` - practice/contract to package
  - `components/activities/accounting/JournalEntryActivity.tsx` - practice/contract to package
  - `components/lesson/ActivityRenderer.tsx` - practice/contract to package

## Blockers
1. **SRS contract incompatibility** - BM2 uses legacy card state representation; cannot simply swap imports without refactoring the entire SRS pipeline
2. **Convex server wrappers** - BM2's `lib/convex/server.ts` has app-specific query patterns that require more analysis
