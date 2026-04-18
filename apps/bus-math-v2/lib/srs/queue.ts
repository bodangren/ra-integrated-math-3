import type { SrsCardState } from '@math-platform/srs-engine';
import type { DailyQueue } from './contract';

export interface QueueOptions {
  sessionSize?: number;
  now?: string;
}

export function buildDailyQueue(cards: SrsCardState[], options: QueueOptions = {}): DailyQueue {
  const { sessionSize = 10, now = new Date().toISOString() } = options;
  const nowMs = new Date(now).getTime();

  const dueCards = cards
    .filter((c) => new Date(c.dueDate).getTime() <= nowMs)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, sessionSize);

  return {
    cards: dueCards,
    sessionSize,
    generatedAt: Date.now(),
  };
}

export function getQueueSummary(cards: SrsCardState[], now?: string): {
  totalDue: number;
  totalCards: number;
  averageOverdue: number;
} {
  const currentTime = now ?? new Date().toISOString();
  const nowMs = new Date(currentTime).getTime();
  const dueCards = cards.filter((c) => new Date(c.dueDate).getTime() <= nowMs);

  if (dueCards.length === 0) {
    return { totalDue: 0, totalCards: cards.length, averageOverdue: 0 };
  }

  const overdueMs = dueCards.map((c) => nowMs - new Date(c.dueDate).getTime());
  const averageOverdue = overdueMs.reduce((a, b) => a + b, 0) / overdueMs.length;

  return {
    totalDue: dueCards.length,
    totalCards: cards.length,
    averageOverdue,
  };
}