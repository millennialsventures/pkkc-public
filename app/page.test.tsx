import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home page', () => {
  it('renders the hero headline and a link to Tentang Kami', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /Ketahui Lagi|Tentang Kami/i })).toHaveAttribute('href', '/tentang');
  });

  it('shows the registration number as a trust signal', () => {
    render(<Home />);
    expect(screen.getByText(/PPM-004-10-21092024/)).toBeInTheDocument();
  });

  it('links to all three preview sections', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /Carta Organisasi/i })).toHaveAttribute('href', '/organisasi');
    expect(screen.getByRole('link', { name: /Aktiviti/i })).toHaveAttribute('href', '/aktiviti');
    expect(screen.getByRole('link', { name: /Aplikasi/i })).toHaveAttribute('href', '/aplikasi');
  });
});
