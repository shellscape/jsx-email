/* eslint-disable import/no-default-export */
import { defineConfig, devices } from '@playwright/test';

// Note: https://playwright.dev/docs/test-configuration.

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  maxFailures: 1,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
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
    command: 'moon smoke-v2:start',
    env: {
      ENV_TEST_VALUE: 'joker'
    },
    reuseExistingServer: !process.env.CI,
    stderr: 'pipe',
    stdout: 'pipe',
    url: 'http://localhost:55420'
  },
  workers: process.env.CI ? 1 : void 0
});
