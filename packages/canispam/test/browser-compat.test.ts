import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const sourceRoot = join(dirname(fileURLToPath(import.meta.url)), '../src');
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
