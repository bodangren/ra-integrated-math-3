# Implementation Plan: Cloudflare CI/CD Hardening

## Phase 1: Cloudflare Worker Configuration

### Tasks

- [ ] **Task: Create wrangler.jsonc configuration**
  - [ ] Write wrangler config with project name, vinext entry point, compatibility flags, and environment variables
  - [ ] Verify `nodejs_compat` flag is set
  - [ ] Document required Wrangler secrets

- [ ] **Task: Create Cloudflare worker entry point**
  - [ ] Write `cloudflare/worker.ts` importing vinext handler with asset fallback pattern
  - [ ] Test handler caching for warm invocations

- [ ] **Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)**

## Phase 2: GitHub Actions Workflow

### Tasks

- [ ] **Task: Create CI/CD workflow**
  - [ ] Write `.github/workflows/deploy.yml` with push trigger, path ignores, concurrency group
  - [ ] Implement pipeline steps: checkout → Node setup → npm ci → lint → test → build → deploy
  - [ ] Add failure notification step

- [ ] **Task: Verify pipeline end-to-end**
  - [ ] Push to a test branch and verify workflow triggers
  - [ ] Confirm lint/test/build gates block on failure
  - [ ] Verify deploy step receives correct secrets

- [ ] **Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)**
