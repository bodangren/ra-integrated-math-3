'use server';

import path from 'path';
import * as fs from 'fs';
import { buildWorkbookPublicPath } from '@math-platform/workbook-pipeline';

export function getWorkbookPath(unitNumber: number, lessonNumber: number, type: 'student' | 'teacher'): string {
  return buildWorkbookPublicPath(unitNumber, lessonNumber, type);
}

export function workbookExists(unitNumber: number, lessonNumber: number, type: 'student' | 'teacher'): boolean {
  const publicPath = path.join(process.cwd(), 'public', getWorkbookPath(unitNumber, lessonNumber, type));
  return fs.existsSync(publicPath);
}

export function lessonHasWorkbooks(unitNumber: number, lessonNumber: number): boolean {
  return workbookExists(unitNumber, lessonNumber, 'student') || workbookExists(unitNumber, lessonNumber, 'teacher');
}