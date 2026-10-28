import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AktivitiPage from './page';
import { activities } from '@/src/data/activities';

describe('Aktiviti page', () => {
  it('renders one "Contoh aktiviti" label per activity', () => {
    render(<AktivitiPage />);
    expect(screen.getAllByText('Contoh aktiviti')).toHaveLength(activities.length);
  });
});
