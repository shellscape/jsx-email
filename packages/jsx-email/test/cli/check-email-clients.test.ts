import { resolve } from 'node:path';

import { describe, expect, it, vi } from 'vitest';

const caniemailMock = vi.fn(() => ({
  issues: { errors: new Map(), warnings: undefined },
  success: true
}));

vi.mock('caniemail', () => ({
  caniemail: caniemailMock,
  groupIssues: () => [],
  sortIssues: (groups: unknown[]) => groups
}));

const templatePath = resolve(__dirname, 'fixtures/cli-preview-props-template.tsx');

describe('cli check --email-clients', () => {
  it('passes the provided clients list to caniemail', async () => {
    caniemailMock.mockClear();

    const { command } = await import('../../src/cli/commands/check.js');

    const result = await command({ emailClients: 'gmail.desktop-webmail,outlook.windows' } as any, [
      templatePath
    ]);

    expect(result).toBe(true);
    expect(caniemailMock).toHaveBeenCalledTimes(1);

    const [{ clients }] = caniemailMock.mock.calls[0] as [{ clients: string[] }];
    expect(clients).toEqual(['gmail.desktop-webmail', 'outlook.windows']);
  });
});
