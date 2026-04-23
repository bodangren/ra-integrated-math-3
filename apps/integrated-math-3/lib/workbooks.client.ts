import workbookManifest from '@/lib/workbooks-manifest.json';
import {
  buildWorkbookFilename,
  buildCapstoneFilename,
  hasStudentWorkbook as hasStudentWorkbookBase,
  hasTeacherWorkbook as hasTeacherWorkbookBase,
  lessonHasWorkbooks as lessonHasWorkbooksBase,
  hasCapstoneStudentWorkbook as hasCapstoneStudentWorkbookBase,
  hasCapstoneTeacherWorkbook as hasCapstoneTeacherWorkbookBase,
  validateWorkbookManifest,
} from '@math-platform/workbook-pipeline';

const manifest = validateWorkbookManifest(workbookManifest);

export function getWorkbookPath(unitNumber: number, lessonNumber: number, type: 'student' | 'teacher'): string {
  return `/workbooks/${buildWorkbookFilename(unitNumber, lessonNumber, type)}`;
}

export function hasStudentWorkbook(unitNumber: number, lessonNumber: number): boolean {
  return hasStudentWorkbookBase(manifest, unitNumber, lessonNumber);
}

export function hasTeacherWorkbook(unitNumber: number, lessonNumber: number): boolean {
  return hasTeacherWorkbookBase(manifest, unitNumber, lessonNumber);
}

export function lessonHasWorkbooks(unitNumber: number, lessonNumber: number): boolean {
  return lessonHasWorkbooksBase(manifest, unitNumber, lessonNumber);
}

export function hasCapstoneStudentWorkbook(): boolean {
  return hasCapstoneStudentWorkbookBase(manifest);
}

export function hasCapstoneTeacherWorkbook(): boolean {
  return hasCapstoneTeacherWorkbookBase(manifest);
}

export function getCapstoneWorkbookPath(type: 'student' | 'teacher'): string {
  return `/workbooks/${buildCapstoneFilename(type)}`;
}