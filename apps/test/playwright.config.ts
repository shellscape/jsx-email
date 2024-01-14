/* eslint-disable import/no-default-export */
import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  maxFailures: 1,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] }
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] }
    // }
  ],
  reporter: 'list',
  retries: process.env.CI ? 2 : 0,
  snapshotPathTemplate:
    '{testDir}/.snapshots/{testFileDir}/{testFileName}-{arg}{-projectName}{ext}',
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:55420',
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'moon app-test:dev',
    reuseExistingServer: !process.env.CI,
    url: 'http://localhost:55420'
  },
  workers: process.env.CI ? 1 : undefined
});
