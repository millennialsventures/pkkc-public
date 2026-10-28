import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { RevealOnScroll } from './RevealOnScroll';

describe('RevealOnScroll static markup', () => {
  it('renders content visible (no opacity:0) before any JS hydration', () => {
    const html = renderToStaticMarkup(<RevealOnScroll><p>Kandungan</p></RevealOnScroll>);
    expect(html).not.toMatch(/opacity:0/);
    expect(html).toContain('Kandungan');
  });
});
