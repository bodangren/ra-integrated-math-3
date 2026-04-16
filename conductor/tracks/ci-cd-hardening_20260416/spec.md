# Specification: Cloudflare CI/CD Hardening

## Overview

Port the production CI/CD pipeline from `bus-math-v2` to establish automated lint, test, build, and deploy gates on push to main. The current project has basic deployment but lacks a proper CI pipeline with quality gates.

## Source Reference

Port patterns from `bus-math-v2/.github/workflows/cloudflare-deploy.yml`, `bus-math-v2/cloudflare/worker.ts`, and `bus-math-v2/wrangler.jsonc`.

## Functional Requirements

### 1. GitHub Actions Workflow

- Trigger: push to `main` (with path-ignore for `*.md`, `conductor/**`, `.gitignore`) plus manual `workflow_dispatch`
- Concurrency: single deploy group, `cancel-in-progress: false`
- Pipeline steps: checkout → Node 20 setup → `npm ci` → `npm run lint` (CI=true) → `npm test` (CI=true) → `npm run build` (CI=true) → Cloudflare deploy
- Failure notification on any step failure

### 2. Cloudflare Workers Deployment

- Use `cloudflare/wrangler-action@v3` for deployment
- Configure `wrangler.jsonc` with `nodejs_compat` compatibility flag
- Worker entry point via vinext server build output
- Static asset fallback via `env.ASSETS.fetch`

### 3. Secrets Management

- `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub secrets
- `CONVEX_DEPLOY_KEY` and `AUTH_JWT_SECRET` as Wrangler secrets

## Non-Functional Requirements

- Full pipeline completes in under 5 minutes
- No secrets in build logs
- Build fails fast on lint/type errors

## Acceptance Criteria

- [ ] Push to main triggers automated lint → test → build → deploy pipeline
- [ ] Failing lint/test/build blocks deployment
- [ ] Manual workflow dispatch available for emergency deploys
- [ ] Concurrency prevents parallel deployments
- [ ] No secrets leaked in logs

## Out of Scope

- Staging/preview deployments
- E2E test execution in CI (Playwright)
- Monitoring/alerting post-deploy
