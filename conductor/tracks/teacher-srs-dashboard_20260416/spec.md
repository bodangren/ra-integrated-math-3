# Teacher-Facing SRS Dashboard — Specification

## Context

Teachers need visibility into how students are progressing through daily practice. The SRS system (Track 5) produces card states, review logs, and proficiency data (Track 10). This track surfaces that data in actionable teacher views integrated into the existing teacher dashboard at `app/teacher/dashboard/`.

**Existing code this track depends on:**
- Track 1 — `SrsCardState`, `SrsReviewLogEntry`, `SrsSessionConfig`, `TEACHER_DAILY_PRACTICE_COPY`
- Track 5 (`convex-srs-schema_20260416`) — `srs_cards`, `srs_review_log`, `srs_sessions` Convex tables
- Track 10 (`objective-proficiency_20260416`) — `getTeacherClassProficiency` query returns per-objective class proficiency
- Track 4 (`practice-item-blueprint_20260416`) — `problem_families`, `objective_policies`
- `app/teacher/dashboard/page.tsx` — existing teacher dashboard page
- `components/teacher/` — existing teacher components
- `lib/teacher/` — existing teacher utility modules
- Auth: `profiles` table with `role` field, `requireTeacherSessionClaims` for route protection

**What this track builds (all new):**
- SRS dashboard section within existing teacher dashboard
- Convex queries for class-wide SRS health metrics
- Weak objectives panel with priority sorting
- Struggling students panel
- Misconception diagnostics aggregator
- Basic intervention mutations (priority change, card reset, extra cards)
- Student detail SRS view extension

## Goals

1. Build teacher SRS dashboard page/section showing class-wide SRS health metrics.
2. Identify weak objectives where <50% of class is proficient, sorted by essential priority.
3. Identify struggling students by overdue load and retention strength.
4. Aggregate misconception tags from recent review logs for class-wide diagnostics.
5. Enable basic interventions: priority adjustment, card reset, extra card assignment.
6. Extend student detail view with per-objective SRS card states and review history.

## Functional Requirements

### SRS Dashboard Page

New section within `app/teacher/dashboard/page.tsx` (or a dedicated sub-page at `app/teacher/dashboard/srs/page.tsx`). Server component fetching class-wide SRS data via Convex queries. Must be gated by `requireTeacherSessionClaims`.

### Class Health Overview

Top-level metrics card showing:
- Total active students vs students who practiced today
- Average class retention across all objectives (mean of card stability or `scheduledDays`)
- Overdue review load: total overdue cards across all students
- Practice streaks: students with longest daily streaks (top 5)

Data sourced from `srs_cards` and `srs_sessions` tables.

### Weak Objectives Panel

List objectives where <50% of class is proficient. For each objective, show:
- Standard code
- Description
- % proficient
- Average retention strength
- Number of struggling students

Sort by priority (essential first) then by proficiency ascending. Data sourced from `getTeacherClassProficiency` (Track 10) joined with objective metadata.

### Struggling Students Panel

Students ranked by urgency. For each student, show:
- Student name
- Overdue card count
- Average retention strength
- Weakest objective

Derived from `srs_cards` aggregation grouped by student.

### Misconception Diagnostics

Aggregate `misconceptionTags` from recent review logs (`srs_review_log`). Show:
- Most common misconceptions across the class with frequency counts
- Link to affected objectives
- Time-windowed (last 7 days default, configurable)

### Interventions (Basic)

Teacher actions for managing SRS:
- **Adjust objective priority**: Change essential → triaged or vice versa. Updates `objective_policies`.
- **Reset student card**: Re-card a specific objective for a student from scratch (state → new, clear scheduling).
- **Add extra new cards**: Assign additional new cards for a student on a weak objective.

### Student Detail SRS View

Extension of existing student detail page (under `app/teacher/students/`) showing:
- Card states per objective (new, learning, review, relearning)
- Review history (last 20 reviews with ratings and timestamps)
- Timing patterns (average response time per objective)
- Proficiency breakdown per objective

## Non-Functional Requirements

1. Dashboard must load in <3s for a class of 30 students.
2. Use indexed Convex queries — no collection scans on `srs_cards` or `srs_review_log`.
3. No N+1 query patterns — aggregate in Convex, not on the client.
4. Accessible: all panels meet WCAG 2.1 AA.
5. Responsive: usable on tablet (768px) and desktop.
6. Uses existing styling: Tailwind CSS, shadcn/ui, oklch colors, `font-display` (Lora), `font-body` (DM Sans).
7. Data visualization via recharts (already in project).

## Dependencies

- Track 1 (`srs-product-contract_20260416`) — types, `TEACHER_DAILY_PRACTICE_COPY` instructional language
- Track 5 (`convex-srs-schema_20260416`) — `srs_cards`, `srs_review_log`, `srs_sessions` Convex tables
- Track 10 (`objective-proficiency_20260416`) — `getTeacherClassProficiency` query
- Track 4 (`practice-item-blueprint_20260416`) — `problem_families`, `objective_policies`

## Acceptance Criteria

1. Teacher can view class SRS health overview with active students, retention, overdue load, streaks.
2. Weak objectives panel shows actionable data sorted by essential priority then proficiency.
3. Struggling students identified with overdue count, retention, and weakest objective.
4. Misconception tags aggregated from review logs with frequency and objective links.
5. Basic interventions work: priority change, card reset, extra card assignment.
6. Student detail page shows SRS data: card states, review history, timing, proficiency.
7. Dashboard loads in <3s for class of 30 students.
8. `npm run lint` and `npm run typecheck` pass.
9. All new queries and mutations have passing tests.

## Out Of Scope

- Advanced interventions (AI-powered recommendations, auto-assignments)
- Parent-facing reporting
- Student-facing proficiency detail views
- Real-time updates (WebSocket) — polling or manual refresh is acceptable
- Multi-class comparison or cross-class analytics
