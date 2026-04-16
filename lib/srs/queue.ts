/**
 * SRS Queue Primitives
 *
 * Provides `buildDailyQueue` for ordering SRS cards into a daily practice session.
 *
 * Queue ordering rules (per spec.md):
 * 1. Exclude cards for triaged objectives.
 * 2. New cards for essential objectives (up to `newCardsPerDay`).
 * 3. Overdue cards sorted by days overdue descending.
 * 4. Due cards sorted by due date ascending.
 * 5. Cap total at `maxReviewsPerDay`.
 *
 * All functions are pure — no side effects, no browser/convex imports.
 */

import type {
  ObjectivePracticePolicy,
  ObjectivePriority,
  SrsCardState,
  SrsSessionConfig,
} from './contract';

export type QueueItem = {
  card: SrsCardState;
  objectivePriority: ObjectivePriority;
  isOverdue: boolean;
  daysOverdue: number;
};

const PRIORITY_ORDER: Record<ObjectivePriority, number> = {
  essential: 0,
  supporting: 1,
  extension: 2,
  triaged: 3,
};

/**
 * Determine if a card is overdue (past its due date and in review/relearning state).
 */
export function isOverdue(card: SrsCardState, now: string): boolean {
  if (card.state === 'new' || card.state === 'learning') {
    return false;
  }
  const dueMs = new Date(card.dueDate).getTime();
  const nowMs = new Date(now).getTime();
  return dueMs < nowMs;
}

/**
 * Calculate how many days overdue a card is.
 * Returns 0 for non-overdue cards.
 */
export function daysOverdue(card: SrsCardState, now: string): number {
  if (!isOverdue(card, now)) {
    return 0;
  }
  const dueMs = new Date(card.dueDate).getTime();
  const nowMs = new Date(now).getTime();
  const diffMs = nowMs - dueMs;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Build a daily practice queue from a list of cards.
 *
 * @param cards - All SRS cards for a student
 * @param policies - Map of objectiveId → ObjectivePracticePolicy
 * @param config - Session configuration (newCardsPerDay, maxReviewsPerDay, prioritizeOverdue)
 * @param now - Current timestamp (ISO string)
 */
export function buildDailyQueue(
  cards: SrsCardState[],
  policies: Map<string, ObjectivePracticePolicy>,
  config: SrsSessionConfig,
  now: string
): QueueItem[] {
  if (cards.length === 0) {
    return [];
  }

  const { newCardsPerDay, maxReviewsPerDay } = config;

  const nonTriaged = cards.filter((card) => {
    const policy = policies.get(card.objectiveId);
    return policy?.priority !== 'triaged';
  });

  const newCards = nonTriaged.filter((card) => card.state === 'new');
  const reviewCards = nonTriaged.filter((card) => card.state !== 'new');

  const essentialNew: QueueItem[] = [];
  const supportingNew: QueueItem[] = [];
  const extensionNew: QueueItem[] = [];
  let totalNewCount = 0;

  const sortedNew = newCards.sort((a, b) => {
    const policyA = policies.get(a.objectiveId);
    const policyB = policies.get(b.objectiveId);
    const priorityA = policyA ? PRIORITY_ORDER[policyA.priority] : 3;
    const priorityB = policyB ? PRIORITY_ORDER[policyB.priority] : 3;
    if (priorityA !== priorityB) return priorityA - priorityB;
    return 0;
  });

  for (const card of sortedNew) {
    if (totalNewCount >= newCardsPerDay) break;

    const policy = policies.get(card.objectiveId);
    if (!policy) continue;

    const queueItem: QueueItem = {
      card,
      objectivePriority: policy.priority,
      isOverdue: false,
      daysOverdue: 0,
    };

    if (policy.priority === 'essential') {
      essentialNew.push(queueItem);
      totalNewCount++;
    } else if (policy.priority === 'supporting') {
      supportingNew.push(queueItem);
      totalNewCount++;
    } else if (policy.priority === 'extension') {
      extensionNew.push(queueItem);
      totalNewCount++;
    }
  }

  const overdueCards = reviewCards.filter((card) => isOverdue(card, now));
  const dueCards = reviewCards.filter((card) => !isOverdue(card, now));

  const sortedOverdue = overdueCards
    .map((card) => ({
      card,
      objectivePriority: policies.get(card.objectiveId)?.priority ?? 'supporting',
      isOverdue: true as const,
      daysOverdue: daysOverdue(card, now),
    }))
    .sort((a, b) => {
      if (config.prioritizeOverdue) {
        return b.daysOverdue - a.daysOverdue;
      }
      return 0;
    });

  const sortedDue = dueCards
    .map((card) => ({
      card,
      objectivePriority: policies.get(card.objectiveId)?.priority ?? 'supporting',
      isOverdue: false as const,
      daysOverdue: 0,
    }))
    .sort((a, b) => {
      const aMs = new Date(a.card.dueDate).getTime();
      const bMs = new Date(b.card.dueDate).getTime();
      return aMs - bMs;
    });

  const combined: QueueItem[] = [
    ...essentialNew,
    ...supportingNew,
    ...extensionNew,
    ...sortedOverdue,
    ...sortedDue,
  ];

  return combined.slice(0, maxReviewsPerDay);
}