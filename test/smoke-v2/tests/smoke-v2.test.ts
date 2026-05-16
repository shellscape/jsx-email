/* eslint-disable no-await-in-loop, no-underscore-dangle */
import { readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import { join } from 'node:path';

import { expect, test, type Page } from '@playwright/test';

import { getHTML } from './helpers/html.js';

const timeout = { timeout: 15e3 };
const tempRoot = process.env.TMPDIR || os.tmpdir();
const defaultStatePath = join(tempRoot, 'jsx-email-smoke-v2.state');
const defaultPreviewBuildFilePath = join(tempRoot, 'jsx-email', 'preview', 'base.js');
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

const getTemplateButton = (page: Page, name: string) =>
  page.locator('#templates-window').getByRole('button', { name, exact: true });

const reloadPreview = async (page: Page) => {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await page.goto(getIndexUrl());
      return;
    } catch (error) {
      if (!String(error).includes('net::ERR_ABORTED')) {
        throw error;
      }

      await page.waitForTimeout(500);
    }
  }

  await page.goto(getIndexUrl());
};

test.describe.configure({ mode: 'serial' });

test('landing', async ({ page }) => {
  await page.goto(getIndexUrl());
  await expect(page).toHaveTitle(/JSX\s*email Preview/);

  await expect(page.getByRole('heading', { name: /JSX\s*email Preview/ })).toBeVisible();
  await expect(page.locator('#templates-window')).toBeVisible();
  await expect(getTemplateButton(page, 'Base')).toBeVisible();
});

test('templates', async ({ page }) => {
  test.setTimeout(3 * 60e3);

  for (const { buttonName, snapshotName } of templates) {
    await test.step(`template: ${snapshotName}`, async () => {
      await page.goto(getIndexUrl());
      await getTemplateButton(page, buttonName).click(timeout);

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
    await getTemplateButton(page, 'Base').click(timeout);

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
    // Navigating to a fresh URL ensures the latest compiled template HTML is reflected in `srcdoc`.
    await reloadPreview(page);
    await getTemplateButton(page, 'Base').click(timeout);
    await expect(iframeEl).toHaveCount(1, { timeout: 30e3 });
    await expect(iframeEl).toHaveAttribute('srcdoc', /Removed Content/, { timeout: 60e3 });

    const srcdoc = await iframeEl.getAttribute('srcdoc');
    const html = await getHTML(srcdoc || '');
    expect(html).toMatchSnapshot({ name: 'watcher.snap' });
  } finally {
    await writeFile(targetFilePath, contents, 'utf8');
  }
});
