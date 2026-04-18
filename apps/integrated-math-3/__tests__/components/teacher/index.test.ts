import { describe, it, expect } from 'vitest';

describe('components/teacher/index.ts', () => {
  it('should export without errors', async () => {
    const mod = await import('@/components/teacher');
    expect(mod).toBeDefined();
    expect(mod.TeacherNavigation).toBeDefined();
    expect(mod.StudentRow).toBeDefined();
    expect(mod.ClassOverviewCard).toBeDefined();
  });
});
