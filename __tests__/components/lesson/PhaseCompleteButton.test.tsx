import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PhaseCompleteButton } from '@/components/lesson/PhaseCompleteButton';

// Mock the phase completion client
vi.mock('@/lib/phase-completion/client', () => ({
  completePhaseRequest: vi.fn(),
  PhaseCompletionError: class PhaseCompletionError extends Error {},
}));

import { completePhaseRequest } from '@/lib/phase-completion/client';
const mockCompletePhase = vi.mocked(completePhaseRequest);

describe('PhaseCompleteButton', () => {
  beforeEach(() => {
    mockCompletePhase.mockReset();
  });

  describe('rendering', () => {
    it('renders a Mark Complete button by default', () => {
      render(
        <PhaseCompleteButton lessonId="lesson-1" phaseNumber={1} />
      );
      expect(screen.getByRole('button', { name: /mark complete/i })).toBeInTheDocument();
    });

    it('renders as enabled when not disabled', () => {
      render(
        <PhaseCompleteButton lessonId="lesson-1" phaseNumber={1} />
      );
      expect(screen.getByRole('button', { name: /mark complete/i })).not.toBeDisabled();
    });

    it('renders as disabled when disabled prop is true', () => {
      render(
        <PhaseCompleteButton lessonId="lesson-1" phaseNumber={1} disabled />
      );
      expect(screen.getByRole('button', { name: /mark complete/i })).toBeDisabled();
    });

    it('renders already-completed state when initialStatus is completed', () => {
      render(
        <PhaseCompleteButton lessonId="lesson-1" phaseNumber={1} initialStatus="completed" />
      );
      expect(screen.getByRole('button')).toBeDisabled();
      expect(screen.getByText(/completed/i)).toBeInTheDocument();
    });
  });

  describe('completion flow', () => {
    it('calls completePhaseRequest on click', async () => {
      mockCompletePhase.mockResolvedValueOnce({ success: true });

      render(
        <PhaseCompleteButton lessonId="lesson-1" phaseNumber={2} />
      );
      fireEvent.click(screen.getByRole('button', { name: /mark complete/i }));

      await waitFor(() => {
        expect(mockCompletePhase).toHaveBeenCalledOnce();
      });

      const call = mockCompletePhase.mock.calls[0][0];
      expect(call.lessonId).toBe('lesson-1');
      expect(call.phaseNumber).toBe(2);
    });

    it('shows completed state after successful completion', async () => {
      mockCompletePhase.mockResolvedValueOnce({ success: true });

      render(
        <PhaseCompleteButton lessonId="lesson-1" phaseNumber={1} />
      );
      fireEvent.click(screen.getByRole('button', { name: /mark complete/i }));

      await waitFor(() => {
        expect(screen.getByText(/completed/i)).toBeInTheDocument();
      });
    });

    it('disables button after successful completion', async () => {
      mockCompletePhase.mockResolvedValueOnce({ success: true });

      render(
        <PhaseCompleteButton lessonId="lesson-1" phaseNumber={1} />
      );
      fireEvent.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByRole('button')).toBeDisabled();
      });
    });

    it('shows error message on failure', async () => {
      mockCompletePhase.mockRejectedValueOnce(new Error('Network error'));

      render(
        <PhaseCompleteButton lessonId="lesson-1" phaseNumber={1} />
      );
      fireEvent.click(screen.getByRole('button', { name: /mark complete/i }));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });

    it('calls onStatusChange when completion succeeds', async () => {
      mockCompletePhase.mockResolvedValueOnce({ success: true });
      const onStatusChange = vi.fn();

      render(
        <PhaseCompleteButton lessonId="lesson-1" phaseNumber={1} onStatusChange={onStatusChange} />
      );
      fireEvent.click(screen.getByRole('button', { name: /mark complete/i }));

      await waitFor(() => {
        expect(onStatusChange).toHaveBeenCalledWith('completed');
      });
    });
  });

  describe('loading state', () => {
    it('disables button while request is in flight', async () => {
      let resolve: (v: unknown) => void;
      mockCompletePhase.mockReturnValueOnce(new Promise(r => { resolve = r; }));

      render(
        <PhaseCompleteButton lessonId="lesson-1" phaseNumber={1} />
      );
      const btn = screen.getByRole('button', { name: /mark complete/i });
      fireEvent.click(btn);

      await waitFor(() => {
        expect(btn).toBeDisabled();
      });

      resolve!({ success: true });
    });
  });
});
