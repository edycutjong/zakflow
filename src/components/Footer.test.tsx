import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('should render the footer text correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/ZakFlow — Shariah-Compliant Stablecoin/)).toBeInTheDocument();
  });
});
