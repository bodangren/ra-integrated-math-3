import Link from 'next/link';
import { requireStudentSessionClaims } from '@/lib/auth/server';
import { fetchInternalQuery, internal } from '@/lib/convex/server';
import {
  buildStudentDashboardViewModel,
  type StudentDashboardUnit,
} from '@/lib/student/dashboard';

export default async function StudentDashboardPage() {
  const claims = await requireStudentSessionClaims('/auth/login');

  const rawUnits: StudentDashboardUnit[] = await fetchInternalQuery(
    internal.student.getDashboardData,
    { userId: claims.sub },
  );

  const vm = buildStudentDashboardViewModel(rawUnits ?? []);

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-8">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground font-mono-num">
          Welcome back, {claims.username}
        </p>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Modules', value: vm.summary.totalUnits },
          { label: 'Lessons', value: vm.summary.totalLessons },
          { label: 'Completed', value: vm.summary.completedLessons },
          { label: 'Progress', value: `${vm.summary.progressPercentage}%` },
        ].map((stat) => (
          <div key={stat.label} className="card-workbook p-4 space-y-1 text-center">
            <p className="font-mono-num text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Next lesson */}
      {vm.nextLesson && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 space-y-3">
          <span className="section-label">Up Next</span>
          <h2 className="font-display text-xl font-semibold text-foreground">
            {vm.nextLesson.title}
          </h2>
          {vm.nextLesson.description && (
            <p className="text-sm text-muted-foreground">{vm.nextLesson.description}</p>
          )}
          <Link
            href={`/student/lesson/${vm.nextLesson.slug}`}
            className="inline-flex items-center gap-2 rounded-md px-5 py-2 text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 transition-opacity"
          >
            {vm.nextLesson.actionLabel} →
          </Link>
        </div>
      )}

      {/* Units */}
      <div className="space-y-6">
        {vm.units.map((unit) => (
          <div key={unit.unitNumber} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">
                <span className="font-mono-num text-primary mr-2">
                  Unit {unit.unitNumber}
                </span>
                {unit.unitTitle}
              </h2>
              <span className="font-mono-num text-sm text-muted-foreground">
                {unit.completedLessons}/{unit.lessons.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${unit.progressPercentage}%` }}
              />
            </div>

            <div className="space-y-2">
              {unit.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/student/lesson/${lesson.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/40 transition-colors group"
                >
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                    {lesson.title}
                  </span>
                  <span className="font-mono-num text-xs text-muted-foreground">
                    {lesson.completedPhases}/{lesson.totalPhases}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
