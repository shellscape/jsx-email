import { resolve } from 'node:path';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { defaults, setConfig } from '../../src/config.js';
import { previewProps } from './fixtures/cli-preview-props-template.js';

const caniemailMock = vi.fn(() => ({
  issues: { errors: new Map(), warnings: new Map() },
  success: true
}));

vi.mock('caniemail', () => ({
  caniemail: caniemailMock,
  groupIssues: () => [],
  sortIssues: (groups: unknown[]) => groups
}));

const templatePath = resolve(__dirname, 'fixtures/cli-preview-props-template.tsx');

describe('cli check --use-preview-props', () => {
  afterEach(() => {
    setConfig(defaults);
  });

  it('builds using template.previewProps when flag is set', async () => {
    (globalThis as any).__jsxEmailCliPreviewProps = undefined;
    caniemailMock.mockClear();

    const { command } = await import('../../src/cli/commands/check.js');

    const result = await command({ usePreviewProps: true } as any, [templatePath]);

    expect(result).toBe(true);

    const usedProps = (globalThis as any).__jsxEmailCliPreviewProps;
    expect(usedProps).toEqual(previewProps);

    expect(caniemailMock).toHaveBeenCalledTimes(1);
    const [{ html }] = caniemailMock.mock.calls[0] as [{ html: string }];
    expect(html).toContain('batman');
  });

  it('uses check.emailClients from config when the flag is omitted', async () => {
    (globalThis as any).__jsxEmailCliPreviewProps = undefined;
    setConfig({ ...defaults, check: { emailClients: ['gmx.*'] } });
    caniemailMock.mockClear();

    const { command } = await import('../../src/cli/commands/check.js');

    const result = await command({ usePreviewProps: true } as any, [templatePath]);

    expect(result).toBe(true);
    expect(caniemailMock).toHaveBeenCalledWith(expect.objectContaining({ clients: ['gmx.*'] }));
  });

  it('prefers --email-clients over check.emailClients from config', async () => {
    setConfig({ ...defaults, check: { emailClients: ['gmx.*'] } });
    caniemailMock.mockClear();

    const { command } = await import('../../src/cli/commands/check.js');

    const result = await command(
      { emailClients: 'gmail.*,outlook.*', usePreviewProps: true } as any,
      [templatePath]
    );

    expect(result).toBe(true);
    expect(caniemailMock).toHaveBeenCalledWith(
      expect.objectContaining({ clients: ['gmail.*', 'outlook.*'] })
    );
  });
});
