# Current Directive

> Updated: 2026-04-16 (Code Review — SRS Core Library Phases 3-4, Error Analysis Tests, submitReviewHandler Fix, CCSS Standards Seeding)

## Status Summary

- **Tests**: 2722 total, 8 known failures (6 equivalence validator — fraction/radical expressions; 2 flaky). All others passing.
- **Build**: Passing.
- **Lint**: Passing.
- **TypeScript**: Pre-existing test-file errors remain. No new TS errors.
- **Module 1-9 Roadmap**: All modules seeded (M1-M9 complete). CCSS standards and lesson_standards links for M1-M5 now seeded.
- **SRS Core Library**: Phases 1-4 complete (FSRS scheduler wrapper, review processor, queue primitives, adapter interfaces). Phase 5 pending.
- **Error Analysis Unit Tests**: 34 tests passing. Coverage gaps remain (studentIdMap, isCorrect:undefined).
- **submitReviewHandler**: Fixed — now derives componentKind from server-side phaseVersion lookup instead of trusting client-supplied phaseType.
- **CCSS Standards**: Fixed 6 inaccurate standard descriptions. All M1-M5 lesson_standards links seeded.

## Fixes Applied This Review

1. **Critical: submitReviewHandler was a no-op in production** — `phaseType` was not in Convex validator, so runtime stripped it. Fixed: now looks up `phaseType` server-side from `phase_versions` table via `ctx.db.get(phaseId)`.
2. **Fixed read-path kind mapping** — `listReviewQueueHandler` inline ternary replaced with `resolveComponentKind()` call.
3. **Fixed Chinese characters** in `scheduler.ts` comment.
4. **Fixed error-analysis `buildAIPrompt`** — missing `?? []` on `misconceptionTags` caused `"undefined"` string in AI prompts.
5. **Fixed error-analysis score/maxScore** — undefined values now render as "N/A" instead of "undefined/undefined".
6. **Fixed 6 inaccurate CCSS descriptions** — HSA-APR.D.6, HSF-BF.A.1a, HSA-CED.A.3, HSF-LE.A.2, HSF-LE.B.5, HSF-IF.C.7c.
7. **Fixed inconsistent queue policy handling** — review cards without policies now excluded (matching new card behavior).
8. **Fixed overdue sorting no-op** — `prioritizeOverdue: false` now sorts by due date ascending instead of returning 0.
9. **Added 6 new queue tests** — no-policy cards, prioritizeOverdue:false, learning/relearning states.

## Current In-Progress Track

- **Track**: Reusable SRS Core Library — Phases 1-4 complete, Phase 5 (verification and handoff) pending.

## High-Priority Next Steps

1. **SRS Core Library Phase 5: Verification and Handoff** — run full validation, write junior developer handoff notes
2. **Convex SRS Schema (Wave 2, Track 5)** — add srs_cards, srs_review_log, srs_sessions tables; implement CardStore/ReviewLogStore adapters
3. **Security & Auth Hardening (Wave A)** — port fail-closed auth guards, Convex-layer authorization
4. **Error analysis: test studentIdMap code paths** — summarizePartOutcomes and buildDeterministicSummary untested with studentIdMap
5. **Error analysis: fix buildTeacherErrorView using activityId as studentId** — add studentIdMap param
6. **Refactor seed-lesson-standards.ts** — 9 identical handlers (~700 lines) should be a factory function
7. **Fix M3L1/L2 standard alignment** — tagged HSA-REI.B.4 (quadratic) but lessons are about polynomial equations
8. **Seed isPrimary update-on-re-seed** — current code silently skips when isPrimary changes
9. **Wire proficiency views into actual progress surfaces** — ObjectiveProficiencyBadge and TeacherObjectiveDiagnosticCard are built but not rendered
10. **Address collectEligibleTimings N+1** — batch queries for production baseline recomputation

See `conductor/daily-practice-srs-roadmap.md` for the post-Module-9 daily practice SRS sequence.
See `conductor/tech-debt.md` for full issue registry.
