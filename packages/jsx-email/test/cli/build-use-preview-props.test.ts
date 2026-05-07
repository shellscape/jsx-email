import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { buildTemplates } from '../../src/cli/commands/build.js';

import { previewProps } from './fixtures/cli-preview-props-template.js';

const templatePath = resolve(__dirname, 'fixtures/cli-preview-props-template.tsx');
const outDir = resolve(__dirname, '.test-build-preview-props');

describe('cli build --use-preview-props', () => {
  it('uses template.previewProps when flag is set', async () => {
    (globalThis as any).__jsxEmailCliPreviewProps = undefined;
    await rm(outDir, { recursive: true, force: true });

    const [result] = await buildTemplates({
      buildOptions: {
        html: true,
        out: outDir,
        plain: false,
        props: JSON.stringify({ source: 'cli', test: 'robin' }),
        showStats: false,
        silent: true,
        usePreviewProps: true,
        writeToFile: false
      },
      targetPath: templatePath
    });

    const usedProps = (globalThis as any).__jsxEmailCliPreviewProps;

    expect(usedProps).toEqual(previewProps);
    expect(result.html).toContain('batman');
    expect(result.html).not.toContain('robin');
  });

  it('uses --props JSON when usePreviewProps is not set', async () => {
    (globalThis as any).__jsxEmailCliPreviewProps = undefined;
    await rm(outDir, { recursive: true, force: true });

    const props = { source: 'cli', test: 'robin' } as const;

    const [result] = await buildTemplates({
      buildOptions: {
        html: true,
        out: outDir,
        plain: false,
        props: JSON.stringify(props),
        showStats: false,
        silent: true,
        // `usePreviewProps` intentionally omitted
        writeToFile: false
      },
      targetPath: templatePath
    });

    const usedProps = (globalThis as any).__jsxEmailCliPreviewProps;

    expect(usedProps).toEqual(props);
    expect(result.html).toContain('robin');
    expect(result.html).not.toContain('batman');
  });
});
