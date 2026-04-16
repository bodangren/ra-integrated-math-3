# Specification: Teacher Gradebook & Competency Heatmaps

## Overview

Port the complete teacher reporting layer from `bus-math-v2`, adapting it for Integrated Math 3's module/lesson/phase schema. Adds course overview grid, unit-level gradebook, competency heatmaps with CCSS standards, submission detail modal, and a 3-level drill-down reporting IA.

## Source Reference

Port from `bus-math-v2/lib/teacher/gradebook.ts`, `bus-math-v2/lib/teacher/competency-heatmap.ts`, `bus-math-v2/lib/teacher/course-overview.ts`, `bus-math-v2/components/teacher/` (GradebookGrid, CourseOverviewGrid, CompetencyHeatmapGrid, SubmissionDetailModal, StudentCompetencyDetailGrid).

## Functional Requirements

### 1. Course Overview Grid (Level 1)

- Table: students (rows) × modules (columns)
- Each cell shows `avgMastery` percentage, colored by 4-color scheme (green ≥80, yellow 50-79, red <50, gray no data)
- Student name column is sticky/frozen, sortable ascending/descending
- Column headers and cells link to unit gradebook (Level 2)
- Uses `assembleCourseOverviewRows` pure function

### 2. Unit Gradebook (Level 2)

- Table: students (rows) × lessons (columns)
- Each cell shows `masteryLevel` + badge overlays for independent practice and assessment completion
- Clicking a cell opens SubmissionDetailModal
- Lesson column headers link to lesson monitoring (Level 3)
- Uses `assembleGradebookRows` pure function

### 3. Competency Heatmap

- Course-wide: students (rows) × CCSS standards (columns), mastery colored cells
- Clicking student row → `/teacher/students/[studentId]/competency` detail page
- Student detail: per-standard mastery with lesson context (which lesson, which module)
- Uses `assembleCompetencyHeatmapRows` and `assembleStudentCompetencyDetail` pure functions

### 4. Submission Detail Modal

- Full-screen overlay opened from gradebook cell click
- Shows: phase-by-phase evidence, per-part answers with correctness badges, misconception tags, scaffold usage (hints/reveals/edits), attempt number, score
- Mode filter tabs: All / Guided Practice / Independent Practice / Assessment

### 5. Reporting Drill-Down IA

- Navigation hierarchy: `/teacher/gradebook` → `/teacher/units/[moduleNumber]` → `/teacher/units/[moduleNumber]/lessons/[lessonId]`
- Breadcrumb navigation at each level
- Lesson monitoring page shows published lesson content with aggregated error summary

### 6. Color System (shared)

- Green: mastery ≥80 or completed → `bg-green-100 text-green-800`
- Yellow: mastery 50-79 or in_progress → `bg-yellow-100 text-yellow-800`
- Red: mastery <50 → `bg-red-100 text-red-800`
- Gray: no data → `bg-muted/30 text-muted-foreground`
- Accessibility labels via `cellColorLabel()`

## Non-Functional Requirements

- Gradebook loads for 30+ students without perceptible lag
- Color scheme meets WCAG AA contrast requirements
- Pure logic functions have >80% test coverage

## Acceptance Criteria

- [ ] Course overview shows all students with per-module mastery
- [ ] Unit gradebook shows per-lesson progress with clickable cells
- [ ] Submission detail modal shows full evidence for any student × lesson
- [ ] Competency heatmap shows CCSS standards mastery across students
- [ ] Student competency detail shows per-standard drill-down
- [ ] Breadcrumb navigation works across all levels
- [ ] All pure logic functions tested with >80% coverage

## Out of Scope

- Real-time live monitoring (current monitoring is read-only lesson content view)
- Teacher manual score overrides (future enhancement)
- Export to CSV/Excel
