# Current Directive

> Updated: 2026-04-19 (Code review #12 — audit of chatbot enrollment fallback, game bugs, math notation sanitization)

## Mission

Monorepo migration complete (Waves 0-6). All major feature tracks done. Current focus: addressing tech debt, hardening, and preparing for next feature development cycle.

## Priority Order (Execute In This Order)

1. **Monorepo migration complete** — Waves 0-6 done, all packages extracted and adopted
2. **BM2 type health sweep** — ~296 pre-existing errors; defer unless blocking migration gates
3. **Teacher assignment UI** — class_lessons table exists but has no UI for populating; chatbot currently falls back to open enrollment
4. **RSC bundle optimization** — 750 KB entry chunk needs code-splitting (target < 500 KB)

## Non-Negotiable Rules

1. AI tutoring and workbook work in IM3 must be completed via BM2-derived package adoption
2. No dependency manager/install changes without explicit approval
3. Shared packages must not import from `apps/*` or app `convex/_generated/*`
4. BM2 business-domain code/assets remain app-local
5. Always run `npx tsc --noEmit` alongside `npm run build` — vinext build does not enforce TypeScript types
6. After extracting a package, **delete the app-local copy immediately** and rewire imports — duplicated code diverges silently

## Required Source Documents

- `conductor/monorepo-plan.md` — Roadmap and strategy
- `conductor/tracks.md` — Track registry and dependency order
- `conductor/monorepo-track-playbook.md` — Execution workflow
- `conductor/monorepo-jr-execution-spec.md` — Junior step-by-step packets
- `conductor/tech-debt.md` — Tech debt backlog
- `conductor/workflow.md` — Core Conductor protocol

## Immediate Next Actions Checklist

- [x] Waves 0-6 complete (all packages extracted, IM3+BM2 imports migrated, CI/CD hardened)
- [x] Review #11 fixes (learningObjectives sanitization + abort listener leak)
- [x] Review #12 fixes (chatbot enrollment fallback + game streak bug + math sanitization)
- [ ] Teacher assignment UI for class_lessons (needed for proper lesson-level access control)
- [ ] RSC entry chunk code-splitting (750 KB → < 500 KB)
- [ ] BM2 type health sweep (~296 TS errors) — defer unless blocking
- [ ] LessonChatbot.tsx test coverage (route.ts and rateLimits.ts now tested)

## Code Review Summary (2026-04-19 — Review #12)

Audit of 6 work phases since Review #11: IM3 chatbot security fixes, chatbot provider memoization, misconception N+1 fix, practice-core testing, study hub games, learningObjectives sanitization.

### Verification Results

| Check | Result |
|-------|--------|
| Build (IM3) | PASS |
| Tests (IM3) | 3258/3264 pass (6 aspirational .todo) |
| Typecheck (IM3) | CLEAN |
| Lint (IM3) | CLEAN |

### Issues Fixed in This Review

| Issue | Severity | Fix |
|-------|----------|-----|
| class_lessons table empty — chatbot 403 for ALL students | Critical | Added fallback: if no class_lesson entries exist, allow active enrollment |
| SpeedRoundGame shows last streak instead of best streak | High | Added bestStreak state tracking like BM2 version |
| sanitizeInput strips `*` and `_` breaking math notation | High | Only strip backticks and tildes; preserve math chars |

### Issues Found (Deferred)

| Issue | Severity | Notes |
|-------|----------|-------|
| Misconception summary fetches ALL reviews before date filter | Medium | Filters by sinceMs in-memory; should use range query when index supports it |
| No tests for LessonChatbot.tsx | High | Route.ts tested; UI component still uncovered |
| class_lessons needs seeding or teacher UI | High | Fallback works but proper lesson assignment needed for production |

### Code Review Summary (2026-04-19 — Review #11)

Post-phase audit of 6 phases: IM3 chatbot security fixes, chatbot provider memoization, monorepo docs cleanup, CI deploy hardening, review #10 residual fixes, AI tutoring adoption.

| Check | Result |
|-------|--------|
| Build (IM3) | PASS |
| Tests (IM3) | 3256/3262 pass (6 aspirational .todo) |
| Typecheck (IM3) | CLEAN |

Issues fixed: learningObjectives sanitization bypass (High), AbortSignal listener leak (Medium).

### Code Review Summary (2026-04-19 — Review #10)

Audit of 6 phases: AI tutoring extraction, BM2 adoption, IM3 chatbot implementation, teacher-reporting adoption, workbook pipeline extraction, CI deploy hardening.

| Check | Result |
|-------|--------|
| Build (IM3) | PASS |
| Tests (IM3) | 3249/3255 pass (6 aspirational .todo) |
| Typecheck (IM3 + all new packages) | CLEAN |

Issues fixed: CSV injection (High), gradebook color logic (High), rate-limit ordering (High), empty AI retry (High), CI tsc flag (High), phaseNumber bound (Low).
