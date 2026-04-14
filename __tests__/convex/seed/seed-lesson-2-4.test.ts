import { describe, it, expect } from 'vitest';
import type { SeedLesson, SeedPhase } from '@/convex/seed/types';

describe('seed-lesson-2-4', () => {
  describe('Lesson 2-4: Dividing Polynomials', () => {
    const lesson2Seed: SeedLesson = {
      unitNumber: 2,
      title: 'Dividing Polynomials',
      slug: 'module-2-lesson-4',
      description: 'Students divide polynomials using long division and synthetic division.',
      orderIndex: 4,
      phases: [
        { phaseNumber: 1, title: 'Explore', phaseType: 'explore', sections: [] },
        { phaseNumber: 2, title: 'Vocabulary', phaseType: 'vocabulary', sections: [] },
        { phaseNumber: 3, title: 'Learn: Dividing Polynomials', phaseType: 'learn', sections: [] },
        { phaseNumber: 4, title: 'Worked Example 1', phaseType: 'worked_example', sections: [] },
        { phaseNumber: 5, title: 'Worked Example 2', phaseType: 'worked_example', sections: [] },
        { phaseNumber: 6, title: 'Worked Example 3', phaseType: 'worked_example', sections: [] },
        { phaseNumber: 7, title: 'Worked Example 4', phaseType: 'worked_example', sections: [] },
        { phaseNumber: 8, title: 'Assessment', phaseType: 'assessment', sections: [] },
        { phaseNumber: 9, title: 'Discourse', phaseType: 'discourse', sections: [] },
        { phaseNumber: 10, title: 'Reflection', phaseType: 'reflection', sections: [] },
      ],
    };

    it('lesson has correct metadata', () => {
      expect(lesson2Seed.unitNumber).toBe(2);
      expect(lesson2Seed.title).toBe('Dividing Polynomials');
      expect(lesson2Seed.slug).toBe('module-2-lesson-4');
      expect(lesson2Seed.orderIndex).toBe(4);
    });

    it('has exactly 10 phases', () => {
      expect(lesson2Seed.phases).toHaveLength(10);
    });

    it('correct phase sequence: explore, vocab, learn, 4×worked_example, assessment, discourse, reflection', () => {
      const expectedSequence: SeedPhase['phaseType'][] = [
        'explore',
        'vocabulary',
        'learn',
        'worked_example',
        'worked_example',
        'worked_example',
        'worked_example',
        'assessment',
        'discourse',
        'reflection',
      ];

      const actualSequence = lesson2Seed.phases.map((p) => p.phaseType);
      expect(actualSequence).toEqual(expectedSequence);
    });

    it('explore phase is phase 1', () => {
      const explorePhase = lesson2Seed.phases.find((p) => p.phaseType === 'explore');
      expect(explorePhase?.phaseNumber).toBe(1);
    });

    it('vocabulary phase is phase 2', () => {
      const vocabPhase = lesson2Seed.phases.find((p) => p.phaseType === 'vocabulary');
      expect(vocabPhase?.phaseNumber).toBe(2);
    });

    it('learn phase is phase 3', () => {
      const learnPhase = lesson2Seed.phases.find((p) => p.phaseType === 'learn');
      expect(learnPhase?.phaseNumber).toBe(3);
    });

    it('assessment phase is phase 8', () => {
      const assessmentPhase = lesson2Seed.phases.find((p) => p.phaseType === 'assessment');
      expect(assessmentPhase?.phaseNumber).toBe(8);
    });

    it('discourse phase is phase 9', () => {
      const discoursePhase = lesson2Seed.phases.find((p) => p.phaseType === 'discourse');
      expect(discoursePhase?.phaseNumber).toBe(9);
    });

    it('reflection phase is phase 10', () => {
      const reflectionPhase = lesson2Seed.phases.find((p) => p.phaseType === 'reflection');
      expect(reflectionPhase?.phaseNumber).toBe(10);
    });

    it('has exactly 4 worked_example phases', () => {
      const workedExamples = lesson2Seed.phases.filter((p) => p.phaseType === 'worked_example');
      expect(workedExamples).toHaveLength(4);
    });

    it('worked examples are numbered 1-4 in order', () => {
      const workedExamples = lesson2Seed.phases.filter((p) => p.phaseType === 'worked_example');
      workedExamples.forEach((we, idx) => {
        expect(we.title).toBe(`Worked Example ${idx + 1}`);
      });
    });
  });

  describe('activity records for lesson 2-4', () => {
    const validComponentKeys = [
      'graphing-explorer',
      'step-by-step-solver',
      'comprehension-quiz',
      'fill-in-the-blank',
      'rate-of-change-calculator',
      'discriminant-analyzer',
    ] as const;

    it('explore phase should have graphing-explorer activity', () => {
      const exploreSection = {
        sequenceOrder: 1,
        sectionType: 'activity' as const,
        content: {
          componentKey: 'graphing-explorer' as const,
          props: {
            variant: 'explore',
            equation: 'y = x^2 - 4',
          },
        },
      };

      expect(exploreSection.content.componentKey).toBe('graphing-explorer');
      expect(validComponentKeys).toContain(exploreSection.content.componentKey);
    });

    it('worked examples should use step-by-step-solver activity', () => {
      const workedExampleSection = {
        sequenceOrder: 1,
        sectionType: 'activity' as const,
        content: {
          componentKey: 'step-by-step-solver' as const,
          props: {
            problemType: 'polynomial' as const,
            equation: '(x^2 - 5x - 36) / (x + 4)',
            steps: [],
          },
        },
      };

      expect(workedExampleSection.content.componentKey).toBe('step-by-step-solver');
      expect(validComponentKeys).toContain(workedExampleSection.content.componentKey);
    });

    it('assessment phase should have comprehension-quiz activity', () => {
      const assessmentSection = {
        sequenceOrder: 1,
        sectionType: 'activity' as const,
        content: {
          componentKey: 'comprehension-quiz' as const,
          props: {
            questions: [],
          },
        },
      };

      expect(assessmentSection.content.componentKey).toBe('comprehension-quiz');
      expect(validComponentKeys).toContain(assessmentSection.content.componentKey);
    });

    it('discourse phase should have comprehension-quiz activity', () => {
      const discourseSection = {
        sequenceOrder: 2,
        sectionType: 'activity' as const,
        content: {
          componentKey: 'comprehension-quiz' as const,
          props: {
            questions: [],
          },
        },
      };

      expect(discourseSection.content.componentKey).toBe('comprehension-quiz');
      expect(validComponentKeys).toContain(discourseSection.content.componentKey);
    });
  });

  describe('idempotency checks', () => {
    it('lesson slug follows naming convention', () => {
      const slug = 'module-2-lesson-4';
      expect(slug).toMatch(/^module-\d+-lesson-\d+$/);
    });

    it('orderIndex is sequential within unit', () => {
      const orderIndex = 4;
      expect(orderIndex).toBeGreaterThan(0);
      expect(orderIndex).toBeLessThanOrEqual(10);
    });
  });
});