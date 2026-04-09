'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { completePhaseRequest } from '@/lib/phase-completion/client';
import { cn } from '@/lib/utils';

type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface PhaseCompleteButtonProps {
  lessonId: string;
  phaseNumber: number;
  initialStatus?: ProgressStatus;
  disabled?: boolean;
  className?: string;
  idleLabel?: string;
  completedLabel?: string;
  onStatusChange?: (status: ProgressStatus) => void;
}

export function PhaseCompleteButton({
  lessonId,
  phaseNumber,
  initialStatus = 'not_started',
  disabled = false,
  className,
  idleLabel = 'Mark Complete',
  completedLabel = 'Completed',
  onStatusChange,
}: PhaseCompleteButtonProps) {
  const [status, setStatus] = useState<ProgressStatus>(initialStatus);
  const [isCompleting, setIsCompleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const isCompleted = status === 'completed';
  const isDisabled = disabled || isCompleting || isCompleted;

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const handleClick = useCallback(async () => {
    if (isDisabled) return;

    setIsCompleting(true);
    setErrorMessage(null);

    try {
      await completePhaseRequest({
        lessonId,
        phaseNumber,
        timeSpent: Math.round((Date.now() - startTimeRef.current) / 1000),
        idempotencyKey: `${lessonId}-${phaseNumber}-${Date.now()}`,
      });

      setStatus('completed');
      onStatusChange?.('completed');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to save progress. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsCompleting(false);
    }
  }, [isDisabled, lessonId, phaseNumber, onStatusChange]);

  return (
    <div className={cn('w-full max-w-sm space-y-2', className)}>
      <Button
        type="button"
        variant={isCompleted ? 'outline' : 'default'}
        aria-pressed={isCompleted}
        disabled={isDisabled}
        onClick={handleClick}
        className={cn(
          'w-full justify-center font-semibold',
          isCompleted ? 'border-green-300 text-green-700 dark:text-green-300' : '',
        )}
      >
        {isCompleting && <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden />}
        {!isCompleting && isCompleted && <CheckCircle2 className="h-4 w-4 mr-2" aria-hidden />}
        {isCompleted ? completedLabel : idleLabel}
      </Button>

      {errorMessage && (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
