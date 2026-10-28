import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TentangPage from './page';

describe('Tentang Kami page', () => {
  it('renders registration proof', () => {
    render(<TentangPage />);
    expect(screen.getByText(/PPM-004-10-21092024/)).toBeInTheDocument();
    expect(screen.getByText(/21 September 2024/)).toBeInTheDocument();
  });

  it('renders all 8 taman', () => {
    render(<TentangPage />);
    for (const name of ['Kita Ria', 'Kita Bayu', 'Kita Impian', 'Kita Sejati', 'Kita Mesra', 'Kita Harmoni', 'Kita Mekar', 'Kita Bestari']) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });
});
