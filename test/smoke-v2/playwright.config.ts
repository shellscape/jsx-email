/* eslint-disable import/no-default-export */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig, devices } from '@playwright/test';

// Note: https://playwright.dev/docs/test-configuration.

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

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
    command: 'bash ./scripts/ci-preview-start-smoke-v2.sh',
    cwd: repoRoot,
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
