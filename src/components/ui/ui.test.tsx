import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';
import { Section } from './Section';
import { Button } from './Button';
import { Badge } from './Badge';

describe('ui primitives', () => {
  it('Container applies responsive padding classes', () => {
    render(<Container><p>content</p></Container>);
    expect(screen.getByText('content').parentElement?.className).toMatch(/px-4/);
  });

  it('Button renders as a link when href is given', () => {
    render(<Button href="/tentang">Ketahui Lagi</Button>);
    expect(screen.getByRole('link', { name: 'Ketahui Lagi' })).toHaveAttribute('href', '/tentang');
  });

  it('Button renders as a button when no href is given', () => {
    render(<Button>Klik</Button>);
    expect(screen.getByRole('button', { name: 'Klik' })).toBeInTheDocument();
  });

  it('Badge applies the color-specific classes', () => {
    render(<Badge color="green">Aktif</Badge>);
    expect(screen.getByText('Aktif').className).toMatch(/pkkc-green/);
  });
});
