# Implementation Plan: Error Analysis Unit Tests

## Phase 1: Test Infrastructure and Authorization Tests

### Tasks

- [ ] **Task: Create error-analysis test file**
  - Create `lib/practice/error-analysis/error-analysis.test.ts`
  - Import types from `../contract` and functions from `../index`
  - Set up `describe` blocks for each function group

- [ ] **Task: Write authorization function tests**
  - Test `canTeacherAccessSubmission`: same org + same teacher → true
  - Test `canTeacherAccessSubmission`: same org + no submissionTeacherId → true
  - Test `canTeacherAccessSubmission`: different org → false
  - Test `canTeacherAccessSubmission`: same org + different teacher → false
  - Test `canTeacherAccessLessonSummary`: same pattern coverage

## Phase 2: Aggregation Function Tests

### Tasks

- [ ] **Task: Write aggregateMisconceptionTags tests**
  - Empty submissions array → empty array
  - Single submission, single tag → correct count
  - Multiple submissions with same/different tags
  - Student deduplication (same student across parts)
  - Sort order verification (descending count)

- [ ] **Task: Write summarizePartOutcomes tests**
  - Empty submissions → empty array
  - Single part, multiple submissions (accuracy calculation)
  - Multiple parts with mixed correct/incorrect
  - Misconception tag aggregation within parts
  - Accuracy rate = correctCount / totalAttempts

- [ ] **Task: Write buildStudentProfiles tests**
  - Single submission maps correctly
  - Multiple submissions produce multiple profiles
  - Misconceptions are deduplicated
  - correctParts + incorrectParts = totalParts

## Phase 3: Summary Assembly and View Builder Tests

### Tasks

- [ ] **Task: Write buildDeterministicSummary tests**
  - Integration: combines all aggregation functions
  - topMisconceptions limited to 10 items
  - averageAccuracy = totalCorrect / totalParts
  - studentCount from unique profiles
  - generatedAt is timestamp

- [ ] **Task: Write generateAISummary tests (with mock)**
  - No AI provider → returns null
  - Mock provider is called with expected prompt structure
  - parseAIResponse handles response lines correctly
  - Error in AI provider → returns null (try/catch)

- [ ] **Task: Write buildTeacherErrorView tests**
  - Correctly maps submission fields
  - deterministicSummary attached
  - aiSummary attached (null and non-null cases)
  - rawParts and rawAnswers mapped

## Phase 4: Verification

### Tasks

- [ ] **Task: Run tests and verify**
  - Run `npm test -- --testPathPattern="error-analysis" --coverage`
  - Verify all 8 functions have coverage
  - No TypeScript errors: `npm run typecheck`

- [ ] **Task: Finalize and commit**
  - Update metadata.json actual_tasks
  - Commit with git note