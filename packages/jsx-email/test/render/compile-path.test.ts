import { resolve } from 'node:path';

import { resolveOutputPath } from '../../src/renderer/compile.js';

describe('resolveOutputPath', () => {
  it('returns absolute key as-is', () => {
    const outDir = '/tmp/jsx-email/build';
    const key = '/tmp/jsx-email/build/email-123.js';
    expect(resolveOutputPath(outDir, key)).toBe(key);
  });

  it('handles macOS keys without leading slash', () => {
    const outDir = '/private/var/folders/07/abc/T/jsx-email/build';
    const key = 'private/var/folders/07/abc/T/jsx-email/build/email-XYZ.js';
    expect(resolveOutputPath(outDir, key)).toBe(`/${key}`);
  });

  it('resolves relative keys against outDir', () => {
    const outDir = resolve(__dirname, '.compiled');
    const key = 'nested/email.js';
    expect(resolveOutputPath(outDir, key)).toBe(resolve(outDir, key));
  });
});
