# Implementation Plan: Student Study Hub — Flashcards & SRS Review

## Phase 1: Glossary and SRS Core

### Tasks

- [x] **Task: Create IM3 glossary data**
  - [x] Define `GlossaryTerm` type in `lib/study/types.ts`
  - [x] Author `lib/study/glossary.ts` with Algebra/Trig vocabulary covering all 9 modules (target: 60-80 terms)
  - [x] Write tests for `getGlossaryTermsByModule`, `getAllGlossaryModules`, `getGlossaryTermBySlug`

- [x] **Task: Port FSRS scheduling utilities**
  - [x] Write unit tests for `scheduleNewTerm`, `processReview`, `getDueTerms`, `proficiencyBand`, `updateMastery` in `lib/study/__tests__/srs.test.ts`
  - [x] Implement `lib/study/srs.ts` wrapping `ts-fsrs` library
  - [x] Verify FSRS interval calculations produce reasonable spacing

- [x] **Task: Port study utilities**
  - [x] Write test for `shuffleArray` (Fisher-Yates)
  - [x] Implement `lib/study/utils.ts`

- [x] **Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)** [checkpoint: c47f8a1]

## Phase 2: Convex Tables and Mutations [COMPLETE]

### Tasks

- [x] **Task: Add Convex tables for term mastery and due reviews**
  - [x] Add `term_mastery` table with indexes (by_user, by_user_and_term)
  - [x] Add `due_reviews` table with indexes (by_user, by_user_and_term, by_user_and_due)
  - [x] Add `study_preferences` table with index (by_user)
  - [x] Write schema migration tests

- [x] **Task: Implement Convex study mutations and queries**
  - [x] Write tests for `processReview`, `recordSession`, `getDueTerms` mutations/queries
  - [x] Implement in `convex/study.ts`: processReview (upsert term_mastery + due_reviews), recordSession, getDueTerms, getTermMasteryByUnit, getRecentSessions

- [x] **Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)** [checkpoint: 858be16]

## Phase 3: UI Components and Routes [COMPLETE]

### Tasks

- [x] **Task: Implement BaseReviewSession component**
  - [x] Write component tests for state machine: prompt → flip → rate → advance → complete
  - [x] Implement `BaseReviewSession.tsx` with configurable header, empty state, and completion screen
  - [x] Wire to Convex hooks (useDueTerms, useProcessReview, useRecordSession)

- [x] **Task: Implement FlashcardPlayer and ReviewSession wrappers**
  - [x] Write smoke tests for each wrapper
  - [x] Implement `FlashcardPlayer.tsx` (activityType="flashcards", "Term X of Y" header)
  - [x] Implement `ReviewSession.tsx` (activityType="srs_review", due-today header)

- [x] **Task: Create study hub routes**
  - [x] Create `app/student/study/page.tsx` (hub home with navigation cards)
  - [x] Create `app/student/study/flashcards/page.tsx` (FlashcardPlayer, auth guard)
  - [x] Create `app/student/study/review/page.tsx` (ReviewSession, auth guard)
  - [x] Add study hub link to student dashboard

- [x] **Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)** [checkpoint: 47afac5]
