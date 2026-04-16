import { describe, it, expect } from 'vitest';
import { stabilityToRetention, STABILITY_SCALE_FACTOR } from '@/lib/practice/srs-proficiency';

describe('STABILITY_SCALE_FACTOR', () => {
  it('should default to 30', () => {
    expect(STABILITY_SCALE_FACTOR).toBe(30);
  });
});

describe('stabilityToRetention', () => {
  it('should return 0 for stability 0', () => {
    expect(stabilityToRetention(0)).toBe(0);
  });

  it('should return 0.5 for stability 30 (default scale factor)', () => {
    expect(stabilityToRetention(30)).toBeCloseTo(0.5, 6);
  });

  it('should return ~0.75 for stability 90', () => {
    expect(stabilityToRetention(90)).toBeCloseTo(0.75, 6);
  });

  it('should return ~0.909 for stability 300', () => {
    expect(stabilityToRetention(300)).toBeCloseTo(0.909090, 4);
  });

  it('should return 0 for negative stability', () => {
    expect(stabilityToRetention(-10)).toBe(0);
  });

  it('should approach 1 for very high stability (1000+)', () => {
    const result = stabilityToRetention(1000);
    expect(result).toBeGreaterThan(0.96);
    expect(result).toBeLessThanOrEqual(1);
  });

  it('should allow custom scaleFactor override', () => {
    expect(stabilityToRetention(15, 15)).toBeCloseTo(0.5, 6);
    expect(stabilityToRetention(60, 60)).toBeCloseTo(0.5, 6);
  });

  it('should return 0 for NaN input', () => {
    expect(stabilityToRetention(NaN)).toBe(0);
  });

  it('should return 1 for Infinity input', () => {
    expect(stabilityToRetention(Infinity)).toBe(1);
  });
});
