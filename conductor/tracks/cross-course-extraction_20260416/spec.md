# Track: cross-course-extraction_20260416

## Context

The SRS system was built with course-agnosticism as a core principle. All scheduling, rating, proficiency, and queue logic accepts generic identifiers (`problemFamilyId`, `objectiveId`, `studentId`). Course-specific data is confined to seed data and activity configuration. Before declaring the system reusable, we need to verify boundaries, document interfaces, and produce integration guides.

## Goals

- Audit all SRS modules for course-specific coupling; fix any leaks.
- Document every public interface with type signatures, parameter descriptions, return types, error cases, and example usage.
- Produce an integration guide for adding a new course.
- Verify the adapter pattern works for non-Convex backends.

## Functional Requirements

### FR-1: Boundary Audit

Read every file in `lib/srs/` and `lib/practice/` (`srs-rating.ts`, `objective-proficiency.ts`, `timing-baseline.ts`, `timing.ts`). Flag any references to:

- Specific lesson names
- Module numbers
- Component keys beyond type signatures
- IM3-specific constants

Fix any leaks by parameterizing the course-specific references.

### FR-2: Interface Documentation

For each public module, document:

- Purpose
- Public types
- Public functions
- Function signatures with parameter descriptions
- Return types
- Error cases
- Example usage

Modules to document:

1. `lib/srs/contract.ts`
2. `lib/srs/scheduler.ts`
3. `lib/srs/review-processor.ts`
4. `lib/srs/queue.ts`
5. `lib/srs/adapters.ts`
6. `lib/practice/srs-rating.ts`
7. `lib/practice/objective-proficiency.ts`
8. `lib/practice/timing-baseline.ts`
9. `lib/practice/timing.ts`
10. `lib/practice/contract.ts`

### FR-3: Integration Guide

Create `lib/srs/INTEGRATION.md` explaining how to add SRS to a new course:

1. Define activity components and register them.
2. Create problem family seed data mapping activities to objectives.
3. Assign objective practice policies (`essential` / `supporting` / `extension` / `triaged`).
4. Implement `CardStore` and `ReviewLogStore` for your backend.
5. Create daily practice page using queue engine.
6. Wire submission adapter to update cards on practice completion.

### FR-4: Adapter Verification

Write a test that demonstrates a non-Convex `CardStore` implementation (e.g., a REST API adapter stub) works with the scheduler and review processor.

### FR-5: Type Export Verification

Verify that all types needed for integration are exported from `lib/srs/contract.ts` and that no internal types leak into public signatures.

## Non-Functional Requirements

- Documentation must be accurate to the actual code.
- Examples must compile.
- No markdown lint errors.

## Acceptance Criteria

- [ ] Boundary audit complete with zero course-specific leaks in `lib/srs/`.
- [ ] All public interfaces documented with examples.
- [ ] `INTEGRATION.md` produced with step-by-step guide.
- [ ] Non-Convex adapter test passes.
- [ ] Type export verification passes.

## Dependencies

- All tracks 1-11 must be complete.

## Out of Scope

- Building a second course.
- Creating a shared npm package.
- API design for external consumers.
