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
  const plunkRequests: Array<{
    authorization?: string;
    body?: unknown;
    contentType?: string;
  }> = [];

  await page.route('https://api.useplunk.com/v1/send', async (route) => {
    const request = route.request();
    const headers = request.headers();
    plunkRequests.push({
      authorization: headers.authorization,
      body: JSON.parse(request.postData() || '{}'),
      contentType: headers['content-type']
    });
    await route.fulfill({ body: '', status: 200 });
  });

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

      const rightEdge = canvas.getBoundingClientRect().right;
      const workspaceCenter = explorerRect.right + (rightEdge - explorerRect.right) / 2;
      const cardCenter = cardRect.left + cardRect.width / 2;

      return {
        cardCenter,
        cardLeft: cardRect.left,
        cardRight: cardRect.right,
        delta: cardCenter - workspaceCenter,
        scrollLeft: canvas.scrollLeft,
        scrollMax: canvas.scrollWidth - canvas.clientWidth,
        templatesRight: explorerRect.right,
        canvasRight: rightEdge,
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

      const rightEdge = canvas.getBoundingClientRect().right;
      const workspaceCenter = explorerRect.right + (rightEdge - explorerRect.right) / 2;
      const cardCenter = cardRect.left + cardRect.width / 2;

      return {
        cardCenter,
        cardLeft: cardRect.left,
        cardRight: cardRect.right,
        delta: cardCenter - workspaceCenter,
        scrollLeft: canvas.scrollLeft,
        templatesRight: explorerRect.right,
        canvasRight: rightEdge,
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

      const rightEdge = canvas.getBoundingClientRect().right;
      const workspaceCenter = explorerRect.right + (rightEdge - explorerRect.right) / 2;
      const emptyCenter = emptyRect.left + emptyRect.width / 2;

      return {
        delta: emptyCenter - workspaceCenter,
        width: emptyRect.width
      };
    });
  }

  if (check === 'all' || check === 'tool-panel') {
    await openPreview('tool-panel');
    const initialPanelCount = await page.locator('#tool-panel').count();
    await addTemplate('airbnb-review.tsx');
    const panelAfterAdd = await page
      .locator('#tool-panel')
      .evaluate((element) => element.getBoundingClientRect().width);
    const collapsedInitialIconGeometry = await page.evaluate(() => {
      const panel = document.getElementById('tool-panel')?.getBoundingClientRect();
      const icons = [
        ...document.querySelectorAll(
          '#tool-panel [aria-label="Color mode"], #tool-panel [aria-label="Presets"], #tool-panel [aria-label="Send email"]'
        )
      ].map((element) => {
        const rect = element.getBoundingClientRect();
        return Math.round(rect.top - (panel?.top ?? 0));
      });

      return { icons };
    });
    await page.getByRole('button', { exact: true, name: 'Expand tool panel' }).click();
    await page.waitForTimeout(250);
    const before = await readSelectedScrollGeometry();
    await page.getByRole('button', { exact: true, name: 'iPhone 15 Pro Max 430px' }).click();
    await page.waitForTimeout(250);
    const presetFrame = await page.locator('main .ring-2 iframe').evaluate((frame) => {
      const shell = frame.parentElement;
      return {
        shellClass: shell?.className,
        shellWidth: shell?.getBoundingClientRect().width
      };
    });
    await page.getByRole('button', { exact: true, name: 'Dark Mode color scheme' }).click();
    const darkSchemeState = {
      darkPressed: await page
        .getByRole('button', { exact: true, name: 'Dark Mode color scheme' })
        .getAttribute('aria-pressed'),
      invertPressed: await page
        .getByRole('button', { exact: true, name: 'Invert colors' })
        .getAttribute('aria-pressed'),
      shellClass: await page.locator('main .ring-2 iframe').evaluate((frame) => frame.parentElement?.className)
    };
    await page.getByRole('button', { exact: true, name: 'Invert colors' }).click();
    await page.waitForTimeout(800);
    const colorState = await page.locator('main .ring-2 iframe').evaluate((frame) => ({
      bodyBackground: frame.contentDocument?.body.style.backgroundColor,
      darkPressed: document
        .querySelector('[aria-label="Dark Mode color scheme"]')
        ?.getAttribute('aria-pressed'),
      invertPressed: document.querySelector('[aria-label="Invert colors"]')?.getAttribute('aria-pressed'),
      shellClass: frame.parentElement?.className
    }));
    const inversionScroll = await page.locator('main .ring-2 iframe').evaluate((frame) => {
      frame.contentWindow?.scrollTo(0, 160);
      return frame.contentWindow?.scrollY || 0;
    });
    await page.getByRole('button', { exact: true, name: 'Invert colors' }).click();
    await page.waitForTimeout(250);
    const inversionOffState = await page.locator('main .ring-2 iframe').evaluate((frame) => ({
      bodyBackground: frame.contentDocument?.body.style.backgroundColor,
      scrollY: frame.contentWindow?.scrollY || 0
    }));
    await page.getByRole('button', { exact: true, name: 'Invert colors' }).click();
    await page.waitForTimeout(250);
    await page.getByText('Dark Mode color scheme', { exact: true }).click();
    const labelClickColorState = await page.locator('main .ring-2 iframe').evaluate((frame) => ({
      darkPressed: document
        .querySelector('[aria-label="Dark Mode color scheme"]')
        ?.getAttribute('aria-pressed'),
      invertPressed: document.querySelector('[aria-label="Invert colors"]')?.getAttribute('aria-pressed'),
      shellClass: frame.parentElement?.className
    }));
    await page.getByText('Dark Mode color scheme', { exact: true }).click();
    const plunkLink = await page.getByRole('link', { name: /Plunk/ }).getAttribute('href');
    const sendInput = await page.locator('#preview-send-to').getAttribute('placeholder');
    const sendDisabledState = await page
      .locator('#tool-panel button[type="submit"]')
      .evaluate((button) => {
        const styles = getComputedStyle(button);

        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          cursor: styles.cursor,
          disabled: (button as HTMLButtonElement).disabled,
          opacity: styles.opacity
        };
      });
    const panelBefore = await page
      .locator('#tool-panel')
      .evaluate((element) => element.getBoundingClientRect().width);
    const expandedIconGeometry = await page.evaluate(() => {
      const panel = document.getElementById('tool-panel')?.getBoundingClientRect();
      const icons = [...document.querySelectorAll('#tool-panel .tool-title i')].map((element) => {
        const rect = element.getBoundingClientRect();
        return Math.round(rect.top - (panel?.top ?? 0));
      });

      return { icons };
    });
    const panelStructure = await page.evaluate(() => {
      const presetScroller = document.querySelector('.preset-pill')?.parentElement;
      const pill = document.querySelector('.preset-pill');
      const switchElement = document.querySelector('.switch');
      const tooltipRows = [...document.querySelectorAll('[data-tippy-content]')].map((row) =>
        row.textContent?.trim()
      );

      return {
        pillBorderRadius: pill ? getComputedStyle(pill).borderRadius : null,
        presetFlexWrap: presetScroller ? getComputedStyle(presetScroller).flexWrap : null,
        presetOverflowX: presetScroller ? getComputedStyle(presetScroller).overflowX : null,
        switchBorderRadius: switchElement ? getComputedStyle(switchElement).borderRadius : null,
        tooltipRows
      };
    });
    await page.getByRole('button', { exact: true, name: 'Collapse tool panel' }).click();
    await page.waitForTimeout(250);
    const panelAfter = await page
      .locator('#tool-panel')
      .evaluate((element) => element.getBoundingClientRect().width);
    const collapsedIconCount = await page
      .locator('#tool-panel [aria-label="Color mode"], #tool-panel [aria-label="Presets"], #tool-panel [aria-label="Send email"]')
      .count();
    const collapsedIconGeometry = await page.evaluate(() => {
      const panel = document.getElementById('tool-panel')?.getBoundingClientRect();
      const icon = document
        .querySelector('#tool-panel [aria-label="Color mode"]')
        ?.getBoundingClientRect();

      if (!panel || !icon) return null;

      return {
        iconTopFromPanel: icon.top - panel.top,
        panelHeight: panel.height
      };
    });
    await openPreview('tool-panel-css');
    await addTemplate('netlify-welcome.tsx');
    await page.getByRole('button', { exact: true, name: 'Expand tool panel' }).click();
    await page.getByRole('button', { exact: true, name: 'Invert colors' }).click();
    await page.waitForTimeout(800);
    const cssInversion = await page.locator('main .ring-2 iframe').evaluate((frame) => {
      const styleText = [...(frame.contentDocument?.querySelectorAll('style') || [])]
        .map((style) => style.textContent || '')
        .join('\n');

      return {
        hasDarkBackgroundRule: styleText.includes('background-color: rgb(32, 32, 32)'),
        hasLightTextRule: styleText.includes('color: rgb(242, 242, 242)')
      };
    });
    await openPreview('tool-panel-apple-preset');
    await addTemplate('apple-receipt.tsx');
    await page.getByRole('button', { exact: true, name: 'Expand tool panel' }).click();
    await page.getByRole('button', { exact: true, name: 'Invert colors' }).click();
    await page.waitForTimeout(800);
    const appleFullWidthColor = await page.locator('main .ring-2 iframe').evaluate((frame) => {
      const link = frame.contentDocument?.querySelector('a');
      return link ? getComputedStyle(link).color : null;
    });
    await page.getByRole('button', { exact: true, name: 'iPhone 15 Pro Max 430px' }).click();
    await page.waitForTimeout(800);
    const appleIphoneColor = await page.locator('main .ring-2 iframe').evaluate((frame) => {
      const link = frame.contentDocument?.querySelector('a');
      return link ? getComputedStyle(link).color : null;
    });
    const applePresetInversion = {
      fullWidthLinkColor: appleFullWidthColor,
      iphoneLinkColor: appleIphoneColor,
      fullWidthUsesIosBlue:
        appleFullWidthColor === 'rgb(94, 163, 233)' || appleFullWidthColor === 'rgb(91, 152, 237)',
      iphoneUsesIosBlue:
        appleIphoneColor === 'rgb(94, 163, 233)' || appleIphoneColor === 'rgb(91, 152, 237)'
    };
    await openPreview('tool-panel-apple-ios-inversion');
    await addTemplate('apple-receipt.tsx');
    await page.getByRole('button', { exact: true, name: 'Expand tool panel' }).click();
    await page.getByRole('button', { exact: true, name: 'iPhone 15 Pro Max 430px' }).click();
    await page.getByRole('button', { exact: true, name: 'Invert colors' }).click();
    await page.waitForTimeout(800);
    const appleIosInversion = await page.locator('main .ring-2 iframe').evaluate((frame) => {
      const doc = frame.contentDocument;
      const link = doc?.querySelector('a');
      const body = doc?.body;
      const elements = [...(doc?.querySelectorAll('p, span, td, a') || [])];
      const headline = elements.find((element) =>
        element.textContent?.includes('Save 3% on all your Apple purchases')
      );
      const muted = elements
        .filter((element) => element.textContent?.includes('HBO Max Ad-Free'))
        .sort((a, b) => (a.textContent?.length || 0) - (b.textContent?.length || 0))[0];

      return {
        backgroundColor: body ? getComputedStyle(body).backgroundColor : null,
        headlineColor: headline ? getComputedStyle(headline).color : null,
        mutedColor: muted ? getComputedStyle(muted).color : null,
        linkColor: link ? getComputedStyle(link).color : null
      };
    });
    await page.screenshot({ fullPage: true, path: '/tmp/preview-apple-ios-inversion.png' });
    await openPreview('tool-panel-card-state');
    await addTemplate('airbnb-review.tsx');
    await page.getByRole('button', { exact: true, name: 'Expand tool panel' }).click();
    await page.getByRole('button', { exact: true, name: 'iPhone 15 Pro Max 430px' }).click();
    await page.getByRole('button', { exact: true, name: 'Invert colors' }).click();
    await page.locator('#preview-send-to').fill('first@example.com');
    await addTemplate('apple-receipt.tsx');
    const secondPanelWidth = await page
      .locator('#tool-panel')
      .evaluate((element) => element.getBoundingClientRect().width);
    const secondCardState = await page.locator('main .ring-2 iframe').evaluate((frame) => ({
      bodyBackground: frame.contentDocument?.body.style.backgroundColor,
      shellWidth: frame.parentElement?.getBoundingClientRect().width
    }));
    await page.getByRole('button', { exact: true, name: 'airbnb-review.tsx' }).click();
    await page.waitForTimeout(900);
    const firstCardRestoredState = {
      email: await page.locator('#preview-send-to').inputValue(),
      invertPressed: await page
        .getByRole('button', { exact: true, name: 'Invert colors' })
        .getAttribute('aria-pressed'),
      panelWidth: await page
        .locator('#tool-panel')
        .evaluate((element) => element.getBoundingClientRect().width),
      preview: await page.locator('main .ring-2 iframe').evaluate((frame) => ({
        bodyBackground: frame.contentDocument?.body.style.backgroundColor,
        shellWidth: frame.parentElement?.getBoundingClientRect().width
      }))
    };
    await page.locator('#preview-send-to').fill('deliver@example.com');
    await page.getByRole('button', { exact: true, name: 'Send' }).click();
    await page.waitForTimeout(250);
    const sendButtonEarly = await page
      .locator('#tool-panel button[type="submit"]')
      .evaluate((button) => {
        const icon = button.querySelector('i');

        return {
          disabled: (button as HTMLButtonElement).disabled,
          iconAnimation: icon ? getComputedStyle(icon).animationName : null,
          text: button.textContent
        };
      });
    await page.waitForTimeout(4100);
    const sendButtonText = await page
      .locator('#tool-panel button[type="submit"]')
      .textContent();
    const plunkRequest = plunkRequests.at(-1);
    const sendRequest = {
      authIsBearer: plunkRequest?.authorization?.startsWith('Bearer sk_') || false,
      bodyHasHtml: typeof plunkRequest?.body?.body === 'string' && plunkRequest.body.body.includes('<!DOCTYPE html'),
      contentType: plunkRequest?.contentType,
      subject: plunkRequest?.body?.subject,
      to: plunkRequest?.body?.to
    };

    results.toolPanel = {
      before,
      appleIosInversion,
      applePresetInversion,
      colorState,
      cssInversion,
      darkSchemeState,
      firstCardRestoredState,
      inversionOffState,
      inversionScroll,
      labelClickColorState,
      secondCardState,
      secondPanelWidth,
      sendButtonEarly,
      sendButtonText,
      sendDisabledState,
      sendRequest,
      collapsedIconGeometry,
      collapsedIconCount,
      collapsedInitialIconGeometry,
      expandedIconGeometry,
      initialPanelCount,
      panelAfterAdd,
      panelAfter,
      panelBefore,
      panelStructure,
      presetFrame,
      plunkLink,
      sendInput
    };
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

  if (check === 'all' || check === 'close-unfocused') {
    await openPreview('close-unfocused');
    await addTemplate('airbnb-review.tsx');
    await addTemplate('apple-receipt.tsx');
    const before = {
      ...(await readSelected()),
      geometry: await readSelectedScrollGeometry()
    };
    await page.getByRole('button', { exact: true, name: 'Remove Airbnb Review' }).click();
    await page.waitForTimeout(900);
    const after = {
      ...(await readSelected()),
      cardCount: await page.locator('main iframe').count(),
      geometry: await readSelectedScrollGeometry()
    };

    results.closeUnfocused = {
      after,
      before
    };
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
