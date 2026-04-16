# Track: Student Daily Practice

**Track ID:** `student-daily-practice_20260416`
**Type:** Feature
**Status:** New
**Created:** 2026-04-16

---

## Context

Students need a daily practice flow separate from lesson-based learning. When they visit daily practice, they see SRS-scheduled review items and new practice cards. The queue engine (Track 8) provides the ordered list. Activity components render each item. Submissions go through the existing `practice.v1` pipeline plus the SRS adapter (Track 6).

Existing infrastructure:
- Student routes: `app/student/dashboard/page.tsx`, `app/student/lesson/[lessonSlug]/`
- Activity components: `components/activities/`, activity registry at `lib/activities/registry.ts`
- Practice contract: `lib/practice/contract.ts` (`PracticeSubmissionEnvelope`)
- Timing: `lib/practice/timing.ts` (`TimingAccumulator`), `hooks/usePracticeTiming`
- Queue engine (Track 8): `getDailyPracticeQuery` returns ordered queue items with resolved activities
- Convex (Track 5): `srs_cards`, `srs_sessions`, `activity_submissions` tables
- Auth: `profiles` table, `requireStudentSessionClaims` for route protection

---

## Goals

- Build student daily practice page at `app/student/practice/page.tsx`
- Implement session flow (start → review cards → complete)
- Render practice items using existing activity components
- Handle submissions with timing and SRS card updates
- Show progress and completion states

---

## Functional Requirements

### FR-1: Daily Practice Page

New page at `app/student/practice/page.tsx`. Server component that checks auth, fetches active session or creates new one. Shows daily practice session with card navigation.

### FR-2: Session Flow

1. Student navigates to `/student/practice`
2. Page loads active session or starts new one via queue engine
3. Student sees first card with activity component
4. Student answers → submission processed → SRS card updated → next card shown
5. After all cards → completion screen with progress summary

### FR-3: Card Rendering

Each queue item resolves to an activity. Use existing `ActivityComponentProps` pattern (`activity`, `onSubmit`, `onComplete`). Wrap with timing instrumentation (`usePracticeTiming` hook). Include card progress indicator (X of Y cards).

### FR-4: Submission Flow

On submit, build `PracticeSubmissionEnvelope` with timing. Submit to `activity_submissions` AND trigger SRS adapter (Track 6) to update card state. Show brief feedback (correct/incorrect) before advancing.

### FR-5: Progress Display

Show cards remaining, cards completed. Use instructional language from Track 1 (`STUDENT_DAILY_PRACTICE_COPY`). Show completion state: "All done for today! Come back tomorrow."

### FR-6: Dashboard Integration

Add "Daily Practice" card to student dashboard (`app/student/dashboard/page.tsx`) showing: items due today, streak, last practiced date.

### FR-7: Empty State

When no cards are due, show encouraging message: "No practice due today. Come back tomorrow!"

---

## Non-Functional Requirements

- Page must load in <2s (use indexed Convex queries)
- Timing instrumentation must not interfere with activity rendering
- Accessible (keyboard nav, screen reader)
- Responsive (mobile-friendly)

---

## Acceptance Criteria

- [ ] Student can navigate to `/student/practice` and complete a daily practice session
- [ ] Submissions update SRS card state
- [ ] Timing evidence is captured
- [ ] Completion screen shows progress
- [ ] Dashboard card shows practice status
- [ ] Empty state handled when no cards due
- [ ] Tests pass for all components

---

## Dependencies

- Track 1 (types, instructional language)
- Track 5 (persistence — Convex tables)
- Track 6 (submission adapter — SRS updates)
- Track 8 (queue engine — `getDailyPracticeQuery`)

---

## Out of Scope

- Teacher dashboard (Track 11)
- Objective proficiency display (Track 10)
- Lesson-based practice
