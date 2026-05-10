import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { GeometricPattern } from './GeometricPattern';

describe('GeometricPattern', () => {
  it('should render SVG pattern', () => {
    const { container } = render(<GeometricPattern />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    
    const pattern = container.querySelector('pattern#islamic-pattern');
    expect(pattern).toBeInTheDocument();
  });
});
