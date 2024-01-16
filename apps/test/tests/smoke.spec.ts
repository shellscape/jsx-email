import { test, expect } from '@playwright/test';

import { getHTML } from './helpers/html';

// TODO: Wire up tests for:
// - Mobile View
// - JSX View
// - HTML View
// - Copy and Download buttons on code views

test('landing', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('JSX email');
  await page.getByText('JSX Email Preview');

  const landing = await page.locator('#landing');
  expect(await landing.innerHTML({ timeout: 1e4 })).toMatchSnapshot();

  await expect(page.locator('#link-Base')).toBeVisible();
});

const pages = [
  'Base',
  'Code',
  'Default-Export',
  'Default-Export-Props-Fn',
  'Env',
  'Local-Assets',
  'Preview-Props',
  'Preview-Props-Fn',
  'Preview-Props-Named',
  'Tailwind'
];

pages.forEach((name) => {
  test(`page: ${name}`, async ({ page }) => {
    const selector = `#link-${name}`;
    await page.goto('/');
    await expect(page.locator(selector)).toBeVisible();
    await page.click(selector);
    const iframe = await page.frameLocator('#preview-frame');
    const html = await getHTML(iframe.locator('html'), { deep: true });

    expect(html).toMatchSnapshot();
  });
});
