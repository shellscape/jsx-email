/* eslint-disable import/no-default-export */
import { readFileSync } from 'node:fs';
import os from 'node:os';
import { join } from 'node:path';

import { defineConfig, devices } from '@playwright/test';

// Note: https://playwright.dev/docs/test-configuration.

const defaultStatePath = join(os.tmpdir(), 'jsx-email-smoke-v2.state');
const statePath = process.env.SMOKE_V2_STATE_PATH || defaultStatePath;
const smokeProjectDir = readFileSync(statePath, 'utf8').trim();
const emailBin =
  process.platform === 'win32' ? 'node_modules/.bin/email.cmd' : './node_modules/.bin/email';

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
    command: `${emailBin} preview fixtures/templates --no-open --port 55420`,
    cwd: smokeProjectDir,
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
