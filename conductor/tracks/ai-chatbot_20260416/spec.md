# Specification: AI Tutoring — Lesson Chatbot

## Overview

Port the lesson chatbot from `bus-math-v2`: a floating action button that opens a one-shot Q&A panel where students can ask questions about the current lesson. Uses OpenRouter for LLM inference with rate limiting and graceful degradation.

## Source Reference

Port from `bus-math-v2/components/student/LessonChatbot.tsx`, `bus-math-v2/lib/ai/` (providers, retry, lesson-context), `bus-math-v2/app/api/student/lesson-chatbot/route.ts`, and `bus-math-v2/convex/rateLimits.ts`.

## Functional Requirements

### 1. LessonChatbot Component

- Floating action button (fixed bottom-right, z-50) with MessageCircle icon
- Clicking opens a card-based panel (w-80 / sm:w-96)
- One-shot state machine: closed → open → loading → response → (loop back to open) or error
- Max question length: 1000 characters
- No chat history persistence — each interaction is independent
- Reset button clears state and returns to open
- Props: `{ lessonId: string; phaseNumber: number }`

### 2. API Route (POST /api/student/lesson-chatbot)

- Auth check: require student session
- Rate limit: check via Convex `checkAndIncrementRateLimit` mutation
- Input validation: lessonId (string), phaseNumber (number ≥ 1), question (string 1-1000 chars)
- Curriculum lookup: assemble lesson context from published curriculum
- AI call: send prompt to OpenRouter provider
- Response: `{ response: string }`

### 3. AI Client Library (lib/ai/)

- `providers.ts`: `createOpenRouterProvider(options)` → returns `(prompt: string) => Promise<string>`
  - Configurable: model, baseUrl, timeout (default 15000ms)
  - `resolveOpenRouterProviderFromEnv()` — reads `OPENROUTER_API_KEY`, returns null if not configured (graceful degradation)
- `retry.ts`: `withRetry(fn, options)` — exponential backoff with jitter, retries on 429/5xx, max 2 retries
- `lesson-context.ts`: `assembleLessonChatbotContext(lesson, phase)` — strips HTML, truncates to 2000 chars

### 4. Rate Limiting (Convex)

- `chatbot_rate_limits` table: userId, requestCount, windowStart
- Constants: 1-minute window, max 5 requests per window
- `checkAndIncrementRateLimit` mutation — atomic check-and-increment
- `getRateLimitStatus` query — UI display of remaining requests
- `cleanupStaleRateLimits` mutation — admin-only cleanup of entries older than 24h

### 5. Environment Variables

- `OPENROUTER_API_KEY` — required for AI features
- `OPENROUTER_MODEL` — optional, defaults to `openrouter/free`
- `OPENROUTER_API_BASE` — optional, defaults to OpenRouter API

## Non-Functional Requirements

- Chatbot degrades gracefully when no API key is configured (hidden or disabled)
- Rate limiting prevents abuse (5 requests per minute per student)
- AI responses never include harmful content (prompt guardrails)
- Server-side logging of usage (no client-side exposure of metadata)

## Acceptance Criteria

- [ ] FAB appears on lesson pages for students
- [ ] Students can ask one question at a time and receive AI-generated answers
- [ ] Rate limiting enforced (5 requests/minute)
- [ ] Chatbot hidden/disabled when OPENROUTER_API_KEY not configured
- [ ] Retry logic handles transient API failures
- [ ] No chat content persisted in database
- [ ] All components and API routes tested with >80% coverage

## Out of Scope

- Multi-turn conversation history
- Teacher-facing AI features
- AI feedback on math work/submissions
- Content moderation/filtering of AI responses
