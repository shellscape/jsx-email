import { chromium } from 'playwright';

const defaultUrl = 'http://localhost:8787/preview.html';

function getArg(name: string, fallback: string) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : (process.argv[index + 1] ?? fallback);
}

async function main() {
  const url = getArg('--url', defaultUrl);
  const check = getArg('--check', 'all');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    permissions: ['clipboard-read', 'clipboard-write'],
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();
  const results: Record<string, unknown> = {};

  async function openPreview(suffix: string) {
    await page.goto(`${url}?verify=${suffix}-${Date.now()}`, { waitUntil: 'networkidle' });
  }

  async function addTemplate(fileName: string) {
    await page.getByRole('button', { exact: true, name: fileName }).click();
    await page.waitForTimeout(900);
  }

  async function zoomByClicks(direction: 'in' | 'out', count: number) {
    const label = direction === 'in' ? 'Zoom in' : 'Zoom out';

    for (let index = 0; index < count; index++) {
      await page.getByRole('button', { exact: true, name: label }).first().click();
    }

    await page.waitForTimeout(200);
  }

  async function readZoom() {
    return page.locator('span:has-text("%")').textContent();
  }

  async function readSelected() {
    return page.evaluate(() => {
      const selected = [...document.querySelectorAll('main .ring-2')].map((element) =>
        element.textContent?.slice(0, 24)
      );
      const selectedTitle = document.querySelector('main .ring-2 .font-medium')?.textContent;
      const visibleCode = document.querySelector('main .ring-2 pre')?.textContent?.slice(0, 24);

      return { selected, selectedCount: selected.length, selectedTitle, visibleCode };
    });
  }

  async function readScrollGeometry() {
    return page.evaluate(() => {
      const canvas = document.querySelector('main');
      const row = canvas?.firstElementChild?.querySelector('.flex-nowrap');
      const cards = row ? [...row.children] : [];
      const selected = cards[cards.length - 1];
      const explorerRect = document.getElementById('templates-window')?.getBoundingClientRect();
      const cardRect = selected?.getBoundingClientRect();

      if (!canvas || !explorerRect || !cardRect) {
        return null;
      }

      const workspaceCenter = explorerRect.right + (canvas.getBoundingClientRect().right - explorerRect.right) / 2;
      const cardCenter = cardRect.left + cardRect.width / 2;

      return {
        cardCenter,
        cardLeft: cardRect.left,
        cardRight: cardRect.right,
        delta: cardCenter - workspaceCenter,
        scrollLeft: canvas.scrollLeft,
        scrollMax: canvas.scrollWidth - canvas.clientWidth,
        templatesRight: explorerRect.right,
        workspaceCenter
      };
    });
  }

  async function readSelectedScrollGeometry() {
    return page.evaluate(() => {
      const canvas = document.querySelector('main');
      const selected = document.querySelector('main .ring-2');
      const explorerRect = document.getElementById('templates-window')?.getBoundingClientRect();
      const cardRect = selected?.getBoundingClientRect();

      if (!canvas || !explorerRect || !cardRect) {
        return null;
      }

      const workspaceCenter =
        explorerRect.right + (canvas.getBoundingClientRect().right - explorerRect.right) / 2;
      const cardCenter = cardRect.left + cardRect.width / 2;

      return {
        cardCenter,
        cardLeft: cardRect.left,
        cardRight: cardRect.right,
        delta: cardCenter - workspaceCenter,
        scrollLeft: canvas.scrollLeft,
        templatesRight: explorerRect.right,
        workspaceCenter
      };
    });
  }

  if (check === 'all' || check === 'scroll') {
    await openPreview('scroll');
    await addTemplate('airbnb-review.tsx');
    await addTemplate('apple-receipt.tsx');
    results.scroll = await readScrollGeometry();
  }

  if (check === 'all' || check === 'empty-card') {
    await openPreview('empty-card');
    results.emptyCard = await page.evaluate(() => {
      const canvas = document.querySelector('main');
      const empty = canvas?.querySelector('.mt-24');
      const explorerRect = document.getElementById('templates-window')?.getBoundingClientRect();
      const emptyRect = empty?.getBoundingClientRect();

      if (!canvas || !emptyRect || !explorerRect) return null;

      const workspaceCenter =
        explorerRect.right + (canvas.getBoundingClientRect().right - explorerRect.right) / 2;
      const emptyCenter = emptyRect.left + emptyRect.width / 2;

      return {
        delta: emptyCenter - workspaceCenter,
        width: emptyRect.width
      };
    });
  }

  if (check === 'all' || check === 'scroll-zoom') {
    await openPreview('scroll-zoom');
    await zoomByClicks('out', 7);
    await addTemplate('airbnb-review.tsx');
    await addTemplate('apple-receipt.tsx');
    results.scrollZoom = {
      geometry: await readScrollGeometry(),
      zoom: await readZoom()
    };
  }

  if (check === 'all' || check === 'zoom-sequence') {
    await openPreview('zoom-sequence');
    await addTemplate('airbnb-review.tsx');
    await zoomByClicks('out', 7);

    for (const fileName of [
      'apple-receipt.tsx',
      'github-access-token.tsx',
      'notion-magic-link.tsx',
      'netlify-welcome.tsx'
    ]) {
      await addTemplate(fileName);
    }

    const beforeZoom = await readScrollGeometry();
    const scrollBeforeZoom = await page.locator('main').evaluate((element) => element.scrollLeft);
    await zoomByClicks('in', 5);
    const scrollAfterZoomIn = await page.locator('main').evaluate((element) => element.scrollLeft);
    await zoomByClicks('out', 5);
    const scrollAfterZoomOut = await page.locator('main').evaluate((element) => element.scrollLeft);
    const afterZoom = await readScrollGeometry();

    results.zoomSequence = {
      afterZoom,
      beforeZoom,
      scrollAfterZoomIn,
      scrollAfterZoomOut,
      scrollBeforeZoom,
      zoom: await readZoom()
    };
  }

  if (check === 'all' || check === 'canvas-pan') {
    await openPreview('canvas-pan');
    await addTemplate('airbnb-review.tsx');
    await addTemplate('apple-receipt.tsx');
    const pan = await page.locator('main').evaluate((canvas) => {
      const initialLeft = canvas.scrollLeft;
      const initialTop = canvas.scrollTop;
      canvas.scrollBy({ left: -500, top: -500 });
      const afterLeftUp = {
        scrollLeft: canvas.scrollLeft,
        scrollTop: canvas.scrollTop
      };
      canvas.scrollBy({ left: 1000, top: 1000 });

      return {
        afterLeftUp,
        clientHeight: canvas.clientHeight,
        clientWidth: canvas.clientWidth,
        initialLeft,
        initialTop,
        scrollHeight: canvas.scrollHeight,
        scrollLeft: canvas.scrollLeft,
        scrollTop: canvas.scrollTop,
        scrollWidth: canvas.scrollWidth
      };
    });

    results.canvasPan = pan;
  }

  if (check === 'all' || check === 'overscroll-back') {
    await page.goto(`${url}?verify=overscroll-before-${Date.now()}`, { waitUntil: 'networkidle' });
    const previousUrl = page.url();
    await openPreview('overscroll-back');
    await addTemplate('airbnb-review.tsx');
    const beforeUrl = page.url();
    const beforeState = await page.locator('main').evaluate((canvas) => ({
      overscrollBehaviorX: getComputedStyle(canvas).overscrollBehaviorX,
      scrollLeft: canvas.scrollLeft
    }));
    await page.locator('main').hover();
    await page.mouse.wheel(-1200, 0);
    await page.waitForTimeout(500);
    const afterWheelUrl = page.url();
    const client = await context.newCDPSession(page);
    await client.send('Input.synthesizeScrollGesture', {
      gestureSourceType: 'mouse',
      speed: 800,
      x: 640,
      xDistance: 1200,
      y: 450,
      yDistance: 0
    });
    await page.waitForTimeout(500);
    const afterGestureUrl = page.url();

    results.overscrollBack = {
      afterGestureUrl,
      afterWheelUrl,
      backTriggered: afterWheelUrl === previousUrl || afterGestureUrl === previousUrl,
      beforeState,
      beforeUrl,
      previousUrl
    };
  }

  if (check === 'all' || check === 'select') {
    await openPreview('select');
    const inlineCodeStyle = await page.evaluate(() => {
      const element = document.querySelector('.docs-inline-code');
      if (!element) return null;
      const styles = getComputedStyle(element);

      return {
        backgroundColor: styles.backgroundColor,
        borderRadius: styles.borderRadius,
        fontSize: styles.fontSize
      };
    });
    await addTemplate('airbnb-review.tsx');
    await addTemplate('apple-receipt.tsx');
    await page.locator('main .inline-block').first().click({ position: { x: 20, y: 20 } });
    await page.waitForTimeout(900);
    const codeText = await (async () => {
      await page.getByRole('tab', { exact: true, name: 'JSX' }).first().click();
      await page.waitForTimeout(900);
      return page.locator('main .ring-2 pre').textContent();
    })();
    await page.locator('main .ring-2 .card-code').hover();
    await page.getByRole('button', { exact: true, name: 'Copy code' }).click();
    const copiedText = await page.evaluate(() => navigator.clipboard.readText());
    const download = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { exact: true, name: 'Download code' }).click()
    ]).then(([nextDownload]) => nextDownload);
    const downloadContent = await download.createReadStream().then(
      (stream) =>
        new Promise<string>((resolve, reject) => {
          const chunks: Buffer[] = [];
          stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
          stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
          stream.on('error', reject);
        })
    );
    results.select = {
      ...(await readSelected()),
      selectedGeometry: await readSelectedScrollGeometry(),
      codeAfterTab: codeText,
      codeActionButtons: await page
        .locator('main .ring-2')
        .getByRole('button', { name: /Copy code|Download code|Copied code/ })
        .count(),
      cursor: await page
        .locator('main .ring-2')
        .evaluate((element) => getComputedStyle(element).cursor),
      codeHighlight: await page.locator('main .ring-2 .card-code span[style*="--astro-code"]').count(),
      codeColor: await page
        .locator('main .ring-2 .card-code')
        .evaluate((element) => getComputedStyle(element).color),
      copiedMatchesCode: copiedText === codeText,
      downloadMatchesCode: downloadContent === codeText,
      downloadName: download.suggestedFilename(),
      inlineCodeStyle,
      bottomToolboxButtons: await page
        .locator('main')
        .getByRole('button', { name: /320|480|600|800|MJML \/ HTML|Compare widths|Duplicate|Send/ })
        .count()
    };
  }

  if (check === 'all' || check === 'unique-focus') {
    await openPreview('unique-focus');
    await addTemplate('airbnb-review.tsx');
    const firstCount = await page.locator('main iframe').count();
    await addTemplate('airbnb-review.tsx');
    const secondCount = await page.locator('main iframe').count();
    results.uniqueFocus = { firstCount, secondCount };
  }

  if (check === 'all' || check === 'tree') {
    await openPreview('tree');
    await addTemplate('airbnb-review.tsx');
    await addTemplate('apple-receipt.tsx');
    await page.locator('main .inline-block').first().click({ position: { x: 20, y: 20 } });
    await page.waitForTimeout(200);

    const selectedTree = await page.evaluate(() =>
      [...document.querySelectorAll('.tree-row.is-active')].map((element) =>
        element.textContent?.trim()
      )
    );
    const panelHeight = await page
      .locator('#templates-window')
      .evaluate((element) => element.getBoundingClientRect().height);
    const folder = page.getByRole('button', { exact: true, name: 'credential emails' });
    await folder.click();
    await page.waitForTimeout(250);
    const collapsed = await page.evaluate(() =>
      [...document.querySelectorAll('.tree-children')].some((element) =>
        element.classList.contains('is-collapsed')
      )
    );
    const collapsedIconCount = await page.locator('.iconoir-folder-plus').count();
    await folder.click();
    await page.waitForTimeout(250);
    const expandedIconCount = await page.locator('.iconoir-folder-minus').count();
    const collapseButton = page.getByRole('button', { exact: true, name: 'Collapse file system' });
    await collapseButton.click();
    const panelCollapseButtonAnimated = await page
      .getByRole('button', { exact: true, name: 'Expand file system' })
      .evaluate((element) => element.classList.contains('is-animating'));
    await page.waitForTimeout(250);
    const collapsedPanelHeight = await page
      .locator('#templates-window')
      .evaluate((element) => element.getBoundingClientRect().height);
    const collapsedTreeRows = await page.locator('#templates-window .tree-row').count();
    const collapsedArrowCount = await page.locator('.iconoir-nav-arrow-down').count();
    await page.getByRole('button', { exact: true, name: 'Expand file system' }).click();
    await page.waitForTimeout(250);
    const expandedPanelHeight = await page
      .locator('#templates-window')
      .evaluate((element) => element.getBoundingClientRect().height);
    const expandedArrowCount = await page.locator('.iconoir-nav-arrow-up').count();

    results.tree = {
      collapsed,
      collapsedArrowCount,
      collapsedIconCount,
      collapsedPanelHeight,
      collapsedTreeRows,
      expandedIconCount,
      expandedArrowCount,
      expandedPanelHeight,
      panelHeight,
      panelCollapseButtonAnimated,
      selectedTree
    };
  }

  if (check === 'all' || check === 'zzoom') {
    await openPreview('zzoom');
    const canvas = page.locator('main');
    await zoomByClicks('out', 8);
    const minZoomValue = await readZoom();
    const zoomInSequence: Array<string | null> = [];

    for (let index = 0; index < 8; index++) {
      await zoomByClicks('in', 1);
      zoomInSequence.push(await readZoom());
    }

    await page.keyboard.down('z');
    await page.mouse.move(640, 450);
    await page.mouse.click(640, 450);
    await page.waitForTimeout(100);
    const cursorIn = await canvas.evaluate((element) => getComputedStyle(element).cursor);
    const afterZoomIn = await readZoom();
    await page.keyboard.down('Alt');
    await page.mouse.move(641, 450);
    await page.mouse.click(640, 450);
    await page.waitForTimeout(100);
    const cursorOut = await canvas.evaluate((element) => getComputedStyle(element).cursor);
    const afterZoomOut = await readZoom();
    await page.keyboard.up('Alt');
    await page.keyboard.up('z');
    await page.waitForTimeout(100);
    const cursorNormal = await canvas.evaluate((element) => getComputedStyle(element).cursor);

    await page.keyboard.down('Alt');
    await page.evaluate(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', {
          altKey: true,
          bubbles: true,
          code: 'KeyZ',
          key: 'Ω'
        })
      );
    });
    await page.mouse.move(642, 450);
    await page.waitForTimeout(100);
    const cursorOutAltFirst = await canvas.evaluate((element) => getComputedStyle(element).cursor);
    await page.mouse.click(640, 450);
    await page.waitForTimeout(100);
    const afterZoomOutAltFirst = await readZoom();
    await page.evaluate(() => {
      window.dispatchEvent(
        new KeyboardEvent('keyup', {
          altKey: true,
          bubbles: true,
          code: 'KeyZ',
          key: 'Ω'
        })
      );
    });
    await page.keyboard.up('Alt');

    results.zzoom = {
      afterZoomIn,
      afterZoomOut,
      afterZoomOutAltFirst,
      cursorIn,
      cursorNormal,
      cursorOut,
      cursorOutAltFirst,
      minZoomValue,
      zoomInSequence
    };
  }

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
