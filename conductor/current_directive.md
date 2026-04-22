# Current Directive

> Updated: 2026-04-22 (Code review #13 — audit of chatbot security, teacher UI, practice core, study hub games, curriculum seeding)

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
- [x] Review #13 fixes (prompt injection via triple-quote delimiters + teacher UI revalidatePath)
- [ ] Teacher assignment UI for class_lessons (needed for proper lesson-level access control)
- [ ] RSC entry chunk code-splitting (750 KB → < 500 KB)
- [ ] BM2 type health sweep (~296 TS errors) — defer unless blocking
- [ ] LessonChatbot.tsx test coverage (route.ts and rateLimits.ts now tested)

## Code Review Summary (2026-04-22 — Review #13)

Audit of 6 work phases since Review #12: chatbot security fixes, provider memoization, misconception N+1 fix, practice-core testing, study hub games, teacher lesson assignment UI.

### Verification Results

| Check | Result |
|-------|--------|
| Build (IM3) | PASS |
| Tests (IM3) | 3279/3286 pass (6 aspirational .todo, 1 flaky in full suite) |
| Typecheck (IM3) | CLEAN |
| Lint (IM3) | CLEAN |

### Issues Fixed in This Review

| Issue | Severity | Fix |
|-------|----------|-----|
| Prompt injection via triple-quote delimiters in chatbot | High | Escaped `"""` sequences in sanitizeInput |
| Teacher lessons page missing revalidatePath + error handling | High | Added revalidatePath('/teacher/lessons') and try/catch |
| Type mismatch in fetchInternalQuery/fetchInternalMutation | Medium | Added type casts to FunctionReference<'query'/'mutation'> |

### Issues Found (Deferred)

| Issue | Severity | Notes |
|-------|----------|-------|
| Teacher lessons class selector dropdown non-functional | Medium | Server component; needs client component or URL routing |
| Demo seed only assigns Unit 1 lessons | Low | Blocks Units 2-9 chatbot access for demo class |
| `internal as any` casts in 3 files | Medium | Generated types stale; run npx convex dev |
