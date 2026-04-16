# Specification: Error Analysis Unit Tests

## Overview

Add comprehensive unit tests for the `lib/practice/error-analysis/index.ts` module which contains 8 untested exported functions with non-trivial aggregation logic.

## Context

The error-analysis module provides teacher practice error analysis with deterministic and AI-assisted error summaries. The module has the following exported functions that need test coverage:

1. `canTeacherAccessSubmission` — authorization check
2. `canTeacherAccessLessonSummary` — authorization check
3. `aggregateMisconceptionTags` — aggregates misconception tags across submissions
4. `summarizePartOutcomes` — summarizes part-level outcomes with accuracy rates
5. `buildStudentProfiles` — builds student error profiles from submissions
6. `buildDeterministicSummary` — orchestrates full deterministic summary
7. `generateAISummary` — async AI-assisted interpretation (mock-able)
8. `buildTeacherErrorView` — assembles teacher error view

Tech debt item #17 (High, Open): "No unit tests for error-analysis module (8 exported functions)"

## Functional Requirements

### Test Coverage Requirements

- **Authorization functions**: Test truth table for org/teacher ID matching
- **Aggregation functions**: Test with multiple submissions, parts, tags
- **Edge cases**: Empty submissions, no misconceptions, single student, multiple submissions per student
- **buildDeterministicSummary**: Integration test of all aggregation functions
- **generateAISummary**: Mock the AI provider and verify prompt building and response parsing
- **buildTeacherErrorView**: Verify correct assembly of all parts

### Test Data Patterns

Follow existing test conventions in the project:
- Use `describe`/`it` blocks matching the function names
- Create realistic `PracticeSubmissionEnvelope` fixtures
- Use `describe.each` for parameterized cases where appropriate

## Non-Functional Requirements

- Tests must be fast (pure functions, no I/O)
- Tests must be deterministic
- Follow existing test file naming: `lib/practice/error-analysis/*.test.ts`

## Acceptance Criteria

1. All 8 exported functions have dedicated test coverage
2. Edge cases covered: empty inputs, single items, multiple items, duplicate tags
3. Mock-based test for `generateAISummary` verifies prompt structure and response parsing
4. Tests pass: `npm test -- --testPathPattern="error-analysis"`
5. No TypeScript errors introduced

## Out of Scope

- Integration tests with actual Convex database
- AI provider integration tests (only mock)
- Testing internal helper functions (`buildAIPrompt`, line-based `parseAIResponse` directly)