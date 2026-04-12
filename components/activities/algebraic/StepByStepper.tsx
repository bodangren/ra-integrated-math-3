'use client';

import React from 'react';
import InlineMath from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';
import { StepRevealContainer, StepMode } from '@/components/textbook/StepRevealContainer';

export interface AlgebraicStep {
  expression: string;
  explanation: string;
  hint?: string;
  isKeyStep?: boolean;
}

export interface StepByStepperProps {
  mode: StepMode;
  steps: AlgebraicStep[];
}

export function StepByStepper({ mode, steps }: StepByStepperProps) {
  if (steps.length === 0) {
    return <StepRevealContainer mode={mode} steps={[]} />;
  }

  const stepRevealSteps = steps.map((step) => ({
    content: (
      <div className="space-y-2">
        <div className="text-lg font-medium">
          <InlineMath math={step.expression} />
        </div>
        <div className="text-sm text-muted-foreground">
          {step.explanation}
        </div>
      </div>
    ),
  }));

  return (
    <StepRevealContainer mode={mode} steps={stepRevealSteps} />
  );
}
