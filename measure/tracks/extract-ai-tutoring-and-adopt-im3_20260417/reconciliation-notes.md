# Reconciliation Notes

## Canonical Source Decision
- Canonical source: BM2
- Reason: AI tutoring primitives were first implemented in BM2 and are course-agnostic (provider factory, retry logic, lesson context assembly)

## Delta Classification
- required behavior: None - BM2 implementation was directly portable
- bug/security hardening: Fixed "empty response" error to include status code (400) to prevent infinite retry
- domain-specific (must remain app-local): BM2-only `spreadsheet-feedback.ts`, rate-limit storage, API keys/secrets, auth/route wiring
- docs/comments only: None

## App-Local Keep List
- IM3:
  - IM3 chatbot implementation (pending - Phase 3)
  - IM3 API routes and auth hooks
- BM2:
  - `lib/ai/spreadsheet-feedback.ts` (BM2-specific)
  - API keys and secrets
  - Rate-limit persistence storage
  - Route wiring for chatbot endpoint
  - `components/student/LessonChatbot.tsx` (UI + state - app-local)

## Package API Decisions
- exported symbols:
  - `retry.ts`: `withRetry`, `isRetryableStatus`, `RetryOptions`
  - `providers.ts`: `createOpenRouterProvider`, `resolveOpenRouterProviderFromEnv`, `OpenRouterProviderOptions`
  - `lesson-context.ts`: `assembleLessonChatbotContext`, `LessonChatbotContext`
- intentionally not exported:
  - `spreadsheet-feedback.ts` (BM2-specific, not generic)
  - Individual retry internals (`isRetryableError`, `sleep`)

## Verification Results
- commands run: `npm run test && npm run lint && npm run typecheck`
- outcome: PASS (31 tests, 0 lint errors, 0 type errors)