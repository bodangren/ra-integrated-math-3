# Monorepo Migration Index

**Track:** `monorepo-readiness_20260417`
**Created:** 2026-04-18
**Status:** Phase 1 Complete

## Repository State

| Repo | Branch | Status | Notes |
|------|--------|--------|-------|
| IM3 (`ra-integrated-math-3`) | master | Clean | Ahead of origin by 0 commits |
| BM2 (`bus-math-v2`) | main | Clean | Ahead of origin by 2 commits (session revocation hardening) |

## Toolchain Decision

**Status:** Pending explicit approval

| Option | Status | Notes |
|--------|--------|-------|
| pnpm + Turborepo | Proposed | Requires explicit approval per non-negotiable rule #3 |
| npm workspaces | Fallback | No approval needed; existing package-lock.json users |

**Decision Required:** Package manager choice must be approved before `monorepo-tooling-shell_20260417` executes.

## Rollback Protocol

For file-move tracks (1.2, 4.1), use:

```bash
# Abort in-progress move
git reset --hard HEAD~1

# Or restore specific paths
git checkout HEAD~1 -- <path>
```

**Checkpoint Cadence:** Tag after each successful app move (`move-im3-app-to-apps`, `move-bm2-app-to-apps`)

## Migration Track Registry

### Wave 0 — Readiness
| Order | Track ID | Status | Depends On |
|-------|----------|--------|------------|
| 0.1 | `monorepo-readiness_20260417` | Phase 1 Complete | None |

### Wave 1 — Host Monorepo Shell
| Order | Track ID | Status | Depends On | Exit Gate |
|-------|----------|--------|------------|-----------|
| 1.1 | `monorepo-tooling-shell_20260417` | Pending | 0.1 | Tooling approved |
| 1.2 | `move-im3-app-to-apps_20260417` | Pending | 1.1 | IM3 runs from apps/ |
| 1.3 | `monorepo-boundary-guards_20260417` | Pending | 1.2 | Guards operational |

### Wave 2 — Core Engine Packages
| Order | Track ID | Status | Depends On |
|-------|----------|--------|------------|
| 2.1 | `extract-practice-core_20260417` | Pending | 1.2 |
| 2.2 | `extract-srs-engine_20260417` | Pending | 2.1 |
| 2.3 | `extract-core-auth-convex_20260417` | Pending | 1.2 |

### Wave 3 — Runtime and Approval
| Order | Track ID | Status | Depends On |
|-------|----------|--------|------------|
| 3.1 | `extract-activity-runtime_20260417` | Pending | 2.1 |
| 3.2 | `extract-component-approval_20260417` | Pending | 3.1 |
| 3.3 | `extract-graphing-core_20260417` | Pending | 3.1 |

### Wave 4 — Bring BM2 In
| Order | Track ID | Status | Depends On |
|-------|----------|--------|------------|
| 4.1 | `move-bm2-app-to-apps_20260417` | Pending | Waves 1-2 |
| 4.2 | `bm2-consume-core-packages_20260417` | Pending | 4.1 |
| 4.3 | `bm2-consume-runtime-packages_20260417` | Pending | 4.2 |

### Wave 5 — Feature Packages
| Order | Track ID | Status | Depends On |
|-------|----------|--------|------------|
| 5.1 | `extract-practice-test-engine_20260417` | Pending | 4.1 |
| 5.2 | `extract-study-hub-core_20260417` | Pending | 4.1 |
| 5.3 | `extract-teacher-reporting-core_20260417` | Pending | 4.1 |
| 5.4 | `extract-ai-tutoring-and-adopt-im3_20260417` | Pending | 4.1 |
| 5.5 | `extract-workbook-pipeline-and-adopt-im3_20260417` | Pending | 4.1 |

### Wave 6 — Hardening
| Order | Track ID | Status | Depends On |
|-------|----------|--------|------------|
| 6.1 | `monorepo-ci-deploy-hardening_20260417` | Pending | Waves 1-5 |
| 6.2 | `monorepo-docs-and-cleanup_20260417` | Pending | 6.1 |

## Blocker Summary

| Item | Severity | Status | Notes |
|------|----------|--------|-------|
| Package manager approval | High | Pending | Required before Wave 1 |
| IM3 worktree | - | Clear | Clean, no pending changes |
| BM2 worktree | - | Clear | 2 commits ahead (non-blocking) |

## References

- Strategy: `conductor/monorepo-plan.md`
- Junior Execution: `conductor/monorepo-jr-execution-spec.md`
- Track Playbook: `conductor/monorepo-track-playbook.md`