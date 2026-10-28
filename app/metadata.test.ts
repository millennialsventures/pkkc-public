import { describe, it, expect } from 'vitest';
import { metadata as homeMetadata } from './page';
import { metadata as tentangMetadata } from './tentang/page';
import { metadata as organisasiMetadata } from './organisasi/page';
import { metadata as aktivitiMetadata } from './aktiviti/page';
import { metadata as aplikasiMetadata } from './aplikasi/page';

describe('per-page SEO metadata', () => {
  const pages = [
    ['/', homeMetadata, '/'],
    ['/tentang', tentangMetadata, '/tentang'],
    ['/organisasi', organisasiMetadata, '/organisasi'],
    ['/aktiviti', aktivitiMetadata, '/aktiviti'],
    ['/aplikasi', aplikasiMetadata, '/aplikasi'],
  ] as const;

  it('every page declares a canonical alternate matching its own route', () => {
    for (const [, metadata, route] of pages) {
      expect(metadata.alternates?.canonical).toBe(route);
    }
  });

  it('every sub-page declares its own distinct title, not the homepage title', () => {
    const subPages = pages.slice(1);
    const titles = subPages.map(([, metadata]) => metadata.title);
    expect(new Set(titles).size).toBe(subPages.length);
    for (const title of titles) {
      expect(title).not.toBe('PKKC - Persatuan Komuniti Kita Cybersouth');
    }
  });
});
