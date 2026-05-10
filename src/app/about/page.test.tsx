import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutPage from './page';

describe('AboutPage', () => {
  it('should render the about page correctly', () => {
    render(<AboutPage />);
    expect(screen.getByText('ZakFlow')).toBeInTheDocument();
    expect(screen.getByText('Shariah-Compliant Stablecoin')).toBeInTheDocument();
    expect(screen.getByText('WHAT IT DOES')).toBeInTheDocument();
    expect(screen.getByText('TECH STACK')).toBeInTheDocument();
    expect(screen.getByText('HACKATHON')).toBeInTheDocument();
  });
});
