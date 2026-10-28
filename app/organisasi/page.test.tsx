import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OrganisasiPage from './page';

describe('Organisasi page', () => {
  it('renders the committee chart', () => {
    render(<OrganisasiPage />);
    expect(screen.getByText('ASMEL SUFIAN BIN HASSAN')).toBeInTheDocument();
  });
});
