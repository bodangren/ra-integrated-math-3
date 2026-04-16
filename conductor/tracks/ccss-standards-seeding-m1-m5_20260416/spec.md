# CCSS Standards Seeding for M1-M5 - Specification

## Context

The `seed-standards.ts` currently has CCSS standards for modules 6-9 but is missing standards for modules 1-5. Additionally, `seed-lesson-standards.ts` has lesson-standard links for M6-M9 but not for M1-M5. This track addresses both gaps.

## Problem

1. **Missing standards for M1-M5**: The `competency_standards` table lacks standards that map to M1-M5 curriculum topics (quadratics, polynomials, polynomial equations, inverses/radicals, exponentials).
2. **Missing lesson-standard links for M1-M5**: The `lesson_standards` table has no links between M1-M5 lessons and their CCSS standards, while M6-M9 have full coverage.

## Approach

### Step 1: Identify Required Standards for M1-M5

Based on the curriculum modules and problem-type-registry, the following CCSS codes are needed:

**Module 1 - Quadratic Functions:**
- HSA-SSE.B.3 (already exists)
- HSA-REI.B.4 (already exists)
- N-CN.A.1 (already exists)
- N-CN.C.7 (already exists)
- HSA-CED.A.1 (already exists)
- HSA-CED.A.2 (already exists)

**Module 2 - Polynomials and Polynomial Functions:**
- HSA-APR.A.1 (already exists)
- HSF-IF.B.4 (already exists)
- HSF-IF.C.7c (MISSING - graphing square root, cube root, piecewise)
- HSA-APR.B.3 (already exists)

**Module 3 - Polynomial Equations:**
- HSA-REI.B.4 (already exists)
- HSA-APR.B.2 (already exists)
- HSA-APR.B.3 (already exists)

**Module 4 - Inverses and Radical Functions:**
- HSF-BF.B.4 (already exists)
- HSF-IF.C.7a (MISSING - graphing square root, cube root functions)
- N-RN.A.1 (already exists)
- N-RN.A.2 (already exists)
- N-CN.A.2 (MISSING - multiplication of complex numbers in radical form)

**Module 5 - Exponential Functions and Geometric Series:**
- HSF-LE.A.1 (already exists)
- HSF-LE.A.2 (MISSING - intercepts, exponents, logarithms)
- HSF-LE.B.5 (MISSING - geometric sequences as exponential functions)

### Step 2: Add Missing Standards to seed-standards.ts

Add the 5 missing standards:
- HSF-IF.C.7c: Graph square root, cube root, and piecewise-defined functions
- HSF-IF.C.7a: Graph exponential and logarithmic functions (partial - base cases)
- N-CN.A.2: Know and apply the fundamental theorem of algebra
- HSF-LE.A.2: Solve exponential equations using logarithms
- HSF-LE.B.5: Identify discrete and continuous exponential functions

### Step 3: Add lesson_standards Links for M1-M5

Following the pattern established in `seed-lesson-standards.ts` for M6-M9, create `seedModule1LessonStandards` through `seedModule5LessonStandards` mutations that link lessons to their primary CCSS standards.

## Requirements

1. All new standards must be added idempotently (check for existence before insert).
2. lesson_standards links must use the same pattern as M6-M9 (by_slug index lookup, by_lesson index for version).
3. New seeder functions must be wired into `seed.ts` orchestration.
4. Standards must have meaningful studentFriendlyDescription.

## Acceptance Criteria

1. `seed-standards.ts` includes all standards needed for M1-M5 with correct descriptions.
2. `seed-lesson-standards.ts` includes lesson-standard links for all M1-M5 lessons.
3. New seeder mutations are wired into `seed.ts` and callable.
4. Standards referenced in lesson_standards links exist in `competency_standards`.
5. `npm run lint` and `npm run typecheck` pass.
