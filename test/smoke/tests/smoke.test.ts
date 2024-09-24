/* eslint-disable no-await-in-loop */

import { test, expect } from '@playwright/test';

import { getHTML } from './helpers/html.js';

// TODO: Wire up tests for:
// - Mobile View
// - JSX View
// - HTML View
// - Copy and Download buttons on code views

const { error } = console;
const timeout = { timeout: 15e3 };

test('landing', async ({ page }) => {
  page.on('pageerror', (exception) => {
    console.log(`Uncaught exception: "${exception}"`);
    error(`Uncaught exception: "${exception}"`);
  });

  await page.goto('/');
  await expect(page).toHaveTitle('JSX email');

  page.getByText('JSX Email Preview');

  const landing = page.locator('#landing');

  expect(await landing.innerHTML({ timeout: 10e3 })).toMatchSnapshot();
  expect(page.locator('#Templates-link-Base')).toBeTruthy();
});

test('templates', async ({ page }) => {
  test.setTimeout(30e3);

  const allLinksSel = '#sidebar-tree a';
  const templatesButtonSel = '#Templates-sidebar-tree > button';
  const propsButtonSel = '#Props-sidebar-tree > button';

  await page.goto('/');
  await page.waitForSelector(templatesButtonSel, timeout);

  const templateButton = page.locator(templatesButtonSel);
  templateButton.click();

  await page.waitForSelector(templatesButtonSel, timeout);

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
