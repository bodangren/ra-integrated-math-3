# Specification: Scaffold Integrated Math 2 Course Application

## Overview

Scaffold the `apps/integrated-math-2/` application as a minimal runnable shell. The app already has product.md, product-guidelines.md, DESIGN.md, and curriculum/overview.md. This track creates the full project skeleton: config files, Convex schema, design system tokens, auth wiring, layout, landing page, and seed data so the app boots and renders pages.

## Functional Requirements

### FR-1: Project Configuration
- Copy and adapt all config files from IM3: package.json (with @math-platform/* workspace deps), tsconfig.json, vite.config.ts, vitest.config.ts, vitest.setup.ts, eslint.config.mjs, postcss.config.mjs, tailwind.config.ts, next.config.ts, wrangler.jsonc, .gitignore, .env.local template
- App name: `integrated-math-2`, Convex project: Integrated Math 2
- Scripts: dev, build, lint, typecheck, test, test:watch

### FR-2: Convex Schema
- Copy IM3's convex/schema.ts verbatim (all tables)
- Copy convex/tsconfig.json
- Create placeholder convex/_generated/ directory structure

### FR-3: Design System Implementation
- Implement DESIGN.md tokens in globals.css (same warm academic orange theme as IM3):
  - Brand orange primary, complementary teal accent
  - Warm neutrals tinted toward hue 70
  - Lora serif display font, DM Sans body font, Fira Code mono
  - oklch-based CSS custom properties
- Update tailwind.config.ts to match the DESIGN.md system

### FR-4: Layout and Providers
- Root layout.tsx with ConvexClientProvider, AuthProvider, ThemeProvider
- Header and footer components with Integrated Math 2 branding
- Middleware for auth-gated routes (component-approval pattern from IM3)

### FR-5: Landing Page
- Integrated Math 2 branded landing page with:
  - Hero section with course title and description
  - 13-unit overview cards (grouped by subject area)
  - Sign In and View Curriculum CTAs
  - Warm academic orange aesthetic per DESIGN.md

### FR-6: Auth Routes
- Login page at /auth/login
- Register page at /auth/register
- Reuse IM3's auth components (AuthProvider, auth-button, logout-button)

### FR-7: Curriculum Public Page
- /curriculum route showing 13 units with lesson listings
- Sourced from curriculum/overview.md content structure

### FR-8: Placeholder Dashboards
- /student/dashboard — placeholder with "Coming Soon" message
- /teacher/dashboard — placeholder with "Coming Soon" message

### FR-9: Seed Data
- Seed script (convex/seed.ts) with:
  - Demo organization, teacher, and student profiles
  - 13 units with lesson placeholders (slugs and titles from curriculum/overview.md)
  - No phase, activity, or standard content

### FR-10: Shared Lib Infrastructure
- lib/convex/server.ts — ConvexHttpClient with admin auth (from core-convex package)
- lib/auth/server.ts — Cookie-based session, role guards (from core-auth package)
- types/ — activity.ts, api.ts type definitions (copied from IM3)

### FR-11: Public API Routes
- Convex public.ts with unauthenticated curriculum queries
- API routes for auth (login, register, session)

## Non-Functional Requirements

- TypeScript strict mode, no `any` without eslint-disable
- `npm run dev` boots without errors
- `npm run build` completes (vinext build)
- `npm run lint` passes
- `npx tsc --noEmit` passes
- Tests pass (vitest) — at minimum config/placeholder tests

## Acceptance Criteria

1. `npm run dev` starts and landing page renders at localhost
2. Landing page shows Integrated Math 2 branding with warm academic orange design
3. /auth/login renders login form
4. /curriculum shows 13 units with lesson titles
5. /student/dashboard and /teacher/dashboard render placeholder pages
6. Convex schema matches IM3 schema (all tables present)
7. Seed script creates 13 units with ~67 lesson placeholders
8. `npm run lint && npm run build && npx tsc --noEmit` all pass
9. Root package.json has workspace scripts for integrated-math-2

## Out of Scope

- Activity components (graphing, step-by-step, quizzes)
- Lesson rendering engine (phase stepper, phase renderer)
- Teacher gradebook, competency heatmaps, submission review
- SRS daily practice, study hub, practice tests
- AI chatbot
- Workbook system
- Curriculum content authoring (phases, activities, standards)
- E2E tests
