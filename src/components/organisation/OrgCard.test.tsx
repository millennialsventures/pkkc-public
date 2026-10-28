import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { OrgCard } from './OrgCard';

describe('OrgCard contrast', () => {
  it('level 2 uses dark text, not white, against its lighter background tint (WCAG AA)', () => {
    const { container } = render(
      <OrgCard member={{ id: 2, name: 'Nama', position: 'Jawatan', level: 2 }} />
    );
    const card = container.firstElementChild as HTMLElement;
    expect(card.className).not.toMatch(/text-white/);
  });
});
