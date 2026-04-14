import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

const mockClaims = { sub: 'p1', username: 'teacher1', role: 'teacher' as const, organizationId: 'org1', iat: 0, exp: 9999999999 };

vi.mock('@/lib/auth/server', () => ({
  requireTeacherSessionClaims: vi.fn().mockResolvedValue(mockClaims),
}));

vi.mock('@/lib/convex/server', () => ({
  fetchInternalQuery: vi.fn(),
  internal: { teacher: { getTeacherLessonPreview: 'mock' } },
}));

const createMockLessonData = (overrides = {}) => ({
  lessonTitle: 'Intro to Quadratics',
  unitNumber: 1,
  lessonNumber: 1,
  phases: [
    {
      phaseId: 'phase1',
      phaseNumber: 1,
      phaseType: 'explore' as const,
      title: 'Explore',
      status: 'available' as const,
      completed: false,
      sections: [],
    },
    {
      phaseId: 'phase2',
      phaseNumber: 2,
      phaseType: 'learn' as const,
      title: 'Learn',
      status: 'available' as const,
      completed: false,
      sections: [],
    },
  ],
  ...overrides,
});

describe('TeacherLessonPreviewPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders teacher preview badge', async () => {
    const { fetchInternalQuery } = await import('@/lib/convex/server');
    vi.mocked(fetchInternalQuery).mockResolvedValue(createMockLessonData());

    const { default: TeacherLessonPreviewPage } = await import('@/app/teacher/lesson/[lessonSlug]/page');
    const jsx = await TeacherLessonPreviewPage({ params: Promise.resolve({ lessonSlug: 'intro-quadratics' }) });
    render(jsx);

    expect(screen.getByText('Teacher Preview')).toBeInTheDocument();
  });

  it('renders lesson title', async () => {
    const { fetchInternalQuery } = await import('@/lib/convex/server');
    vi.mocked(fetchInternalQuery).mockResolvedValue(createMockLessonData());

    const { default: TeacherLessonPreviewPage } = await import('@/app/teacher/lesson/[lessonSlug]/page');
    const jsx = await TeacherLessonPreviewPage({ params: Promise.resolve({ lessonSlug: 'intro-quadratics' }) });
    render(jsx);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Intro to Quadratics');
  });

  it('renders all phases as available', async () => {
    const { fetchInternalQuery } = await import('@/lib/convex/server');
    vi.mocked(fetchInternalQuery).mockResolvedValue(createMockLessonData());

    const { default: TeacherLessonPreviewPage } = await import('@/app/teacher/lesson/[lessonSlug]/page');
    const jsx = await TeacherLessonPreviewPage({ params: Promise.resolve({ lessonSlug: 'intro-quadratics' }) });
    render(jsx);

    const exploreButtons = screen.getAllByRole('button', { name: /phase 1: explore/i });
    expect(exploreButtons.length).toBeGreaterThan(0);
    const learnButtons = screen.getAllByRole('button', { name: /phase 2: learn/i });
    expect(learnButtons.length).toBeGreaterThan(0);
  });

  it('shows teaching mode label in module label', async () => {
    const { fetchInternalQuery } = await import('@/lib/convex/server');
    vi.mocked(fetchInternalQuery).mockResolvedValue(createMockLessonData());

    const { default: TeacherLessonPreviewPage } = await import('@/app/teacher/lesson/[lessonSlug]/page');
    const jsx = await TeacherLessonPreviewPage({ params: Promise.resolve({ lessonSlug: 'intro-quadratics' }) });
    render(jsx);

    expect(screen.getByText(/Unit 1/)).toBeInTheDocument();
  });

  it('returns notFound when lesson does not exist', async () => {
    const { fetchInternalQuery } = await import('@/lib/convex/server');
    vi.mocked(fetchInternalQuery).mockResolvedValue(null);

    const { default: TeacherLessonPreviewPage } = await import('@/app/teacher/lesson/[lessonSlug]/page');
    
    await expect(async () => {
      const jsx = await TeacherLessonPreviewPage({ params: Promise.resolve({ lessonSlug: 'nonexistent' }) });
      render(jsx);
    }).rejects.toThrow();
  });
});
