import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { isWindows } from 'std-env';

import { compile } from '../../src/renderer/compile.js';

describe('compile', () => {
  it('returns an importable path for nested entrypoints', async () => {
    const tmpRoot = await mkdtemp(join(process.cwd(), '.tmp-jsx-email-compile-'));

    try {
      const entryDir = join(tmpRoot, 'templates', 'nested');
      await mkdir(entryDir, { recursive: true });

      const entryPoint = join(entryDir, 'template.tsx');
      await writeFile(
        entryPoint,
        `export const Template = ({ name }: { name: string }) => <h1>Hello {name}</h1>;\n`,
        'utf8'
      );

      const outDir = join(tmpRoot, 'out');
      const results = await compile({ files: [entryPoint], outDir });
      const result = results[0];

      if (!result) throw new Error('Expected compile to return at least one output');

      const compiledImportPath = isWindows ? pathToFileURL(result.path).toString() : result.path;

      const mod = await import(compiledImportPath);
      expect(typeof mod.Template).toBe('function');
    } finally {
      await rm(tmpRoot, { recursive: true, force: true });
    }
  });
});
