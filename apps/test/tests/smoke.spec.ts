/* eslint-disable no-await-in-loop */

import { test, expect } from '@playwright/test';

import { getHTML } from './helpers/html';

// TODO: Wire up tests for:
// - Mobile View
// - JSX View
// - HTML View
// - Copy and Download buttons on code views

const timeout = { timeout: 15e3 };

test('landing', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('JSX Email');
  await page.getByText('JSX Email Preview');

  const landing = await page.locator('#landing');
  expect(await landing.innerHTML({ timeout: 1e4 })).toMatchSnapshot();

  await expect(page.locator('#link-Base')).toBeVisible();
});

test('templates', async ({ page }) => {
  test.setTimeout(30e3);

  const selector = '#sidebar-tree a';

  await page.goto('/');
  await page.waitForSelector(selector, timeout);

  const links = await page.locator(selector);

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
