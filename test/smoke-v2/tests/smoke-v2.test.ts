/* eslint-disable no-await-in-loop, no-underscore-dangle */
import { readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import { join } from 'node:path';

import { expect, test } from '@playwright/test';

import { getHTML } from './helpers/html.js';

const timeout = { timeout: 15e3 };
const defaultStatePath = join(os.tmpdir(), 'jsx-email-smoke-v2.state');
const defaultPreviewBuildFilePath = join(os.tmpdir(), 'jsx-email', 'preview', 'base.js');
const templates = [
  { buttonName: 'Base', snapshotName: 'Base' },
  { buttonName: 'Code', snapshotName: 'Code' },
  { buttonName: 'context', snapshotName: 'Context' },
  { buttonName: 'default-export-props-fn', snapshotName: 'Default-Export-Props-Fn' },
  { buttonName: 'Env', snapshotName: 'Env' },
  { buttonName: 'Issue174', snapshotName: 'Issue-174' },
  { buttonName: 'local-assets', snapshotName: 'Local-Assets' },
  { buttonName: 'Tailwind', snapshotName: 'Tailwind' }
];
let navigationSequence = 0;

const getSmokeProjectDir = async () => {
  const statePath = process.env.SMOKE_V2_STATE_PATH || defaultStatePath;
  return (await readFile(statePath, 'utf8')).trim();
};

const getIndexUrl = () => {
  const current = navigationSequence;
  navigationSequence += 1;
  return `/?smoke=${current}`;
};

test.describe.configure({ mode: 'serial' });

test('landing', async ({ page }) => {
  await page.goto(getIndexUrl());
  await expect(page).toHaveTitle('jsx-email Canvas Preview');

  await expect(page.getByRole('heading', { name: 'jsx-email Preview' })).toBeVisible();
  await expect(page.locator('#templates-window')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Base' })).toBeVisible();
});

test('templates', async ({ page }) => {
  test.setTimeout(3 * 60e3);

  for (const { buttonName, snapshotName } of templates) {
    await test.step(`template: ${snapshotName}`, async () => {
      await page.goto(getIndexUrl());
      await page.getByRole('button', { name: buttonName }).click(timeout);

      // Reading the iframe srcdoc is more reliable than traversing into the frame in CI.
      const iframeEl = page.locator('iframe');
      await expect(iframeEl).toHaveCount(1, { timeout: 30e3 });
      await expect(iframeEl).toHaveAttribute('srcdoc', /\S/, { timeout: 30e3 });
      const srcdoc = await iframeEl.getAttribute('srcdoc');
      const html = await getHTML(srcdoc || '');

      expect(html).toMatchSnapshot({ name: `${snapshotName}.snap` });
    });
  }
});

test('watcher', async ({ page }) => {
  test.setTimeout(90e3);

  const smokeProjectDir = await getSmokeProjectDir();
  const targetFilePath = join(smokeProjectDir, 'fixtures/templates/base.tsx');
  const contents = await readFile(targetFilePath, 'utf8');

  try {
    await page.goto(getIndexUrl());
    await page.getByRole('button', { name: 'Base' }).click(timeout);

    const iframeEl = page.locator('iframe');
    await expect(iframeEl).toHaveCount(1, { timeout: 30e3 });
    await expect(iframeEl).toHaveAttribute('srcdoc', /Text Content/, { timeout: 30e3 });

    await writeFile(targetFilePath, contents.replace('Text Content', 'Removed Content'), 'utf8');

    await expect
      .poll(
        async () =>
          (await readFile(defaultPreviewBuildFilePath, 'utf8')).includes('Removed Content'),
        {
          timeout: 60e3
        }
      )
      .toBe(true);

    // When templates rebuild, Vite's HMR doesn't always update the iframe content deterministically.
    // Reloading ensures the latest compiled template HTML is reflected in `srcdoc`.
    await page.reload();
    await page.getByRole('button', { name: 'Base' }).click(timeout);
    await expect(iframeEl).toHaveCount(1, { timeout: 30e3 });
    await expect(iframeEl).toHaveAttribute('srcdoc', /Removed Content/, { timeout: 60e3 });

    const srcdoc = await iframeEl.getAttribute('srcdoc');
    const html = await getHTML(srcdoc || '');
    expect(html).toMatchSnapshot({ name: 'watcher.snap' });
  } finally {
    await writeFile(targetFilePath, contents, 'utf8');
  }
});
