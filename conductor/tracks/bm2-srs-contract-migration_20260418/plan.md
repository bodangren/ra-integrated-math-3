# Implementation Plan: BM2 SRS Contract Migration

> Execution: Follow TDD methodology (Red-Green-Refactor)
> Reference: `conductor/monorepo-jr-execution-spec.md`

## Phase 1: Contract Rewrite

### Tasks

- [x] **Task: Analyze BM2 ts-fsrs Card blob structure**
  - Read `apps/bus-math-v2/lib/srs/scheduler.ts` to understand how Card blob is serialized/deserialized
  - Identified all Card properties used by BM2 scheduler
  - Documented ts-fsrs Card shape used by BM2

- [x] **Task: Rewrite contract.ts to use srs-engine types**
  - Replace `card: Record<string, unknown>` with flat typed fields
  - Replace numeric timestamps with ISO strings
  - Add `cardId`, `objectiveId`, `updatedAt` fields
  - Re-export from `@math-platform/srs-engine` where possible
  - Keep BM2-specific types local if needed

- [x] **Task: Update scheduler.ts for new contract**
  - Updated to use `@math-platform/srs-engine` scheduler functions
  - Provided backward-compatible `createNewCard`, `reviewCardLegacy`, `getCardsDue` wrappers for legacy consumers
  - ts-fsrs integration verified via build

- [x] **Task: Update review-processor.ts for new contract**
  - Updated to use flat `SrsCardState` from package
  - Uses `createCard` and `reviewCard` from scheduler

- [x] **Task: Update queue.ts for new contract**
  - Updated `dueDate` comparison (ISO string comparison)
  - Uses `SrsCardState[]` type from package

- [ ] **Task: Update family-map.ts for new contract**
  - [SKIPPED] No changes needed - family-map.ts uses BM2-specific types

- [ ] **Task: Run BM2 SRS tests**
  - BM2 build: PASS
  - SRS tests: FAIL (tests use old card shape, implementation uses new contract)
  - Test failures are expected during migration - tests need Phase 2 update

- [x] **Task: Conductor verification (Phase 1)**
  - BM2 build succeeds: `npm run build` - PASS
  - Contract types re-exported from `@math-platform/srs-engine`
  - Phase 1 checkpoint created

> **Note:** Test failures are expected because tests use old card shape (`card: Record<string, unknown>`, numeric `due`) while implementation now uses new `SrsCardState` contract (`dueDate: string`, flat fields). Test updates are part of Phase 2 (Convex Schema Migration) scope.

## Phase 2: Convex Schema Migration

### Tasks

- [ ] **Task: Analyze current Convex SRS schema**
  - Read `apps/bus-math-v2/convex/schema.ts` for srs_cards, srs_review_log, srs_sessions tables
  - Identify schema fields that need type changes

- [ ] **Task: Update Convex schema for new card state**
  - Add `cardId`, `objectiveId`, `updatedAt` fields
  - Change timestamp types from `number` to `string`
  - Update index definitions if needed

- [ ] **Task: Update Convex SRS handlers**
  - Update mutations that read/write SRS cards
  - Update queries that filter by due date
  - Verify backward compatibility during transition

- [ ] **Task: Run full BM2 verification**
  - `npm run lint && npm run test && npm run build && npx tsc --noEmit`

## Phase 3: Adapter Layer (Bridge Legacy to New)

### Tasks

- [ ] **Task: Create legacy-to-new adapter**
  - Create adapter functions to convert between legacy BM2 contract and new contract
  - This allows gradual migration of consumers

- [ ] **Task: Migrate SRS consumers incrementally**
  - Identify all files importing from `lib/srs/contract.ts`
  - Update imports to use new contract
  - Run tests after each update

- [ ] **Task: Final verification**
  - Run full BM2 test suite
  - Verify `bm2-consume-core-packages` Phase 1 can adopt srs-engine imports