import { describe, it, expect, vi } from 'vitest';
import { getDailyPracticeQueueHandler } from '@/convex/queue/queue';
import type { Id } from '@/convex/_generated/dataModel';
import type { SrsCardState } from '@/lib/srs/contract';

function makeMockCtx(overrides: {
  cards?: SrsCardState[];
  policies?: Array<{
    _id: Id<'objective_policies'>;
    standardId: Id<'competency_standards'>;
    policy: string;
    courseKey: string;
    priority: number;
  }>;
  standards?: Record<string, { _id: Id<'competency_standards'>; code: string }>;
} = {}) {
  const { cards = [], policies = [], standards = {} } = overrides;

  const cardQueryMock = {
    withIndex: vi.fn().mockReturnValue({
      collect: vi.fn().mockResolvedValue(cards.map((card) => ({
        _id: card.cardId as Id<'srs_cards'>,
        studentId: card.studentId as Id<'profiles'>,
        objectiveId: card.objectiveId,
        problemFamilyId: card.problemFamilyId,
        stability: card.stability,
        difficulty: card.difficulty,
        state: card.state,
        dueDate: card.dueDate,
        elapsedDays: card.elapsedDays,
        scheduledDays: card.scheduledDays,
        reps: card.reps,
        lapses: card.lapses,
        lastReview: card.lastReview ?? undefined,
        createdAt: new Date(card.createdAt).getTime(),
        updatedAt: new Date(card.updatedAt).getTime(),
      }))),
    }),
  };

  const policyQueryMock = {
    withIndex: vi.fn().mockReturnValue({
      collect: vi.fn().mockResolvedValue(policies),
    }),
  };

  const mockGet = vi.fn().mockImplementation((id: Id<'competency_standards'>) => {
    return Promise.resolve(standards[id] ?? null);
  });

  const mockQuery = vi.fn().mockImplementation((tableName: string) => {
    if (tableName === 'srs_cards') return cardQueryMock;
    if (tableName === 'objective_policies') return policyQueryMock;
    return { withIndex: vi.fn().mockReturnValue({ collect: vi.fn().mockResolvedValue([]) }) };
  });

  return {
    db: {
      query: mockQuery,
      get: mockGet,
    },
    cardQueryMock,
    policyQueryMock,
    mockGet,
  };
}

const baseCard: SrsCardState = {
  cardId: 'card-1',
  studentId: 'student-1',
  objectiveId: 'HSA-SSE.B.3',
  problemFamilyId: 'm1-qf-factoring-1',
  stability: 0,
  difficulty: 0,
  state: 'new',
  dueDate: new Date().toISOString(),
  elapsedDays: 0,
  scheduledDays: 0,
  reps: 0,
  lapses: 0,
  lastReview: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('getDailyPracticeQueueHandler', () => {
  it('returns empty queue for student with no cards', async () => {
    const { db } = makeMockCtx({ cards: [] });

    const result = await getDailyPracticeQueueHandler(
      { db } as unknown as import('@/convex/_generated/server').QueryCtx,
      { studentId: 'student-1', asOfDate: new Date().toISOString() }
    );

    expect(result).toEqual([]);
  });

  it('returns ordered queue items for a student with cards', async () => {
    const cards: SrsCardState[] = [
      { ...baseCard, cardId: 'card-1', state: 'new', objectiveId: 'HSA-SSE.B.3' },
    ];
    const policies = [
      {
        _id: 'policy-1' as Id<'objective_policies'>,
        standardId: 'std-1' as Id<'competency_standards'>,
        policy: 'essential',
        courseKey: 'integrated-math-3',
        priority: 1,
      },
    ];
    const standards = {
      'std-1': { _id: 'std-1' as Id<'competency_standards'>, code: 'HSA-SSE.B.3' },
    };

    const { db } = makeMockCtx({ cards, policies, standards });

    const result = await getDailyPracticeQueueHandler(
      { db } as unknown as import('@/convex/_generated/server').QueryCtx,
      { studentId: 'student-1', asOfDate: new Date().toISOString() }
    );

    expect(result).toHaveLength(1);
    expect(result[0].card.cardId).toBe('m1-qf-factoring-1');
    expect(result[0].objectivePriority).toBe('essential');
    expect(result[0].isOverdue).toBe(false);
  });

  it('joins card data with objective policy from competency_standards', async () => {
    const cards: SrsCardState[] = [
      { ...baseCard, cardId: 'card-1', problemFamilyId: 'm1-family-a', state: 'new', objectiveId: 'HSA-SSE.B.3' },
      { ...baseCard, cardId: 'card-2', problemFamilyId: 'm1-family-b', state: 'review', dueDate: '2024-01-01T00:00:00.000Z', objectiveId: 'HSA-REI.B.4' },
    ];
    const policies = [
      {
        _id: 'policy-1' as Id<'objective_policies'>,
        standardId: 'std-1' as Id<'competency_standards'>,
        policy: 'essential',
        courseKey: 'integrated-math-3',
        priority: 1,
      },
      {
        _id: 'policy-2' as Id<'objective_policies'>,
        standardId: 'std-2' as Id<'competency_standards'>,
        policy: 'supporting',
        courseKey: 'integrated-math-3',
        priority: 2,
      },
    ];
    const standards = {
      'std-1': { _id: 'std-1' as Id<'competency_standards'>, code: 'HSA-SSE.B.3' },
      'std-2': { _id: 'std-2' as Id<'competency_standards'>, code: 'HSA-REI.B.4' },
    };

    const { db } = makeMockCtx({ cards, policies, standards });

    const result = await getDailyPracticeQueueHandler(
      { db } as unknown as import('@/convex/_generated/server').QueryCtx,
      { studentId: 'student-1', asOfDate: '2024-01-15T00:00:00.000Z' }
    );

    expect(result).toHaveLength(2);
    const newItem = result.find((r: { card: { problemFamilyId: string } }) => r.card.problemFamilyId === 'm1-family-a');
    const reviewItem = result.find((r: { card: { problemFamilyId: string } }) => r.card.problemFamilyId === 'm1-family-b');
    expect(newItem?.objectivePriority).toBe('essential');
    expect(reviewItem?.objectivePriority).toBe('supporting');
    expect(reviewItem?.isOverdue).toBe(true);
  });

  it('calls buildDailyQueue with correct arguments', async () => {
    const cards: SrsCardState[] = [
      { ...baseCard, cardId: 'card-1', state: 'new', objectiveId: 'HSA-SSE.B.3' },
    ];
    const policies = [
      {
        _id: 'policy-1' as Id<'objective_policies'>,
        standardId: 'std-1' as Id<'competency_standards'>,
        policy: 'essential',
        courseKey: 'integrated-math-3',
        priority: 1,
      },
    ];
    const standards = {
      'std-1': { _id: 'std-1' as Id<'competency_standards'>, code: 'HSA-SSE.B.3' },
    };

    const { db, cardQueryMock, policyQueryMock } = makeMockCtx({ cards, policies, standards });

    await getDailyPracticeQueueHandler(
      { db } as unknown as import('@/convex/_generated/server').QueryCtx,
      { studentId: 'student-1', asOfDate: '2024-01-15T00:00:00.000Z' }
    );

    expect(cardQueryMock.withIndex).toHaveBeenCalledWith('by_student', expect.any(Function));
    expect(policyQueryMock.withIndex).toHaveBeenCalledWith('by_courseKey', expect.any(Function));
  });
});
