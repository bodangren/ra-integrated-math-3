import { describe, it, expect } from 'vitest';
import { assembleLessonChatbotContext } from '../lesson-context';

describe('assembleLessonChatbotContext', () => {
  it('assembles context from lesson and phase', () => {
    const lesson = {
      title: 'Quadratic Equations',
      unit: { title: 'Module 3' },
    };
    const phase = {
      title: 'Solving by Factoring',
      learningObjectives: ['Factor quadratics', 'Set equations to zero'],
      content: '<p>This lesson covers factoring quadratics.</p>',
    };

    const context = assembleLessonChatbotContext(lesson, phase);

    expect(context).toEqual({
      lessonTitle: 'Quadratic Equations',
      unitTitle: 'Module 3',
      phaseTitle: 'Solving by Factoring',
      learningObjectives: ['Factor quadratics', 'Set equations to zero'],
      contentSummary: 'This lesson covers factoring quadratics.',
    });
  });

  it('strips HTML tags from content', () => {
    const lesson = { title: 'Test', unit: { title: 'Unit' } };
    const phase = {
      title: 'Phase',
      learningObjectives: [],
      content: '<h1>Hello</h1><p>World</p><br/>',
    };

    const context = assembleLessonChatbotContext(lesson, phase);

    expect(context.contentSummary).toBe('Hello World');
  });

  it('collapses multiple whitespace into single space', () => {
    const lesson = { title: 'Test', unit: { title: 'Unit' } };
    const phase = {
      title: 'Phase',
      learningObjectives: [],
      content: 'Hello    World\n\nTest',
    };

    const context = assembleLessonChatbotContext(lesson, phase);

    expect(context.contentSummary).toBe('Hello World Test');
  });

  it('truncates long content to 2000 characters', () => {
    const longContent = 'A'.repeat(2500);
    const lesson = { title: 'Test', unit: { title: 'Unit' } };
    const phase = {
      title: 'Phase',
      learningObjectives: [],
      content: longContent,
    };

    const context = assembleLessonChatbotContext(lesson, phase);

    expect(context.contentSummary.length).toBeLessThanOrEqual(2000);
    expect(context.contentSummary).toContain('...');
  });

  it('does not truncate short content', () => {
    const lesson = { title: 'Test', unit: { title: 'Unit' } };
    const phase = {
      title: 'Phase',
      learningObjectives: [],
      content: 'Short content',
    };

    const context = assembleLessonChatbotContext(lesson, phase);

    expect(context.contentSummary).toBe('Short content');
  });

  it('truncates at word boundary when possible', () => {
    const lesson = { title: 'Test', unit: { title: 'Unit' } };
    const phase = {
      title: 'Phase',
      learningObjectives: [],
      content: 'word1 word2 word3 ' + 'A'.repeat(2000),
    };

    const context = assembleLessonChatbotContext(lesson, phase);

    expect(context.contentSummary.endsWith('...')).toBe(true);
  });

  it('handles empty learning objectives', () => {
    const lesson = { title: 'Test', unit: { title: 'Unit' } };
    const phase = {
      title: 'Phase',
      learningObjectives: [],
      content: 'Content',
    };

    const context = assembleLessonChatbotContext(lesson, phase);

    expect(context.learningObjectives).toEqual([]);
  });

  it('preserves multiple learning objectives', () => {
    const lesson = { title: 'Test', unit: { title: 'Unit' } };
    const phase = {
      title: 'Phase',
      learningObjectives: ['Obj1', 'Obj2', 'Obj3'],
      content: 'Content',
    };

    const context = assembleLessonChatbotContext(lesson, phase);

    expect(context.learningObjectives).toEqual(['Obj1', 'Obj2', 'Obj3']);
  });
});