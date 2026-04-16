import { requireStudentSessionClaims } from '@/lib/auth/server';
import {
  fetchInternalQuery,
  fetchInternalMutation,
  internal,
} from '@/lib/convex/server';
import { PracticeSessionProvider } from '@/components/student/PracticeSessionProvider';
import type { SrsSession } from '@/lib/srs/contract';
import type { ResolvedQueueItem } from '@/convex/queue/queue';

interface SessionData {
  session: SrsSession;
  queue: ResolvedQueueItem[];
}

export default async function StudentPracticePage() {
  const claims = await requireStudentSessionClaims('/auth/login');

  const sessionData: SessionData | null = await fetchInternalQuery(
    internal.queue.sessions.getActiveSession,
    { studentId: claims.sub },
  );

  const activeSessionData: SessionData = sessionData ?? await fetchInternalMutation(
    internal.queue.sessions.startDailySession,
    { studentId: claims.sub },
  );

  const { session, queue } = activeSessionData;

  return (
    <PracticeSessionProvider
      session={session}
      queue={queue}
      studentId={claims.sub}
    />
  );
}
