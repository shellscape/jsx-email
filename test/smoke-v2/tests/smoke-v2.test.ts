/* eslint-disable no-await-in-loop, no-underscore-dangle */
import { open, readFile } from 'node:fs/promises';
import os from 'node:os';
import { join } from 'node:path';

import { expect, test, type Page } from '@playwright/test';

import { getHTML } from './helpers/html.js';

const timeout = { timeout: 15e3 };
const tempRoot = process.env.TMPDIR || os.tmpdir();
const defaultStatePath = join(tempRoot, 'jsx-email-smoke-v2.state');
const defaultPreviewBuildDirPath = join(tempRoot, 'jsx-email', 'preview');
const templates = [
  { buttonName: 'Base', snapshotName: 'Base' },
  { buttonName: 'Code', snapshotName: 'Code' },
  { buttonName: 'context', snapshotName: 'Context' },
  { buttonName: 'default-export-props-fn', snapshotName: 'Default-Export-Props-Fn' },
  { buttonName: 'Env', snapshotName: 'Env' },
  { buttonName: 'Issue174', snapshotName: 'Issue-174' },
  { buttonName: 'local-assets', snapshotName: 'Local-Assets' },
  { buttonName: 'Tailwind', snapshotName: 'Tailwind' }
];
let navigationSequence = 0;

type WatcherCase = {
  afterContent: string;
  beforeContent: string;
  previewBuildFileName: string;
  snapshotName?: string;
  stepName: string;
  templateSlug: string;
  targetRelativePath: string;
};

const watcherCases: WatcherCase[] = [
  {
    afterContent: 'Removed Content',
    beforeContent: 'Text Content',
    previewBuildFileName: 'base',
    snapshotName: 'watcher.snap',
    stepName: 'template edit: Base template source file',
    templateSlug: 'base',
    targetRelativePath: 'fixtures/templates/base.tsx'
  },
  {
    afterContent: 'robin',
    beforeContent: 'batman',
    previewBuildFileName: 'preview-props',
    stepName: 'template edit: subdirectory template source file',
    templateSlug: 'props-preview-props',
    targetRelativePath: 'fixtures/templates/props/preview-props.tsx'
  },
  {
    afterContent: 'component test updated',
    beforeContent: 'component test',
    previewBuildFileName: 'base',
    stepName: 'template rebuild: imported dependency file change',
    templateSlug: 'base',
    targetRelativePath: 'fixtures/components/text.tsx'
  }
];

const getSmokeProjectDir = async () => {
  const statePath = process.env.SMOKE_V2_STATE_PATH || defaultStatePath;
  return (await readFile(statePath, 'utf8')).trim();
};

const getIndexUrl = () => {
  const current = navigationSequence;
  navigationSequence += 1;
  return `/?smoke=${current}`;
};

const getTemplateButton = (page: Page, name: string) =>
  page.locator('#templates-window').getByRole('button', { name, exact: true });

const getTemplateUrl = (templateSlug: string) =>
  `${getIndexUrl()}#/${encodeURIComponent(templateSlug)}`;

const reloadPreview = async (page: Page, templateSlug: string) => {
  const templateUrl = getTemplateUrl(templateSlug);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await page.goto(templateUrl);
      return;
    } catch (error) {
      if (!String(error).includes('net::ERR_ABORTED')) {
        throw error;
      }

      await page.waitForTimeout(500);
    }
  }

  await page.goto(templateUrl);
};

const escapeForRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getPreviewBuildFilePath = (templateName: string) =>
  join(defaultPreviewBuildDirPath, `${templateName}.js`);

const waitForPreviewBuild = async (previewBuildFilePath: string, expectedContent: string) => {
  await expect
    .poll(
      async () => {
        try {
          return (await readFile(previewBuildFilePath, 'utf8')).includes(expectedContent);
        } catch {
          return false;
        }
      },
      {
        timeout: 60e3
      }
    )
    .toBe(true);
};

const replaceFileContents = async (filePath: string, content: string) => {
  const handle = await open(filePath, 'r+');

  try {
    await handle.writeFile(content, 'utf8');
    await handle.truncate(Buffer.byteLength(content, 'utf8'));
  } finally {
    await handle.close();
  }
};

test.describe.configure({ mode: 'serial' });

test('landing', async ({ page }) => {
  await page.goto(getIndexUrl());
  await expect(page).toHaveTitle(/JSX\s*email Preview/);

  await expect(page.getByRole('heading', { name: /JSX\s*email Preview/ })).toBeVisible();
  await expect(page.locator('#templates-window')).toBeVisible();
  await expect(getTemplateButton(page, 'Base')).toBeVisible();
});

test('templates', async ({ page }) => {
  test.setTimeout(3 * 60e3);

  for (const { buttonName, snapshotName } of templates) {
    await test.step(`template: ${snapshotName}`, async () => {
      await page.goto(getIndexUrl());
      await getTemplateButton(page, buttonName).click(timeout);

      // Reading the iframe srcdoc is more reliable than traversing into the frame in CI.
      const iframeEl = page.locator('iframe');
      await expect(iframeEl).toHaveCount(1, { timeout: 30e3 });
      await expect(iframeEl).toHaveAttribute('srcdoc', /\S/, { timeout: 30e3 });
      const srcdoc = await iframeEl.getAttribute('srcdoc');
      const html = await getHTML(srcdoc || '');

      expect(html).toMatchSnapshot({ name: `${snapshotName}.snap` });
    });
  }
});

test('watcher', async ({ page }) => {
  test.setTimeout(3 * 60e3);

  const smokeProjectDir = await getSmokeProjectDir();

  for (const watcherCase of watcherCases) {
    await test.step(watcherCase.stepName, async () => {
      const {
        afterContent,
        beforeContent,
        previewBuildFileName,
        snapshotName,
        templateSlug,
        targetRelativePath
      } = watcherCase;
      const targetFilePath = join(smokeProjectDir, targetRelativePath);
      const previewBuildFilePath = getPreviewBuildFilePath(previewBuildFileName);
      const contents = await readFile(targetFilePath, 'utf8');

      expect(contents).toContain(beforeContent);

      try {
        await page.goto(getTemplateUrl(templateSlug));

        const iframeEl = page.locator('iframe');
        await expect(iframeEl).toHaveCount(1, { timeout: 30e3 });
        await expect(iframeEl).toHaveAttribute(
          'srcdoc',
          new RegExp(escapeForRegExp(beforeContent)),
          {
            timeout: 30e3
          }
        );

        await replaceFileContents(targetFilePath, contents.replace(beforeContent, afterContent));
        await waitForPreviewBuild(previewBuildFilePath, afterContent);

        // When templates rebuild, Vite's HMR doesn't always update the iframe content deterministically.
        // Navigating to a fresh URL ensures the latest compiled template HTML is reflected in `srcdoc`.
        await reloadPreview(page, templateSlug);
        await expect(iframeEl).toHaveCount(1, { timeout: 30e3 });
        await expect(iframeEl).toHaveAttribute(
          'srcdoc',
          new RegExp(escapeForRegExp(afterContent)),
          {
            timeout: 60e3
          }
        );

        if (snapshotName) {
          const srcdoc = await iframeEl.getAttribute('srcdoc');
          const html = await getHTML(srcdoc || '');

          expect(html).toMatchSnapshot({ name: snapshotName });
        }
      } finally {
        await replaceFileContents(targetFilePath, contents);
        // Ensure restore-triggered rebuilds settle before the next watcher step mutates a file.
        // On Windows, rapid back-to-back edits can overlap in the watcher and destabilize preview.
        await waitForPreviewBuild(previewBuildFilePath, beforeContent);
      }
    });
  }
});
