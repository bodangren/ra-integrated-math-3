import Link from 'next/link';
import { requireTeacherSessionClaims } from '@/lib/auth/server';
import { fetchQuery, api } from '@/lib/convex/server';

interface CurriculumUnit {
  unitNumber: number;
  title: string;
  description: string;
  objectives: string[];
  lessons: Array<{ id: string; title: string; slug: string; orderIndex: number }>;
}

export default async function TeacherUnitsPage() {
  await requireTeacherSessionClaims('/auth/login');

  const units: CurriculumUnit[] = await fetchQuery(api.public.getCurriculum, {});

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-foreground">Units Overview</h1>
        <Link
          href="/teacher/gradebook"
          className="text-sm font-medium text-primary hover:underline"
        >
          View Gradebook →
        </Link>
      </div>

      <div className="space-y-4">
        {units.map((unit) => (
          <div key={unit.unitNumber} className="card-workbook p-5 space-y-3">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground font-mono-num text-sm font-bold flex items-center justify-center">
                {unit.unitNumber}
              </span>
              <div className="flex-1 space-y-1">
                <h2 className="font-display text-lg font-semibold text-card-foreground">
                  {unit.title}
                </h2>
                {unit.description && (
                  <p className="text-sm text-muted-foreground">{unit.description}</p>
                )}
              </div>
              <Link
                href={`/teacher/gradebook?unit=${unit.unitNumber}`}
                className="text-xs font-medium text-primary hover:underline flex-shrink-0"
              >
                Gradebook
              </Link>
            </div>

            <div className="ml-12 flex flex-wrap gap-2">
              {unit.lessons.map((lesson) => (
                <span
                  key={lesson.id}
                  className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground font-mono-num"
                >
                  {unit.unitNumber}.{lesson.orderIndex} {lesson.title}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
