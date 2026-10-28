import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { useReducedMotion } from './useReducedMotion';

function mockReducedMotion(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  });
}

describe('useReducedMotion SSR-safe initial render', () => {
  it('returns false on the very first render even when the OS prefers reduced motion (avoids a hydration mismatch against server markup, which never sees window)', () => {
    mockReducedMotion(true);
    const renders: boolean[] = [];
    function Probe() {
      const reduced = useReducedMotion();
      renders.push(reduced);
      return null;
    }
    render(<Probe />);
    expect(renders[0]).toBe(false);
  });
});
