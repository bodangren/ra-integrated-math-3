# Tech Debt Registry

> This file is curated working memory, not an append-only log. Keep it at or below **50 lines**.
> Remove or summarize resolved items when they no longer need to influence near-term planning.
>
> **Severity:** `Critical` | `High` | `Medium` | `Low`
> **Status:** `Open` | `Resolved`

| Item | Sev | Status | Notes |
|------|-----|--------|-------|
| Misconception tags not persisted in review evidence | High | Resolved | submission-srs-adapter now persists tags in review evidence |
| SRS sessions: by_student_and_status index relies on undefined sorting | High | Open | No explicit filter for completedAt=undefined |
| Approval status race condition (no version/lock) | High | Open | Content hash mismatch check added (review-15); still not fully atomic but materially safer |
| N+1 query: phase sections in progress/preview/monitoring queries | High | Open | One DB query per phase inside loop |
| Deactivated users can access BM2 API routes | High | Open | 7 endpoints use JWT-only verification; need requireActive*SessionClaims |
| BM2 chatbot prompt injection defense still weak | Medium | Open | sanitizeInput only strips markdown chars; no system prompt guard or LLM-based filter |
| 5 production `as any` casts on Convex `internal` (IM3) | Medium | Open | Stale generated types; run npx convex dev to regenerate |
| 21 `v.any()` fields in IM3 Convex schema | Medium | Open | Zero runtime validation on content, props, submissionData, evidence, fsrsState |
| No rate limiting on 5 BM2 API endpoints | Medium | Open | phases/complete, assessment, activities, error-summary, ai-error-summary |
| BM2 login endpoint has no input length limits | Medium | Open | Multi-MB payloads could exhaust memory/slow hashing |
| BM2 component_approvals role requirement leaked in error | Low | Resolved | Changed from "admin role required" to generic "Unauthorized" |
| Demo seed only assigns Unit 1 lessons | Low | Resolved | seed-demo-env.ts now queries all lessons without unit filter |
| practice-core: computeBaseRating([]) untested edge case | Medium | Open | Empty parts array returns 'Good' — may be unintended |
| BM2 duplicate PASSWORD_ALPHABET in convex/auth.ts | Low | Open | Can't import from core-auth; added comment noting derivation |
| BM2 ~30 files still import via re-export stubs instead of direct package | Low | Open | Works via stubs; migration to direct @math-platform/* imports deferred |
