import { resolve } from 'node:path';

import { resolveOutputPath } from '../../src/renderer/compile.js';

describe('resolveOutputPath', () => {
  it('returns absolute testPath as-is', () => {
    const outDir = '/tmp/jsx-email/build';
    const testPath = '/tmp/jsx-email/build/email-123.js';
    const expected = resolveOutputPath(outDir, testPath);
    const actual = testPath;
    expect(expected).toEqual(actual);
  });

  it('handles macOS testPaths without leading slash', () => {
    const outDir = '/private/var/folders/07/abc/T/jsx-email/build';
    const testPath = 'private/var/folders/07/abc/T/jsx-email/build/email-XYZ.js';
    const expected = resolveOutputPath(outDir, testPath);
    const actual = `/${testPath}`;
    expect(expected).toEqual(actual);
  });

  it('resolves relative testPaths against CWD (esbuild behavior)', () => {
    const outDir = resolve(__dirname, '.compiled');
    const testPath = 'nested/email.js';
    const expected = resolveOutputPath(outDir, testPath, process.cwd());
    const actual = resolve(process.cwd(), testPath);
    expect(expected).toEqual(actual);
  });

  it('does not duplicate outDir when testPath already includes it and outDir is relative', () => {
    const outDir = 'dist';
    const testPath = 'dist/email.js';
    const expected = resolveOutputPath(outDir, testPath, process.cwd());
    const actual = resolve(process.cwd(), testPath);
    expect(expected).toEqual(actual);
  });

  it('treats Windows drive-letter testPaths as absolute', () => {
    const outDir = 'dist';
    const testPath = 'C:/tmp/jsx-email/build/email.js';
    const expected = resolveOutputPath(outDir, testPath, process.cwd());
    const actual = testPath;
    expect(expected).toEqual(actual);
  });
});
