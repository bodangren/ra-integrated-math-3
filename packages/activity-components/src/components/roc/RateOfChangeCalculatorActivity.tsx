'use client';

import React from 'react';
import { RateOfChangeCalculator } from './RateOfChangeCalculator';
import type { RateOfChangeCalculatorProps } from '../../schemas/rate-of-change-calculator.schema';

export interface RateOfChangeCalculatorActivityProps extends RateOfChangeCalculatorProps {
  activityId: string;
  mode: 'teaching' | 'guided' | 'practice';
  onSubmit?: (payload: unknown) => void;
  onComplete?: () => void;
}

export function RateOfChangeCalculatorActivity({
  activityId,
  mode,
  sourceType,
  data,
  interval,
  onSubmit,
  onComplete,
}: RateOfChangeCalculatorActivityProps) {
  const handleSubmit = (payload: unknown) => {
    onSubmit?.({ ...(payload as Record<string, unknown>), activityId });
  };

  return (
    <RateOfChangeCalculator
      mode={mode}
      sourceType={sourceType}
      data={data}
      interval={interval}
      onSubmit={handleSubmit}
      onComplete={onComplete}
    />
  );
}
