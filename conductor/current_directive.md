# Current Directive

> Updated: 2026-04-16 (Code Review — Timing Baselines + Component Kind Fix)

## Status Summary

- **Tests**: 2493 passing, 6 known failures (equivalence validator — fraction/radical expressions).
- **Build**: Passing; RSC chunk 750 KB (pre-existing).
- **Lint**: Passing.
- **TypeScript**: 25 pre-existing test-file errors remain (students.test.tsx, dashboard.test.ts). No new TS errors.
- **Module 1-9 Roadmap**: All modules seeded (M1-M9 complete).
- **Practice Timing Telemetry**: All 5 phases complete.
- **Practice Timing Baselines**: All 5 phases complete — timing baselines, SRS adapter, objective proficiency, and UI components wired.
- **submitReviewHandler Fix**: componentKind now derived from placement.phaseType.
- **Code Review**: 2026-04-16 review found 0 critical, 0 high, 6 medium, 2 low issues. No fixes needed.

## Current In-Progress Track

- **Track**: None — all tracks complete.
- **Next**: See High-Priority Next Steps below.

## High-Priority Next Steps

1. **Add missing CCSS standards for M2/M3** — ~30 of ~50+ standards still undefined
2. **Build lesson_standards seeding pipeline for M1-M5** — only M6-M9 have links
3. **Add unit tests for error-analysis module** — 8 untested exported functions with aggregation logic
4. **Fix parseAIResponse fragile line-based parsing** — use structured JSON output
5. **Refactor seed-lesson-standards.ts duplication** — extract shared seeder function
6. **Add integration tests for practice-timing** — current hook tests fully mock the accumulator
7. **Fix canApprove gate completeness** — Activity and Practice harnesses have ungated checklist items
8. **Fix seed test tautology** — all modules: tests use inline data, not actual seed files
9. **Wire proficiency views into actual progress surfaces** — ObjectiveProficiencyBadge and TeacherObjectiveDiagnosticCard are built but not yet rendered in any page
10. **Address collectEligibleTimings N+1** — batch queries for production baseline recomputation

See `conductor/modules-3-9-roadmap.md` for the module inventory.
See `conductor/daily-practice-srs-roadmap.md` for the post-Module-9 daily practice SRS sequence.
See `conductor/tech-debt.md` for full issue registry.
See `conductor/review-output.log` for latest code review findings.
