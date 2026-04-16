# Monorepo Migration Roadmap

**Goal:** Consolidate `ra-integrated-math-3` and `bus-math-v2` into a single monorepo with shared packages, while keeping each app on its own Convex project and database.

**Strategy:** Gradual conversion. Use `ra-integrated-math-3` as the monorepo host, extract shared packages one at a time, and eventually move `bus-math-v2` into the same repository.

**Why gradual:** Both projects have active Conductor tracks and production deployments. A big-bang rewrite would freeze development and risk losing git history. Extracting packages incrementally lets us validate the tooling before committing `bus-math-v2`.

---

## Core Principles

1. **One repo, multiple apps.** Both frontend applications live under `apps/`.
2. **One repo, multiple packages.** Shared libraries live under `packages/`.
3. **Separate Convex projects.** Each app keeps its own `convex/` directory, schema, and deployment URL. We share *code*, not *data*.
4. **Stop duplication first.** The highest-priority extractions are the ones currently being ported between repos (SRS engine, practice timing).
5. **Apps continue to ship.** Every extraction must leave the host app buildable, testable, and deployable.

---

## Tooling Choices

| Tool | Purpose | Rationale |
|------|---------|-----------|
| **pnpm** | Package manager + workspace resolution | Native workspace support, fast, disk-efficient. Better than npm for monorepos. |
| **Turborepo** | Task orchestration (build, test, lint) | Caches tasks across packages, runs them in topological order, minimal config. |
| **TypeScript** | Cross-package type checking | Start with project references later; day-one relative imports between `packages/` are enough. |

We do **not** need Nx, Bazel, Lerna, or any heavy enterprise monorepo framework.

---

## Target Monorepo Structure

```
math-platform/                       ← renamed root of the monorepo
├── apps/
│   ├── integrated-math-3/           ← current IM3 app
│   └── bus-math-v2/                 ← BM2 app (moved in Phase 2)
├── packages/
│   ├── core-auth/                   # JWT sessions, PBKDF2, role guards, middleware
│   ├── core-convex/                 # Admin-auth wrappers, internal query helpers
│   ├── core-ui/                     # shadcn/ui primitives + instructional components
│   ├── activity-runtime/            # Activity registry, LessonRenderer, PhaseRenderer
│   ├── practice-engine/             # practice.v1 contract, timing, baselines, srs-rating
│   ├── srs-engine/                  # FSRS scheduler, card state, queue primitives
│   ├── component-approval/          # Content hashes, harness gating, review queue
│   ├── assessment-engine/           # Practice test engine, question banks, test runner
│   ├── study-hub/                   # Flashcards, matching, speed round, progress UI
│   ├── ai-tutoring/                 # OpenRouter client, chatbot, rate limiting
│   ├── workbook-pipeline/           # Manifest generator, download routes
│   └── teacher-reporting/           # Gradebook grids, competency heatmaps
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Package Boundaries

| Package | Source of Truth | Rationale |
|---------|-----------------|-----------|
| `core-auth` | Both (≈identical) | Stop maintaining two copies of the same JWT/PBKDF2 stack. |
| `core-convex` | Both (≈identical) | `fetchInternalQuery`, admin auth, and server-side Convex client wrappers are duplicated. |
| `core-ui` | IM3 (more instructional components) | shadcn/ui base plus IM3's `textbook/` components (TheoremBox, DefinitionCard, etc.). |
| `activity-runtime` | IM3 (flexible phase model) | BM2 still uses hardcoded 6-phase assumptions. IM3's `LessonRenderer` and `PhaseRenderer` are more advanced. |
| `practice-engine` | IM3 (timing + baselines complete) | BM2 needs `practice.v1`, timing telemetry, and `srs-rating.ts`. IM3 already built the canonical versions. |
| `srs-engine` | IM3 (Wave 1 in progress) | **Urgent.** BM2 is actively building a parallel FSRS implementation. Extract IM3's scheduler first. |
| `component-approval` | IM3 (prop-based hashes) | BM2 is mid-port of IM3's runtime prop-hash system. Extract it so BM2 can consume the package directly. |
| `assessment-engine` | BM2 | IM3 needs the practice test engine for BM2 Alignment Wave B. |
| `study-hub` | BM2 | IM3 needs flashcards, matching, and speed-round games for BM2 Alignment Wave C. |
| `ai-tutoring` | BM2 | IM3 needs the lesson chatbot and OpenRouter patterns for BM2 Alignment Wave D. |
| `workbook-pipeline` | BM2 | IM3 needs the workbook system for BM2 Alignment Wave D. |
| `teacher-reporting` | BM2 | IM3's teacher reporting is basic; BM2 has mature gradebook and competency heatmaps. |

---

## Phase 0: Prerequisite — Halt Cross-Repo Duplication

Before any structural moves, pause the tracks that are actively copying code from IM3 into BM2.

- **BM2 `srs_daily_practice_core_20260416`** — Halt or narrow scope to UI-only work. Do **not** duplicate the FSRS scheduler, card-state types, or Convex schema. Wait for `packages/srs-engine`.
- **BM2 `component_approval_prop_hashes_20260416`** — Can finish its UI/harness work, but should not reimplement `content-hash.ts` logic. Wait for `packages/component-approval`.

This pause prevents the most expensive form of tech debt: two diverging copies of the same core algorithm.

---

## Phase 1: Monorepo Shell in `ra-integrated-math-3`

**Goal:** Convert the current repo into a monorepo that contains exactly one app and zero or one shared package. Prove the tooling works.

### Tasks

1. **Install pnpm and Turborepo**
   - Add `pnpm-workspace.yaml` defining `apps/*` and `packages/*`.
   - Add `turbo.json` with `build`, `test`, `lint`, and `typecheck` pipelines.
   - Update root `package.json` with workspace scripts (`dev`, `build`, `test`, `lint`).

2. **Move the IM3 app into `apps/integrated-math-3/`**
   - Move all application code (`app/`, `components/`, `convex/`, `lib/`, `types/`, `public/`, `__tests__/`, etc.) into `apps/integrated-math-3/`.
   - Keep curriculum content (`curriculum/`) in the app for now.
   - Ensure `npm run dev`, `npm run build`, `npm run test`, and `npm run lint` still pass.

3. **Verify CI still works**
   - Update GitHub Actions (if needed) to run commands from the new app path.
   - Cloudflare deployment should target `apps/integrated-math-3/`.

**Exit gate:** `pnpm dev`, `pnpm test`, `pnpm build`, and `pnpm lint` run successfully from the new monorepo root. The app deploys to Convex and Cloudflare exactly as before.

---

## Phase 2: Extract the First Shared Package (`practice-engine`)

**Goal:** Prove that packages can be imported by the app. Extract the most stable, highest-reuse code first.

### Tasks

1. **Create `packages/practice-engine/`**
   - Move `lib/practice/contract.ts`, `lib/practice/submission.schema.ts`, `lib/practice/timing.ts`, `lib/practice/timing-baseline.ts`, and `lib/practice/srs-rating.ts` into the package.
   - Move associated tests (`__tests__/lib/practice/...`) into the package.
   - Export a clean public API from `packages/practice-engine/src/index.ts`.

2. **Update the app to consume the package**
   - In `apps/integrated-math-3/package.json`, add `"@kaiwen/practice-engine": "workspace:*"`.
   - Replace all relative imports from `lib/practice/...` with imports from `@kaiwen/practice-engine`.
   - Delete the old `lib/practice/` directory (or leave a re-export shim temporarily).

3. **Run tests and lint**
   - Ensure the package has its own `test` script.
   - Ensure `turbo test` runs package tests before app tests.

**Exit gate:** All tests pass, build is clean, and the app can no longer import from a local `lib/practice/` path for the extracted files.

---

## Phase 3: Extract `srs-engine` (Urgent — Blocks BM2 Duplication)

**Goal:** Extract the FSRS scheduler and card-state types into a reusable package so BM2 can consume it instead of building its own.

### Tasks

1. **Complete the dirty `srs-core-library` track first**
   - Finish `lib/srs/scheduler.ts` and `__tests__/lib/srs/scheduler.test.ts` inside the app.
   - Finalize `lib/srs/contract.ts` (already complete from Track 1).

2. **Move into `packages/srs-engine/`**
   - `src/contract.ts` — canonical `srs.contract.v1` types.
   - `src/scheduler.ts` — FSRS wrapper (`createCard`, `reviewCard`, `getDueCards`, `previewInterval`).
   - `src/review-processor.ts` — bridge from `srs-rating.ts` to FSRS card updates.
   - `src/queue.ts` — queue primitives (session limits, ordering).
   - Tests for all of the above.

3. **Update IM3 app**
   - Replace app imports with `@kaiwen/srs-engine`.
   - Ensure daily-practice roadmap Waves 2–5 can build on top of the package.

**Exit gate:** BM2 can theoretically `pnpm add @kaiwen/srs-engine` (from workspace or a local git submodule) and stop writing its own FSRS layer.

---

## Phase 4: Extract `core-auth` and `core-convex`

**Goal:** Deduplicate the auth and Convex client patterns that are ~90% identical between repos.

### Tasks

1. **Audit both repos' `lib/auth/` directories**
   - Compare session creation, JWT verification, PBKDF2 hashing, password policy, server guards, and middleware patterns.
   - Resolve any minor differences (e.g., cookie names, role strings) into a configurable API.

2. **Create `packages/core-auth/`**
   - `src/session.ts` — `createSessionToken`, `verifySessionToken`, `SessionClaims`.
   - `src/password.ts` — `hashPassword`, `verifyPassword`.
   - `src/guards.ts` — `requireStudentSessionClaims`, `requireTeacherSessionClaims`, etc.
   - `src/middleware.ts` — reusable middleware factory.

3. **Create `packages/core-convex/`**
   - `src/server-client.ts` — `fetchInternalQuery`, `fetchInternalMutation`, `setAdminAuth`.
   - `src/config.ts` — Convex URL / admin key resolution helpers.

4. **Update IM3 app**
   - Swap local `lib/auth/` and `lib/convex/server.ts` imports for package imports.
   - Delete the old local copies.

**Exit gate:** IM3 auth and Convex internals are fully package-driven. Local `lib/auth/` and `lib/convex/server.ts` no longer exist.

---

## Phase 5: Extract `activity-runtime` and `component-approval`

**Goal:** Move the lesson and activity infrastructure into packages so BM2 can eventually migrate off its hardcoded phase model and build-time approval manifest.

### Tasks

1. **Create `packages/activity-runtime/`**
   - `src/registry.ts` — activity registry and `resolveActivityComponentKey`.
   - `src/renderer.tsx` — `ActivityRenderer`, `LessonRenderer`, `PhaseRenderer`.
   - `src/types.ts` — `ActivityComponentProps`, mode system types.
   - Keep this frontend-only; each app still defines its own `convex/schema.ts` and activity tables.

2. **Create `packages/component-approval/`**
   - `src/content-hash.ts` — deterministic prop-based hashing.
   - `src/harness.ts` — harness gating logic.
   - `src/types.ts` — review queue types.
   - UI components (`ReviewQueue`, `ReviewHarness`) can live here or in `core-ui` depending on coupling.

3. **Update IM3 app**
   - Replace local imports with package imports.
   - Verify the component-approval system still works end-to-end.

**Exit gate:** BM2 has a clear migration path: install `activity-runtime` and `component-approval`, then delete its own `LessonRenderer` and build-time manifest generator.

---

## Phase 6: Move `bus-math-v2` into the Monorepo

**Goal:** Both apps now live in one repository and can consume shared packages natively.

### Tasks

1. **Copy BM2 into `apps/bus-math-v2/`**
   - Preserve git history by using `git subtree` or a simple file copy if history preservation is not critical.
   - Keep BM2's `convex/` directory, `package.json`, scripts, and CI config intact.

2. **Wire BM2 to shared packages (one at a time)**
   - Start with `practice-engine` and `srs-engine` because BM2 needs them for its active Milestone 11 tracks.
   - Then `core-auth` and `core-convex`.
   - Then `activity-runtime` and `component-approval` (these require more refactoring in BM2).

3. **Update root Turborevo pipelines**
   - `turbo build` should build packages first, then both apps.
   - `turbo test` should run package tests, then app tests.
   - `turbo lint` should lint everything.

4. **Archive the old `bus-math-v2` repo**
   - Make the old GitHub repository read-only or archive it.
   - Update any deployment scripts or documentation that reference the old repo path.

**Exit gate:** Both apps build, test, and lint from the monorepo root. BM2's active tracks are updated to import from `@kaiwen/*` instead of local duplicates.

---

## Phase 7: Extract BM2-Derived Feature Packages

**Goal:** Port proven BM2 features into shared packages so IM3 can consume them for its BM2 Alignment tracks.

### Order of Extraction

1. **`assessment-engine`** — `PracticeTestEngine`, question banks, test selection UI.
2. **`study-hub`** — `FlashcardPlayer`, `MatchingGame`, `SpeedRoundGame`, progress dashboard.
3. **`teacher-reporting`** — Gradebook grids, competency heatmaps, submission detail modal.
4. **`ai-tutoring`** — OpenRouter client, chatbot widget, rate-limiting hooks.
5. **`workbook-pipeline`** — Manifest generator, workbook resolution, download routes.

### For Each Package

- Move the source files from `apps/bus-math-v2/` into `packages/<name>/`.
- Remove domain-specific data (e.g., accounting glossary, business-math question banks) from the package; keep only generic logic and UI.
- Move domain-specific data back into `apps/bus-math-v2/` as seed/config files.
- Update BM2 to import from the package.
- Update IM3 to import from the package when its corresponding BM2 Alignment track begins.

**Exit gate:** IM3's BM2 Alignment Waves B, C, and D can build on top of ready-made packages instead of copy-pasting code.

---

## Phase 8: Cleanup and Documentation

**Goal:** The monorepo is fully operational, documented, and easy for new contributors (and AI assistants) to navigate.

### Tasks

1. **Write `INTEGRATION.md`**
   - How to add a new package.
   - How to add a dependency between packages.
   - How to run tests for just one app or package.
   - How deployments work (each app deploys independently to its own Convex project and Cloudflare account).

2. **Standardize package templates**
   - Every package should have the same file layout: `src/`, `package.json`, `tsconfig.json`, `vitest.config.ts` (if needed).
   - Every package should export from `src/index.ts`.

3. **Audit and prune dead code**
   - Remove any leftover local copies of extracted logic from both apps.
   - Update import aliases and `tsconfig.json` paths.

4. **Update Conductor workflow**
   - New tracks that touch shared packages should include package-level tests in their verification gates.
   - Document the rule: "If a track modifies a `packages/` file, it must not break either app."

**Exit gate:** A new developer can clone the monorepo, run `pnpm install && pnpm dev`, and have both apps running locally within 10 minutes.

---

## Relationship to Active Tracks

### IM3 Tracks That Should Finish Before Phase 1

- `srs-core-library_20260416` (Wave 1) — Finish first so `srs-engine` extraction has a stable source.
- `srs-product-contract_20260416` — Already complete; provides the contract types.

### IM3 Tracks Unaffected by Monorepo Migration

- All curriculum seeding tracks (Modules 1–9) — These are app-specific data tracks.
- `ccss-standards-seeding-m1-m5` — App-specific.
- `error-analysis-unit-tests` — Can be extracted into `practice-engine` later, but doesn't block anything.

### BM2 Tracks That Need Scope Adjustment

- `srs_daily_practice_core_20260416` — **Pause or narrow.** Do not write a new FSRS scheduler. Wait for `packages/srs-engine` from IM3.
- `component_approval_prop_hashes_20260416` — Can continue UI work, but should import `content-hash.ts` from the future `packages/component-approval` instead of writing a local copy.
- `graphing_explorer_20260416` — Can continue; graphing is app-specific and doesn't need package extraction yet.
- `teacher_srs_dashboard_20260416` — Can wait until `srs-engine` and `teacher-reporting` packages are ready.

### IM3 BM2 Alignment Tracks That Benefit from Packages

- `practice-test-engine_20260416` → Will consume `packages/assessment-engine`.
- `study-hub-flashcards_20260416` / `study-hub-games_20260416` → Will consume `packages/study-hub`.
- `teacher-gradebook-heatmaps_20260416` → Will consume `packages/teacher-reporting`.
- `ai-chatbot_20260416` → Will consume `packages/ai-tutoring`.
- `workbook-system_20260416` → Will consume `packages/workbook-pipeline`.

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Moving files breaks active IM3 tracks | Medium | High | Do Phase 1 during a low-activity window; keep the move to root-level directory shuffles only. |
| BM2 continues duplicating SRS code before extraction | High | High | Explicitly communicate the pause on `srs_daily_practice_core`. Prioritize Phase 3. |
| Package API changes force rework in both apps | Medium | Medium | Keep packages small and stable. Version internal APIs only when necessary. |
| CI/deployment scripts break after directory moves | Medium | High | Update CI in Phase 1 before any extraction. Test deploys to staging. |
| Circular dependencies between packages | Low | High | Enforce a strict dependency graph in `turbo.json`. No package may depend on an app. |

---

## Success Criteria

- [ ] Both apps build, test, and lint from a single repository root.
- [ ] Each app still deploys to its **own** Convex project and Cloudflare domain.
- [ ] No `lib/practice/`, `lib/srs/`, or `lib/auth/` directories exist locally in either app; they all import from `packages/`.
- [ ] BM2's active tracks consume `@kaiwen/srs-engine` and `@kaiwen/practice-engine` instead of local copies.
- [ ] IM3's BM2 Alignment tracks can begin by installing shared packages rather than copy-pasting code.
- [ ] A new contributor can set up the entire repo with `pnpm install && pnpm dev`.
