# Current Directive

> Updated: 2026-04-17 (Code review: Tracks 8, 9, 10 — fixes applied, issues logged)

## Status Summary

- **Tests**: 2867 total, 6 known failures (equivalence validator — fraction/radical expressions). All others passing.
- **Build**: Passing.
- **Lint**: Passing.
- **TypeScript**: No new TS errors.
- **Module 1-9 Roadmap**: All modules seeded (M1-M9 complete). CCSS standards and lesson_standards links for M1-M5 seeded.
- **SRS Wave 0-4**: Waves 0-3 complete. Wave 4: Track 9 complete, Track 10 Phases 1-3 complete. Phase 4 next.

## Code Review: Tracks 8, 9, 10 (2026-04-17)

### Fixes Applied

1. **HIGH: `advanceCard` stale closure in PracticeSessionProvider** — `setCurrentCardIndex(currentCardIndex + 1)` captured stale `currentCardIndex` from closure. Fixed: use functional updater `setCurrentCardIndex((prev) => prev + 1)`.
2. **HIGH: Missing null check in practice page** — Both `fetchInternalQuery` and `fetchInternalMutation` can return null; destructuring `null` crashes the RSC. Fixed: null guard with fallback error UI.
3. **HIGH: Unsafe `activityId as string` in PracticeCardRenderer** — Two unchecked type assertions on `queueItem.props.activityId`. Fixed: runtime guard with early return and console error.
4. **HIGH: Unsafe `policy as ObjectivePriority` in objectiveProficiency.ts** — Direct cast from `string` to union type with no validation. Fixed: `validatePriority()` with Set lookup and fallback to `'essential'`.
5. **HIGH: Same unsafe policy cast in queue.ts** — Applied same `VALID_PRIORITIES` guard pattern.

### New Issues Logged (tracked in tech-debt.md)

- SRS queue: unbounded `.collect()` on srs_cards (Critical)
- SRS queue: N+1 per-card resolution — practice_items + activities (Critical)
- objectiveProficiency: N+1 for submissions + baselines (High)
- objectiveProficiency: fragile submissionId parsing via lastIndexOf("-") (Medium)
- objectiveProficiency: card retention inflated per-review not per-card (Medium)
- Sessions: duplicate getActiveSession naming (Medium)
- PracticeSessionProvider: completion sends no sessionId (High)
- PracticeCardRenderer: double timing instrumentation (Medium)
- SRS sessions: by_student_and_status index relies on undefined sorting (High)

## Current In-Progress Track

- **Track 10: Objective Proficiency Measurement** — Phase 3 complete. Phase 4 (Student and Teacher Views) next.

## High-Priority Next Steps

1. **Track 10 Phase 4: Student and Teacher Views** — `getStudentProficiencySummary` and `getTeacherClassProficiency` Convex queries
2. **Track 10 Phase 5: Verification and Handoff** — full test suite, docs, and track completion
3. **Track 11: Teacher SRS Dashboard and Interventions** — class health, weak objectives, struggling students
4. **SRS queue: batch resolution** — Replace N+1 per-card reads with 2 bulk reads (Critical perf)
5. **Security & Auth Hardening (BM2 Wave A)** — port fail-closed auth guards, Convex-layer authorization
6. **PracticeSessionProvider: send sessionId with completion** — Prevents wrong-session completion

See `conductor/daily-practice-srs-roadmap.md` for the post-Module-9 daily practice SRS sequence.
See `conductor/tech-debt.md` for full issue registry.
