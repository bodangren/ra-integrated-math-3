import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('PrefacePage', () => {
  it('renders preface heading', async () => {
    const { default: PrefacePage } = await import('@/app/preface/page');
    render(React.createElement(PrefacePage));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/preface/i);
  });

  it('renders course description content', async () => {
    const { default: PrefacePage } = await import('@/app/preface/page');
    render(React.createElement(PrefacePage));
    expect(screen.getByText(/integrated math 3/i)).toBeInTheDocument();
  });
});
