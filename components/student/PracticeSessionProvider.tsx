'use client';

import { useState } from 'react';
import type { SrsSession } from '@/lib/srs/contract';
import { STUDENT_DAILY_PRACTICE_COPY } from '@/lib/srs/contract';
import type { ResolvedQueueItem } from '@/convex/queue/queue';

interface PracticeSessionProviderProps {
  session: SrsSession;
  queue: ResolvedQueueItem[];
  studentId: string;
}

export function PracticeSessionProvider({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  session,
  queue,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  studentId,
}: PracticeSessionProviderProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  if (queue.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-display font-bold text-foreground mb-4">
          Daily Practice
        </h1>
        <p className="text-muted-foreground">
          No practice due today. Come back tomorrow!
        </p>
      </div>
    );
  }

  const isComplete = currentCardIndex >= queue.length;

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-display font-bold text-foreground mb-4">
          Daily Practice
        </h1>
        <p className="text-muted-foreground">
          {STUDENT_DAILY_PRACTICE_COPY.allDone}
        </p>
      </div>
    );
  }

  const currentCard = queue[currentCardIndex];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold text-foreground">
            Daily Practice
          </h1>
          <span
            className="text-sm text-muted-foreground font-mono-num"
            data-testid="card-counter"
          >
            {currentCardIndex + 1} / {queue.length}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          {STUDENT_DAILY_PRACTICE_COPY.queueSummary(queue.length)}
        </p>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Card {currentCardIndex + 1} of {queue.length}
            </p>
            <div className="text-foreground">
              {/* Card rendering placeholder for Phase 2 */}
              <p
                className="text-sm text-muted-foreground"
                data-testid="card-component-key"
              >
                Component: {currentCard.componentKey}
              </p>
            </div>
          </div>
        </div>

        {/* Temporary navigation for Phase 1 state verification */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setCurrentCardIndex((i) => i + 1)}
            className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 transition-opacity"
            data-testid="next-card-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
