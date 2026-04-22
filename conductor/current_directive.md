# Current Directive

> Updated: 2026-04-23 (Code review #15 — audit of SRS misconception tags, atomic saves, content hash check, type alignment, date filter)

## Mission

Monorepo migration complete (Waves 0-6). All major feature tracks done. Current focus: security hardening, tech debt reduction, and preparing for next feature development cycle.

## Priority Order (Execute In This Order)

1. **BM2 deactivated-user access** — 7 API endpoints use JWT-only auth; need `requireActive*SessionClaims` to revoke access on deactivation
2. **BM2 rate limiting gaps** — 5 endpoints lack rate limiting; phases/complete, assessment, activities, error-summary, ai-error-summary
3. **BM2 chatbot prompt injection** — sanitizeInput is insufficient; add system prompt guard or LLM-based filter
4. **Convex generated types stale** — 5 production `as any` casts; run `npx convex dev` to regenerate
5. **RSC bundle optimization** — 750 KB entry chunk needs code-splitting (target < 500 KB)
6. **Convex schema `v.any()` fields** — 21 fields without runtime validation; incrementally add Zod schemas

## Non-Negotiable Rules

1. AI tutoring and workbook work in IM3 must be completed via BM2-derived package adoption
2. No dependency manager/install changes without explicit approval
3. Shared packages must not import from `apps/*` or app `convex/_generated/*`
4. BM2 business-domain code/assets remain app-local
5. Always run `npx tsc --noEmit` alongside `npm run build` — vinext build does not enforce TypeScript types
6. After extracting a package, **delete the app-local copy immediately** and rewire imports — duplicated code diverges silently
7. Never return `error.message` in API error responses — use generic messages + server-side logging

## Required Source Documents

- `conductor/monorepo-plan.md` — Roadmap and strategy
- `conductor/tracks.md` — Track registry and dependency order
- `conductor/tech-debt.md` — Tech debt backlog
- `conductor/workflow.md` — Core Conductor protocol

## Immediate Next Actions Checklist

- [x] Waves 0-6 complete (all packages extracted, IM3+BM2 imports migrated, CI/CD hardened)
- [x] Review #11 fixes (learningObjectives sanitization + abort listener leak)
- [x] Review #12 fixes (chatbot enrollment fallback + game streak bug + math sanitization)
- [x] Review #13 fixes (prompt injection via triple-quote delimiters + teacher UI revalidatePath)
- [x] Review #14 fixes (seed all units, functional class selector, info leakage, error handling, rate limiting)
- [x] Review #15 fixes (SrsRating type alignment in tests)
- [x] SRS misconception tag persistence + atomic saves + content hash guard
- [ ] BM2 deactivated-user access — swap getRequestSessionClaims for requireActive*SessionClaims on 7 endpoints
- [ ] BM2 rate limiting gaps — add rate limiting to 5 unprotected endpoints
- [ ] BM2 chatbot prompt injection — add system prompt guard beyond sanitizeInput
- [ ] RSC entry chunk code-splitting (750 KB → < 500 KB)
- [ ] Convex generated types regeneration (eliminate `as any` casts)
- [ ] Monorepo tech-debt triage Phase 2: SRS & Practice Correctness
- [ ] Monorepo tech-debt triage Phase 3: N+1 Query Performance

## Code Review Summary (2026-04-23 — Review #15)

Audit of 3 commits since Review #14 (6 work phases): SRS misconception tag persistence, atomic card+review saves, content hash mismatch guard, CardStore type alignment tests, completedAt filter performance comments, teacher misconception query optimization.

### Verification Results

| Check | Result |
|-------|--------|
| Typecheck (IM3) | ✅ Pass (after fix) |
| Lint (IM3) | ✅ Pass (0 warnings) |
| Tests (IM3) | ✅ 3296 passed, 6 todo |
| Build (IM3) | ✅ Pass |

### Issues Fixed in This Review

| Issue | Severity | Fix |
|-------|----------|-----|
| SrsRating case mismatch in convexCardStore.test.ts | Medium | Fixed 4 instances of `'good'` → `'Good'` to match SrsRating enum |

### Code Review Notes

**SRS Misconception Tags** — `submission-srs-adapter.ts` now collects `misconceptionTags` from submission parts and persists them in review evidence. Tags are deduplicated via `Set`. Schema extended in `srs-engine/src/srs/contract.ts`. Well-implemented with proper `undefined` omission when no tags present.

**Atomic Card+Review Save** — `ConvexCardStore.saveCardAndReview()` calls `processReviewHandler` directly instead of separate `runMutation` calls, ensuring card and review log are written in a single Convex transaction. The duck-type check in `submission-srs-adapter.ts` (`'saveCardAndReview' in this.cardStore`) is pragmatic; a future cleanup could formalize the interface.

**Content Hash Mismatch Guard** — `submitReviewHandler` in `dev.ts` now checks `existingApproval.contentHash !== componentContentHash` before allowing status updates. Prevents approving a component that has changed since the last review. Addresses the tech debt item "Approval status race condition" (partially — still not fully atomic, but materially safer).

**Handler Extraction** — `saveCardHandler`, `getCardHandler`, `getCardsByStudentHandler`, `getCardByStudentAndFamilyHandler` extracted from `cards.ts` anonymous functions to named exports for testability. `getCardsByObjective` and `getDueCards` were not extracted (minor inconsistency).

**Teacher Misconception Date Filter** — `getMisconceptionSummaryHandler` moved date filtering from JS `.filter()` to Convex `.filter((q) => q.gte(q.field("reviewedAt"), sinceMs))`. Reduces data transfer from DB. Semantically correct — uses `reviewedAt` which has an index (`by_reviewed_at`).

**Performance Comments** — Added explicit filter comments to `srs_sessions` and `queue/sessions.ts` for `completedAt=undefined` queries, documenting why the filter is necessary despite the index.

### Issues Found (Deferred)

| Issue | Severity | Notes |
|-------|----------|-------|
| 7 BM2 endpoints allow deactivated-user access | High | Need requireActive*SessionClaims |
| BM2 chatbot sanitizeInput too weak for prompt injection | Medium | Needs system prompt guard or LLM filter |
| 5 BM2 endpoints lack rate limiting | Medium | phases/complete, assessment, activities, error-summary, ai-error-summary |
| BM2 login has no input length limits | Medium | Multi-MB payloads risk |
| 21 `v.any()` fields in IM3 Convex schema | Medium | Incrementally add Zod schemas |
| BM2 ~30 files still import via re-export stubs | Low | Deferred migration to direct package imports |
| `saveCardHandler` uses `Date.now()` for updatedAt instead of args value | Low | Works correctly in current call sites but inconsistent with processReviewHandler pattern |
| `getCardsByObjective`/`getDueCards` not extracted to named handlers | Low | Inconsistent with other extracted handlers in cards.ts |
