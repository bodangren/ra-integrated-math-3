import { describe, expect, it } from 'vitest';
import { buildLessonPhaseProgress } from '@/lib/progress/published-curriculum';

describe('buildLessonPhaseProgress', () => {
  it('includes phaseType in the returned phase data', () => {
    const phases = [
      {
        _id: 'phase1',
        phaseNumber: 1,
        phaseType: 'explore' as const,
      },
      {
        _id: 'phase2',
        phaseNumber: 2,
        phaseType: 'learn' as const,
      },
      {
        _id: 'phase3',
        phaseNumber: 3,
        phaseType: 'worked_example' as const,
      },
    ];

    const progressRows = [
      {
        phaseId: 'phase1',
        status: 'completed' as const,
        startedAt: 1000,
        completedAt: 2000,
        timeSpentSeconds: 60,
        updatedAt: 2000,
      },
    ];

    const result = buildLessonPhaseProgress({ phases, progressRows });

    expect(result).toHaveLength(3);
    expect(result[0]).toHaveProperty('phaseType', 'explore');
    expect(result[1]).toHaveProperty('phaseType', 'learn');
    expect(result[2]).toHaveProperty('phaseType', 'worked_example');
  });

  it('handles phases with all 10 phase types correctly', () => {
    const phaseTypes = [
      'explore',
      'vocabulary',
      'learn',
      'key_concept',
      'worked_example',
      'guided_practice',
      'independent_practice',
      'assessment',
      'discourse',
      'reflection',
    ] as const;

    const phases = phaseTypes.map((phaseType, index) => ({
      _id: `phase${index}`,
      phaseNumber: index + 1,
      phaseType,
    }));

    const result = buildLessonPhaseProgress({ phases, progressRows: [] });

    expect(result).toHaveLength(10);
    result.forEach((phase, index) => {
      expect(phase.phaseType).toBe(phaseTypes[index]);
    });
  });

  it('maintains correct phase ordering with phaseType included', () => {
    const phases = [
      {
        _id: 'phase3',
        phaseNumber: 3,
        phaseType: 'independent_practice' as const,
      },
      {
        _id: 'phase1',
        phaseNumber: 1,
        phaseType: 'explore' as const,
      },
      {
        _id: 'phase2',
        phaseNumber: 2,
        phaseType: 'learn' as const,
      },
    ];

    const result = buildLessonPhaseProgress({ phases, progressRows: [] });

    expect(result).toHaveLength(3);
    expect(result[0].phaseNumber).toBe(1);
    expect(result[0].phaseType).toBe('explore');
    expect(result[1].phaseNumber).toBe(2);
    expect(result[1].phaseType).toBe('learn');
    expect(result[2].phaseNumber).toBe(3);
    expect(result[2].phaseType).toBe('independent_practice');
  });
});
