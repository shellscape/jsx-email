/* eslint-disable no-await-in-loop, no-underscore-dangle */
import { readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import { join } from 'node:path';

import { expect, test } from '@playwright/test';

import { getHTML } from './helpers/html.js';

const timeout = { timeout: 15e3 };
const templateLinkSel = '#sidebar-tree a[data-name]';
const defaultStatePath = join(os.tmpdir(), 'jsx-email-smoke-v2.state');

const getSmokeProjectDir = async () => {
  const statePath = process.env.SMOKE_V2_STATE_PATH || defaultStatePath;
  return (await readFile(statePath, 'utf8')).trim();
};

test.describe.configure({ mode: 'serial' });

test('landing', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('jsx-email Preview');

  await expect(page.getByRole('heading', { name: 'Select a Template' })).toBeVisible();
  await expect(page.locator(templateLinkSel).first()).toBeVisible();
});

test('templates', async ({ page }) => {
  test.setTimeout(30e3);

  await page.goto('/');

  await page.waitForSelector(templateLinkSel, timeout);

  const links = page.locator(templateLinkSel);

  for (const link of await links.all()) {
    const name = await link.getAttribute('data-name');
    const safeName = (name || 'unknown').replace(/\s+/g, '-');

    await test.step(`template: ${name}`, async () => {
      await link.click(timeout);

      const iframe = await page.frameLocator('iframe');
      const html = await getHTML(iframe.locator('html'), { deep: true });

      expect(html).toMatchSnapshot({ name: `${safeName}.snap` });
    });
  }
});

test('watcher', async ({ page }) => {
  test.setTimeout(90e3);

  const smokeProjectDir = await getSmokeProjectDir();
  const targetFilePath = join(smokeProjectDir, 'fixtures/templates/base.jsx');
  const contents = await readFile(targetFilePath, 'utf8');

  try {
    await page.goto('/');
    await page.waitForSelector('#link-Base', timeout);
    await page.locator('#link-Base').click(timeout);

    const iframe = page.frameLocator('iframe');

    await expect(iframe.locator('body')).toContainText('Text Content', { timeout: 30e3 });

    await writeFile(targetFilePath, contents.replace('Text Content', 'Removed Content'), 'utf8');

    await expect(iframe.locator('body')).toContainText('Removed Content', { timeout: 60e3 });

    const html = await getHTML(iframe.locator('html'), { deep: true });
    expect(html).toMatchSnapshot({ name: 'watcher.snap' });
  } finally {
    await writeFile(targetFilePath, contents, 'utf8');
  }
});
