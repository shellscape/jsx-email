import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import { join } from 'node:path';

import stripAnsi from 'strip-ansi';

import { build } from '../../src/cli/commands/build.js';
import { command, formatIssue, formatNotes, help } from '../../src/cli/commands/check.js';

vi.mock('caniemail', () => ({
  caniemail: vi.fn(() => ({ success: true, issues: {} })),
  groupIssues: vi.fn(() => []),
  sortIssues: vi.fn(() => [])
}));

vi.mock('../../src/cli/commands/build.js', async () => {
  const actual = (await vi.importActual('../../src/cli/commands/build.js')) as Record<
    string,
    unknown
  >;

  return {
    ...actual,
    buildTemplates: vi.fn(async ({ targetPath, buildOptions }: any) => [
      {
        fileName: targetPath,
        html: '<html></html>'
      }
    ])
  };
});

describe('email check', async () => {
  test('help includes --use-preview-props', async () => {
    expect(stripAnsi(help)).toContain('--use-preview-props');
  });

  test('formats notes and issues without placeholder/debug output', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const notesText = stripAnsi(formatNotes(['1. First', '2. Second'], '          '));
    expect(notesText).toContain('Notes:');
    expect(notesText).toContain('1. First');
    expect(notesText).toContain('2. Second');
    expect(notesText).not.toContain('asshole');
    expect(logSpy).not.toHaveBeenCalled();

    const formatted = stripAnsi(
      formatIssue({
        issue: {
          notes: ['First', 'Second'],
          position: { start: { line: 3, column: 5 } },
          support: 'partial',
          title: 'Some issue'
        },
        clients: ['gmail.ios', 'outlook.windows']
      } as any)
    );

    expect(formatted).toContain('warn');
    expect(formatted).toContain('3:5');
    expect(formatted).toContain('Some issue:');
    expect(formatted).toContain('Notes:');
    expect(formatted).toContain('1. First');
    expect(formatted).toContain('2. Second');
    expect(formatted).toContain('gmail.ios');
    expect(formatted).toContain('outlook.windows');

    logSpy.mockRestore();
  });

  test('passes --use-preview-props through to buildTemplates', async () => {
    const dir = await mkdtemp(join(os.tmpdir(), 'jsx-email-check-'));
    const templatePath = join(dir, 'template.tsx');
    await writeFile(templatePath, 'export const Template = () => null;', 'utf8');

    const { buildTemplates } = await import('../../src/cli/commands/build.js');

    await command({ usePreviewProps: true } as any, [templatePath]);

    expect(buildTemplates).toHaveBeenCalledWith({
      buildOptions: { showStats: false, usePreviewProps: true, writeToFile: false },
      targetPath: templatePath
    });
  });

  test('build uses previewProps when usePreviewProps is enabled', async () => {
    const dir = await mkdtemp(join(process.cwd(), '.tmp-jsx-email-preview-props-'));
    const out = join(dir, 'out');
    const modulePath = join(dir, 'template.mjs');

    await writeFile(
      modulePath,
      [
        "import React from 'react';",
        "export const previewProps = { name: 'Bruce' };",
        "export const Template = (props) => React.createElement('p', null, props.name ?? 'missing');",
        ''
      ].join('\n'),
      'utf8'
    );

    const withPreviewProps = await build({
      argv: { out, usePreviewProps: true, writeToFile: false } as any,
      path: modulePath,
      sourceFile: modulePath
    });

    const withoutPreviewProps = await build({
      argv: { out, props: '{"name":"Clark"}', writeToFile: false } as any,
      path: modulePath,
      sourceFile: modulePath
    });

    expect(withPreviewProps.html).toContain('Bruce');
    expect(withoutPreviewProps.html).toContain('Clark');

    await rm(dir, { force: true, recursive: true });
  });
});
