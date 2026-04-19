# Implementation Plan: High-Priority Tech Debt Resolution

## Phase 1: Type Safety and Dead Code (BM2)
- [ ] Task: Add generic type parameter support to `fetchInternalQuery` in `apps/bus-math-v2/lib/convex/server.ts` or wherever it is defined.
- [ ] Task: Update usage of `fetchInternalQuery` in BM2 API routes to utilize the new generic types.
- [ ] Task: Remove the `ctx.transaction()` call from `apps/bus-math-v2/convex/activities.ts`.
- [ ] Task: Conductor - User Manual Verification 'Type Safety and Dead Code (BM2)' (Protocol in workflow.md)

## Phase 2: SRS Data Integrity and Misconceptions
- [ ] Task: Audit and fix the `studentId` type mismatch between `SrsCardState` (string) and the Convex schema (`Id<"profiles">`) in `lib/srs/convexCardStore.ts` and related files.
- [ ] Task: Fix the review submission flow to ensure misconception tags are properly extracted from evidence and persisted to the Convex database.
- [ ] Task: Verify `getMisconceptionSummary` returns accurate tag counts.
- [ ] Task: Conductor - User Manual Verification 'SRS Data Integrity and Misconceptions' (Protocol in workflow.md)

## Phase 3: Chatbot Authorization Seeding
- [ ] Task: Create a seed script or fallback mechanism to populate the `class_lessons` table, ensuring teachers have assigned lessons to classes.
- [ ] Task: Verify the AI tutoring chatbot properly enforces lesson ownership based on the seeded `class_lessons` data.
- [ ] Task: Conductor - User Manual Verification 'Chatbot Authorization Seeding' (Protocol in workflow.md)

## Phase 4: Finalize BM2 Package Adoption
- [ ] Task: Delete duplicate auth logic in `apps/bus-math-v2/lib/auth/` and rewire imports to `@math-platform/core-auth`.
- [ ] Task: Delete duplicate practice engine code in `apps/bus-math-v2/lib/practice/` and rewire imports to `@math-platform/practice-core`.
- [ ] Task: Conductor - User Manual Verification 'Finalize BM2 Package Adoption' (Protocol in workflow.md)