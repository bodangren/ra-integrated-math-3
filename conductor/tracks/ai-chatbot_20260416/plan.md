# Implementation Plan: AI Tutoring — Lesson Chatbot

## Phase 1: AI Client Library

### Tasks

- [ ] **Task: Create OpenRouter provider**
  - [ ] Write unit tests for `createOpenRouterProvider` and `resolveOpenRouterProviderFromEnv` in `lib/ai/__tests__/providers.test.ts`
  - [ ] Implement `lib/ai/providers.ts` with configurable model, baseUrl, timeout
  - [ ] Verify graceful degradation when API key is absent

- [ ] **Task: Create retry utility**
  - [ ] Write unit tests for `withRetry` covering success, retryable failures (429, 5xx), non-retryable failures, max retries exceeded
  - [ ] Implement `lib/ai/retry.ts` with exponential backoff + jitter

- [ ] **Task: Create lesson context assembler**
  - [ ] Write unit tests for `assembleLessonChatbotContext` covering HTML stripping, truncation, missing data
  - [ ] Implement `lib/ai/lesson-context.ts` using published curriculum data

- [ ] **Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)**

## Phase 2: Rate Limiting

### Tasks

- [ ] **Task: Add Convex rate limits table and mutations**
  - [ ] Add `chatbot_rate_limits` table to schema with `by_user` index
  - [ ] Write tests for `checkAndIncrementRateLimit` (new window, within window, exceeded, window reset)
  - [ ] Implement `convex/rateLimits.ts` with check-and-increment, status query, cleanup mutation

- [ ] **Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)**

## Phase 3: API Route and Component

### Tasks

- [ ] **Task: Create chatbot API route**
  - [ ] Write integration tests for `POST /api/student/lesson-chatbot` covering auth, rate limit, validation, AI call, error cases
  - [ ] Implement `app/api/student/lesson-chatbot/route.ts` with full request pipeline

- [ ] **Task: Implement LessonChatbot component**
  - [ ] Write component tests for all 5 states: closed, open, loading, response, error
  - [ ] Implement `LessonChatbot.tsx` as FAB + card panel + one-shot state machine
  - [ ] Add to lesson page layout (student-facing only)

- [ ] **Task: Verify end-to-end flow**
  - [ ] Manual test: ask question, receive response, verify rate limit enforcement
  - [ ] Verify graceful degradation with no API key
  - [ ] Run full test suite, lint, typecheck

- [ ] **Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)**
