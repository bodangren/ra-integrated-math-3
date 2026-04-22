# Tech Debt Registry

> This file is curated working memory, not an append-only log. Keep it at or below **50 lines**.
> Remove or summarize resolved items when they no longer need to influence near-term planning.
>
> **Severity:** `Critical` | `High` | `Medium` | `Low`
> **Status:** `Open` | `Resolved`

| Item | Sev | Status | Notes |
|------|-----|--------|-------|
| Misconception tags not persisted in review evidence | High | Open | getMisconceptionSummary always returns empty |
| SRS sessions: by_student_and_status index relies on undefined sorting | High | Open | No explicit filter for completedAt=undefined |
| Approval status race condition (no version/lock) | High | Open | No "approve exact version" check |
| N+1 query: phase sections in progress/preview/monitoring queries | High | Open | One DB query per phase inside loop |
| Teacher SRS queries: N+1 per-student unbounded .collect() loops | High | Open | Multiple handlers iterate students + collect |
| Equivalence checker: 6 aspirational tests marked .todo | High | Open | Needs symbolic math lib |
| StepByStepper-guided hint tracking test flaky in full suite | Low | Open | Passes in isolation; timing/ordering issue in full run |
| SRS CardStore: studentId type mismatch (contract vs schema) | High | Open | SrsCardState uses string, Convex uses Id<"profiles"> |
| lib/practice/objective-proficiency.ts + objective-policy.ts unmigrated | High | Open | 520 lines of domain logic not extracted to package |
| SRS: card + review log saved non-atomically | Medium | Open | If second mutation fails, card state updated without audit trail |
| RSC entry chunk 750 KB | Medium | Open | Code-splitting needed to get under 500 KB |
| Cloudflare worker deploys to production on every push | Medium | Open | No staging step, no canary, no approval gate |
| 5 packages missing vitest.config files | Low | Open | core-auth, core-convex, activity-runtime, component-approval, graphing-core |
| SubmissionDetailModal: array index used as React key | Low | Open | Should use stable ID |
| practice-core dual schema files | Medium | Open | submission.schema.ts + contract.ts parallel surfaces; consolidate |
| BM2 lib/auth ~250 lines duplicated from core-auth | High | Resolved | Replaced with re-export shims to @math-platform/core-auth; kept server.ts and ip-hash.ts local |
| BM2 lib/practice ~1305 lines duplicated from practice-core | High | Resolved | Replaced contract/srs-rating/timing-baseline/timing/error-analysis with re-export shims; kept engine/ and BM2-specific files local |
| teacher-reporting-core .js import extension inconsistency | Low | Open | Uses .js extensions while other packages don't |
| IM3 lib/study local copy not wired to study-hub-core types | Medium | Open | GlossaryTerm is wider than StudyTerm; structural compatibility works but not explicitly adopted |
| ai-tutoring: resolveOpenRouterProviderFromEnv untested | Medium | Open | Exported public API with zero test coverage |
| ai-tutoring: as any cast in providers.ts response parsing | Medium | Open | Need typed interface for OpenRouterResponse |
| IM3 Convex types stale: rateLimits + student.getLessonForChatbot | Medium | Open | Generated api.d.ts missing new handlers; must run npx convex dev to regenerate |
| CI: package test/lint continue-on-error swallows failures | High | Open | Broken packages can merge without detection |
| CI: BM2 redundant \|\| true + continue-on-error | Low | Open | Both layers suppress failures; remove one |
| workbook-pipeline: capstone filename hardcoded to BM2 domain | Medium | Open | "investor_ready_workbook" is business-math-specific; parameterize |
| workbook-pipeline: workbooks.client.ts double-cast bypasses types | Medium | Open | `as unknown as WorkbookManifest` — use zod validation |
| teacher-reporting: versionByLessonId picks first version silently | Medium | Open | No guarantee first version is the active one |
| Misconception summary fetches ALL reviews before date filter | Medium | Open | Filters by sinceMs in-memory; should use range query when index supports it |
| Type safety bypassed with `internal as any` in 3 files | Medium | Open | Generated api.d.ts stale; run npx convex dev to regenerate |
| Teacher lessons page: class selector dropdown non-functional | Medium | Open | Server component with no onChange; needs client component or URL routing |
| Demo seed only assigns Unit 1 lessons | Low | Open | seed-demo-env.ts queries unitNumber=1 only; blocks Units 2-9 chatbot access |
