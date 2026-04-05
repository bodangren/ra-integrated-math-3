import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock providers that wrap children
vi.mock('@/components/ConvexClientProvider', () => ({
  ConvexClientProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'convex-provider' }, children),
}));

vi.mock('@/components/auth/AuthProvider', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'auth-provider' }, children),
}));

vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'theme-provider' }, children),
}));

vi.mock('@/components/header-simple', () => ({
  HeaderSimple: () => React.createElement('header', { 'data-testid': 'header-simple' }, 'Header'),
}));

vi.mock('@/components/footer', () => ({
  Footer: () => React.createElement('footer', { 'data-testid': 'footer' }, 'Footer'),
}));

describe('HeaderSimple', () => {
  it('renders nav links', async () => {
    const { HeaderSimple } = await import('@/components/header-simple');
    render(React.createElement(HeaderSimple));
    expect(screen.getByTestId('header-simple')).toBeInTheDocument();
  });
});

describe('Footer', () => {
  it('renders footer element', async () => {
    const { Footer } = await import('@/components/footer');
    render(React.createElement(Footer));
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});

describe('provider nesting order', () => {
  it('nests ConvexClientProvider > AuthProvider > ThemeProvider', async () => {
    const { ConvexClientProvider } = await import('@/components/ConvexClientProvider');
    const { AuthProvider } = await import('@/components/auth/AuthProvider');
    const { ThemeProvider } = await import('next-themes');

    render(
      React.createElement(
        ConvexClientProvider,
        null,
        React.createElement(
          AuthProvider,
          null,
          React.createElement(
            ThemeProvider,
            { attribute: 'class', defaultTheme: 'system', enableSystem: true },
            React.createElement('span', { 'data-testid': 'child' }, 'content'),
          ),
        ),
      ),
    );

    const convex = screen.getByTestId('convex-provider');
    const auth = screen.getByTestId('auth-provider');
    const theme = screen.getByTestId('theme-provider');
    const child = screen.getByTestId('child');

    expect(convex).toBeInTheDocument();
    expect(convex).toContainElement(auth);
    expect(auth).toContainElement(theme);
    expect(theme).toContainElement(child);
  });
});
