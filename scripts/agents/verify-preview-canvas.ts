import { chromium } from 'playwright';

const canvasUrl = process.env.PREVIEW_CANVAS_URL || 'http://localhost:8788';
const baselineUrl = process.env.PREVIEW_BASELINE_URL || 'http://localhost:8787/preview.html';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    permissions: ['clipboard-read', 'clipboard-write'],
    viewport: { height: 900, width: 1280 }
  });
  const page = await context.newPage();
  const results: Record<string, unknown> = {};

  await page.route('https://api.useplunk.com/v1/send', async (route) => {
    await route.fulfill({ body: '', status: 200 });
  });

  await page.goto(`${canvasUrl}?verify=${Date.now()}`, { waitUntil: 'networkidle' });
  const firstFileCount = await page
    .locator('#templates-window span')
    .filter({ hasText: /files$/ })
    .first()
    .textContent();
  assert(firstFileCount !== '0 files', 'file system panel rendered before templates were available');
  await page.waitForTimeout(600);
  await page.mouse.move(760, 460);
  await page.screenshot({ fullPage: true, path: '/tmp/preview-canvas-hover.png' });

  const initial = {
    firstFileCount,
    ...(await page.evaluate(() => {
    const filePanel = document.getElementById('templates-window')?.getBoundingClientRect();
    const empty = document.querySelector('main .mt-24')?.getBoundingClientRect();
    const canvas = document.querySelector('main')?.getBoundingClientRect();
    const labLeft = canvas ? canvas.right - 12 - 48 : null;
    const workspaceCenter =
      filePanel && labLeft ? filePanel.right + (labLeft - filePanel.right) / 2 : null;
    const emptyCenter = empty ? empty.left + empty.width / 2 : null;

    return {
      appButtonCount: document.querySelectorAll('.app-button').length,
      cardCodeStylesPresent: Boolean(getComputedStyle(document.documentElement).getPropertyValue('--astro-code-token-keyword')),
      fileCountLabel: [...document.querySelectorAll('#templates-window span')]
        .map((node) => node.textContent?.trim())
        .find((text) => text?.endsWith('files')),
      emptyDelta: workspaceCenter && emptyCenter ? emptyCenter - workspaceCenter : null,
      fileCount: document.querySelectorAll('#templates-window .tree-row').length,
      filePanelWidth: filePanel?.width,
      gridMask: getComputedStyle(document.querySelector('main')!, '::before').maskImage,
      hasEmptyCard: Boolean(empty),
      labPanelCount: document.querySelectorAll('#tool-panel').length,
      collapsedBranchCount: document.querySelectorAll('#templates-window .tree-children.is-collapsed').length,
      expandedBranchCount: document.querySelectorAll(
        '#templates-window .tree-children:not(.is-collapsed)'
      ).length,
      treeBranchCount: document.querySelectorAll('#templates-window .tree-branch').length
    };
    }))
  };

  assert(Math.abs(Number(initial.emptyDelta)) <= 1, 'empty card is not centered');
  assert(initial.appButtonCount >= 3, 'shared app button styling is missing');
  assert(initial.cardCodeStylesPresent, 'code theme CSS variables are missing');
  assert(initial.fileCountLabel === '21 files', 'file count label is incorrect');
  assert(initial.fileCount === 25, 'file tree row count is incorrect');
  assert(initial.gridMask.includes('180px'), 'background hover mask is not active');
  assert(initial.collapsedBranchCount === initial.treeBranchCount, 'folders should be collapsed by default');
  assert(initial.expandedBranchCount === 0, 'folders should not be expanded by default');
  assert(initial.treeBranchCount > 0, 'tree branch styling is not present');

  await page.getByRole('button', { name: 'Collapse file system' }).click();
  await page.waitForTimeout(40);
  const collapsingFileSystem = await page.evaluate(() => ({
    animating: document.querySelector('#templates-window .panel-collapse-button')?.className.includes('is-animating'),
  }));
  assert(collapsingFileSystem.animating, 'file system collapse icon is not animating');
  await page.waitForTimeout(240);
  const collapsedFileSystem = await page.evaluate(() => ({
    height: document.getElementById('templates-window')?.getBoundingClientRect().height
  }));
  assert(Math.abs(Number(collapsedFileSystem.height) - 48) <= 1, 'file system collapse height is incorrect');
  await page.getByRole('button', { name: 'Expand file system' }).click();
  await page.waitForTimeout(260);

  await page.getByRole('button', { exact: true, name: 'Airbnb Review' }).click();
  await page.waitForTimeout(1200);
  const airbnbImages = await page.locator('main iframe').evaluate((iframe) => {
    const doc = (iframe as HTMLIFrameElement).contentDocument;
    return [...(doc?.querySelectorAll('img') || [])].map((image) => ({
      complete: image.complete,
      naturalHeight: image.naturalHeight,
      naturalWidth: image.naturalWidth,
      src: image.src
    }));
  });
  assert(airbnbImages.length >= 2, 'Airbnb preview images are missing');
  assert(
    airbnbImages.every((image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0),
    'Airbnb preview images did not load'
  );

  await page.getByRole('button', { exact: true, name: 'Apple Receipt' }).click();
  await page.waitForTimeout(900);
  const afterAdd = await page.evaluate(() => {
    const selected = document.querySelector('main .ring-2')?.getBoundingClientRect();
    const filePanel = document.getElementById('templates-window')?.getBoundingClientRect();
    const canvas = document.querySelector('main')?.getBoundingClientRect();
    const labLeft = canvas ? canvas.right - 12 - 48 : null;
    const workspaceCenter =
      filePanel && labLeft ? filePanel.right + (labLeft - filePanel.right) / 2 : null;
    const selectedCenter = selected ? selected.left + selected.width / 2 : null;

    return {
      cardTabs: Boolean(document.querySelector('main .card-tabs')),
      closeButtonLabel: document.querySelector('main .ring-2 button[aria-label^="Close"]')?.getAttribute('aria-label'),
      headerBorder: getComputedStyle(document.querySelector('main .ring-2 article > div')!).borderBottomWidth,
      labPanelWidth: document.getElementById('tool-panel')?.getBoundingClientRect().width,
      selectedDelta: workspaceCenter && selectedCenter ? selectedCenter - workspaceCenter : null,
      selectedTitle: document.querySelector('main .ring-2 h2')?.textContent
    };
  });

  assert(Math.abs(Number(afterAdd.selectedDelta)) <= 1, 'selected card is not centered');
  assert(afterAdd.cardTabs, 'card tabs styling is missing');
  assert(afterAdd.closeButtonLabel === 'Close Apple Receipt', 'card close button label is incorrect');
  assert(afterAdd.headerBorder !== '0px', 'card titlebar border is missing');
  assert(afterAdd.labPanelWidth === 48, 'lab panel should be collapsed after first card add');

  await page.getByRole('button', { name: 'Expand tool panel' }).click();
  await page.waitForTimeout(220);
  const expandedLab = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('#tool-panel [data-tippy-content]')];
    return {
      collapsedIconCount: document.querySelectorAll('#tool-panel .tool-collapsed-icon').length,
      panelWidth: document.getElementById('tool-panel')?.getBoundingClientRect().width,
      presetScrolls:
        (document.querySelector('#tool-panel .preset-pill')?.parentElement?.scrollWidth || 0) >
        (document.querySelector('#tool-panel .preset-pill')?.parentElement?.clientWidth || 0),
      sectionWidths: [...document.querySelectorAll('#tool-panel .tool-section')].map(
        (node) => node.getBoundingClientRect().width
      ),
      titles: [...document.querySelectorAll('#tool-panel .tool-title')].map((node) =>
        node.textContent?.trim()
      ),
      tooltipRows: rows.map((node) => node.textContent?.trim())
    };
  });
  assert(expandedLab.panelWidth === 320, 'expanded lab panel width is incorrect');
  assert(expandedLab.collapsedIconCount === 0, 'collapsed lab icons should be hidden when expanded');
  assert(expandedLab.presetScrolls, 'preset pills should remain one horizontal scroll row');
  assert(expandedLab.sectionWidths.every((width) => Math.abs(width - 320) <= 1), 'lab sections should have fixed width');
  assert(
    expandedLab.titles.join('|') === 'Color Mode|Presets|Send Email',
    'lab section titles are incorrect'
  );
  assert(
    expandedLab.tooltipRows.some((text) => text?.includes('Dark Mode color scheme')) &&
      expandedLab.tooltipRows.some((text) => text?.includes('Gmail Color Inversion')),
    'toggle tooltip rows are missing'
  );
  await page.screenshot({ fullPage: true, path: '/tmp/preview-canvas-lab-expanded.png' });

  await page.getByRole('button', { name: 'Collapse tool panel' }).click();
  await page.waitForTimeout(220);
  await page.locator('main .ring-2').getByRole('tab', { name: 'JSX' }).click();
  await page.waitForTimeout(400);
  const codeSurface = await page.evaluate(() => ({
    actionCount: document.querySelectorAll('main .ring-2 .code-action').length,
    codeClass: document.querySelector('main .ring-2 .card-code')?.className,
    tabActive: document.querySelector('main .ring-2 .card-tab.is-active')?.textContent?.trim()
  }));
  assert(codeSurface.actionCount === 2, 'code actions are missing');
  assert(codeSurface.codeClass?.includes('card-code'), 'card code surface is missing');
  assert(codeSurface.tabActive === 'JSX', 'JSX tab did not activate');
  await page.screenshot({ fullPage: true, path: '/tmp/preview-canvas-code.png' });

  await page.screenshot({ fullPage: true, path: '/tmp/preview-canvas.png' });

  await page.keyboard.down('z');
  const pointBefore = await readLocalPoint(page, 760, 320);
  await page.mouse.click(760, 320);
  await page.waitForTimeout(100);
  const pointAfter = await readLocalPoint(page, 760, 320);
  await page.keyboard.up('z');

  const baseline = await context.newPage();
  await baseline.goto(`${baselineUrl}?verify=${Date.now()}`, { waitUntil: 'networkidle' });
  await baseline.waitForTimeout(600);
  await baseline.getByRole('button', { exact: true, name: 'apple-receipt.tsx' }).click();
  await baseline.waitForTimeout(900);
  await baseline.screenshot({ fullPage: true, path: '/tmp/preview-html-baseline.png' });

  results.previewCanvas = {
    afterAdd,
    baselineAfterAdd: await baseline.evaluate(() => ({
      labPanelWidth: document.getElementById('tool-panel')?.getBoundingClientRect().width,
      selectedTitle: document.querySelector('main .ring-2 h2')?.textContent
    })),
    initial,
    pointAfter,
    pointBefore,
    zoomText: await page.locator('span:has-text("%")').first().textContent()
  };

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function readLocalPoint(page: import('playwright').Page, x: number, y: number) {
  return page.locator('main').evaluate(
    (canvas, point) => {
      const content = canvas.firstElementChild;
      if (!content) return null;
      const contentRect = content.getBoundingClientRect();
      const transform = getComputedStyle(content).transform;
      const scale = transform === 'none' ? 1 : new DOMMatrixReadOnly(transform).a;

      return {
        localX: (point.x - contentRect.left) / scale,
        localY: (point.y - contentRect.top) / scale,
        scale
      };
    },
    { x, y }
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
