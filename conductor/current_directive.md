# Current Directive

> Updated: 2026-04-16 (Practice Timing Baselines complete)

## Status Summary

- **Tests**: 2493 passing, 6 known failures (equivalence validator — fraction/radical expressions).
- **Build**: Passing; RSC chunk 750 KB (pre-existing).
- **Lint**: Passing.
- **TypeScript**: 25 pre-existing test-file errors remain (students.test.tsx, dashboard.test.ts). No new TS errors.
- **Module 1-9 Roadmap**: All modules seeded (M1-M9 complete).
- **Practice Timing Telemetry**: All 5 phases complete.
- **Practice Timing Baselines**: All 5 phases complete — timing baselines, SRS adapter, objective proficiency, and UI components wired.
- **Code Review**: 2026-04-16 review found and fixed 4 issues (2 critical, 2 high). 14 medium/low issues documented.

## Current In-Progress Track

- **Track**: None — Practice Timing Baselines is complete.
- **Next**: See High-Priority Next Steps below.

## High-Priority Next Steps

1. **Phase 5: UI Integration** — wire student proficiency views into progress surfaces, teacher views into diagnostics
2. **Add missing CCSS standards for M2/M3** — ~30 of ~50+ standards still undefined
3. **Build lesson_standards seeding pipeline for M1-M5** — only M6-M9 have links
4. **Add tests for error-analysis module** — 8 untested exported functions with aggregation logic
5. **Fix parseAIResponse fragile line-based parsing** — use structured JSON output
6. **Refactor seed-lesson-standards.ts duplication** — extract shared seeder function
7. **Add integration tests for practice-timing** — current hook tests fully mock the accumulator
8. **Fix canApprove gate completeness** — Activity and Practice harnesses have ungated checklist items
9. **Fix seed test tautology** — all modules: tests use inline data, not actual seed files
10. **Fix submitReviewHandler componentKind derivation** — derive from placement, not client args (Resolved)

See `conductor/modules-3-9-roadmap.md` for the module inventory.
See `conductor/daily-practice-srs-roadmap.md` for the post-Module-9 daily practice SRS sequence.
See `conductor/tech-debt.md` for full issue registry.
See `conductor/review-output.log` for latest code review findings.
