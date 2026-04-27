# Specification: Student Study Hub — Flashcards & SRS Review

## Overview

Port the flashcard and SRS review study modes from `bus-math-v2`, replacing the business-math glossary with Algebra/Trig vocabulary for Integrated Math 3. Implements a shared `BaseReviewSession` component with FSRS scheduling, term mastery tracking, and study session persistence.

## Source Reference

Port from `bus-math-v2/components/student/BaseReviewSession.tsx`, `bus-math-v2/components/student/FlashcardPlayer.tsx`, `bus-math-v2/components/student/ReviewSession.tsx`, `bus-math-v2/lib/study/` (glossary, srs, utils), and `bus-math-v2/convex/study.ts`.

## Functional Requirements

### 1. Glossary Model

- `GlossaryTerm`: slug, term, definition, modules[] (which modules this term belongs to), topics[], related[]
- Static TypeScript data file covering Algebra/Trig vocabulary across 9 modules
- Helper functions: `getGlossaryTermsByModule(moduleNumber)`, `getAllGlossaryModules()`, `getGlossaryTermBySlug(slug)`
- Each term tagged with module numbers for scoped review

### 2. FSRS Scheduling

- Use `ts-fsrs` library for spaced repetition scheduling
- `scheduleNewTerm(termSlug)` → creates empty FSRS card
- `processReview(scheduledTerm, rating)` → runs FSRS.repeat(), returns updated card state + next interval
- `getDueTerms(scheduledTerms[], now)` → filters by scheduledFor ≤ now
- `proficiencyBand(score)` → "new" | "learning" | "familiar" | "mastered"
- `updateMastery(current, delta)` → clamps to [0, 1]

### 3. BaseReviewSession Component (shared)

- Generic review session driving both FlashcardPlayer and ReviewSession
- Props: activityType, renderHeader, noTermsTitle, noTermsMessage
- State machine: prompt → click to flip → rate (Again/Hard/Good/Easy) → advance or complete
- Rating mastery deltas: Again -0.2, Hard -0.05, Good +0.1, Easy +0.2
- On completion: calls recordSession mutation

### 4. FlashcardPlayer

- Thin wrapper around BaseReviewSession with activityType="flashcards"
- Header shows "Term X of Y"
- Click card to flip, then rate

### 5. ReviewSession

- Thin wrapper around BaseReviewSession with activityType="srs_review"
- Header shows "SRS Review — Review terms due today"
- Filters to only due terms

### 6. Convex Tables

- `term_mastery`: userId, termSlug, masteryScore (0-1), proficiencyBand, seenCount, correctCount, incorrectCount
- `due_reviews`: userId, termSlug, scheduledFor (ms), fsrsState (JSONB), isDue
- `study_preferences`: userId, preferences (JSON)
- Reuse `study_sessions` table from Practice Test Engine track

### 7. Routes

- `/student/study/flashcards` — FlashcardPlayer
- `/student/study/review` — ReviewSession (SRS due terms)
- `/student/study` — Study hub home with links to all modes

## Non-Functional Requirements

- FSRS scheduling runs client-side (no server round-trip per card)
- Term mastery updates are persisted after each rating (not batched)
- Glossary loads instantly (static import)

## Acceptance Criteria

- [ ] Student can review flashcards scoped to a specific module or all modules
- [ ] FSRS scheduling correctly spaces review intervals
- [ ] Due terms appear in SRS review when scheduled time arrives
- [ ] Term mastery persists across sessions
- [ ] Study sessions recorded for progress tracking
- [ ] All components and pure functions tested with >80% coverage

## Out of Scope

- Language modes (no bilingual glossary needed)
- Matching game (separate track)
- Speed round (separate track)
- Integration with practice activity SRS (separate SRS roadmap tracks)
