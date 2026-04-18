import type { WorkbookManifest } from './manifest.js';
import { buildUnitLessonKey } from './manifest.js';

export function hasStudentWorkbook(
  manifest: WorkbookManifest,
  unitNumber: number,
  lessonNumber: number
): boolean {
  const key = buildUnitLessonKey(unitNumber, lessonNumber);
  const entry = manifest.byUnitAndLesson[key];
  return entry?.student ?? false;
}

export function hasTeacherWorkbook(
  manifest: WorkbookManifest,
  unitNumber: number,
  lessonNumber: number
): boolean {
  const key = buildUnitLessonKey(unitNumber, lessonNumber);
  const entry = manifest.byUnitAndLesson[key];
  return entry?.teacher ?? false;
}

export function lessonHasWorkbooks(
  manifest: WorkbookManifest,
  unitNumber: number,
  lessonNumber: number
): boolean {
  return hasStudentWorkbook(manifest, unitNumber, lessonNumber) ||
         hasTeacherWorkbook(manifest, unitNumber, lessonNumber);
}

export function hasCapstoneStudentWorkbook(
  manifest: WorkbookManifest
): boolean {
  return manifest.byCapstone.student;
}

export function hasCapstoneTeacherWorkbook(
  manifest: WorkbookManifest
): boolean {
  return manifest.byCapstone.teacher;
}

export function lessonHasAnyWorkbook(
  manifest: WorkbookManifest,
  unitNumber: number,
  lessonNumber: number
): boolean {
  return lessonHasWorkbooks(manifest, unitNumber, lessonNumber);
}

export type { WorkbookManifest } from './manifest.js';
export type { WorkbookType } from './path.js';