'use client';

import { getActivityComponent } from '@/lib/activities/registry';

export interface ActivityRendererProps {
  componentKey: string;
  activityId: string;
  lessonId?: string;
  phaseNumber?: number;
  mode?: 'teaching' | 'guided' | 'practice';
  onSubmit?: (payload: unknown) => void;
  onComplete?: () => void;
}

/**
 * Delegates to the activity registry by componentKey.
 * Shows a placeholder if the component is not yet registered.
 */
export function ActivityRenderer({
  componentKey,
  activityId,
  mode = 'practice',
  onSubmit,
  onComplete,
}: ActivityRendererProps) {
  const ActivityComponent = getActivityComponent(componentKey);

  if (!ActivityComponent) {
    return (
      <div className="my-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <p className="text-sm text-yellow-700">
          Activity <code className="font-mono text-xs">{componentKey}</code> is not yet available.
        </p>
      </div>
    );
  }

  return (
    <div className="my-4">
      <ActivityComponent
        activityId={activityId}
        mode={mode}
        onSubmit={onSubmit}
        onComplete={onComplete}
      />
    </div>
  );
}
