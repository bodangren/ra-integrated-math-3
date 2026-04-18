# Reconciliation Notes

## Canonical Source Decision
- Canonical source: IM3
- Reason: IM3 has cleaner component structure with BaseReviewSession as pure state machine; BM2 BaseReviewSession is tightly coupled to hooks and Convex

## Delta Classification
- required behavior:
  - Both apps use the same review session state machine logic
  - Rating deltas are identical across both apps
- bug/security hardening: N/A
- domain-specific (must remain app-local):
  - GlossaryTerm interface (contains modules, topics, synonyms, related fields)
  - Persistence/wiring via hooks in BM2
  - Convex queries and mutations
- docs/comments only: N/A

## App-Local Keep List
- IM3:
  - `lib/study/types.ts` (GlossaryTerm, ScheduledTerm, ReviewResult - domain-specific)
  - `lib/study/glossary.ts` (curriculum data)
  - `lib/study/srs.ts` (SRS scheduling)
  - `components/student/FlashcardPlayer.tsx` (wraps BaseReviewSession with flashcard header)
  - `components/student/ReviewSession.tsx` (wraps BaseReviewSession with SRS header)
  - `components/student/MatchingGame.tsx` (game-specific UI)
  - `components/student/SpeedRoundGame.tsx` (game-specific UI)
- BM2:
  - All glossary and persistence (hooks-based architecture)
  - All study components

## Package API Decisions
- exported symbols:
  - `shuffleArray<T>(array: T[]): T[]` - Fisher-Yates shuffle
  - `StudyTerm` interface - minimal term interface (term, definition, slug)
  - `StudySessionRating` type - 'again' | 'hard' | 'good' | 'easy'
  - `StudySessionResult` interface - completion results
  - `RATING_DELTAS` - rating delta constants
  - `BaseReviewSession<T extends StudyTerm>` - generic review session component
- intentionally not exported:
  - GlossaryTerm (domain-specific)
  - app-specific hooks (BM2)
  - game-specific components (MatchingGame, SpeedRoundGame)

## Verification Results
- commands run:
  - `npm run test` in packages/study-hub-core: 6/6 pass
  - `npm run typecheck` in packages/study-hub-core: pass
  - `npm run lint` in packages/study-hub-core: pass
  - `npx tsc --noEmit` in apps/integrated-math-3: pass
  - `npm run lint` in apps/integrated-math-3: pass
  - `npm run build` in apps/integrated-math-3: pass
- outcome: PASS