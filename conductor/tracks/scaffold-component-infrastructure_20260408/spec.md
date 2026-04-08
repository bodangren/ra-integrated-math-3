# Specification — Scaffold Component Infrastructure

## Context

The IM3 platform architecture defines three key component directories (`components/student/`, `components/teacher/`, `components/dashboard/`) that are currently empty or missing. These directories are essential for organizing role-specific UI components as the platform grows.

Student-facing components include navigation, progress indicators, and lesson-specific UI. Teacher-facing components include gradebook tables, student cards, and course management tools. Dashboard components are shared between student and teacher dashboards (progress cards, unit selectors, etc.).

## Requirements

### Directory Structure

1. **Create component directories** — Ensure the following directories exist with proper structure:
   - `components/student/` — Student-specific UI components
   - `components/teacher/` — Teacher-specific UI components
   - `components/dashboard/` — Shared dashboard components

2. **Add index files** — Each directory should have an `index.ts` that exports all components for clean imports:
   ```typescript
   // components/student/index.ts
   export * from './StudentNavigation';
   export * from './ProgressCard';
   // etc.
   ```

### Student Components

3. **StudentNavigation** — Sidebar navigation for student view with links to dashboard, lessons, and settings. Collapsible on mobile.

4. **ProgressCard** — Shows unit/lesson progress with a progress bar and next lesson CTA.

5. **LessonCard** — Displays lesson metadata (title, number, phase count, completion status) with link to lesson page.

### Teacher Components

6. **TeacherNavigation** — Sidebar navigation for teacher view with links to dashboard, gradebook, students, units, and settings. Collapsible on mobile.

7. **StudentRow** — Table row component for student list with name, progress percentage, and action buttons (view details, messages).

8. **ClassOverviewCard** — Shows class statistics (total students, average progress, upcoming assignments).

### Dashboard Components

9. **UnitProgressCard** — Displays unit completion status with progress bar and lesson breakdown.

10. **NextLessonCard** — Prominent card showing the next lesson to complete with "Start Lesson" CTA.

11. **StatsSummary** — Grid of key metrics (lessons completed, time spent, average score, etc.).

## Acceptance Criteria

1. All three directories (`student/`, `teacher/`, `dashboard/`) exist with index.ts files
2. All 9 components are created with TypeScript types and proper props interfaces
3. All components render without errors in Storybook-style test pages
4. Components use oklch color tokens and work in both light and dark modes
5. Navigation components are responsive (collapsible on mobile)
6. Progress cards display correct progress values (0-100%)
7. Table rows use proper semantic HTML (`<tr>`, `<td>`, etc.)
8. All components have unit tests with >80% coverage
9. `npm run lint` and `npm run typecheck` pass
10. No new dependencies required

## Out of Scope

- Actual data fetching (components accept data as props)
- Convex integration (backend logic added in later tracks)
- Advanced UI features (animations, complex interactions)
- Integration with actual pages (wiring happens in Track 9: Student Lesson Flow and Track 10: Teacher Module 1 Experience)
