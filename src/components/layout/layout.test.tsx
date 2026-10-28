import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

describe('NavBar', () => {
  it('links to all five routes', () => {
    render(<NavBar />);
    const expected: [string, string][] = [
      ['Laman Utama', '/'],
      ['Tentang Kami', '/tentang'],
      ['Carta Organisasi', '/organisasi'],
      ['Aktiviti', '/aktiviti'],
      ['Aplikasi Mudah Alih', '/aplikasi'],
    ];
    for (const [label, href] of expected) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href);
    }
  });
});

describe('Footer', () => {
  it('renders registration number and address', () => {
    render(<Footer />);
    expect(screen.getByText(/PPM-004-10-21092024/)).toBeInTheDocument();
    expect(screen.getByText(/DENGKIL/)).toBeInTheDocument();
  });

  it('never renders fabricated contact info', () => {
    const { container } = render(<Footer />);
    const html = container.innerHTML;
    expect(html).not.toMatch(/info@pkkc\.org/);
    expect(html).not.toMatch(/03-12345678/);
    expect(html).not.toMatch(/wa\.me/);
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
  });
});
