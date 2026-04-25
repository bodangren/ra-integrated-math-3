# Specification: Student Study Hub — Matching & Speed Round Games

## Overview

Port the MatchingGame and SpeedRoundGame components from `bus-math-v2`, reusing the IM3 glossary created in the Flashcards track. These are click-based study games that reinforce vocabulary through active recall.

## Source Reference

Port from `bus-math-v2/components/student/MatchingGame.tsx` (245 lines) and `bus-math-v2/components/student/SpeedRoundGame.tsx` (309 lines).

## Functional Requirements

### 1. MatchingGame

- **Click-based matching** (not drag-and-drop): click one card to select, click second to attempt match
- Card data: `CardItem { id, content, pairId, type: "term" | "definition" }`
- Setup: picks 6 random terms from glossary, creates 12 cards (6 term + 6 definition), shuffles into 3×4 grid
- States per card: idle → selected → matched (green) or wrong (red flash, 800ms) → idle
- Supports `?module=N` search param for scoped review; falls back to full glossary if < 6 terms
- On completion: shows time, calls `recordSession({ activityType: "matching", termCount: 6 })`

### 2. SpeedRoundGame

- **Timed multiple-choice quiz** with lives and streaks
- 90-second countdown timer
- 3 lives (hearts), lose 1 per wrong answer, game over at 0
- Streak counter: increments on correct, resets on wrong
- Questions generated on-the-fly from glossary: random term → correct answer + 3 random distractors → 4 shuffled options
- Tracks `answeredTerms: Set<string>` to avoid repeats; resets when exhausted
- 800ms feedback flash (green/red), then auto-advances
- Game over: shows correct/total, max streak, calls `recordSession({ activityType: "speed_round", ... })`
- Supports `?module=N` search param; falls back if < 4 terms

### 3. Shared Infrastructure

- Reuses `study_sessions` table and `recordSession` mutation from Flashcards/Practice Test tracks
- Reuses `shuffleArray` from `lib/study/utils.ts`
- Reuses `GLOSSARY` and `getGlossaryTermsByModule` from `lib/study/glossary.ts`

### 4. Routes

- `/student/study/matching` — MatchingGame
- `/student/study/speed-round` — SpeedRoundGame

## Non-Functional Requirements

- Game state is client-only (no per-question server persistence)
- Session recorded only on game completion
- Responsive grid layout for mobile

## Acceptance Criteria

- [ ] MatchingGame: 6 pairs in 3×4 grid, click-to-match, completion with time display
- [ ] SpeedRoundGame: 90s timer, 3 lives, streak tracking, multiple-choice
- [ ] Both games support module-scoped filtering via URL param
- [ ] Sessions recorded on completion for progress tracking
- [ ] All components tested with >80% coverage

## Out of Scope

- Difficulty levels
- Leaderboards
- Drag-and-drop matching (click-based is simpler and more accessible)
