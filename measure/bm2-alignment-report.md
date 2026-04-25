# BM2 → IM3 Alignment Report

**Date:** 2026-04-16  
**Source:** `bus-math-v2` (sister project)  
**Target:** `ra-integrated-math-3` (this project)  
**Scope:** Identify proven features, patterns, and infrastructure from `bus-math-v2` that can be ported into `ra-integrated-math-3` with minimal adaptation.

---

## Executive Summary

`bus-math-v2` is a mature, classroom-ready business-math platform with a complete 8-unit curriculum, capstone module, workbook/artifact pipeline, AI tutoring features, and extensive teacher reporting. `ra-integrated-math-3` is a newer, Algebra/Trig-focused platform with stronger activity infrastructure and a planned FSRS daily-practice system—but it currently lacks many of the "complete course app" features required for daily classroom use.

The most valuable imports from `bus-math-v2` are:

1. **Workbook System & Artifact Pipeline** — dynamic workbook manifests, student templates, teacher completed versions, PDF guides.
2. **Practice Test Engine** — unit-level question banks, 6-phase test experience, score persistence, post-answer feedback.
3. **Student Study Hub** — flashcards, matching game, speed round, progress dashboard.
4. **AI Tutoring & Feedback** — lesson chatbot via OpenRouter, spreadsheet AI feedback with revision loops.
5. **Teacher Gradebook & Competency Heatmaps** — complete reporting IA with drill-down modals and mastery labeling.
6. **Capstone Module Architecture** — milestone tracking, rubric pages, final presentation workflow.
7. **Cloudflare Deployment Hardening** — production CI/CD, security patterns, rate limiting.

---

## Side-by-Side Comparison

| Domain | `ra-integrated-math-3` (Current) | `bus-math-v2` (Sister) | Portability |
|--------|--------------------------------|------------------------|-------------|
| **Curriculum** | Modules 1–9 (Algebra → Trig), CCSS standards | 8 units + capstone, practice families A–U | Low — domain-specific |
| **Practice Engine** | `practice.v1` contract + timing telemetry + planned SRS | Same `practice.v1` contract, algorithmic families A–U, submission evidence | **Very High** |
| **Student Study Tools** | Lesson flow only; daily SRS practice planned | Flashcards, matching, speed round, SRS review, practice tests, progress dashboard | **High** |
| **Teacher Reporting** | Gradebook + planned SRS dashboard | Gradebook, competency heatmaps, submission drill-down, reporting IA | **High** |
| **Workbook/Artifacts** | None yet | 66 workbooks, PDF guides, CSV datasets, capstone rubrics | **High** |
| **Activity Infrastructure** | Flexible phase model, unified activity registry | Component-specific phases, hardcoded 6-phase assumptions | Medium |
| **Graphing** | Canvas-based `GraphingExplorer` with sliders | Chart.js simulations | Medium |
| **Component Approval** | Runtime prop-based content hashes, harness gating | Build-time file hashes (`lib/component-versions.json`) | Medium |
| **AI Integration** | None yet | Lesson chatbot, spreadsheet AI feedback | **High** |
| **Deployment** | GitHub Actions + Cloudflare (basic) | Hardened Cloudflare Workers, security patterns, rate limiting | **High** |

---

## 1. Workbook System & Artifact Pipeline ⭐ Highest Value

**What it is:** A complete workbook pipeline that generates 66 workbook files across all 8 units plus capstone. Each workbook has a student template (`.docx`/`.pdf`) and a teacher completed version. A dynamic manifest is generated at build time from `public/workbooks/`.

**Why port it:** `ra-integrated-math-3` currently has no artifact generation. A workbook system would give students printable practice sets and teachers answer keys—essential for classroom adoption.

**What to port:**
- `scripts/generate-workbook-manifest.ts` — build-time manifest generation.
- `lib/workbooks/` (or equivalent pattern) — workbook resolution logic.
- `app/teacher/...` workbook download routes.
- The manifest-driven UI pattern for listing/downloading workbooks by unit.

**Integration effort:** Low–Medium. The manifest generation is domain-agnostic. The actual workbook content would be Algebra/Trig problem sets rather than accounting statements.

**Additional artifacts to port:**
- PDF content generation pattern (Business Plan Guide, Pitch Rubric, Model Tour Checklist).
- CSV dataset API (`app/api/datasets/...`) with auth guards.

---

## 2. Practice Test Engine ⭐ High Value

**What it is:** A full practice test system with:
- Unit-level question banks (3+ questions per unit).
- 6-phase test experience (introduction, questions, review, etc.).
- Convex score persistence.
- Post-answer feedback with explanations.
- Student-facing test selection and engine UI.

**Why port it:** `ra-integrated-math-3` has `practice.v1` activities but no summative assessment experience. This engine provides standardized, time-bounded testing with persistent results.

**What to port:**
- `lib/practice-tests/question-banks.ts` — domain-agnostic test data structure.
- `components/student/PracticeTestEngine.tsx` — generic test runner.
- `components/student/PracticeTestSelection.tsx` — test picker UI.
- `convex/practiceTests.ts` (or equivalent) — score persistence queries/mutations.

**Integration effort:** Medium. The UI is course-agnostic, but question banks must be authored for Modules 1–9.

---

## 3. Student Study Hub

**What it is:** A collection of study modes beyond the lesson flow:
- **Flashcards** — term/definition review with FSRS scheduling.
- **Matching Game** — drag-and-drop term matching.
- **Speed Round** — timed recall game.
- **SRS Review** — due-term review session.
- **Progress Dashboard** — per-unit mastery and session history.

**Current state in `ra-integrated-math-3`:** Only lesson flow exists. Daily SRS practice is planned but not built.

**What to port:**
- `components/student/FlashcardPlayer.tsx` + `app/student/study/flashcards/page.tsx`.
- `components/student/MatchingGame.tsx` + `app/student/study/matching/page.tsx`.
- `components/student/SpeedRoundGame.tsx` + `app/student/study/speed-round/page.tsx`.
- `components/student/ProgressDashboard.tsx` + `app/student/study/progress/page.tsx`.
- `lib/study/` utilities — glossary types, SRS helpers, study session utils.

**Integration effort:** Low–Medium. The games are generic. The main adaptation is replacing accounting glossary data with Algebra/Trig vocabulary.

---

## 4. AI Tutoring & Feedback ⭐ Differentiator

**What it is:** Two AI-powered student experiences:
- **Lesson Chatbot** — a one-shot chatbot per lesson via OpenRouter, with rate limiting and usage analytics.
- **Spreadsheet AI Feedback** — students upload spreadsheet work, get AI-generated feedback, can revise, with attempt history visible to teachers.

**Why port it:** `ra-integrated-math-3` has no AI features. These are high-engagement differentiators that reduce teacher workload.

**What to port:**
- `components/student/LessonChatbot.tsx` — generic chatbot wrapper.
- `lib/ai/` — OpenRouter client, rate limiting, prompt builders.
- `convex/aiUsage.ts` — usage analytics and guardrails.
- Spreadsheet feedback components and Convex mutations (if applicable to math work submissions).

**Integration effort:** Medium. The OpenRouter integration and rate-limiting patterns are domain-agnostic. Prompts would need to target Algebra/Trig content.

---

## 5. Teacher Gradebook & Competency Heatmaps

**What it is:** A complete teacher reporting layer:
- **Gradebook** — unit-level progress, independent practice/assessment indicators, submission drill-down via `SubmissionDetailModal`.
- **Competency Heatmaps** — mastery labeling with student drill-down pages.
- **Reporting IA** — course → unit → lesson → student drill-down with breadcrumbs.
- **Lesson monitoring routes** — teacher oversight of live lesson progress.

**Current state in `ra-integrated-math-3`:** Basic teacher dashboard exists; planned SRS dashboard is upcoming. No competency heatmaps or detailed gradebook.

**What to port:**
- `app/teacher/gradebook/` pages and components.
- `app/teacher/competencies/` heatmap components.
- `components/teacher/SubmissionDetailModal.tsx`.
- `convex/teacher/gradebook.ts` and `convex/teacher/competencies.ts` queries.

**Integration effort:** Medium. The UI patterns are generic, but the underlying data model must map to `ra-integrated-math-3`'s module/lesson/phase schema.

---

## 6. Capstone Module Architecture

**What it is:** A capstone experience with:
- Milestone tracking.
- Workbook artifact integration.
- Rubric pages with inline content (point allocations + checklist sections).
- Final presentation coverage.

**Why port it:** `ra-integrated-math-3` has no capstone or project-based learning module. This architecture could be adapted for a semester-end math project.

**What to port:**
- `app/capstone/` routing and page structure.
- Capstone rubric rendering pattern.
- Milestone/workbook linkage pattern.

**Integration effort:** Medium–High. The architecture is reusable, but capstone content must be authored for Integrated Math 3.

---

## 7. Cloudflare Deployment Hardening

**What it is:** Production-hardened deployment with:
- Cloudflare Workers as the deployment target.
- GitHub Actions CI workflow.
- Security hardening: auth guards, rate limiting, fail-closed behavior, server-side hash verification, middleware auth for dev pages.
- Dead code pruning and build-time manifest generation.

**Current state in `ra-integrated-math-3`:** Basic Cloudflare deployment exists, but security and CI patterns are less mature.

**What to port:**
- `.github/workflows/` — CI patterns for lint, test, build, deploy.
- `cloudflare/worker.ts` — edge runtime patterns.
- `wrangler.jsonc` / `next.config.ts` alignment for Cloudflare.
- Middleware auth patterns (`middleware.ts`) for dev-only and role-guarded routes.
- Rate-limiting utilities (`lib/rateLimit.ts` or equivalent).

**Integration effort:** Low–Medium. Mostly configuration and utility patterns.

---

## 8. Security Patterns

**What it is:** `bus-math-v2` has mature security patterns:
- Route-level auth with `requireStudentSessionClaims` / `requireTeacherSessionClaims`.
- JWT-claim role checks in middleware.
- Server-side hash verification for component approvals.
- Fail-closed API behavior.

**What to port:**
- `lib/auth/server.ts` patterns.
- `lib/auth/roles.ts` or equivalent role-check utilities.
- API route guard patterns.

**Integration effort:** Low. These are generic Next.js/Convex auth patterns.

---

## Recommended Porting Order

| Priority | Feature | Effort | Value |
|----------|---------|--------|-------|
| 1 | **Security & Auth Hardening** | Low | Very High |
| 2 | **Practice Test Engine** | Medium | Very High |
| 3 | **Student Study Hub (Games + Progress)** | Low–Medium | High |
| 4 | **Workbook System & Artifacts** | Medium | High |
| 5 | **Teacher Gradebook & Competency Heatmaps** | Medium | High |
| 6 | **AI Tutoring & Feedback** | Medium | High |
| 7 | **Capstone Module Architecture** | Medium–High | Medium |
| 8 | **Cloudflare CI/CD Hardening** | Low–Medium | Medium |

---

## What *Not* to Port

- **8-unit accounting curriculum seeds** — No overlap with Algebra/Trig.
- **Practice families A–U** — Accounting-specific (journal entries, trial balance, etc.).
- **Bilingual glossary (EN/ZH)** — Unless Chinese localization is a requirement.
- **Component approval build-time manifest** — `ra-integrated-math-3` already has a more advanced prop-hash system.

---

## Appendix: Key Files in Sister Project

| Feature | Key Files |
|---------|-----------|
| Workbooks | `scripts/generate-workbook-manifest.ts`, `public/workbooks/`, `app/api/workbooks/` |
| Practice Tests | `components/student/PracticeTestEngine.tsx`, `components/student/PracticeTestSelection.tsx`, `lib/practice-tests/` |
| Study Hub | `components/student/FlashcardPlayer.tsx`, `components/student/MatchingGame.tsx`, `components/student/SpeedRoundGame.tsx`, `components/student/ProgressDashboard.tsx`, `lib/study/` |
| AI Features | `components/student/LessonChatbot.tsx`, `lib/ai/`, `convex/aiUsage.ts` |
| Teacher Reporting | `app/teacher/gradebook/`, `app/teacher/competencies/`, `components/teacher/SubmissionDetailModal.tsx`, `convex/teacher/gradebook.ts` |
| Capstone | `app/capstone/`, capstone rubric components |
| Security/Deployment | `.github/workflows/`, `cloudflare/worker.ts`, `middleware.ts`, `lib/auth/server.ts` |
