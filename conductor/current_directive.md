# Current Directive

> Updated: 2026-04-23 (Code review #14 — audit of tech-debt triage, re-export stubs, teacher UI, seed demo, chatbot tests, security)

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
- [ ] BM2 deactivated-user access — swap getRequestSessionClaims for requireActive*SessionClaims on 7 endpoints
- [ ] BM2 rate limiting gaps — add rate limiting to 5 unprotected endpoints
- [ ] BM2 chatbot prompt injection — add system prompt guard beyond sanitizeInput
- [ ] RSC entry chunk code-splitting (750 KB → < 500 KB)
- [ ] Convex generated types regeneration (eliminate `as any` casts)

## Code Review Summary (2026-04-23 — Review #14)

Audit of 6 work phases since Review #13: BM2 tech-debt triage (Phase 1), re-export stubs completion, seed class lessons for demo, teacher lesson assignment UI, LessonChatbot.tsx tests, monorepo tech-debt triage track setup.

### Verification Results

| Check | Result |
|-------|--------|
| Build (IM3) | PENDING |
| Tests (IM3) | PENDING |
| Typecheck (IM3) | PENDING |
| Lint (IM3) | PENDING |

### Issues Fixed in This Review

| Issue | Severity | Fix |
|-------|----------|-----|
| Demo seed only assigns Unit 1 lessons | Critical | Removed unitNumber=1 filter; now assigns all 52 lessons |
| Teacher class selector non-functional (data corruption risk) | Critical | Added ClassSelector client component with URL search param routing |
| Info leakage: 5 BM2 API routes return error.message in responses | Critical | Replaced with generic messages; errors logged server-side only |
| Assessment scoring error leaks internal algorithm details | Critical | Replaced with generic "Unable to score submission" |
| BM2 chatbot: no error handling on AI provider call | High | Added try/catch with 502 response |
| BM2 session route: no error handling | High | Wrapped entire handler in try/catch |
| BM2 chatbot: fragile rate limiting (optional chaining) | Medium | Explicit check for rate limit function existence; warn on missing |
| BM2 chatbot: phaseNumber accepts floats | Medium | Added Number.isInteger() check |
| Convex component_approvals: role requirement leaked in error | Low | Changed to generic "Unauthorized" |
| BM2 convex/auth.ts: duplicate PASSWORD_ALPHABET without documentation | Low | Added comment noting derivation from core-auth |

### Issues Found (Deferred)

| Issue | Severity | Notes |
|-------|----------|-------|
| 7 BM2 endpoints allow deactivated-user access | High | Need requireActive*SessionClaims |
| BM2 chatbot sanitizeInput too weak for prompt injection | Medium | Needs system prompt guard or LLM filter |
| 5 BM2 endpoints lack rate limiting | Medium | phases/complete, assessment, activities, error-summary, ai-error-summary |
| BM2 login has no input length limits | Medium | Multi-MB payloads risk |
| 21 `v.any()` fields in IM3 Convex schema | Medium | Incrementally add Zod schemas |
| BM2 ~30 files still import via re-export stubs | Low | Deferred migration to direct package imports |
