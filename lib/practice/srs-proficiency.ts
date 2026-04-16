/**
 * SRS Proficiency Utilities
 *
 * Functions for converting FSRS card state into objective proficiency evidence.
 */

export const STABILITY_SCALE_FACTOR = 30;

/**
 * Normalize FSRS stability (unbounded float, in days) to a 0-1 retention strength.
 *
 * Formula: 1 - (1 / (1 + stability / scaleFactor))
 *
 * Examples with default scaleFactor of 30:
 * - stability 0   -> 0.0
 * - stability 30  -> 0.5
 * - stability 90  -> 0.75
 * - stability 300 -> ~0.909
 */
export function stabilityToRetention(stability: number, scaleFactor: number = STABILITY_SCALE_FACTOR): number {
  if (Number.isNaN(stability)) return 0;
  if (stability === Infinity) return 1;
  if (stability <= 0) return 0;
  return 1 - 1 / (1 + stability / scaleFactor);
}
