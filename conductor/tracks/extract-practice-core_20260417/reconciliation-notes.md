# Reconciliation Notes

## Phase 2: Reconcile BM2 Deltas

> Created: 2026-04-18
> Track: extract-practice-core_20260417

## Canonical Source Decision

- **Canonical source: IM3 (extracted package)**
- Reason: Phase 1 extracted IM3's canonical practice primitives into `packages/practice-core`. The package version is a superset of BM2 with JSDoc additions, type improvements, and hardening fixes. No BM2 behavioral deltas need to be merged.

## Delta Classification

### contract.ts
- **Classification**: docs/comments only + minor feature addition
- **BM2 deltas**: None - BM2 is older (April 16) vs package (April 18)
- **Package additions**:
  - Extensive JSDoc comments on all exported symbols
  - `normalizePracticeValue` JSDoc examples added
  - `PracticeSubmissionPart` schema extended with optional timing fields (`firstInteractionAt`, `answeredAt`, `wallClockMs`, `activeMs`)
  - `normalizePracticeSubmissionInput` function added
  - Error message improved (`path: ['activeMs']` added to refine)
- **Decision**: Keep package version. No BM2 merge needed.

### timing.ts
- **Classification**: docs/comments only
- **BM2 deltas**: None - BM2 is older (April 16) vs package (April 18)
- **Package additions**:
  - JSDoc comments on all exported symbols, interfaces, and the `TimingAccumulator` class
  - Missing trailing newline added
- **Decision**: Keep package version. No BM2 merge needed.

### timing-baseline.ts
- **Classification**: docs/comments only
- **BM2 deltas**: None - BM2 is older (April 16) vs package (April 18)
- **Package additions**:
  - JSDoc comments on all exported types and functions
  - Missing trailing newline added
- **Decision**: Keep package version. No BM2 merge needed.

### srs-rating.ts
- **Classification**: docs/comments only + minor hardening
- **BM2 deltas**: None - BM2 is older (April 16) vs package (April 18)
- **Package additions**:
  - JSDoc comments on all exported symbols
  - Added comment `// Timing cannot upgrade Hard because hints/reveals already indicate supported work`
  - Missing trailing newline added
- **Decision**: Keep package version. No BM2 merge needed.

### error-analysis/index.ts
- **Classification**: bug/security hardening + required behavior
- **BM2 deltas**: None - BM2 is older (April 4) vs package (April 18)
- **Package additions**:
  - `PracticeSubmissionEvidence` interface added (type augmentation for submission evidence)
  - `SubmissionEvidence` interface added (unified evidence type for spreadsheet + practice)
  - Changed bare `catch` to `catch (err)` with `console.error` logging
  - Fixed null-coalescing: `p.score ?? 'N/A'` and `p.misconceptionTags ?? []`
- **Decision**: Keep package version. These are hardening improvements. No BM2 merge needed.

## App-Local Keep List

- **IM3**: `lib/practice/engine/**` (BM2-aligned business logic, stays app-local)
- **BM2**: All of BM2 `lib/practice/**` stays as-is; package is for shared primitives only

## Package API Decisions

### Exported symbols (from index.ts)

| Symbol | Source | Notes |
|--------|--------|-------|
| `PRACTICE_CONTRACT_VERSION` | contract.ts | practice.v1 version constant |
| `practiceModeSchema`, `practiceSubmissionStatusSchema` | contract.ts | Enumerated schemas |
| `practiceTimingConfidenceSchema`, `practiceTimingSummarySchema` | contract.ts | Timing types |
| `practiceSubmissionPartSchema`, `practiceSubmissionEnvelopeSchema` | contract.ts | Core submission schemas |
| `buildPracticeSubmissionParts`, `buildPracticeSubmissionEnvelope` | contract.ts | Factory functions |
| `normalizePracticeSubmissionInput` | contract.ts | Input normalization |
| `DEFAULT_IDLE_THRESHOLD_MS`, `TimingAccumulator` | timing.ts | Core timing accumulator |
| `computeTimingBaseline`, `deriveTimingFeatures` | timing-baseline.ts | Baseline computation |
| `SrsRating`, `mapPracticeToSrsRating` | srs-rating.ts | SRS rating mapping |
| All error-analysis exports | error-analysis/index.ts | Teacher error analysis |

### Intentionally not exported

- `normalizePracticeValue` (internal to contract.ts only)
- `buildAIPrompt`, `parseAIResponse` (internal to error-analysis only)

## Verification Results

| Command | Outcome |
|---------|---------|
| `cd packages/practice-core && npm run test` | Pending |
| `cd packages/practice-core && npm run lint` | Pending |
| `cd packages/practice-core && npm run typecheck` | Pending |
