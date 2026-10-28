import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../../app/page';

describe('smoke', () => {
  it('renders the home page placeholder', () => {
    render(<Home />);
    expect(screen.getByText(/PKKC/i)).toBeInTheDocument();
  });
});
