import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import LandingPage from './page';

// Mock the ParticleBackground component to avoid canvas errors in JSDOM
vi.mock('@/components/ParticleBackground', () => ({
  ParticleBackground: () => <div data-testid="mock-particle-background" />
}));

describe('LandingPage', () => {
  it('should render the hero section with correct texts', () => {
    render(<LandingPage />);
    expect(screen.getByText(/Digital Gold Meets/)).toBeInTheDocument();
    expect(screen.getByText(/Global Remittance/)).toBeInTheDocument();
    expect(screen.getByText(/100% Shariah-Compliant Remittance/)).toBeInTheDocument();
  });

  it('should render the CTA buttons', () => {
    render(<LandingPage />);
    expect(screen.getByText('Launch App')).toBeInTheDocument();
    expect(screen.getByText('View Features')).toBeInTheDocument();
  });

  it('should render the feature cards', () => {
    render(<LandingPage />);
    expect(screen.getByText('Auto Zakat Routing')).toBeInTheDocument();
    expect(screen.getByText('Gold-Backed PUSD')).toBeInTheDocument();
    expect(screen.getByText('Instant Settlement')).toBeInTheDocument();
  });
});
