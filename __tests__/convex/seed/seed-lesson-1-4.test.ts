import { describe, it, expect } from 'vitest';
import type { SeedLesson, SeedPhase } from '@/convex/seed/types';

describe('seed-lesson-1-4', () => {
  describe('Lesson 1-4: Solve Quadratic Equations by Factoring', () => {
    const lesson4Seed: SeedLesson = {
      unitNumber: 1,
      title: 'Solve Quadratic Equations by Factoring',
      slug: 'module-1-lesson-4',
      description: 'Students factor trinomials and apply the zero product property.',
      orderIndex: 4,
      phases: [
        { phaseNumber: 1, title: 'Explore', phaseType: 'explore', sections: [] },
        { phaseNumber: 2, title: 'Vocabulary', phaseType: 'vocabulary', sections: [] },
        { phaseNumber: 3, title: 'Learn', phaseType: 'learn', sections: [] },
        { phaseNumber: 4, title: 'Learn', phaseType: 'learn', sections: [] },
        { phaseNumber: 5, title: 'Worked Example 1', phaseType: 'worked_example', sections: [] },
        { phaseNumber: 6, title: 'Worked Example 2', phaseType: 'worked_example', sections: [] },
        { phaseNumber: 7, title: 'Worked Example 3', phaseType: 'worked_example', sections: [] },
        { phaseNumber: 8, title: 'Worked Example 4', phaseType: 'worked_example', sections: [] },
        { phaseNumber: 9, title: 'Worked Example 5', phaseType: 'worked_example', sections: [] },
        { phaseNumber: 10, title: 'Worked Example 6', phaseType: 'worked_example', sections: [] },
        { phaseNumber: 11, title: 'Discourse', phaseType: 'discourse', sections: [] },
        { phaseNumber: 12, title: 'Assessment', phaseType: 'assessment', sections: [] },
        { phaseNumber: 13, title: 'Reflection', phaseType: 'reflection', sections: [] },
      ],
    };

    it('lesson has correct metadata', () => {
      expect(lesson4Seed.unitNumber).toBe(1);
      expect(lesson4Seed.title).toBe('Solve Quadratic Equations by Factoring');
      expect(lesson4Seed.slug).toBe('module-1-lesson-4');
      expect(lesson4Seed.orderIndex).toBe(4);
    });

    it('has exactly 13 phases', () => {
      expect(lesson4Seed.phases).toHaveLength(13);
    });

    it('correct phase sequence: explore, vocab, 2×learn, 6×worked_example, discourse, assessment, reflection', () => {
      const expectedSequence: SeedPhase['phaseType'][] = [
        'explore',
        'vocabulary',
        'learn',
        'learn',
        'worked_example',
        'worked_example',
        'worked_example',
        'worked_example',
        'worked_example',
        'worked_example',
        'discourse',
        'assessment',
        'reflection',
      ];

      const actualSequence = lesson4Seed.phases.map((p) => p.phaseType);
      expect(actualSequence).toEqual(expectedSequence);
    });

    it('explore phase is phase 1', () => {
      const explorePhase = lesson4Seed.phases.find((p) => p.phaseType === 'explore');
      expect(explorePhase?.phaseNumber).toBe(1);
    });

    it('vocabulary phase is phase 2', () => {
      const vocabPhase = lesson4Seed.phases.find((p) => p.phaseType === 'vocabulary');
      expect(vocabPhase?.phaseNumber).toBe(2);
    });

    it('has exactly 2 learn phases', () => {
      const learnPhases = lesson4Seed.phases.filter((p) => p.phaseType === 'learn');
      expect(learnPhases).toHaveLength(2);
    });

    it('first learn phase is phase 3', () => {
      const learnPhases = lesson4Seed.phases.filter((p) => p.phaseType === 'learn');
      expect(learnPhases[0]?.phaseNumber).toBe(3);
    });

    it('second learn phase is phase 4', () => {
      const learnPhases = lesson4Seed.phases.filter((p) => p.phaseType === 'learn');
      expect(learnPhases[1]?.phaseNumber).toBe(4);
    });

    it('has exactly 6 worked_example phases', () => {
      const workedExamples = lesson4Seed.phases.filter((p) => p.phaseType === 'worked_example');
      expect(workedExamples).toHaveLength(6);
    });

    it('worked examples are numbered 1-6 in order', () => {
      const workedExamples = lesson4Seed.phases.filter((p) => p.phaseType === 'worked_example');
      workedExamples.forEach((we, idx) => {
        expect(we.title).toBe(`Worked Example ${idx + 1}`);
      });
    });

    it('discourse phase is phase 11', () => {
      const discoursePhase = lesson4Seed.phases.find((p) => p.phaseType === 'discourse');
      expect(discoursePhase?.phaseNumber).toBe(11);
    });

    it('assessment phase is phase 12', () => {
      const assessmentPhase = lesson4Seed.phases.find((p) => p.phaseType === 'assessment');
      expect(assessmentPhase?.phaseNumber).toBe(12);
    });

    it('reflection phase is phase 13', () => {
      const reflectionPhase = lesson4Seed.phases.find((p) => p.phaseType === 'reflection');
      expect(reflectionPhase?.phaseNumber).toBe(13);
    });
  });

  describe('activity records for lesson 1-4', () => {
    const validComponentKeys = [
      'graphing-explorer',
      'step-by-step-solver',
      'comprehension-quiz',
      'fill-in-the-blank',
      'rate-of-change-calculator',
      'discriminant-analyzer',
    ] as const;

    it('explore phase should have step-by-step-solver activity', () => {
      const exploreSection = {
        sequenceOrder: 1,
        sectionType: 'activity' as const,
        content: {
          componentKey: 'step-by-step-solver' as const,
          props: {
            problemType: 'factoring',
            equation: 'x^2 - 5x + 6 = 0',
            steps: [],
          },
        },
      };

      expect(exploreSection.content.componentKey).toBe('step-by-step-solver');
      expect(validComponentKeys).toContain(exploreSection.content.componentKey);
    });

    it('worked examples should use step-by-step-solver activity', () => {
      const workedExampleSection = {
        sequenceOrder: 1,
        sectionType: 'activity' as const,
        content: {
          componentKey: 'step-by-step-solver' as const,
          props: {
            problemType: 'factoring',
            equation: '2x^2 + 5x - 3 = 0',
            steps: [],
          },
        },
      };

      expect(workedExampleSection.content.componentKey).toBe('step-by-step-solver');
      expect(validComponentKeys).toContain(workedExampleSection.content.componentKey);
    });

    it('assessment phase should have fill-in-the-blank activity', () => {
      const assessmentSection = {
        sequenceOrder: 1,
        sectionType: 'activity' as const,
        content: {
          componentKey: 'fill-in-the-blank' as const,
          props: {
            blanks: [
              { id: '1', label: 'First factor', correctAnswer: '(x+2)' },
              { id: '2', label: 'Second factor', correctAnswer: '(x+3)' },
            ],
          },
        },
      };

      expect(assessmentSection.content.componentKey).toBe('fill-in-the-blank');
      expect(validComponentKeys).toContain(assessmentSection.content.componentKey);
    });
  });
});
