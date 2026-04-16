import { describe, it, expect, vi } from 'vitest';
import { getObjectiveProficiencyHandler } from '@/convex/objectiveProficiency';
import type { Id } from '@/convex/_generated/dataModel';

function makeMockCtx(overrides: {
  cards?: Array<{
    _id: Id<'srs_cards'>;
    studentId: Id<'profiles'>;
    objectiveId: string;
    problemFamilyId: string;
    stability: number;
    difficulty: number;
    state: 'new' | 'learning' | 'review' | 'relearning';
    dueDate: string;
    elapsedDays: number;
    scheduledDays: number;
    reps: number;
    lapses: number;
    lastReview?: string;
    createdAt: number;
    updatedAt: number;
  }>;
  problemFamilies?: Array<{
    _id: Id<'problem_families'>;
    problemFamilyId: string;
    objectiveIds: string[];
    componentKey: string;
    displayName: string;
    description: string;
    difficulty: string;
  }>;
  reviews?: Array<{
    _id: Id<'srs_review_log'>;
    cardId: Id<'srs_cards'>;
    studentId: Id<'profiles'>;
    rating: string;
    submissionId?: string;
    reviewId?: string;
    evidence: unknown;
    stateBefore: unknown;
    stateAfter: unknown;
    reviewedAt: number;
  }>;
  submissions?: Array<{
    _id: Id<'activity_submissions'>;
    userId: Id<'profiles'>;
    activityId: Id<'activities'>;
    submissionData: {
      attemptNumber?: number;
      timing?: { activeMs?: number };
    };
    submittedAt: number;
    createdAt: number;
    updatedAt: number;
  }>;
  baselines?: Array<{
    _id: Id<'timing_baselines'>;
    problemFamilyId: string;
    sampleCount: number;
    medianActiveMs: number;
    p25ActiveMs?: number;
    p75ActiveMs?: number;
    p90ActiveMs?: number;
    lastComputedAt: string;
    minSamplesMet: boolean;
  }>;
  standards?: Array<{
    _id: Id<'competency_standards'>;
    code: string;
    description: string;
    isActive: boolean;
    createdAt: number;
  }>;
  policies?: Array<{
    _id: Id<'objective_policies'>;
    standardId: Id<'competency_standards'>;
    policy: string;
    courseKey: string;
    priority: number;
  }>;
} = {}) {
  const {
    cards = [],
    problemFamilies = [],
    reviews = [],
    submissions = [],
    baselines = [],
    standards = [],
    policies = [],
  } = overrides;

  const cardQueryMock = {
    withIndex: vi.fn().mockReturnValue({
      collect: vi.fn().mockResolvedValue(cards),
    }),
  };

  const problemFamilyQueryMock = {
    withIndex: vi.fn().mockReturnValue({
      collect: vi.fn().mockResolvedValue(problemFamilies),
    }),
  };

  const reviewQueryMock = {
    withIndex: vi.fn().mockReturnValue({
      collect: vi.fn().mockResolvedValue(reviews),
    }),
  };

  const submissionQueryMock = {
    withIndex: vi.fn().mockImplementation(
      (_indexName: string, fn: (q: { eq: (field: string, value: string) => unknown }) => void) => {
        let capturedActivityId: string | null = null;
        const mockQ = {
          eq: vi.fn().mockImplementation((field: string, value: string) => {
            if (field === 'activityId') {
              capturedActivityId = value;
            }
            return mockQ;
          }),
        };
        fn(mockQ);
        return {
          collect: vi.fn().mockResolvedValue(
            submissions.filter((s) => s.activityId === capturedActivityId)
          ),
        };
      }
    ),
  };

  let lastProblemFamilyId: string | null = null;
  const baselineQueryMock = {
    withIndex: vi.fn().mockImplementation(
      (_indexName: string, fn: (q: { eq: (field: string, value: string) => unknown }) => void) => {
        const mockQ = {
          eq: vi.fn().mockImplementation((field: string, value: string) => {
            if (field === 'problemFamilyId') {
              lastProblemFamilyId = value;
            }
            return {};
          }),
        };
        fn(mockQ);
        const capturedId = lastProblemFamilyId;
        return {
          first: vi.fn().mockImplementation(() => {
            const found = baselines.find((b) => b.problemFamilyId === capturedId);
            return Promise.resolve(found ?? null);
          }),
        };
      }
    ),
  };

  const standardQueryMock = {
    withIndex: vi.fn().mockReturnValue({
      first: vi.fn().mockImplementation(() => {
        // The test setup should have at most one standard per code
        return Promise.resolve(standards[0] ?? null);
      }),
    }),
  };

  let lastStandardId: string | null = null;
  const policyQueryMock = {
    withIndex: vi.fn().mockImplementation(
      (_indexName: string, fn: (q: { eq: (field: string, value: string) => unknown }) => void) => {
        const mockQ = {
          eq: vi.fn().mockImplementation((field: string, value: string) => {
            if (field === 'standardId') {
              lastStandardId = value;
            }
            return {};
          }),
        };
        fn(mockQ);
        const capturedId = lastStandardId;
        return {
          first: vi.fn().mockImplementation(() => {
            const found = policies.find((p) => p.standardId === capturedId);
            return Promise.resolve(found ?? null);
          }),
        };
      }
    ),
  };

  const mockQuery = vi.fn().mockImplementation((tableName: string) => {
    if (tableName === 'srs_cards') return cardQueryMock;
    if (tableName === 'problem_families') return problemFamilyQueryMock;
    if (tableName === 'srs_review_log') return reviewQueryMock;
    if (tableName === 'activity_submissions') return submissionQueryMock;
    if (tableName === 'timing_baselines') return baselineQueryMock;
    if (tableName === 'competency_standards') return standardQueryMock;
    if (tableName === 'objective_policies') return policyQueryMock;
    return {
      withIndex: vi.fn().mockReturnValue({
        collect: vi.fn().mockResolvedValue([]),
        first: vi.fn().mockResolvedValue(null),
      }),
    };
  });

  return {
    db: {
      query: mockQuery,
    },
    mockQuery,
  };
}

describe('getObjectiveProficiencyHandler', () => {
  it('returns zero proficiency for student with no cards', async () => {
    const { db } = makeMockCtx({ cards: [] });

    const result = await getObjectiveProficiencyHandler(
      { db } as unknown as import('@/convex/_generated/server').QueryCtx,
      { studentId: 'student-1' }
    );

    expect(result.objectiveId).toBe('');
    expect(result.retentionStrength).toBe(0);
    expect(result.practiceCoverage).toBe(0);
    expect(result.evidenceConfidence).toBe('none');
    expect(result.isProficient).toBe(false);
  });

  it('returns proficiency result for student with reviewed cards', async () => {
    const cardId = 'card-1' as Id<'srs_cards'>;
    const studentId = 'student-1' as Id<'profiles'>;
    const { db } = makeMockCtx({
      cards: [
        {
          _id: cardId,
          studentId,
          objectiveId: 'HSA-SSE.B.3',
          problemFamilyId: 'pf-1',
          stability: 90,
          difficulty: 3,
          state: 'review',
          dueDate: '2026-04-17T00:00:00.000Z',
          elapsedDays: 5,
          scheduledDays: 7,
          reps: 3,
          lapses: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
      reviews: [
        {
          _id: 'rev-1' as Id<'srs_review_log'>,
          cardId,
          studentId,
          rating: 'Good',
          submissionId: 'act-1-1',
          reviewId: 'rev_abc',
          evidence: {},
          stateBefore: {},
          stateAfter: {},
          reviewedAt: Date.now(),
        },
      ],
      submissions: [
        {
          _id: 'sub-1' as Id<'activity_submissions'>,
          userId: studentId,
          activityId: 'act-1' as Id<'activities'>,
          submissionData: { attemptNumber: 1, timing: { activeMs: 15000 } },
          submittedAt: Date.now(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
      baselines: [
        {
          _id: 'base-1' as Id<'timing_baselines'>,
          problemFamilyId: 'pf-1',
          sampleCount: 20,
          medianActiveMs: 20000,
          lastComputedAt: '2026-04-16T00:00:00.000Z',
          minSamplesMet: true,
        },
      ],
    });

    const result = await getObjectiveProficiencyHandler(
      { db } as unknown as import('@/convex/_generated/server').QueryCtx,
      { studentId: 'student-1' }
    );

    expect(result.retentionStrength).toBeGreaterThan(0);
    expect(result.practiceCoverage).toBe(1);
    expect(result.fluencyConfidence).toBe('high');
  });

  it('filters correctly when objectiveId is provided', async () => {
    const card1 = 'card-1' as Id<'srs_cards'>;
    const card2 = 'card-2' as Id<'srs_cards'>;
    const studentId = 'student-1' as Id<'profiles'>;

    const { db } = makeMockCtx({
      cards: [
        {
          _id: card1,
          studentId,
          objectiveId: 'obj-a',
          problemFamilyId: 'pf-a',
          stability: 90,
          difficulty: 3,
          state: 'review',
          dueDate: '2026-04-17T00:00:00.000Z',
          elapsedDays: 5,
          scheduledDays: 7,
          reps: 3,
          lapses: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          _id: card2,
          studentId,
          objectiveId: 'obj-b',
          problemFamilyId: 'pf-b',
          stability: 10,
          difficulty: 3,
          state: 'review',
          dueDate: '2026-04-17T00:00:00.000Z',
          elapsedDays: 5,
          scheduledDays: 7,
          reps: 1,
          lapses: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
      problemFamilies: [
        {
          _id: 'fam-a' as Id<'problem_families'>,
          problemFamilyId: 'pf-a',
          objectiveIds: ['obj-a'],
          componentKey: 'key-a',
          displayName: 'Family A',
          description: 'Desc A',
          difficulty: 'medium',
        },
      ],
      standards: [
        {
          _id: 'std-a' as Id<'competency_standards'>,
          code: 'obj-a',
          description: 'Objective A',
          isActive: true,
          createdAt: Date.now(),
        },
      ],
      policies: [
        {
          _id: 'pol-a' as Id<'objective_policies'>,
          standardId: 'std-a' as Id<'competency_standards'>,
          policy: 'essential',
          courseKey: 'integrated-math-3',
          priority: 1,
        },
      ],
    });

    const result = await getObjectiveProficiencyHandler(
      { db } as unknown as import('@/convex/_generated/server').QueryCtx,
      { studentId: 'student-1', objectiveId: 'obj-a' }
    );

    expect(result.objectiveId).toBe('obj-a');
    expect(result.retentionStrength).toBeGreaterThan(0.7);
    expect(result.problemFamilyDetails).toHaveLength(1);
    expect(result.problemFamilyDetails[0].problemFamilyId).toBe('pf-a');
  });

  it('uses objective priority from policy when objectiveId is provided', async () => {
    const cardId = 'card-1' as Id<'srs_cards'>;
    const studentId = 'student-1' as Id<'profiles'>;

    const { db } = makeMockCtx({
      cards: [
        {
          _id: cardId,
          studentId,
          objectiveId: 'obj-triaged',
          problemFamilyId: 'pf-triaged',
          stability: 100,
          difficulty: 3,
          state: 'review',
          dueDate: '2026-04-17T00:00:00.000Z',
          elapsedDays: 5,
          scheduledDays: 7,
          reps: 5,
          lapses: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
      problemFamilies: [
        {
          _id: 'fam-triaged' as Id<'problem_families'>,
          problemFamilyId: 'pf-triaged',
          objectiveIds: ['obj-triaged'],
          componentKey: 'key-triaged',
          displayName: 'Family Triaged',
          description: 'Desc',
          difficulty: 'medium',
        },
      ],
      standards: [
        {
          _id: 'std-triaged' as Id<'competency_standards'>,
          code: 'obj-triaged',
          description: 'Triaged Objective',
          isActive: true,
          createdAt: Date.now(),
        },
      ],
      policies: [
        {
          _id: 'pol-triaged' as Id<'objective_policies'>,
          standardId: 'std-triaged' as Id<'competency_standards'>,
          policy: 'triaged',
          courseKey: 'integrated-math-3',
          priority: 0,
        },
      ],
    });

    const result = await getObjectiveProficiencyHandler(
      { db } as unknown as import('@/convex/_generated/server').QueryCtx,
      { studentId: 'student-1', objectiveId: 'obj-triaged' }
    );

    expect(result.priority).toBe('triaged');
    expect(result.isProficient).toBe(false);
    expect(result.reasons).toContain('objective_triaged');
  });

  it('derives fluency confidence from timing baselines and review durations', async () => {
    const cardId = 'card-1' as Id<'srs_cards'>;
    const studentId = 'student-1' as Id<'profiles'>;

    const { db } = makeMockCtx({
      cards: [
        {
          _id: cardId,
          studentId,
          objectiveId: 'obj-timing',
          problemFamilyId: 'pf-timing',
          stability: 30,
          difficulty: 3,
          state: 'review',
          dueDate: '2026-04-17T00:00:00.000Z',
          elapsedDays: 1,
          scheduledDays: 2,
          reps: 2,
          lapses: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
      reviews: [
        {
          _id: 'rev-1' as Id<'srs_review_log'>,
          cardId,
          studentId,
          rating: 'Good',
          submissionId: 'act-timing-1',
          reviewId: 'rev_timing',
          evidence: {},
          stateBefore: {},
          stateAfter: {},
          reviewedAt: Date.now(),
        },
      ],
      submissions: [
        {
          _id: 'sub-timing' as Id<'activity_submissions'>,
          userId: studentId,
          activityId: 'act-timing' as Id<'activities'>,
          submissionData: { attemptNumber: 1, timing: { activeMs: 5000 } },
          submittedAt: Date.now(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
      baselines: [
        {
          _id: 'base-timing' as Id<'timing_baselines'>,
          problemFamilyId: 'pf-timing',
          sampleCount: 20,
          medianActiveMs: 15000,
          lastComputedAt: '2026-04-16T00:00:00.000Z',
          minSamplesMet: true,
        },
      ],
      problemFamilies: [
        {
          _id: 'fam-timing' as Id<'problem_families'>,
          problemFamilyId: 'pf-timing',
          objectiveIds: ['obj-timing'],
          componentKey: 'key-timing',
          displayName: 'Family Timing',
          description: 'Desc',
          difficulty: 'medium',
        },
      ],
      standards: [
        {
          _id: 'std-timing' as Id<'competency_standards'>,
          code: 'obj-timing',
          description: 'Timing Objective',
          isActive: true,
          createdAt: Date.now(),
        },
      ],
      policies: [
        {
          _id: 'pol-timing' as Id<'objective_policies'>,
          standardId: 'std-timing' as Id<'competency_standards'>,
          policy: 'essential',
          courseKey: 'integrated-math-3',
          priority: 1,
        },
      ],
    });

    const result = await getObjectiveProficiencyHandler(
      { db } as unknown as import('@/convex/_generated/server').QueryCtx,
      { studentId: 'student-1', objectiveId: 'obj-timing' }
    );

    expect(result.fluencyConfidence).toBe('high');
    expect(result.problemFamilyDetails[0].baselineSampleCount).toBe(20);
  });
});
