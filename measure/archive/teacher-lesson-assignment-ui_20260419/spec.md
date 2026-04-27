# Track: Teacher Lesson Assignment UI

## Summary

Build a UI for teachers to assign curriculum lessons to their classes, populating the `class_lessons` table which currently exists but is empty. This enables proper lesson-level access control instead of relying on the open-enrollment fallback.

## Problem Statement

The `class_lessons` table exists in the schema but has no entries and no UI for teachers to populate it. The chatbot authorization (in `student.ts:getLessonForChatbot`) currently falls back to allowing access when no `class_lessons` entries exist. Proper lesson assignment is needed for production use.

## Goals

1. Allow teachers to view their classes and see which lessons are assigned
2. Allow teachers to assign lessons to a class
3. Allow teachers to unassign lessons from a class
4. Wire the assignment data to the existing chatbot authorization check

## Technical Approach

### Convex Layer
- Add `internalQuery` handlers:
  - `getTeacherClassesWithLessons` - returns teacher's classes with assigned lessons
  - `getAvailableLessons` - returns all lessons that can be assigned
- Add `internalMutation` handlers:
  - `assignLessonToClass` - adds entry to `class_lessons`
  - `unassignLessonFromClass` - removes entry from `class_lessons`

### Frontend Layer
- New `/teacher/lessons` page with:
  - Class selector dropdown
  - List of lessons with assigned/unassigned toggle
  - Visual indication of current assignment state

### Schema
```
class_lessons: {
  classId: Id<"classes">,
  lessonId: Id<"lessons">,
  assignedAt: number,
  createdAt: number,
}
indexes: by_class_and_lesson, by_lesson
```

## Out of Scope

- Bulk assignment (assign all lessons at once)
- Assignment scheduling (assign for future dates)
- Per-student overrides

## Dependencies

- Teacher authentication (`requireTeacherSessionClaims`)
- Existing `classes`, `lessons`, `class_lessons` schema

## Verification

1. TypeScript clean (`npx tsc --noEmit`)
2. Build passes (`npm run build`)
3. Tests pass (`npm test`)
4. Manual: navigate to `/teacher/lessons`, select a class, toggle lesson assignment
5. Verify chatbot authorization respects `class_lessons` entries
