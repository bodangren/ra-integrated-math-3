'use client';

import { useState } from 'react';
import { LessonPageLayout, type PhaseNavItem } from '@/components/textbook/LessonPageLayout';
import { LessonStepper, type StepperPhase } from './LessonStepper';
import { PhaseRenderer, type PhaseSection } from './PhaseRenderer';
import { PhaseCompleteButton } from './PhaseCompleteButton';
import type { PhaseType } from '@/lib/curriculum/phase-types';

export interface LessonPhase {
  phaseId: string;
  phaseNumber: number;
  phaseType: PhaseType;
  title: string;
  sections: PhaseSection[];
  status: 'completed' | 'current' | 'available' | 'locked';
  completed: boolean;
}

export interface LessonRendererProps {
  lessonId: string;
  lessonTitle: string;
  moduleLabel: string;
  lessonNumber: number;
  goals?: string;
  phases: LessonPhase[];
  mode?: 'teaching' | 'guided' | 'practice';
}

export function LessonRenderer({
  lessonId,
  lessonTitle,
  moduleLabel,
  lessonNumber,
  goals,
  phases,
  mode = 'practice',
}: LessonRendererProps) {
  // Start on the first non-locked phase (current or first available)
  const initialPhase = phases.find(p => p.status === 'current') ?? phases[0];
  const [activePhaseNumber, setActivePhaseNumber] = useState(initialPhase?.phaseNumber ?? 1);

  const activePhase = phases.find(p => p.phaseNumber === activePhaseNumber) ?? phases[0];

  // Build PhaseNavItems for LessonPageLayout progress bar + sidebar
  const navPhases: PhaseNavItem[] = phases.map(p => ({
    phaseType: p.phaseType,
    label: p.title,
    completed: p.completed,
    isCurrent: p.phaseNumber === activePhaseNumber,
  }));

  // Build StepperPhase items for LessonStepper
  const stepperPhases: StepperPhase[] = phases.map(p => ({
    phaseNumber: p.phaseNumber,
    phaseId: p.phaseId,
    phaseType: p.phaseType,
    title: p.title,
    status: p.phaseNumber === activePhaseNumber && p.status !== 'locked' ? 'current' : p.status,
  }));

  const isTeachingMode = mode === 'teaching';

  return (
    <LessonPageLayout
      lessonTitle={lessonTitle}
      moduleLabel={moduleLabel}
      lessonNumber={lessonNumber}
      goals={goals}
      phases={navPhases}
    >
      <div className="space-y-6">
        <LessonStepper
          phases={stepperPhases}
          currentPhase={activePhaseNumber}
          onPhaseClick={(phaseNumber) => setActivePhaseNumber(phaseNumber)}
        />

        {activePhase && (
          <PhaseRenderer
            phaseType={activePhase.phaseType}
            sections={activePhase.sections}
            lessonId={lessonId}
            phaseNumber={activePhase.phaseNumber}
            mode={mode}
          />
        )}

        {!isTeachingMode && activePhase && (
          <PhaseCompleteButton
            lessonId={lessonId}
            phaseNumber={activePhase.phaseNumber}
            initialStatus={activePhase.completed ? 'completed' : 'not_started'}
          />
        )}
      </div>
    </LessonPageLayout>
  );
}
