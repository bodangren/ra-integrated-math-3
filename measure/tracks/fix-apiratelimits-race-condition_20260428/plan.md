# Fix apiRateLimits Race Condition - Implementation Plan

## Phase 1: Fix Race Condition in checkAndIncrementApiRateLimitHandler

### Tasks

- [ ] Write test case that simulates concurrent requests (two simultaneous calls)
- [ ] Implement atomic upsert: try insert, catch duplicate, re-query and patch
- [ ] Verify tests pass
- [ ] Run full BM2 test suite
- [ ] Run typecheck and lint
- [ ] Build BM2

## Phase 2: Documentation and Finalization

### Tasks

- [ ] Update tech-debt.md (remove resolved item if applicable)
- [ ] Update lessons-learned.md
- [ ] Commit with note and push (model: minimax-m2)
- [ ] Update tracks.md with new track