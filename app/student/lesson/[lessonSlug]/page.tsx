import { notFound } from 'next/navigation';
import Link from 'next/link';
import { requireStudentSessionClaims } from '@/lib/auth/server';
import { fetchInternalQuery, internal } from '@/lib/convex/server';
import { resolveLessonLandingPhase } from '@/lib/student/lesson-runtime';
import { getPhaseDisplayInfo, type PhaseType } from '@/lib/curriculum/phase-types';

interface PhaseProgress {
  phaseNumber: number;
  phaseId: string;
  phaseType: PhaseType;
  status: 'completed' | 'current' | 'available' | 'locked';
  startedAt: string | null;
  completedAt: string | null;
  timeSpentSeconds: number | null;
}

interface LessonProgressResult {
  phases: PhaseProgress[];
}

interface PageProps {
  params: Promise<{ lessonSlug: string }>;
}

export default async function StudentLessonPage({ params }: PageProps) {
  const { lessonSlug } = await params;
  const claims = await requireStudentSessionClaims('/auth/login');

  const progressResult: LessonProgressResult | null = await fetchInternalQuery(
    internal.student.getLessonProgress,
    { userId: claims.sub, lessonIdentifier: lessonSlug },
  );

  if (!progressResult) {
    notFound();
  }

  const phases = progressResult.phases ?? [];
  const completedPhaseNumbers = new Set(
    phases.filter((p) => p.status === 'completed').map((p) => p.phaseNumber),
  );

  const currentPhase = resolveLessonLandingPhase({
    totalPhases: phases.length,
    completedPhaseNumbers,
  });

  const lessonTitle = lessonSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/student/dashboard" className="hover:text-foreground transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-foreground">{lessonTitle}</span>
      </nav>

      <h1 className="text-3xl font-display font-bold text-foreground">{lessonTitle}</h1>

      {/* Phase navigation */}
      <div className="flex flex-wrap gap-2">
        {phases.map((phase) => {
          const isCurrent = phase.phaseNumber === currentPhase;
          const isCompleted = phase.status === 'completed';
          const displayInfo = getPhaseDisplayInfo(phase.phaseType);
          return (
            <button
              key={phase.phaseNumber}
              className={[
                'px-4 py-2 rounded-md text-sm font-medium border transition-colors',
                isCompleted
                  ? 'border-transparent bg-primary/10 text-primary'
                  : isCurrent
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground',
              ].join(' ')}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {displayInfo.label}
              {isCompleted && ' ✓'}
            </button>
          );
        })}
      </div>

      {/* Active phase card */}
      {(() => {
        const currentPhaseData = phases.find(p => p.phaseNumber === currentPhase);
        const displayInfo = currentPhaseData ? getPhaseDisplayInfo(currentPhaseData.phaseType) : { label: `Phase ${currentPhase}`, icon: '', color: '', bgColor: '' };
        const prevPhaseData = phases.find(p => p.phaseNumber === currentPhase - 1);
        const prevDisplayInfo = prevPhaseData ? getPhaseDisplayInfo(prevPhaseData.phaseType) : null;

        return (
          <div className="rounded-xl border border-border bg-card p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="section-label">
                Phase {currentPhase}
              </span>
              <h2 className="font-display text-xl font-semibold text-card-foreground">
                {displayInfo.label}
              </h2>
            </div>

            <p className="text-muted-foreground text-sm">
              Lesson content for this phase will appear here.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              {prevPhaseData && prevDisplayInfo ? (
                <span className="text-sm text-muted-foreground">
                  Phase {currentPhase - 1}: {prevDisplayInfo.label}
                </span>
              ) : (
                <span />
              )}
              <button
                className="inline-flex items-center gap-2 rounded-md px-5 py-2 text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 transition-opacity"
              >
                Complete Phase {currentPhase} →
              </button>
            </div>
          </div>
        );
      })()}

      <div className="text-center">
        <Link
          href="/student/dashboard"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}
