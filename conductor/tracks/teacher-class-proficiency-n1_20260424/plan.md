# Plan: Fix getTeacherClassProficiencyHandler N+1 Queries

## Phase 1: Pre-fetch Data Outside S×O Loop

- [ ] Task: Write test for getTeacherClassProficiencyHandler query count reduction
    - [ ] Create test that mocks Convex DB and verifies pre-fetch queries are called once, not per-objective
    - [ ] Verify output matches pre-refactor behavior

- [ ] Task: Pre-fetch problem_families into objectiveId→families Map
    - [ ] Collect all unique objectiveIds from all student cards
    - [ ] Batch-fetch all problem_families with by_objectiveId index
    - [ ] Build Map<string, ProblemFamily[]> keyed by objectiveId

- [ ] Task: Pre-fetch timing_baselines for all problem family IDs
    - [ ] Collect all unique problemFamilyIds from pre-fetched families
    - [ ] Batch-fetch all timing_baselines with by_problem_family index
    - [ ] Build TimingBaselines map

- [ ] Task: Pre-fetch activity_submissions for all students
    - [ ] Collect all unique studentIds
    - [ ] Batch-fetch all activity_submissions with by_user index per student
    - [ ] Build Map<studentId, submission[]> for fetchSubmissionTimings

- [ ] Task: Pre-fetch competency_standards and objective_policies
    - [ ] Batch-fetch all competency_standards by_code for all objectiveIds
    - [ ] Batch-fetch all objective_policies by_standardId for matched standards
    - [ ] Build lookup Maps

- [ ] Task: Refactor computeProficiencyForObjective to accept pre-fetched data
    - [ ] Add PreFetchedData parameter type
    - [ ] Replace internal DB queries with Map lookups
    - [ ] Update getTeacherClassProficiencyHandler to build and pass PreFetchedData

- [ ] Task: Run full test suite, typecheck, and build
    - [ ] Run `npx vitest run` in apps/integrated-math-3
    - [ ] Run `npx tsc --noEmit` in apps/integrated-math-3
    - [ ] Run `npm run build` in apps/integrated-math-3
    - [ ] Fix any failures

- [ ] Task: Update tech-debt.md and lessons-learned.md
    - [ ] Mark getTeacherClassProficiencyHandler N+1 as Resolved in tech-debt.md
    - [ ] Add lesson about batch pre-fetching for nested loop patterns

- [ ] Task: Commit with checkpoint
    - [ ] Stage changes
    - [ ] Commit with model name in subject line
