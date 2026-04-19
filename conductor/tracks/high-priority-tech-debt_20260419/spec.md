# Specification: High-Priority Tech Debt Resolution

## Overview
This track addresses the most critical technical debt items accumulated during the monorepo migration and recent feature development. These items represent architectural drift, type safety gaps, and data integrity issues that threaten the stability of the Integrated Math 3 and Bus Math v2 applications.

## Functional Requirements
1. **BM2 Type Safety:** 
   - Add generic type parameters to `fetchInternalQuery` in BM2 to resolve ~130 silent TypeScript errors in API routes.
2. **BM2 Dead Code Removal:**
   - Remove the call to the non-existent `ctx.transaction()` API in `convex/activities.ts`.
3. **SRS Data Integrity:**
   - Resolve the `studentId` type mismatch between the SRS Contract (`string`) and the Convex Schema (`Id<"profiles">`) inside `CardStore`.
4. **Misconceptions Data Persistence:**
   - Fix the bug where misconception tags are not persisted in review evidence, causing `getMisconceptionSummary` to return empty.
5. **Chatbot Auth Seeding:**
   - Add a fallback or seed data for the `class_lessons` table to prevent the AI tutoring chatbot from defaulting to open-enrollment due to empty authorization tables.
6. **BM2 Package Adoption Completion:**
   - Replace the ~1,305 lines of duplicated practice engine code in BM2 with imports from `@math-platform/practice-core`.
   - Replace the ~250 lines of duplicated auth logic in BM2 with imports from `@math-platform/core-auth`.

## Out of Scope
- Fixing all ~296 legacy TS errors in BM2 (only the 130 related to untyped queries and the component type drift that are explicitly marked high).
- Re-architecting the deployment pipeline for Cloudflare (this will be a separate DevOps track).
- Adding missing package-level test coverage (handled in separate testing tracks).

## Acceptance Criteria
- [ ] BM2 API routes have full type safety for `fetchInternalQuery` calls.
- [ ] `ctx.transaction()` is removed from `convex/activities.ts`.
- [ ] `studentId` types align perfectly between the SRS contract and Convex schema without casting.
- [ ] Submitting a review with misconception tags correctly persists them to the database and `getMisconceptionSummary` returns accurate data.
- [ ] The `class_lessons` table has seed data, and the chatbot correctly enforces enrollment ownership.
- [ ] BM2's local `lib/practice/` and `lib/auth/` directories are significantly reduced or removed, fully utilizing the shared monorepo packages.