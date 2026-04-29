'use client';

import { GraphingExplorer } from './GraphingExplorer';

export interface GraphingExplorerActivityProps {
  activityId: string;
  mode: 'teaching' | 'guided' | 'practice';
  onSubmit?: (payload: unknown) => void;
  onComplete?: () => void;
}

export function GraphingExplorerActivity({
  activityId,
  mode,
  onSubmit,
  onComplete,
}: GraphingExplorerActivityProps) {
  const handleSubmit = (payload: unknown) => {
    onSubmit?.(payload);
    onComplete?.();
  };

  return (
    <GraphingExplorer
      activityId={activityId}
      mode={mode}
      variant="plot_from_equation"
      equation="y = x^2"
      onSubmit={handleSubmit}
    />
  );
}
