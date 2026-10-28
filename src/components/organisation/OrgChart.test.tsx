import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrgChart } from './OrgChart';
import { committee } from '@/src/data/committee';

describe('OrgChart', () => {
  it('renders the chairman first', () => {
    render(<OrgChart members={committee} />);
    const names = screen.getAllByText(/BIN|BINTI|Puan/).map((el) => el.textContent);
    expect(names[0]).toMatch(/ASMEL SUFIAN BIN HASSAN/);
  });

  it('renders all 14 members', () => {
    render(<OrgChart members={committee} />);
    expect(screen.getAllByText('AJK PKKC')).toHaveLength(9);
  });
});
