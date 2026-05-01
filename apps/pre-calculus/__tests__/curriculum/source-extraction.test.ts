import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const appRoot = process.cwd();
const curriculumRoot = path.join(appRoot, 'curriculum');

function read(relativePath: string): string {
  return fs.readFileSync(path.join(curriculumRoot, relativePath), 'utf8');
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(read(relativePath)) as T;
}

describe('AP Precalculus normalized source artifacts', () => {
  it('keeps a deterministic extraction script for official and local PDFs', async () => {
    const pkg = await import('../../package.json');
    const scriptPath = path.join(appRoot, 'scripts/extract-curriculum-sources.mjs');
    const script = fs.readFileSync(scriptPath, 'utf8');

    expect(pkg.default.scripts['curriculum:extract']).toBe('node scripts/extract-curriculum-sources.mjs');
    expect(script).toContain('pdfinfo');
    expect(script).toContain('pdftotext');
    expect(script).toContain('ap-precalculus-course-and-exam-description.pdf');
    expect(script).toContain('APPC  Unit 1 Passwater.pdf');
  });

  it('normalizes the College Board CED topic and exam backbone', () => {
    const ced = read('source/college-board/ced.md');
    const topicIndex = readJson<{
      schemaVersion: string;
      source: { title: string; pages: number; url: string };
      units: Array<{
        unit: number;
        title: string;
        examStatus: string;
        examWeighting: string;
        topics: Array<{ id: string; title: string }>;
      }>;
      mathematicalPractices: Array<{ id: string; name: string; skills: string[] }>;
      freeResponseModels: Array<{ id: string; taskModel: string; calculator: string }>;
    }>('source/college-board/ced-topic-index.json');

    expect(ced).toContain('Units 1, 2, and 3 topics are included on the AP Exam');
    expect(ced).toContain('Unit 4 topics are at the discretion of the school');
    expect(ced).toContain('Question 3: Modeling a Periodic Context');
    expect(topicIndex.schemaVersion).toBe('ap-precalculus-ced-topic-index.v1');
    expect(topicIndex.source.pages).toBe(195);
    expect(topicIndex.source.url).toContain('ap-precalculus-course-and-exam-description.pdf');
    expect(topicIndex.units).toHaveLength(4);
    expect(topicIndex.units.flatMap((unit) => unit.topics)).toHaveLength(58);
    expect(topicIndex.units[3]).toMatchObject({
      unit: 4,
      examStatus: 'not-assessed-on-ap-exam',
      examWeighting: '0%',
    });
    expect(topicIndex.units[0].topics[0]).toEqual({ id: '1.1', title: 'Change in Tandem' });
    expect(topicIndex.units[3].topics.at(-1)).toEqual({ id: '4.14', title: 'Matrices Modeling Contexts' });
    expect(topicIndex.mathematicalPractices.map((practice) => practice.name)).toEqual([
      'Procedural and Symbolic Fluency',
      'Multiple Representations',
      'Communication and Reasoning',
    ]);
    expect(topicIndex.freeResponseModels.map((model) => model.taskModel)).toEqual([
      'Function Concepts',
      'Modeling a Non-Periodic Context',
      'Modeling a Periodic Context',
      'Symbolic Manipulations',
    ]);
  });

  it('normalizes the CED clarification and guidance artifact as errata', () => {
    const clarification = read('source/college-board/clarification-guidance.md');

    expect(clarification).toContain('Errata role: overrides or narrows the base CED where applicable.');
    expect(clarification).toContain('EKs 1.1.A.3 and 1.1.A.4');
    expect(clarification).toContain('EKs 2.5.B.3, 2.14.A.6, and 3.7.A.5');
    expect(clarification).toContain('Question 3(C)(ii)');
  });

  it('normalizes local Passwater instructional evidence for Units 1-3', () => {
    for (const unit of [1, 2, 3]) {
      const passwater = read(`source/passwater/unit-${unit}.md`);

      expect(passwater).toContain(`APPC  Unit ${unit} Passwater.pdf`);
      expect(passwater).toContain('Instructional role: topic introduction, scaffolding, guided practice, independent practice, pacing, and local assessment evidence.');
      expect(passwater).toContain('Extraction limitations');
      expect(passwater).toMatch(/Pages: \d+/);
    }

    expect(read('source/passwater/unit-1.md')).toContain('| 1.14 | Function Model Construction and Application |');
    expect(read('source/passwater/unit-2.md')).toContain('| 2.15 | Semi-log Plots |');
    expect(read('source/passwater/unit-3.md')).toContain('| 3.15 | Rates of Change in Polar Functions |');
  });
});
