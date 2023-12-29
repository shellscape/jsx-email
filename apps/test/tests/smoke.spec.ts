import { test, expect } from '@playwright/test';

test('landing', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('JSX email');
  await page.getByText('JSX Email Preview');

  const landing = await page.locator('#landing');
  expect(await landing.innerHTML({ timeout: 1e4 })).toMatchSnapshot();
});

// test('renders email', async ({ page }) => {
//   await page.goto('/');

//   await page.getByRole('link', { name: 'Airbnb-Review' }).click();
//   await page.frameLocator('iframe').getByText("Here's what Joker wrote");
// });
