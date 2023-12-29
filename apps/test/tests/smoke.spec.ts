import { test, expect } from '@playwright/test';

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
});

const pages = ['Base', 'Code', 'Local-Assets', 'Tailwind'];

pages.forEach((name) => {
  test(`page: ${name}`, async ({ page }) => {
    await page.locator(`a[href="/${name}"]`).click();
    const body = await page.frameLocator('iframe').locator('body');
    expect(await body.innerHTML({ timeout: 1e4 })).toMatchSnapshot();
  });
});
