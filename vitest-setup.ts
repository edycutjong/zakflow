import '@testing-library/jest-dom';
import { vi, beforeAll } from 'vitest';

beforeAll(() => {
  global.console.log = vi.fn();
  global.console.error = vi.fn();
  global.console.warn = vi.fn();
});
