# Implementation Plan: Practice Test Engine

## Phase 1: Data Structures and Question Banks

### Tasks

- [ ] **Task: Create practice test types**
  - [ ] Write unit tests for type contracts in `lib/practice-tests/__tests__/types.test.ts`
  - [ ] Define `PracticeTestQuestion`, `PracticeTestModuleConfig`, `PracticeTestPhaseContent`, `PracticeTestMessaging` in `lib/practice-tests/types.ts`

- [ ] **Task: Create question bank helpers**
  - [ ] Write unit tests for `filterQuestionsByLessonIds`, `drawRandomQuestions`, `shuffleAnswers` in `lib/practice-tests/__tests__/question-banks.test.ts`
  - [ ] Implement helper functions in `lib/practice-tests/question-banks.ts`

- [ ] **Task: Author Module 1 question bank (seed content)**
  - [ ] Create `lib/practice-tests/modules/module-1.ts` with 3+ questions per lesson (8 lessons)
  - [ ] Wire into `getModuleConfig(1)` lookup
  - [ ] Write tests verifying question bank structure

- [ ] **Task: Author remaining module question banks (M2-M9)**
  - [ ] Create module files M2-M9 with 3+ questions per lesson
  - [ ] Wire all into `getModuleConfig` lookup
  - [ ] Verify all 9 modules return valid configs

- [ ] **Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)**

## Phase 2: Convex Schema and Persistence

### Tasks

- [ ] **Task: Add Convex tables for practice test results and study sessions**
  - [ ] Write schema migration tests
  - [ ] Add `practice_test_results` table with indexes (by_user, by_user_and_module, by_user_and_completed)
  - [ ] Add `study_sessions` table with indexes (by_user, by_user_and_activity, by_user_and_started)
  - [ ] Wire into `convex/schema.ts`

- [ ] **Task: Implement Convex queries and mutations**
  - [ ] Write tests for `savePracticeTestResult` and `getPracticeTestResults` in `convex/__tests__/study.test.ts`
  - [ ] Implement `convex/study.ts` with save, record session, and get results functions
  - [ ] Add `activityType` union: `"flashcards" | "matching" | "speed_round" | "srs_review" | "practice_test"`

- [ ] **Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)**

## Phase 3: Test Engine UI

### Tasks

- [ ] **Task: Implement PracticeTestEngine component**
  - [ ] Write component tests for 6-phase state machine in `__tests__/components/student/PracticeTestEngine.test.tsx`
  - [ ] Implement `PracticeTestEngine.tsx` with phase transitions, answer handling, score tracking
  - [ ] Implement post-answer feedback (highlight correct, dim incorrect, show explanation)

- [ ] **Task: Implement PracticeTestSelection component**
  - [ ] Write component tests for module card grid in `__tests__/components/student/PracticeTestSelection.test.tsx`
  - [ ] Implement `PracticeTestSelection.tsx` with 9 module cards linking to test pages

- [ ] **Task: Create route pages and persistence wiring**
  - [ ] Create `app/student/study/practice-tests/page.tsx` (selection, auth guard)
  - [ ] Create `app/student/study/practice-tests/[moduleNumber]/page.tsx` (engine wrapper)
  - [ ] Wire `onComplete` to save result + record session via Convex mutations

- [ ] **Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)**
