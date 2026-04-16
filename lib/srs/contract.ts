/**
 * Daily Practice SRS Product Contract
 *
 * Version: srs.contract.v1
 *
 * This module consolidates all types needed for the spaced-repetition daily
 * practice pipeline. It re-exports existing types from `lib/practice/*` and
 * defines new types for SRS card state, review logs, and sessions.
 *
 * ## Triage Handling Rules
 *
 * Objectives with `priority === 'triaged'` are explicitly excluded from daily
 * practice queues and proficiency calculations unless a teacher overrides.
 * - They do not generate SRS cards.
 * - They do not appear in student proficiency dashboards as incomplete.
 * - They can be reactivated by changing the priority field.
 *
 * Downstream tracks (schema, queue engine, card creation) must skip triaged
 * objectives at their respective boundaries.
 *
 * ## Import Guidelines
 *
 * All SRS-related code should import from this module only:
 *   import { SrsCardState, SrsSessionConfig } from '@/lib/srs/contract';
 *
 * Do not import directly from `lib/practice/srs-rating.ts`,
 * `lib/practice/objective-proficiency.ts`, etc. in SRS-specific code.
 */

// ============================================
// Version
// ============================================

export const SRS_CONTRACT_VERSION = 'srs.contract.v1' as const;

// ============================================
// Re-exports: SRS Rating
// ============================================

export type {
  SrsRating,
  SrsRatingInput,
  SrsRatingResult,
} from '@/lib/practice/srs-rating';

// ============================================
// Re-exports: Objective Proficiency
// ============================================

export type {
  ObjectivePriority,
  ObjectivePracticePolicy,
  EvidenceConfidence,
  ObjectiveProficiencyResult,
  StudentProficiencyView,
  TeacherProficiencyView,
} from '@/lib/practice/objective-proficiency';

export { PRIORITY_DEFAULTS } from '@/lib/practice/objective-proficiency';

// ============================================
// Re-exports: Timing Baseline
// ============================================

export type {
  PracticeTimingBaseline,
  PracticeTimingFeatures,
  TimingSpeedBand,
} from '@/lib/practice/timing-baseline';

// ============================================
// Re-exports: Practice Contract
// ============================================

export type {
  PracticeSubmissionEnvelope,
  PracticeSubmissionPart,
  PracticeTimingSummary,
} from '@/lib/practice/contract';

// ============================================
// New Types: Card State
// ============================================

export type SrsCardId = string;

export type SrsCardState = {
  cardId: SrsCardId;
  studentId: string;
  objectiveId: string;
  problemFamilyId: string;
  stability: number;
  difficulty: number;
  state: 'new' | 'learning' | 'review' | 'relearning';
  dueDate: string; // ISO timestamp
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  lastReview: string | null;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
};

// ============================================
// New Types: Review Log
// ============================================

export type SrsReviewLogEntry = {
  reviewId: string;
  cardId: SrsCardId;
  studentId: string;
  rating: import('@/lib/practice/srs-rating').SrsRating;
  submissionId: string;
  evidence: {
    baseRating: import('@/lib/practice/srs-rating').SrsRating;
    timingAdjusted: boolean;
    reasons: string[];
  };
  stateBefore: Pick<
    SrsCardState,
    'stability' | 'difficulty' | 'state' | 'reps' | 'lapses'
  >;
  stateAfter: Pick<
    SrsCardState,
    'stability' | 'difficulty' | 'state' | 'reps' | 'lapses'
  >;
  reviewedAt: string; // ISO timestamp
};

// ============================================
// New Types: Session
// ============================================

export type SrsSessionConfig = {
  newCardsPerDay: number;
  maxReviewsPerDay: number;
  prioritizeOverdue: boolean;
};

export type SrsSession = {
  sessionId: string;
  studentId: string;
  startedAt: string; // ISO timestamp
  completedAt: string | null;
  plannedCards: number;
  completedCards: number;
  config: SrsSessionConfig;
};

// ============================================
// Instructional Language Constants
// ============================================

/**
 * Student-facing copy for daily practice surfaces.
 * All copy is written to be encouraging and non-punitive.
 * No speed rankings, no comparative language, no raw FSRS numbers.
 */
export const STUDENT_DAILY_PRACTICE_COPY = {
  queueSummary: (count: number): string =>
    `You have ${count} item${count === 1 ? '' : 's'} to review today.`,
  allDone: 'All done for today! Come back tomorrow for your next review.',
  buildingRecall: "You're building strong recall on this skill.",
} as const;

/**
 * Teacher-facing copy for daily practice dashboard surfaces.
 * Uses diagnostic language only.
 */
export const TEACHER_DAILY_PRACTICE_COPY = {
  sessionOverview: 'Review session overview for your class.',
} as const;
