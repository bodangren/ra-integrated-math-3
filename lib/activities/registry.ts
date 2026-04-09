import type { ComponentType } from 'react';

export interface ActivityComponentProps {
  activityId: string;
  mode: 'teaching' | 'guided' | 'practice';
  onSubmit?: (payload: unknown) => void;
  onComplete?: () => void;
}

type ActivityComponent = ComponentType<ActivityComponentProps>;

const registry = new Map<string, ActivityComponent>();

/**
 * Register an activity component under a componentKey.
 * Called by each activity implementation file.
 */
export function registerActivity(key: string, component: ActivityComponent): void {
  registry.set(key, component);
}

/**
 * Look up a registered activity component by key.
 * Returns undefined if the key is not registered.
 */
export function getActivityComponent(key: string): ActivityComponent | undefined {
  return registry.get(key);
}

/**
 * List all registered activity keys (for debugging / admin tools).
 */
export function getRegisteredActivityKeys(): string[] {
  return Array.from(registry.keys());
}
