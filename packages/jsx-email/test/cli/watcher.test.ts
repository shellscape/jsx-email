import { access, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import type { BuildTempatesResult } from '../../src/cli/commands/build.js';
import {
  isChildPath,
  isNodeModulePath,
  normalizeWatcherPath,
  removeDeletedFile
} from '../../src/cli/watcher.js';

const fileExists = (path: string) =>
  access(path).then(
    () => true,
    () => false
  );

describe('watcher path helpers', () => {
  it('detects POSIX node_modules paths', () => {
    expect(isNodeModulePath('/repo/node_modules/pkg/file.js')).toBe(true);
  });

  it('detects Windows node_modules paths', () => {
    expect(isNodeModulePath('C:\\repo\\node_modules\\pkg\\file.js')).toBe(true);
  });

  it('does not match node_modules as part of another path segment', () => {
    expect(isNodeModulePath('/repo/not_node_modules/pkg/file.js')).toBe(false);
  });

  it('normalizes Windows drive paths for watcher lookups', () => {
    expect(normalizeWatcherPath('C:\\Repo\\Templates\\Base.tsx')).toBe(
      'c:/repo/templates/base.tsx'
    );
  });

  it('normalizes Windows UNC paths for watcher lookups', () => {
    expect(normalizeWatcherPath('\\\\Server\\Share\\Templates\\Base.tsx')).toBe(
      '//server/share/templates/base.tsx'
    );
  });

  it('preserves POSIX path casing for watcher lookups', () => {
    expect(normalizeWatcherPath('/Repo/Templates/Base.tsx')).toBe('/Repo/Templates/Base.tsx');
  });

  it('detects child paths', () => {
    expect(isChildPath('/repo/templates', '/repo/templates/nested')).toBe(true);
  });

  it('does not treat sibling directories that start with two dots as child paths', () => {
    expect(isChildPath('/repo/templates', '/repo/..templates')).toBe(false);
  });

  it('does not treat Windows cross-drive paths as child paths', () => {
    expect(isChildPath('C:\\repo\\templates', 'D:\\repo\\templates\\nested')).toBe(false);
  });

  it('removes deleted files by normalized watcher path and cleans artifacts', async () => {
    const tempDir = await mkdtemp(join(os.tmpdir(), 'jsx-email-watcher-test-'));
    const compiledPath = join(tempDir, 'base.js');
    const writePathBase = join(tempDir, 'preview-base');
    const previewDataPath = `${writePathBase}.js`;
    const fileName = 'C:\\Repo\\Templates\\Base.tsx';
    const files = [
      {
        compiledPath,
        fileName,
        html: '',
        plainText: '',
        sourceFile: fileName,
        templateName: 'Base',
        writePathBase
      }
    ] satisfies BuildTempatesResult[];
    const validFiles = [normalizeWatcherPath(fileName)];

    await writeFile(compiledPath, '');
    await writeFile(previewDataPath, '');

    try {
      await expect(
        removeDeletedFile({
          files,
          path: 'c:/repo/templates/base.tsx',
          validFiles
        })
      ).resolves.toBe(true);

      expect(files).toEqual([]);
      expect(validFiles).toEqual([]);
      await expect(fileExists(compiledPath)).resolves.toBe(false);
      await expect(fileExists(previewDataPath)).resolves.toBe(false);
    } finally {
      await rm(tempDir, { force: true, recursive: true });
    }
  });
});
