import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ActivityCard } from './ActivityCard';

describe('ActivityCard', () => {
  it('always shows the "Contoh aktiviti" disclaimer', () => {
    render(<ActivityCard activity={{ id: 1, title: 'Gotong-Royong Perdana', description: 'Contoh penerangan.', icon: 'broom' }} />);
    expect(screen.getByText('Contoh aktiviti')).toBeInTheDocument();
  });

  it('does not render an <img> tag (icon-based, not photo-based)', () => {
    const { container } = render(<ActivityCard activity={{ id: 1, title: 'Gotong-Royong Perdana', description: 'Contoh penerangan.', icon: 'broom' }} />);
    expect(container.querySelector('img')).toBeNull();
  });

  it('renders the icon as an inline SVG tinted from the palette, not an emoji glyph', () => {
    const { container } = render(<ActivityCard activity={{ id: 1, title: 'Gotong-Royong Perdana', description: 'Contoh penerangan.', icon: 'broom' }} />);
    const svg = container.querySelector('svg[aria-hidden="true"]');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('class')).toMatch(/text-pkkc-/);
  });
});
