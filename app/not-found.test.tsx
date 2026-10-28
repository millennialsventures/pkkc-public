import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from './not-found';

describe('404 page', () => {
  it('renders Bahasa Malaysia copy, not the English Next.js default', () => {
    render(<NotFound />);
    expect(screen.getByText(/Halaman Tidak Dijumpai/i)).toBeInTheDocument();
    expect(screen.queryByText(/could not be found/i)).toBeNull();
  });

  it('links back to the homepage', () => {
    render(<NotFound />);
    expect(screen.getByRole('link', { name: /Laman Utama/i })).toHaveAttribute('href', '/');
  });
});
