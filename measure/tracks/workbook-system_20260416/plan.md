# Implementation Plan: Workbook System & Artifact Pipeline

## Phase 1: Manifest Generation and Resolution

### Tasks

- [ ] **Task: Create manifest generation script**
  - [ ] Write tests for filename parsing (module_01_lesson_03_student.pdf, module_09_lesson_07_teacher.pdf)
  - [ ] Implement `scripts/generate-workbook-manifest.ts` scanning `public/workbooks/`
  - [ ] Generate typed `WorkbookManifest` JSON output
  - [ ] Wire into `predev` and `build` npm scripts

- [ ] **Task: Create server workbook resolution module**
  - [ ] Write tests for `getWorkbookPath`, `workbookExists`, `lessonHasWorkbooks`
  - [ ] Implement `lib/workbooks/workbooks.ts` with filesystem checks

- [ ] **Task: Create client workbook resolution module**
  - [ ] Write tests for manifest-based lookup functions
  - [ ] Implement `lib/workbooks/workbooks.client.ts` importing manifest JSON
  - [ ] Verify safe for browser/RSC use (no filesystem calls)

- [ ] **Task: Measure - User Manual Verification 'Phase 1' (Protocol in workflow.md)**

## Phase 2: Download Routes

### Tasks

- [ ] **Task: Create workbook download API route**
  - [ ] Write integration tests for download route: auth, role guard, valid file, missing file, path traversal attempt
  - [ ] Implement `app/api/workbooks/[module]/[lesson]/[type]/route.ts`
  - [ ] Add auth guard (requireRequestSessionClaims), role guard (teacher-only for teacher type)
  - [ ] Add path traversal protection and proper MIME type handling

- [ ] **Task: Measure - User Manual Verification 'Phase 2' (Protocol in workflow.md)**

## Phase 3: UI Integration

### Tasks

- [ ] **Task: Add workbook download UI to lesson views**
  - [ ] Write component tests for conditional workbook section rendering
  - [ ] Add teacher lesson view: two-column grid with student + teacher download buttons
  - [ ] Add student lesson view: single student download button
  - [ ] Both conditional on `lessonHasWorkbooks()` returning true

- [ ] **Task: Create placeholder workbook content and verify end-to-end**
  - [ ] Create sample workbook files in `public/workbooks/` for testing (e.g., module_01_lesson_01_student.pdf)
  - [ ] Run manifest generation, verify manifest output
  - [ ] Manual test: download as student (student type only), download as teacher (both types)
  - [ ] Run full test suite, lint, typecheck

- [ ] **Task: Measure - User Manual Verification 'Phase 3' (Protocol in workflow.md)**
