# Plan: Session History Cursor Pagination

## Phase 1: IM3 Session History Pagination [ ]

- [ ] Write test: getStudentSessionHistory returns first page of 20 sessions
- [ ] Write test: getStudentSessionHistory with cursor returns next page
- [ ] Write test: getStudentSessionHistory returns empty cursor on last page
- [ ] Locate session history query in IM3 Convex code (likely `convex/student.ts` or `convex/srs/`)
- [ ] Add `.paginate()` or manual cursor logic with `q.order("desc")` on timestamp
- [ ] Ensure default page size is 20 with configurable max
- [ ] Verify existing session history UI consumes paginated response correctly

## Phase 2: BM2 Session History Pagination [ ]

- [ ] Write test: BM2 session history returns paginated results
- [ ] Locate session history query in BM2 Convex code
- [ ] Apply same cursor pagination pattern
- [ ] Verify BM2 session history UI works unchanged

## Phase 3: Performance Validation [ ]

- [ ] Write test: paginated query completes in under 200ms with 500 synthetic sessions
- [ ] Create benchmark test with mock data (500 sessions, 1000 sessions)
- [ ] Verify no N+1 patterns introduced by pagination
- [ ] Compare memory usage: paginated vs. fetch-all baseline

## Phase 4: Verification and Handoff [ ]

- [ ] Run full IM3 test suite — all tests pass
- [ ] Run full BM2 test suite — all tests pass
- [ ] Run `npx tsc --noEmit` — no type errors
- [ ] Run `npm run lint` — no errors
- [ ] Verify session history UI loads correctly with pagination
- [ ] Update tech-debt.md — mark session history pagination as Resolved
- [ ] Handoff
