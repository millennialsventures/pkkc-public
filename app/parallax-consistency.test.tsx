import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Home from './page';
import TentangPage from './tentang/page';
import OrganisasiPage from './organisasi/page';
import AktivitiPage from './aktiviti/page';
import AplikasiPage from './aplikasi/page';

describe('parallax blob motion pattern is consistent across all 5 pages', () => {
  it.each([
    ['/', Home],
    ['/tentang', TentangPage],
    ['/organisasi', OrganisasiPage],
    ['/aktiviti', AktivitiPage],
    ['/aplikasi', AplikasiPage],
  ] as const)('%s renders ParallaxBlobs in its hero section', (_route, Page) => {
    const { container } = render(<Page />);
    expect(container.querySelector('[data-testid="parallax-blobs"]')).not.toBeNull();
  });
});
