# Specification: Practice Test Engine

## Overview

Port the practice test engine from `bus-math-v2`, adapting it for Integrated Math 3's 9-module curriculum. Provides a summative assessment experience with lesson-scoped question selection, timed testing, immediate feedback, and persistent scores.

## Source Reference

Port from `bus-math-v2/lib/practice-tests/`, `bus-math-v2/components/student/PracticeTestEngine.tsx`, `bus-math-v2/components/student/PracticeTestSelection.tsx`, and `bus-math-v2/convex/study.ts`.

## Functional Requirements

### 1. Data Structures

- `PracticeTestQuestion` — id, lessonId, lessonTitle, prompt, correctAnswer, distractors[], explanation, objectiveTags[]
- `PracticeTestModuleConfig` — moduleNumber, lessons[], questions[], phaseContent, messaging
- Helper functions: `filterQuestionsByLessonIds`, `drawRandomQuestions` (Fisher-Yates), `shuffleAnswers`, `getModuleConfig`

### 2. Test Engine Component (PracticeTestEngine)

6-phase state machine: `hook → introduction → guided-practice → independent-practice → assessment → closing`

- **introduction**: lesson selection checkboxes, question count input (clamped 1..available)
- **assessment**: one-question-at-a-time, 4 answer buttons, immediate correct/incorrect feedback with explanation, continue button
- **closing**: score (X/Y + percentage), per-lesson breakdown table, retry button

### 3. Test Selection UI (PracticeTestSelection)

- Grid of 9 module cards (one per module)
- Each card shows module title, description, CTA button
- Links to `/student/study/practice-tests/[moduleNumber]`

### 4. Convex Persistence

- `practice_test_results` table: userId, moduleNumber, lessonsTested, questionCount, score, perLessonBreakdown, completedAt
- `study_sessions` table (shared with study hub): activityType "practice_test", results, durationSeconds
- Queries: `getPracticeTestResults(userId, moduleNumber?)`
- Mutations: `savePracticeTestResult`, `recordSession`

### 5. Post-Answer Feedback

- Answer buttons disable after selection
- Correct answer highlighted green, incorrect dimmed
- Feedback panel shows "Correct!"/"Incorrect" + explanation text
- Continue button advances to next question

## Non-Functional Requirements

- Questions load instantly (statically defined, no API call)
- Score persistence is fire-and-forget (does not block closing screen)
- Mobile-responsive card layout

## Acceptance Criteria

- [ ] Student can select any module and take a practice test
- [ ] Test draws random questions from selected lessons
- [ ] Immediate feedback with explanation shown after each answer
- [ ] Score and per-lesson breakdown persisted to Convex
- [ ] Student can retry a test with different questions
- [ ] Test results queryable by student and teacher
- [ ] All components tested with >80% coverage

## Out of Scope

- Timed tests (time limit per test)
- Teacher-authored question banks
- Adaptive difficulty
- Integration with SRS scheduling
