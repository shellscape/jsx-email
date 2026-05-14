import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const sourceRoot = new URL('../src', import.meta.url).pathname;
const bannedImportPattern =
  /from ['"]node:|from ['"](node:)?(fs|path|process|crypto|util|dns|buffer)['"]/;

const readSourceFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return readSourceFiles(path);
    return path.endsWith('.ts') ? [path] : [];
  });

describe('browser compatibility', () => {
  it('does not import Node built-ins from package source', () => {
    const offenders = readSourceFiles(sourceRoot).filter((file) =>
      bannedImportPattern.test(readFileSync(file, 'utf8'))
    );

    expect(offenders).toEqual([]);
  });
});
