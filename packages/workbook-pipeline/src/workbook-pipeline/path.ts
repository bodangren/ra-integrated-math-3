export type WorkbookType = 'student' | 'teacher';

export function formatUnitNumber(unitNumber: number): string {
  return String(unitNumber).padStart(2, '0');
}

export function formatLessonNumber(lessonNumber: number): string {
  return String(lessonNumber).padStart(2, '0');
}

export function buildWorkbookFilename(
  unitNumber: number,
  lessonNumber: number,
  type: WorkbookType
): string {
  const unitStr = formatUnitNumber(unitNumber);
  const lessonStr = formatLessonNumber(lessonNumber);
  return `unit_${unitStr}_lesson_${lessonStr}_${type}.xlsx`;
}

export function buildWorkbookPublicPath(
  unitNumber: number,
  lessonNumber: number,
  type: WorkbookType
): string {
  return `/workbooks/${buildWorkbookFilename(unitNumber, lessonNumber, type)}`;
}

export function buildCapstoneFilename(type: WorkbookType): string {
  if (type === 'teacher') {
    return 'capstone_investor_ready_workbook_teacher.xlsx';
  }
  return 'capstone_investor_ready_workbook.xlsx';
}

export function buildCapstonePublicPath(type: WorkbookType): string {
  return `/workbooks/${buildCapstoneFilename(type)}`;
}