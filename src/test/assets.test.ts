import { describe, it, expect } from 'vitest';
import { statSync } from 'node:fs';
import { join } from 'node:path';

describe('shipped image weight', () => {
  it('public/logo.png is reasonably small for a 40px nav logo', () => {
    const { size } = statSync(join(process.cwd(), 'public/logo.png'));
    expect(size).toBeLessThan(50 * 1024);
  });

  it('app/icon.png favicon is reasonably small', () => {
    const { size } = statSync(join(process.cwd(), 'app/icon.png'));
    expect(size).toBeLessThan(50 * 1024);
  });
});
