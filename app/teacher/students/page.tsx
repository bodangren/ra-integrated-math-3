import Link from 'next/link';
import { requireTeacherSessionClaims } from '@/lib/auth/server';
import { fetchInternalQuery, internal } from '@/lib/convex/server';

interface StudentRow {
  id: string;
  username: string;
  displayName: string | null;
  completedPhases: number;
  totalPhases: number;
  progressPercentage: number;
  lastActive: string | null;
}

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function StudentsPage({ searchParams }: PageProps) {
  const claims = await requireTeacherSessionClaims('/auth/login');
  const { id: selectedId } = await searchParams;

  const data: {
    teacher: { username: string; organizationName: string; organizationId: string };
    students: StudentRow[];
  } | null = await fetchInternalQuery(internal.teacher.getTeacherDashboardData, {
    userId: claims.sub,
  });

  const students = data?.students ?? [];

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-display font-bold text-foreground">Students</h1>
        <p className="text-muted-foreground text-sm">{students.length} enrolled</p>
      </div>

      <div className="grid gap-3">
        {students.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No students enrolled.</p>
        ) : (
          students.map((student) => {
            const isSelected = student.id === selectedId;
            return (
              <div
                key={student.id}
                className={[
                  'card-workbook p-4 space-y-2 transition-all',
                  isSelected ? 'border-primary/50 bg-primary/5' : '',
                ].join(' ')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Link
                      href={`/teacher/students?id=${student.id}`}
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {student.displayName ?? student.username}
                    </Link>
                    <p className="text-xs text-muted-foreground">{student.username}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono-num text-sm font-bold text-primary">
                      {student.progressPercentage}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {student.completedPhases}/{student.totalPhases} phases
                    </p>
                  </div>
                </div>

                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${student.progressPercentage}%` }}
                  />
                </div>

                {student.lastActive && (
                  <p className="text-xs text-muted-foreground">
                    Last active: {new Date(student.lastActive).toLocaleDateString()}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
