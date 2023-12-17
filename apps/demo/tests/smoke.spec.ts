import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('JSX email');
});

test('renders email', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Airbnb-Review' }).click();
  await page.frameLocator('iframe').getByText("Here's what Joker wrote");
});
