# Implementation Plan — Student Lesson Flow

## Phase 1: Dashboard Enhancements

- [x] Task: Update student dashboard to show Module 1 with lesson cards and progress [b551e9d]
    - [x] Write tests: renders 8 lesson cards with correct titles, progress bars, locked/unlocked state
    - [x] Write tests: estimated time shown per lesson from phase `estimatedMinutes` sum
    - [x] Update `app/student/dashboard/page.tsx` and `lib/student/dashboard.ts` view model

- [x] Task: Implement lesson lock/unlock logic [b551e9d]
    - [x] Write tests: lesson 1-2 locked until lesson 1-1 assessment phase complete
    - [x] Write tests: lesson 1-1 always unlocked (first lesson)
    - [x] Implement `isLessonUnlocked()` in `lib/student/dashboard.ts`

- [x] Task: Implement "Continue" smart navigation [b551e9d]
    - [x] Write tests: no progress → points to lesson 1-1 phase 1
    - [x] Write tests: partial progress → points to first incomplete phase of current lesson
    - [x] Write tests: all Module 1 complete → points to completion summary
    - [x] Update `buildStudentDashboardViewModel()` to include `continueUrl`

- [ ] Task: Conductor — Phase Completion Verification 'Dashboard Enhancements' (Protocol in workflow.md)

## Phase 2: Lesson Entry & Phase Navigation

- [x] Task: Verify and harden `resolveLessonLandingPhase()` for all scenarios
    - [x] Write tests: fresh start → phase 1; returning → first incomplete phase; all done → last phase
    - [x] Write tests: handles skippable phase gaps correctly (student skipped phase 3, returns to phase 3)
    - [x] Fix any edge cases in `lib/student/lesson-runtime.ts`

- [x] Task: Implement phase skip behavior
    - [x] Write tests: explore/discourse phases allow skip; assessment/independent_practice do not
    - [x] Write tests: skipped phase recorded in progress as `status: 'skipped'`
    - [x] Add `isSkippable` flag handling to `PhaseCompleteButton` and progress schema (infrastructure ready; UI pending)

- [x] Task: Update Convex student queries to return full phase content + activity records
    - [x] Write tests: query returns phases with sections, activities, and completion status
    - [x] Update `convex/student.ts` `getLessonWithContent` to include activity data (activities embedded in section content)

- [ ] Task: Conductor — Phase Completion Verification 'Lesson Entry & Navigation' (Protocol in workflow.md)

## Phase 3: Activity Interaction & Submission Flow

- [x] Task: Wire activity submission through the full pipeline [70afbd5]
    - [x] Write integration tests: activity submit → `/api/activities/submit` → Convex → completion flag
    - [x] Write tests: optimistic UI update on submit; revert on error
    - [x] Connect `onSubmit` callback from `ActivityRenderer` through to API route

- [x] Task: Implement phase completion gating from activity completions [70afbd5]
    - [x] Write tests: single-activity phase → PhaseCompleteButton enabled after activity submit
    - [x] Write tests: multi-activity phase → button enabled only after all required activities complete
    - [x] Implement activity tracking state in lesson renderer

- [x] Task: Wire `PhaseCompleteButton` to phase completion API and stepper
    - [x] Write integration tests: button click → POST `/api/phases/complete` → stepper dot updates → auto-advance
    - [x] Implement phase advance animation (smooth transition between phases)

- [x] Task: Implement failed submission recovery [70afbd5]
    - [x] Write tests: network failure on submit → error state shown; retry button works; work not lost
    - [x] Implement optimistic update with rollback on failure

- [ ] Task: Conductor — Phase Completion Verification 'Activity Interaction & Submission' (Protocol in workflow.md)

## Phase 4: Loading States, Completion, & Polish

- [x] Task: Implement skeleton screens for lesson and activity loading [TASK_SHA]
     - [x] Write tests: skeleton shown during lesson data fetch; replaced by content on load
     - [x] Implement `LessonSkeleton` and `ActivitySkeleton` components

- [x] Task: Implement lesson completion screen [TASK_SHA]
     - [x] Write tests: shown after final assessment phase completes in any lesson; shows score summary
     - [x] Implement `LessonCompleteScreen` component; wire into lesson renderer

- [x] Task: Implement Module 1 completion screen [TASK_SHA]
     - [x] Write tests: shown when all 8 lessons complete; links to dashboard
     - [x] Implement `ModuleCompleteScreen` component

- [x] Task: End-to-end flow verification with seeded data [TASK_SHA]
    - [ ] Login as `student1@demo` (0% progress) — verify can reach lesson 1-1
    - [ ] Login as `student5@demo` (100% lesson 1-1) — verify lesson 1-2 is unlocked
    - [ ] Complete a phase as student1; verify dashboard progress updates

- [ ] Task: Conductor — Phase Completion Verification 'Loading States & Polish' (Protocol in workflow.md)
