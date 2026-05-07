import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { chromium, type Page } from 'playwright';
import sharp from 'sharp';

const canvasUrl = process.env.PREVIEW_CANVAS_URL || 'http://localhost:8788';
const baselineUrl = process.env.PREVIEW_BASELINE_URL || 'http://localhost:8787/preview.html';
const outDir = process.env.PREVIEW_AUDIT_DIR || '/tmp/preview-canvas-audit';
const viewport = { height: 900, width: 1280 };

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport });

  const baseline = await context.newPage();
  const canvas = await context.newPage();
  await baseline.goto(`${baselineUrl}?audit=${Date.now()}`, { waitUntil: 'networkidle' });
  await canvas.goto(`${canvasUrl}?audit=${Date.now()}`, { waitUntil: 'networkidle' });
  await baseline.waitForTimeout(600);
  await canvas.waitForTimeout(600);

  const states: AuditState[] = [
    {
      name: 'empty',
      prepare: async () => undefined
    },
    {
      name: 'selected-preview',
      prepare: async () => {
        await baseline.getByRole('button', { exact: true, name: 'apple-receipt.tsx' }).click();
        await canvas.getByRole('button', { exact: true, name: 'Apple Receipt' }).click();
        await baseline.waitForTimeout(900);
        await canvas.waitForTimeout(900);
      }
    },
    {
      name: 'lab-expanded',
      prepare: async () => {
        await baseline.getByRole('button', { name: 'Expand tool panel' }).click();
        await canvas.getByRole('button', { name: 'Expand tool panel' }).click();
        await baseline.waitForTimeout(220);
        await canvas.waitForTimeout(220);
      }
    },
    {
      name: 'code-tab',
      prepare: async () => {
        await baseline.getByRole('button', { name: 'Collapse tool panel' }).click();
        await canvas.getByRole('button', { name: 'Collapse tool panel' }).click();
        await baseline.waitForTimeout(220);
        await canvas.waitForTimeout(220);
        await baseline.getByRole('tab', { name: 'JSX' }).click();
        await canvas.getByRole('tab', { name: 'JSX' }).click();
        await baseline.waitForTimeout(500);
        await canvas.waitForTimeout(500);
      }
    }
  ];

  const report: Record<string, unknown> = {};
  for (const state of states) {
    await state.prepare();
    report[state.name] = {
      baseline: await inspectPage(baseline),
      canvas: await inspectPage(canvas)
    };
    await capturePair(state.name, baseline, canvas);
  }

  await writeFile(path.join(outDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ outDir, states: states.map((state) => state.name) }, null, 2));
  await browser.close();
}

async function capturePair(name: string, baseline: Page, canvas: Page) {
  const baselinePath = path.join(outDir, `${name}-baseline.png`);
  const canvasPath = path.join(outDir, `${name}-canvas.png`);
  const diffPath = path.join(outDir, `${name}-diff.png`);
  const sideBySidePath = path.join(outDir, `${name}-side-by-side.png`);

  await baseline.screenshot({ fullPage: false, path: baselinePath });
  await canvas.screenshot({ fullPage: false, path: canvasPath });

  const baselineRaw = await sharp(baselinePath).ensureAlpha().raw().toBuffer();
  const canvasRaw = await sharp(canvasPath).ensureAlpha().raw().toBuffer();
  const diff = Buffer.alloc(baselineRaw.length);

  for (let index = 0; index < baselineRaw.length; index += 4) {
    const delta =
      Math.abs(baselineRaw[index]! - canvasRaw[index]!) +
      Math.abs(baselineRaw[index + 1]! - canvasRaw[index + 1]!) +
      Math.abs(baselineRaw[index + 2]! - canvasRaw[index + 2]!);
    diff[index] = delta > 30 ? 255 : 255;
    diff[index + 1] = delta > 30 ? 0 : 255;
    diff[index + 2] = delta > 30 ? 80 : 255;
    diff[index + 3] = 255;
  }

  await sharp(diff, { raw: { channels: 4, height: viewport.height, width: viewport.width } }).png().toFile(diffPath);
  await sharp({
    create: {
      background: '#ffffff',
      channels: 4,
      height: viewport.height,
      width: viewport.width * 2
    }
  })
    .composite([
      { input: baselinePath, left: 0, top: 0 },
      { input: canvasPath, left: viewport.width, top: 0 }
    ])
    .png()
    .toFile(sideBySidePath);
}

async function inspectPage(page: Page) {
  return page.evaluate(`(() => {
    const readRect = (selector) => {
      const box = document.querySelector(selector)?.getBoundingClientRect();
      if (!box) return null;
      return {
        bottom: Math.round(box.bottom),
        height: Math.round(box.height),
        left: Math.round(box.left),
        right: Math.round(box.right),
        top: Math.round(box.top),
        width: Math.round(box.width)
      };
    };
    const readStyle = (selector) => {
      const node = document.querySelector(selector);
      if (!node) return null;
      const style = window.getComputedStyle(node);
      return {
        backgroundColor: style.backgroundColor,
        borderColor: style.borderColor,
        boxShadow: style.boxShadow,
        color: style.color,
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight
      };
    };

    return {
      activeTab: document.querySelector('.card-tab.is-active')?.textContent?.trim(),
      card: readRect('main .ring-2'),
      cardPanel: readRect('main .ring-2 .app-panel'),
      cardTabs: readRect('.card-tabs'),
      codePane: readRect('.card-code'),
      emptyInner: readRect('main h2 + p') || readRect('main a[href*="docs/introduction"]'),
      emptyInlineCodeStyle: readStyle('.docs-inline-code'),
      emptyOuter: readRect('main > div > div'),
      emptyOuterStyle: readStyle('main > div > div'),
      emptyPanel: readRect('main h2')?.top
        ? (() => {
            const heading = document.querySelector('main h2');
            const panel = heading?.closest('div');
            const box = panel?.getBoundingClientRect();
            if (!box) return null;
            return {
              bottom: Math.round(box.bottom),
              height: Math.round(box.height),
              left: Math.round(box.left),
              right: Math.round(box.right),
              top: Math.round(box.top),
              width: Math.round(box.width)
            };
          })()
        : null,
      emptyPanelStyle: readStyle('main h2')?.fontFamily ? readStyle('main h2') : null,
      fileCount: [...document.querySelectorAll('#templates-window span')]
        .map((node) => node.textContent?.trim())
        .find((text) => text?.endsWith('files')),
      fileCountBadge: readRect('#templates-window > div:first-child > div:last-child > span'),
      fileCollapseButton: readRect('#templates-window .panel-collapse-button'),
      fileCollapseIcon: (() => {
        const node = document.querySelector('#templates-window .panel-collapse-button svg, #templates-window .panel-collapse-button i');
        const box = node?.getBoundingClientRect();
        if (!box) return null;
        const style = window.getComputedStyle(node);
        return {
          bottom: Math.round(box.bottom),
          color: style.color,
          fontSize: style.fontSize,
          height: Math.round(box.height),
          left: Math.round(box.left),
          right: Math.round(box.right),
          top: Math.round(box.top),
          width: Math.round(box.width)
        };
      })(),
      fileHeader: readRect('#templates-window > div:first-child'),
      filePanel: readRect('#templates-window'),
      fileTreeWrap: readRect('#templates-window > div:nth-child(2)'),
      firstTreeRows: [...document.querySelectorAll('#templates-window .tree-row')]
        .slice(0, 8)
        .map((node) => {
          const box = node.getBoundingClientRect();
          return {
            text: node.textContent?.trim(),
            bottom: Math.round(box.bottom),
            height: Math.round(box.height),
            left: Math.round(box.left),
            top: Math.round(box.top),
            width: Math.round(box.width)
          };
        }),
      header: readRect('header'),
      headerStyle: (() => {
        const node = document.querySelector('header');
        if (!node) return null;
        const style = window.getComputedStyle(node);
        return {
          borderBottomColor: style.borderBottomColor,
          borderBottomWidth: style.borderBottomWidth
        };
      })(),
      headerLinks: [...document.querySelectorAll('header nav a')]
        .map((node) => {
          const box = node.getBoundingClientRect();
          return {
            text: node.textContent?.trim(),
            height: Math.round(box.height),
            left: Math.round(box.left),
            top: Math.round(box.top),
            width: Math.round(box.width)
          };
        }),
      headerControls: [...document.querySelectorAll('header > div > div:last-child > *')]
        .map((node) => {
          const box = node.getBoundingClientRect();
          return {
            label: node.getAttribute('aria-label') || node.textContent?.trim(),
            height: Math.round(box.height),
            left: Math.round(box.left),
            top: Math.round(box.top),
            width: Math.round(box.width)
          };
        }),
      headerContent: readRect('header > div'),
      headerContentStyle: (() => {
        const node = document.querySelector('header > div');
        if (!node) return null;
        const style = window.getComputedStyle(node);
        return {
          paddingBottom: style.paddingBottom,
          paddingLeft: style.paddingLeft,
          paddingRight: style.paddingRight,
          paddingTop: style.paddingTop
        };
      })(),
      headerLogoLink: readRect('header a[aria-label="JSX email home"]'),
      headerNav: readRect('header nav'),
      headerTools: readRect('header > div > div:last-child'),
      labPanel: readRect('#tool-panel'),
      labToggle: (() => {
        const node =
          document.querySelector('#tool-panel button[aria-label="Collapse tool panel"]') ||
          document.querySelector('#tool-panel span[aria-hidden="true"]');
        const box = node?.getBoundingClientRect();
        if (!box) return null;
        return {
          bottom: Math.round(box.bottom),
          height: Math.round(box.height),
          left: Math.round(box.left),
          right: Math.round(box.right),
          top: Math.round(box.top),
          width: Math.round(box.width)
        };
      })(),
      labToggleIcon: (() => {
        const node =
          document.querySelector('#tool-panel button[aria-label="Collapse tool panel"] svg, #tool-panel button[aria-label="Collapse tool panel"] i') ||
          document.querySelector('#tool-panel span[aria-hidden="true"] svg, #tool-panel span[aria-hidden="true"] i');
        const box = node?.getBoundingClientRect();
        if (!box) return null;
        const style = window.getComputedStyle(node);
        return {
          bottom: Math.round(box.bottom),
          color: style.color,
          fontSize: style.fontSize,
          height: Math.round(box.height),
          left: Math.round(box.left),
          right: Math.round(box.right),
          top: Math.round(box.top),
          width: Math.round(box.width)
        };
      })(),
      labHeader: readRect('#tool-panel > div > div:first-child'),
      labHeaderStyle: (() => {
        const node = document.querySelector('#tool-panel > div > div:first-child');
        if (!node) return null;
        const style = window.getComputedStyle(node);
        return {
          borderBottomColor: style.borderBottomColor,
          borderBottomWidth: style.borderBottomWidth
        };
      })(),
      labSections: [...document.querySelectorAll('#tool-panel .tool-section')]
        .map((node) => {
          const box = node.getBoundingClientRect();
          return {
            bottom: Math.round(box.bottom),
            height: Math.round(box.height),
            left: Math.round(box.left),
            top: Math.round(box.top),
            width: Math.round(box.width)
          };
        }),
      labTitles: [...document.querySelectorAll('#tool-panel .tool-title')]
        .map((node) => {
          const box = node.getBoundingClientRect();
          const icon = node.querySelector('svg, i')?.getBoundingClientRect();
          return {
            height: Math.round(box.height),
            icon: icon
              ? {
                  height: Math.round(icon.height),
                  left: Math.round(icon.left),
                  top: Math.round(icon.top),
                  width: Math.round(icon.width)
                }
              : null,
            left: Math.round(box.left),
            text: node.textContent?.trim(),
            top: Math.round(box.top),
            width: Math.round(box.width)
          };
        }),
      logo: readRect('header a[aria-label="JSX email home"]'),
      previewFrame: readRect('.preview-frame-shell'),
      previewFrameStyle: readStyle('.preview-frame-shell'),
      treeRows: document.querySelectorAll('#templates-window .tree-row').length
    };
  })()`);
}

interface AuditState {
  name: string;
  prepare: () => Promise<void>;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
