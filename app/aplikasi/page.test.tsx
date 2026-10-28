import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AplikasiPage from './page';
import { appFeatures } from '@/src/data/appFeatures';

describe('Aplikasi Mudah Alih page', () => {
  it('lists every app feature', () => {
    render(<AplikasiPage />);
    for (const f of appFeatures) {
      expect(screen.getByText(f.title)).toBeInTheDocument();
    }
  });

  it('contains no CTA buttons or links', () => {
    const { container } = render(<AplikasiPage />);
    expect(container.querySelector('button')).toBeNull();
    expect(container.querySelector('a')).toBeNull();
  });
});
