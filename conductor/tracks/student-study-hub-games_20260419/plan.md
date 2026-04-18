# Implementation Plan

## Phase 1: Matching Game (Complete)

- [x] 1.1: Create `MatchingGame` component with click-based term/definition pairing UI
- [x] 1.2: Implement shuffle and match validation logic
- [x] 1.3: Wire game state to study-hub-core types
- [x] 1.4: Add tests for MatchingGame logic
- [x] 1.5: Migrate shuffleArray import to @math-platform/study-hub-core package

## Phase 2: Speed Round Game (Complete)

- [x] 2.1: Create `SpeedRoundGame` component with countdown timer
- [x] 2.2: Implement rapid-fire question presentation
- [x] 2.3: Add scoring and time tracking
- [x] 2.4: Wire to study-hub-core glossary
- [x] 2.5: Add tests for SpeedRoundGame logic
- [x] 2.6: Migrate shuffleArray import to @math-platform/study-hub-core package

## Phase 3: Adoption and Verification

- [ ] 3.1: Export game components from study-hub-core package
- [ ] 3.2: Add game routes/pages in IM3
- [ ] 3.3: Run tests and typecheck
- [ ] 3.4: Verify build passes