/* eslint-disable no-await-in-loop, no-underscore-dangle */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { test, expect } from '@playwright/test';

import { getHTML } from './helpers/html.js';

// TODO: Wire up tests for:
// - Mobile View
// - JSX View
// - HTML View
// - Copy and Download buttons on code views

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { error } = console;
const timeout = { timeout: 15e3 };
const propsButtonSel = '#Props-sidebar-tree > button';

test.describe.configure({ mode: 'serial' });

test('landing', async ({ page }) => {
  page.on('pageerror', (exception) => {
    console.log(`Uncaught exception: "${exception}"`);
    error(`Uncaught exception: "${exception}"`);
  });

  await page.goto('/');
  await expect(page).toHaveTitle('jsx-email Preview');

  page.getByText('jsx-email Preview');

  const landing = page.locator('#landing');

  expect(await landing.innerHTML({ timeout: 10e3 })).toMatchSnapshot();
  expect(page.locator('#Templates-link-Base')).toBeTruthy();
});

test('templates', async ({ page }) => {
  test.setTimeout(30e3);

  const allLinksSel = '#sidebar-tree a';

  await page.goto('/');
  await page.waitForSelector(propsButtonSel, timeout);

  const propsButton = page.locator(propsButtonSel);
  propsButton.click();

  await page.waitForSelector(allLinksSel, timeout);

  const links = page.locator(allLinksSel);

  for (const link of await links.all()) {
    const name = await link.getAttribute('data-name');

    await test.step(`page: ${name}`, async () => {
      await link.click(timeout);

      const iframe = await page.frameLocator('#preview-frame');
      const html = await getHTML(iframe.locator('html'), { deep: true });

      expect(html).toMatchSnapshot({ name: `${name}.snap` });
    });
  }
});

test('watcher', async ({ page }) => {
  test.setTimeout(120e3);

  await page.goto('/');
  await page.waitForSelector(propsButtonSel, timeout);

  const isLocal = process.env.CI !== 'true';
  const targetFilePath = isLocal
    ? join(__dirname, '../fixtures/templates/base.jsx')
    : '/home/runner/work/jsx-email/jsx-email/jsx-email-tests/smoke-test/fixtures/templates/base.jsx';

  console.log({ isLocal, targetFilePath });

  const contents = await readFile(targetFilePath, 'utf8');

  console.log({ contents });

  await writeFile(targetFilePath, contents.replace('Text Content', 'Removed Content'), 'utf8');

  console.log('after write:', await readFile(targetFilePath, 'utf8'));

  await page.waitForTimeout(45e3);
  await page.waitForSelector('#link-Local-Assets', timeout);

  page.locator('#link-Base').click();

  const iframe = await page.frameLocator('#preview-frame');
  const html = await getHTML(iframe.locator('html'), { deep: true });

  expect(html).toMatchSnapshot({ name: `watcher.snap` });

  // Note: so we don't have dirty files when running smoketest locally
  await writeFile(targetFilePath, contents.replace('Removed Content', 'Text Content'), 'utf8');
});
