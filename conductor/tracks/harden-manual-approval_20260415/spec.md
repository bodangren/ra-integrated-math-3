# Harden Manual Component Approval - Specification

## Context

The project has a developer-only manual approval page at `/dev/component-approval`, a review queue API, and Convex persistence for component approval summaries and review history. The workflow exists, but several parts are incomplete or only partially trustworthy: example/practice hashes use a placeholder, queue coverage for embedded examples and practice placements is incomplete, review harness data can be hardcoded, and the plan still has in-progress integration coverage.

This track turns the current approval workflow into a coherent, reliable manual approval system. Approval must remain a human decision. LLMs may use unresolved review notes as repair context, but may not approve components or silently resolve feedback.

## Requirements

1. Keep the approval site developer-only and hidden from student, teacher, public, preview, and production surfaces.
2. Enumerate reviewable activity, example, and practice components from real persisted curriculum data.
3. Compute deterministic content hashes for all review kinds, including embedded examples and practice placements.
4. Make stale approval detection trustworthy for all review kinds.
5. Render review harnesses from real stored props/content rather than static sample data.
6. Enforce manual review checklist gating before `approved` can be submitted when the selected component kind requires harness checks.
7. Add Convex behavior coverage for queue listing, review submission, stale detection, and LLM audit context.
8. Keep comments required for `needs_changes` and `rejected`.
9. Keep review history append-only during normal review submission.
10. Reconcile Conductor status for the original component-approval track and this hardening track.

## Acceptance Criteria

1. `listReviewQueue` can surface unreviewed/stale activity, example, and practice targets from real data.
2. Activity, example, and practice review targets all use deterministic content hashes that change when meaningful content changes.
3. Approval cannot be submitted from the UI until required harness checks are complete.
4. API and Convex tests cover: unreviewed queue item appears, approval writes summary and review history, content changes become stale, and needs-changes feedback appears in audit context.
5. Existing route and API guards remain in place and are covered by tests.
6. Tech debt entries resolved by this track are updated or removed.
7. `npm run lint` and relevant tests pass before completion.

## Out Of Scope

- Automated approval by LLMs or background jobs.
- Student- or teacher-facing approval UI.
- Broad redesign of the activity registry or practice.v1 contract.
- Production enablement of the developer approval page.

