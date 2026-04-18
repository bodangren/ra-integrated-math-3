import { describe, it, expect, beforeEach, vi } from 'vitest';
import { resetInternalClient } from '../query.js';

vi.mock('convex/browser', () => {
  const mockQuery = vi.fn().mockResolvedValue({ result: 'mocked' });
  const mockMutation = vi.fn().mockResolvedValue({ result: 'mocked' });
  return {
    ConvexHttpClient: function MockConvexHttpClient() {
      return {
        query: mockQuery,
        mutation: mockMutation,
      };
    },
  };
});

describe('core-convex query wrappers', () => {
  beforeEach(() => {
    resetInternalClient();
    vi.clearAllMocks();
  });

  describe('fetchPublicQuery', () => {
    it('accepts any ref and args without TypeScript errors', async () => {
      const { fetchPublicQuery } = await import('../query.js');
      const mockRef = {} as any;
      const mockArgs = { key: 'value' };

      const result = await fetchPublicQuery(mockRef, mockArgs);
      expect(result).toEqual({ result: 'mocked' });
    });
  });

  describe('fetchPublicMutation', () => {
    it('accepts any ref and args without TypeScript errors', async () => {
      const { fetchPublicMutation } = await import('../query.js');
      const mockRef = {} as any;
      const mockArgs = { key: 'value' };

      const result = await fetchPublicMutation(mockRef, mockArgs);
      expect(result).toEqual({ result: 'mocked' });
    });
  });
});