import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { ParticleBackground } from './ParticleBackground';

describe('ParticleBackground', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => setTimeout(cb, 16) as unknown as number);
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => clearTimeout(id));
    
    // Set window dimensions to ensure particleCount > 0
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 768 });

    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value: vi.fn(() => ({
        clearRect: vi.fn(),
        beginPath: vi.fn(),
        arc: vi.fn(),
        fill: vi.fn(),
      })),
      writable: true,
      configurable: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should render canvas element and handle resize', () => {
    const { container, unmount } = render(<ParticleBackground />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();

    // Fast forward to run animation and trigger out of bounds resets
    vi.advanceTimersByTime(100000);

    // Trigger resize
    window.dispatchEvent(new Event('resize'));

    // Unmount to trigger cleanup
    unmount();
  });
});
