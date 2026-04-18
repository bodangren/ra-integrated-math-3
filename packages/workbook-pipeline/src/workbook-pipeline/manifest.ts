export interface WorkbookManifest {
  version: number;
  generatedAt: string;
  files: string[];
  byUnitAndLesson: Record<string, { student: boolean; teacher: boolean }>;
  byCapstone: { student: boolean; teacher: boolean };
}

export interface ParsedWorkbookEntry {
  unitNumber: number;
  lessonNumber: number;
  type: 'student' | 'teacher';
}

export function parseUnitLessonFilename(
  filename: string
): ParsedWorkbookEntry | null {
  const match = filename.match(/^unit_(\d+)_lesson_(\d+)_(student|teacher)\.xlsx$/);
  if (!match) {
    return null;
  }
  const [, unitStr, lessonStr, type] = match;
  return {
    unitNumber: parseInt(unitStr, 10),
    lessonNumber: parseInt(lessonStr, 10),
    type: type as 'student' | 'teacher',
  };
}

export function isCapstoneFilename(filename: string): boolean {
  return /^capstone_.+\.xlsx$/.test(filename);
}

export function parseCapstoneType(
  filename: string
): 'student' | 'teacher' | null {
  if (!isCapstoneFilename(filename)) {
    return null;
  }
  if (filename.endsWith('_teacher.xlsx')) {
    return 'teacher';
  }
  return 'student';
}

export function buildUnitLessonKey(
  unitNumber: number,
  lessonNumber: number
): string {
  return `${unitNumber}-${lessonNumber}`;
}