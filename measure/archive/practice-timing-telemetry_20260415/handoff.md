# Junior Developer Handoff — Practice Timing Telemetry

## What Was Built

Canonical timing evidence is now part of the `practice.v1` submission contract. Every student practice submission can carry a `timing` field with wall-clock time, active working time, idle time, and a confidence rating.

## Key Files

| File | Purpose |
|------|---------|
| `lib/practice/contract.ts` | Canonical Zod schemas for `PracticeTimingSummary` and `PracticeSubmissionEnvelope` |
| `lib/practice/timing.ts` | Pure `TimingAccumulator` class — course-agnostic, no browser APIs |
| `components/practice-timing.tsx` | React hook `usePracticeTiming` that wraps the accumulator with browser events |
| `components/lesson/ActivityRenderer.tsx` | Injects timing into practice envelopes before `onSubmit` |

## How New Activities Should Use Timing

**Do not add timing logic inside individual activity components.** Timing is injected automatically by `ActivityRenderer` when `mode !== 'teaching'`.

1. Build a normal `practice.v1` envelope in your activity.
2. Call `onSubmit` with the envelope (no `timing` field needed).
3. `ActivityRenderer` will append timing if the student is in practice/guided mode.

If your activity has distinct parts and you want part-level timing, add `firstInteractionAt`, `answeredAt`, `wallClockMs`, and `activeMs` to each `PracticeSubmissionPart` yourself. The envelope-level timing is automatic; part-level timing is manual.

## When Timing Confidence Should Be Low

The accumulator downgrades confidence automatically. Confidence becomes `low` when any of these happen:

- Tab hidden for 60+ seconds
- Multiple focus losses (>3) or very long idle gaps (>2× threshold)
- `pagehide` event fires (interrupted session)
- Wall-clock time is under 30 seconds

Confidence becomes `medium` for shorter focus losses, shorter hidden-tab intervals, or moderate idle gaps.

## How Future SRS Tracks Should Consume Timing

Read `envelope.timing` from persisted `activity_submissions.submissionData`:

```typescript
const timing: PracticeTimingSummary | undefined = submission.timing;
```

Fields you care about:
- `wallClockMs` — total elapsed time
- `activeMs` — time the student was actively working
- `idleMs` — time lost to inactivity
- `confidence` — `"high" | "medium" | "low"`
- `confidenceReasons` — machine-readable tags (`"long_idle"`, `"focus_loss"`, `"visibility_hidden"`, `"interrupted"`)

**Rule of thumb:** Ignore or down-weight timing when `confidence !== 'high'`. Use `activeMs` as the primary signal rather than `wallClockMs`.

## Backward Compatibility

- Submissions without `timing` are still valid.
- Teaching/preview modes do not create timing evidence.
- No new database tables were added; timing lives inside `submissionData`.

## Known Limitations

- Convex `V` validator does not enforce Zod-style refinements (e.g., `activeMs <= wallClockMs`). Client-side validation in `contract.ts` is the enforcement boundary.
- Guided mode timing is recorded, but earlier tracks did not persist guided submissions consistently.
