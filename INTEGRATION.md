# Monorepo Integration Guide

This document covers package creation, app adoption patterns, boundary rules, and operational guides for the `ra-integrated-math-3` monorepo.

## Contents

1. [Monorepo Structure](#monorepo-structure)
2. [Package Creation](#package-creation)
3. [App Adoption](#app-adoption)
4. [Boundary Rules](#boundary-rules)
5. [Local Development](#local-development)
6. [Testing](#testing)
7. [Convex Projects](#convex-projects)
8. [Deployment](#deployment)
9. [Ownership Map](#ownership-map)

---

## Monorepo Structure

```
ra-integrated-math-3/          # Monorepo root
├── apps/
│   ├── integrated-math-3/     # IM3 application
│   └── bus-math-v2/            # Business Math v2 (reference and migration source)
├── packages/
│   ├── _template/              # Package scaffold template
│   ├── activity-runtime/       # Phase types, activity modes, completion tracking
│   ├── ai-tutoring/           # OpenRouter provider, retry wrapper, lesson context assembly
│   ├── component-approval/     # Content hashing, review queue assembly
│   ├── core-auth/             # JWT session, password hashing, demo provisioning
│   ├── core-convex/            # Convex client config, admin auth, query helpers
│   ├── graphing-core/          # Quadratic/linear parsers, canvas utilities
│   ├── practice-core/          # Practice contract, timing, rating, error analysis
│   ├── practice-test-engine/   # Shared test types and question utilities
│   ├── srs-engine/             # FSRS scheduler, review processor, queue, adapters
│   ├── study-hub-core/        # Flashcard/review session primitives, shuffle utilities
│   ├── teacher-reporting-core/ # Gradebook, course overview, competency heatmap, CSV export
│   └── workbook-pipeline/     # Workbook filename, manifest, and path utilities
├── conductor/                  # Conductor planning docs
└── README.md                   # Project overview
```

---

## Package Creation

### Prerequisites

Before creating a new package, confirm:
- The shared code is stable across both apps
- The code has no app-specific imports (`apps/*`, `convex/_generated/*`)
- The code is course-agnostic (no curriculum data, question banks, or domain assets)

### Steps

1. **Copy the template:**
   ```bash
   cp -r packages/_template packages/<your-package-name>
   ```

2. **Update `package.json`:**
   ```json
   {
     "name": "@math-platform/<your-package-name>",
     "main": "./src/index.ts",
     "types": "./src/index.ts",
     "exports": {
       ".": {
         "import": "./src/index.ts",
         "types": "./src/index.ts"
       }
     }
   }
   ```

3. **Update `tsconfig.json`** if your entry point differs.

4. **Write the package `README.md`** (see [Package README Template](#package-readme-template)).

5. **Add source code in `src/`** with all public APIs exported from `src/index.ts`.

6. **Add tests in `src/__tests__/`**.

7. **Run verification:**
   ```bash
   npm run ws:lint
   npm run ws:typecheck
   npm run ws:test
   npm run ws:build
   ```

---

## App Adoption

### IM3 Adoption

```bash
cd apps/integrated-math-3
npm install @math-platform/<package-name>
```

Update imports:
```typescript
// Before (local import)
import { someFunction } from '@/lib/practice/some-module';

// After (package import)
import { someFunction } from '@math-platform/practice-core';
```

### BM2 Adoption

Same as IM3 adoption. Both apps share the same package imports.

---

## Boundary Rules

### Critical Constraints

| Rule | Applies To | Description |
|------|------------|-------------|
| No `apps/*` imports | All packages | Packages must be app-agnostic |
| No `convex/_generated/*` imports | All packages | Use injected adapters for Convex APIs |
| No business-domain code | Shared packages | Keep domain-specific code app-local |
| No curriculum data | Shared packages | Question banks, glossary terms stay in apps |
| No asset files | Shared packages | Workbook files, images, fonts stay in apps |

### App-Local Keep List

**IM3 (must remain local):**
- `apps/integrated-math-3/lib/practice/engine/**` — algebraic practice families
- `apps/integrated-math-3/components/activities/graphing/**` — IM3-specific graphing configs
- `apps/integrated-math-3/curriculum/**` — lesson seeds, phase content
- `apps/integrated-math-3/lib/study/**` — IM3 glossary terms
- `apps/integrated-math-3/public/workbooks/**` — IM3 workbook assets

**BM2 (must remain local):**
- `apps/bus-math-v2/lib/practice/engine/**` — accounting practice families
- `apps/bus-math-v2/components/activities/spreadsheet/**` — spreadsheet activities
- `apps/bus-math-v2/components/activities/simulations/**` — business simulations
- `apps/bus-math-v2/resources/**` — business assets
- `apps/bus-math-v2/public/workbooks/**` — BM2 workbook assets

### Review Checklist

When merging package changes:
- [ ] No `import from 'apps/...'`
- [ ] No `import from 'convex/_generated/...'`
- [ ] No domain-specific code (accounting, spreadsheets, simulations)
- [ ] All public exports have tests
- [ ] Both IM3 and BM2 tests pass after adoption

---

## Local Development

### Environment Variables

**IM3** (in `apps/integrated-math-3/.env.local`):
```env
NEXT_PUBLIC_CONVEX_URL=<your-convex-url>
CONVEX_DEPLOY_KEY=<server-only deploy key>
AUTH_JWT_SECRET=<server-only JWT secret>
```

**BM2** (in `apps/bus-math-v2/.env.local`):
```env
NEXT_PUBLIC_CONVEX_URL=<your-convex-url>
CONVEX_DEPLOY_KEY=<server-only deploy key>
AUTH_JWT_SECRET=<server-only JWT secret>
```

### Running Both Apps

```bash
# Terminal 1: IM3
cd apps/integrated-math-3
npx convex dev --local
npm run dev:stack

# Terminal 2: BM2
cd apps/bus-math-v2
npx convex dev --local
npm run dev
```

### Workspace Scripts

From monorepo root:

| Command | Description |
|---------|-------------|
| `npm run ws:lint` | Lint all packages |
| `npm run ws:typecheck` | Typecheck all packages |
| `npm run ws:test` | Test all packages |
| `npm run ws:build` | Build all packages |

Per-app commands:

| Command | Description |
|---------|-------------|
| `npm run ws:im3:lint` | Lint IM3 |
| `npm run ws:im3:test` | Test IM3 |
| `npm run ws:im3:typecheck` | Typecheck IM3 |
| `npm run ws:im3:build` | Build IM3 |
| `npm run ws:bm2:lint` | Lint BM2 |
| `npm run ws:bm2:test` | Test BM2 |
| `npm run ws:bm2:build` | Build BM2 |

---

## Testing

### Package Tests

Place tests in `src/__tests__/`:
```
packages/<package>/
├── src/
│   ├── index.ts
│   └── __tests__/
│       └── *.test.ts
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

Run package tests:
```bash
npm run ws --workspace=@math-platform/<package-name> test
```

### App Tests

IM3:
```bash
cd apps/integrated-math-3
npm test
```

BM2:
```bash
cd apps/bus-math-v2
npm test
```

### Full Gates

**IM3:**
```bash
cd apps/integrated-math-3 && npm run lint && npm test && npm run typecheck && npm run build
```

**BM2:**
```bash
cd apps/bus-math-v2 && npm run lint && npm test && npm run build && npx tsc --noEmit
```

---

## Convex Projects

Each app maintains its own Convex project:

| App | Convex Project | Schema | Generated API |
|-----|----------------|--------|--------------|
| IM3 | `integrated-math-3` | `apps/integrated-math-3/convex/schema.ts` | `apps/integrated-math-3/convex/_generated/api.d.ts` |
| BM2 | `bus-math-v2` | `apps/bus-math-v2/convex/schema.ts` | `apps/bus-math-v2/convex/_generated/api.d.ts` |

### Convex Commands

```bash
# IM3
cd apps/integrated-math-3
npx convex dev --local          # Local development
npx convex deploy               # Deploy to production
npx convex schema push          # Push schema changes

# BM2
cd apps/bus-math-v2
npx convex dev --local
npx convex deploy
npx convex schema push
```

---

## Deployment

### IM3 (Cloudflare)

```bash
cd apps/integrated-math-3
npm run build
npx convex deploy
# Cloudflare Pages deploys from apps/integrated-math-3/
```

### BM2 (Cloudflare)

```bash
cd apps/bus-math-v2
npm run build
npx convex deploy
# Cloudflare Pages deploys from apps/bus-math-v2/
```

---

## Ownership Map

| Package | Owner | Canonical Source | App-Local Remainder |
|---------|-------|------------------|---------------------|
| `core-auth` | Shared | Both IM3 + BM2 | BM2 Supabase compat |
| `core-convex` | Shared | Both IM3 + BM2 | BM2 Supabase profile resolver |
| `practice-core` | Shared | IM3 | BM2 practice families |
| `srs-engine` | Shared | IM3 | Convex store adapters |
| `activity-runtime` | Shared | IM3 | Course activity components |
| `component-approval` | Shared | IM3 + BM2 hardening | App-specific review targets |
| `graphing-core` | Shared | Reconciled | BM2 exploration configs, IM3 quadratic configs |
| `practice-test-engine` | Shared | Reconciled | Question banks |
| `study-hub-core` | Shared | Reconciled | Glossary data, route loaders |
| `teacher-reporting-core` | Shared | Reconciled later | Convex query handlers |
| `ai-tutoring` | BM2 → Shared | BM2 | Rate-limit storage, API keys |
| `workbook-pipeline` | BM2 → Shared | BM2 | `.xlsx` assets, capstone PDFs |

---

## Package README Template

```markdown
# @math-platform/<package-name>

Brief description of what this package provides.

## Installation

This package is already part of the monorepo workspace. No separate installation needed.

## Usage

\`\`\`typescript
import { /* public API */ } from '@math-platform/<package-name>';
\`\`\`

## Public API

### Functions

#### `functionName`

Description.

\`\`\`typescript
function functionName(arg: Type): ReturnType
\`\`\`

### Types

#### `TypeName`

Description.

## Testing

\`\`\`bash
npm run ws --workspace=@math-platform/<package-name> test
\`\`\`

## Boundary Rules

This package MUST NOT:
- Import from `apps/*`
- Import from `convex/_generated/*`
- Contain business-domain code (accounting, spreadsheets, simulations)
- Contain curriculum data or asset files

## Changelog

### 2026-04-19
- Initial extraction
```