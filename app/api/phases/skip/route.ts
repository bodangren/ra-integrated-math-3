import { NextResponse } from 'next/server';

import { requireStudentRequestClaims } from '@/lib/auth/server';
import { fetchInternalMutation, internal } from '@/lib/convex/server';

interface SkipPhaseBody {
  lessonId?: string;
  phaseNumber?: number;
  idempotencyKey?: string;
}

export async function POST(request: Request) {
  const claimsOrResponse = await requireStudentRequestClaims(request);
  if (claimsOrResponse instanceof Response) {
    return claimsOrResponse;
  }

  let body: SkipPhaseBody;
  try {
    body = (await request.json()) as SkipPhaseBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { lessonId, phaseNumber, idempotencyKey } = body;

  if (!lessonId || phaseNumber == null || !idempotencyKey) {
    return NextResponse.json(
      { error: 'lessonId, phaseNumber, and idempotencyKey are required' },
      { status: 400 },
    );
  }

  try {
    const result = await fetchInternalMutation(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (internal.student as any).skipPhase,
      {
        userId: claimsOrResponse.sub,
        lessonId,
        phaseNumber,
        idempotencyKey,
      },
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Phase skip failed', error);
    return NextResponse.json({ error: 'Phase skip failed' }, { status: 500 });
  }
}