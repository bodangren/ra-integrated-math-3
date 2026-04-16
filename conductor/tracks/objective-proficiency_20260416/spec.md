# Track: objective-proficiency_20260416

## Context

`objective-proficiency.ts` already computes proficiency from `ProblemFamilyEvidence` inputs (retentionStrength, practiceCoverage, fluencyConfidence). Currently these inputs are manually constructed. This track builds the pipeline that: queries SRS cards for an objective → aggregates FSRS stability → normalizes to retentionStrength → computes fluencyConfidence from timing data → feeds into existing `computeObjectiveProficiency`.

Existing exports from `lib/practice/objective-proficiency.ts`:
- `computeObjectiveProficiency` — pure function, takes `ProblemFamilyEvidence[]`, returns `ObjectiveProficiencyResult`
- `ObjectivePracticePolicy`, `PRIORITY_DEFAULTS` — policy configuration
- `buildStudentProficiencyView`, `buildTeacherProficiencyView` — view builders
- `StudentProficiencyView`, `TeacherProficiencyView` — view types

Existing SRS infrastructure:
- `lib/practice/srs-rating.ts` — `SrsRating` type
- Convex `srs_cards` table — fields: stability, difficulty, reps, lapses
- Convex `srs_review_log` table — timing data
- Convex `problem_families` table (Track 4) — links `problemFamilyId` to `objectiveIds`

## Goals

- Build the aggregation pipeline from FSRS card states to `ProblemFamilyEvidence`
- Normalize FSRS stability (unbounded float) to 0-1 retention scale
- Compute per-objective proficiency from real SRS data
- Provide Convex queries for student and teacher proficiency views

## Functional Requirements

### FR-1: FSRS Stability Normalization

FSRS stability is the estimated number of days before retention drops to the target rate. Higher = better retention. Normalize using a sigmoid:

```
retentionStrength = 1 - (1 / (1 + stability / scaleFactor))
```

Where `scaleFactor` adjusts sensitivity. Default `scaleFactor`: 30.

| Stability (days) | retentionStrength |
|-------------------|-------------------|
| 0                 | 0.0               |
| 30                | 0.5               |
| 90                | 0.75              |
| 300+              | 0.9+              |

### FR-2: Card-to-Evidence Aggregation

For each objective, collect all cards across problem families. Per problem family:
- Compute average normalized stability as `retentionStrength`
- Compute `practiceCoverage` from reps count (proportion of cards with reps > 0)
- Compute `fluencyConfidence` from timing baselines and timing confidence of recent reviews

### FR-3: Objective Proficiency Query

Convex query that takes `studentId` + optional `objectiveId`, fetches cards, aggregates into `ProblemFamilyEvidence[]`, calls `computeObjectiveProficiency`, returns `ObjectiveProficiencyResult`.

### FR-4: Student Proficiency Summary

Convex query returning all objective proficiencies for a student, grouped by priority, with overall course progress. Uses `buildStudentProficiencyView`.

### FR-5: Teacher Class Proficiency

Convex query returning proficiency aggregated across all students in a class. Shows:
- Count proficient per objective
- Average retention
- Struggling students list

### FR-6: Backward Compatibility

The existing `objective-proficiency.ts` functions remain unchanged. This track adds aggregation functions that PRODUCE the inputs those functions already accept.

## Non-Functional Requirements

- Aggregation must be efficient: indexed reads, bounded results
- Stability normalization must be documented and tested
- No changes to existing `objective-proficiency.ts` function signatures

## Acceptance Criteria

- `stabilityToRetention` normalization function tested with edge cases
- Card-to-evidence aggregation tested with sample card states
- Convex queries return proficiency for real data
- Student view shows per-objective proficiency with FSRS-based retention
- Teacher view shows class-level aggregation
- Existing tests continue passing

## Dependencies

- Track 1 (types)
- Track 2 (scheduler)
- Track 4 (problem families)
- Track 5 (card persistence)

## Out of Scope

- Student UI for proficiency display (use Track 9 components)
- Teacher UI (Track 11)
- Changing `PRIORITY_DEFAULTS`
