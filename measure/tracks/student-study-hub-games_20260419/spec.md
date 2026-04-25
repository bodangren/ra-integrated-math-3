# Student Study Hub — Matching & Speed Round Games

## Specification

Port the click-based matching game and timed speed round game from bus-math-v2 to the IM3 study hub, reusing the IM3 glossary and term mastery tracking infrastructure.

## Context

The Student Study Hub already supports flashcards and SRS review (Track: Student Study Hub — Flashcards & SRS Review). This track adds two game modes:

1. **Matching Game**: Students match related term/definition pairs in a click-based interface
2. **Speed Round**: Timed challenge where students rapidly identify correct term/definition matches

Both games reuse the existing `GlossaryTerm` type and study hub infrastructure from the parent track.

## Goals

- Implement Matching Game with click-based term/definition pairing
- Implement Speed Round with countdown timer and rapid-fire questions
- Wire games into study-hub-core package with clean exports
- Adopt in IM3 via package imports
- Add unit tests for game logic

## Out of Scope

- New glossary data authoring (reuse existing IM3 glossary)
- BM2-specific game variants
- Multiplayer/async features