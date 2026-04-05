import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('LandingPage', () => {
  it('renders hero section with course title', async () => {
    const { default: LandingPage } = await import('@/app/page');
    render(React.createElement(LandingPage));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/integrated math 3/i);
  });

  it('renders curriculum stats', async () => {
    const { default: LandingPage } = await import('@/app/page');
    render(React.createElement(LandingPage));
    expect(screen.getByText(/9 modules/i)).toBeInTheDocument();
    expect(screen.getByText(/52 lessons/i)).toBeInTheDocument();
  });
});
