# Specification: Workbook System & Artifact Pipeline

## Overview

Port the workbook artifact pipeline from `bus-math-v2`, adapted for Integrated Math 3. Provides build-time manifest generation, client/server workbook resolution, authenticated download routes, and UI integration for both students and teachers.

## Source Reference

Port from `bus-math-v2/scripts/generate-workbook-manifest.ts`, `bus-math-v2/lib/curriculum/workbooks.ts`, `bus-math-v2/lib/curriculum/workbooks.client.ts`, and `bus-math-v2/app/api/workbooks/`.

## Functional Requirements

### 1. Build-Time Manifest Generation

- Script: `scripts/generate-workbook-manifest.ts`
- Scans `public/workbooks/` for `.pdf` and `.docx` files
- Parses filenames: `module_XX_lesson_XX_(student|teacher).pdf`
- Generates `WorkbookManifest { version, generatedAt, files[], byModuleAndLesson }`
- Writes JSON to `lib/workbooks-manifest.json`
- Integrated into `npm run predev` and `npm run build`

### 2. Workbook Resolution

- Server module (`lib/workbooks/workbooks.ts`, `'use server'`):
  - `getWorkbookPath(moduleNumber, lessonNumber, type)` → file path
  - `workbookExists(moduleNumber, lessonNumber, type)` → boolean (fs check)
  - `lessonHasWorkbooks(moduleNumber, lessonNumber)` → boolean
- Client module (`lib/workbooks/workbooks.client.ts`):
  - Imports pre-built manifest JSON
  - `hasStudentWorkbook(moduleNumber, lessonNumber)` → boolean
  - `hasTeacherWorkbook(moduleNumber, lessonNumber)` → boolean
  - `lessonHasWorkbooks(moduleNumber, lessonNumber)` → boolean

### 3. Download Routes

- `GET /api/workbooks/[module]/[lesson]/[type]/route.ts`:
  - Auth guard: require session claims
  - Role guard: only teachers can download `teacher` type
  - Input validation: module/lesson are 2-digit strings, type is "student" | "teacher"
  - Path traversal protection: verify resolved path starts with workbooks directory
  - Serve file with proper MIME type and `Content-Disposition: attachment`

### 4. UI Integration

- Teacher lesson view: two-column grid with "Student Materials" and "Teacher Materials" download buttons
- Student lesson view: single download button for student workbook (when available)
- Conditional rendering: only show workbook section when `lessonHasWorkbooks()` returns true

## Non-Functional Requirements

- Manifest generation completes in under 1 second
- Download routes stream files (no full-file buffering in memory)
- Path traversal protection on all download routes

## Acceptance Criteria

- [ ] `npm run build` generates manifest from `public/workbooks/` contents
- [ ] Client module correctly resolves workbook availability without filesystem access
- [ ] Download route enforces auth + role guards
- [ ] Teachers can download both student and teacher workbooks
- [ ] Students can only download student workbooks
- [ ] Path traversal attempts are rejected
- [ ] UI conditionally shows workbook download when materials exist

## Out of Scope

- Workbook content authoring (PDF/docx creation for M1-M9 lessons)
- CSV dataset API
- Capstone-specific workbook handling
- Automated workbook generation from curriculum data
