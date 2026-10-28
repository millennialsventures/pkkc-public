import { describe, it, expect } from 'vitest';
import robots from './robots';
import sitemap from './sitemap';

describe('SEO config', () => {
  it('robots allows all and points to the canonical sitemap', () => {
    const result = robots();
    expect(result.sitemap).toBe('https://pkkc.org.my/sitemap.xml');
  });

  it('sitemap lists exactly the 5 routes under the canonical domain', () => {
    const result = sitemap();
    const urls = result.map((entry) => entry.url).sort();
    expect(urls).toEqual([
      'https://pkkc.org.my',
      'https://pkkc.org.my/aktiviti',
      'https://pkkc.org.my/aplikasi',
      'https://pkkc.org.my/organisasi',
      'https://pkkc.org.my/tentang',
    ].sort());
  });
});
