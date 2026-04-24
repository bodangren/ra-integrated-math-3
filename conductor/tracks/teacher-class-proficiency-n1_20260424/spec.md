# Spec: Fix getTeacherClassProficiencyHandler N+1 Queries

## Overview

`getTeacherClassProficiencyHandler` in `convex/objectiveProficiency.ts` has a massive N+1 query pattern. For S students and O objectives, `computeProficiencyForObjective` is called S×O times, and each call performs ~3 additional DB queries (`problem_families`, `activity_submissions`, `timing_baselines`, `competency_standards`, `objective_policies`). For a class of 30 students and 20 objectives, this yields ~1,800 queries.

## Functional Requirements

1. Pre-fetch all `problem_families` once and build a Map keyed by objectiveId
2. Pre-fetch all `timing_baselines` once for all problem family IDs
3. Pre-fetch all `activity_submissions` once for all students
4. Pre-fetch all `competency_standards` and `objective_policies` once
5. Pass pre-fetched data into `computeProficiencyForObjective` instead of querying inside the loop
6. Preserve identical output — no behavioral change

## Acceptance Criteria

- Query count reduced from S×O×~3 to O(1) pre-fetches + S×O local lookups
- All existing tests pass
- Typecheck passes with 0 errors
- Build passes

## Out of Scope

- Changes to `getStudentProficiencySummaryHandler` (different N+1 pattern, lower priority)
- Schema changes or new indexes
- UI changes
