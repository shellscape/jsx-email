import { resolve } from 'node:path';

import { _resolveOutputPath } from '../../src/renderer/compile.js';

describe('_resolveOutputPath', () => {
  it('returns absolute key as-is', () => {
    const outDir = '/tmp/jsx-email/build';
    const key = '/tmp/jsx-email/build/email-123.js';
    expect(_resolveOutputPath(outDir, key)).toBe(key);
  });

  it('handles macOS keys without leading slash', () => {
    const outDir = '/private/var/folders/07/abc/T/jsx-email/build';
    const key = 'private/var/folders/07/abc/T/jsx-email/build/email-XYZ.js';
    expect(_resolveOutputPath(outDir, key)).toBe('/' + key);
  });

  it('resolves relative keys against outDir', () => {
    const outDir = resolve(__dirname, '.compiled');
    const key = 'nested/email.js';
    expect(_resolveOutputPath(outDir, key)).toBe(resolve(outDir, key));
  });
});
