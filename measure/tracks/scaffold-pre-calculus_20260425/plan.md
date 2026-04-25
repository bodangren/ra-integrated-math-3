# Implementation Plan: Scaffold AP Precalculus Course Application

## Phase 1: Project Configuration and Dependencies

- [x] Task: Create package.json with workspace dependencies
    - [x] Write package.json with @math-platform/* deps, vinext, vitest, and all IM3-equivalent deps
    - [x] Verify npm install resolves workspace deps
- [x] Task: Create TypeScript and build configuration
    - [x] Write tsconfig.json (copy from IM3)
    - [x] Write vite.config.ts (adapted for pre-calculus)
    - [x] Write next.config.ts
    - [x] Write postcss.config.mjs
    - [x] Write eslint.config.mjs
    - [x] Write tailwind.config.ts (adapted for DESIGN.md tokens)
- [x] Task: Create test and utility configuration
    - [x] Write vitest.config.ts and vitest.setup.ts
    - [x] Write wrangler.jsonc (name: pre-calculus)
    - [x] Write .gitignore and .env.local template
    - [x] Write scripts/dev-stack.mjs
- [x] Task: Measure - Phase 1 Manual Verification (Protocol in workflow.md)

## Phase 2: Convex Schema and Backend Infrastructure

- [x] Task: Copy Convex schema and configuration
    - [x] Create convex/ directory with tsconfig.json
    - [x] Copy schema.ts from IM3 verbatim
    - [x] Create convex/_generated/ placeholder
- [x] Task: Create backend functions
    - [x] Write convex/public.ts — unauthenticated curriculum queries
    - [x] Write convex/auth.ts — login/register/session handlers
    - [x] Write convex/activities.ts — placeholder
    - [x] Write convex/student.ts — placeholder
    - [x] Write convex/teacher.ts — placeholder
    - [x] Write convex/seed.ts — orchestration entry point
- [x] Task: Create lib infrastructure
    - [x] Write lib/convex/server.ts (using @math-platform/core-convex)
    - [x] Write lib/auth/server.ts (using @math-platform/core-auth)
    - [x] Write lib/utils.ts (cn helper)
    - [x] Write types/activity.ts and types/api.ts
- [x] Task: Write unit tests for lib utilities
    - [x] Test lib/utils.ts cn helper
    - [x] Test lib/convex/server.ts ConvexHttpClient setup
- [x] Task: Measure - Phase 2 Manual Verification (Protocol in workflow.md)

## Phase 3: Design System and Global Styles

- [x] Task: Implement DESIGN.md tokens in globals.css
    - [x] Write dark-mode-native color palette (canvas #080a0f, panel #141820, surface #1e2330)
    - [x] Define indigo primary (#5e6ad2) and sky-blue accent (#38bdf8) tokens
    - [x] Implement Inter Variable with cv01/ss03 font stack
    - [x] Implement typography hierarchy (display 68px weight 510, body, caption, label)
    - [x] Add component base styles (buttons, cards, inputs, navigation)
    - [x] Add animation utilities
- [x] Task: Update tailwind.config.ts for DESIGN.md system
    - [x] Configure spacing scale (base 8px)
    - [x] Configure border-radius scale (2/4/6/8/12/9999px)
    - [x] Configure responsive breakpoints per DESIGN.md
    - [x] Add font family tokens (Inter Variable, Fira Code)
- [x] Task: Write public assets
    - [x] Add favicon.svg placeholder
- [x] Task: Measure - Phase 3 Manual Verification (Protocol in workflow.md)

## Phase 4: Layout, Providers, and Middleware

- [x] Task: Create root layout with providers
    - [x] Write app/layout.tsx with ConvexClientProvider + AuthProvider + ThemeProvider
    - [x] Write components/ConvexClientProvider.tsx
    - [x] Write components/auth/AuthProvider.tsx (using @math-platform/core-auth)
    - [x] Write components/auth-button.tsx
    - [x] Write components/logout-button.tsx
    - [x] Write components/user-menu.tsx
    - [x] Write components/theme-switcher.tsx
    - [x] Write components/env-var-warning.tsx
- [x] Task: Create header and footer components
    - [x] Write components/header-simple.tsx with AP Precalculus branding
    - [x] Write components/footer.tsx with course attribution
- [x] Task: Create middleware
    - [x] Write middleware.ts for component-approval auth guard
- [x] Task: Write component tests
    - [x] Test AuthProvider renders
    - [x] Test ConvexClientProvider renders
    - [x] Test header and footer render
- [x] Task: Measure - Phase 4 Manual Verification (Protocol in workflow.md)

## Phase 5: Pages and Routes

- [x] Task: Create landing page
    - [x] Write app/page.tsx with AP Precalculus hero, unit overview cards, CTAs
    - [x] Dark-mode-native aesthetic per DESIGN.md
- [x] Task: Create auth routes
    - [x] Write app/auth/login/page.tsx
    - [x] Write app/auth/register/page.tsx
    - [x] Write app/api/auth/login/route.ts
    - [x] Write app/api/auth/register/route.ts
    - [x] Write app/api/auth/session/route.ts
- [x] Task: Create curriculum page
    - [x] Write app/curriculum/page.tsx showing 4 units with lesson listings
- [x] Task: Create placeholder dashboards
    - [x] Write app/student/dashboard/page.tsx with "Coming Soon"
    - [x] Write app/teacher/dashboard/page.tsx with "Coming Soon"
- [x] Task: Write page tests
    - [x] Test landing page renders
    - [x] Test login page renders
    - [x] Test curriculum page renders units
- [x] Task: Measure - Phase 5 Manual Verification (Protocol in workflow.md)

## Phase 6: Seed Data and Verification

- [x] Task: Create seed data for AP Precalculus
    - [x] Write convex/seed.ts — 4 units with 58 lesson slugs and titles from curriculum/overview.md
    - [x] Seed creates demo org, teacher, student profiles
- [x] Task: Update root workspace configuration
    - [x] ws:pc:lint, ws:pc:test, ws:pc:typecheck, ws:pc:build scripts already in root package.json
- [x] Task: Final verification
    - [x] Run npm run lint — PASSES
    - [x] Run npx tsc --noEmit — PASSES
    - [x] Run npm run build — PASSES
    - [x] Run npm run test — 9/9 PASS
- [x] Task: Measure - Phase 6 Manual Verification (Protocol in workflow.md)
