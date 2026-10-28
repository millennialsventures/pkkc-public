import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ParallaxBlobs } from './ParallaxBlobs';
import { RevealOnScroll } from './RevealOnScroll';

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

describe('motion primitives', () => {
  beforeEach(() => mockReducedMotion(false));

  it('ParallaxBlobs renders decorative blobs marked aria-hidden', () => {
    const { container } = render(<ParallaxBlobs />);
    const blobs = container.querySelectorAll('[aria-hidden="true"]');
    expect(blobs.length).toBeGreaterThanOrEqual(3);
  });

  it('RevealOnScroll always renders its children', () => {
    render(<RevealOnScroll><p>Kandungan</p></RevealOnScroll>);
    expect(screen.getByText('Kandungan')).toBeInTheDocument();
  });

  it('RevealOnScroll renders children directly without motion wrapper when reduced motion is preferred', () => {
    mockReducedMotion(true);
    const { container } = render(<RevealOnScroll><p>Kandungan</p></RevealOnScroll>);
    expect(container.querySelector('[style*="opacity: 0"]')).toBeNull();
    expect(screen.getByText('Kandungan')).toBeInTheDocument();
  });
});
