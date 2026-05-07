import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const repoRoot = process.cwd();

const getArg = (name: string, fallback?: string) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
};

const openDistPage = (path: string) => {
  const staticPath = path.endsWith('.html') ? path : `${path}.html`;

  return pathToFileURL(`${repoRoot}/apps/web/dist/${staticPath}`).toString();
};

const baseUrl = getArg('--url');

const openPage = (path: string) =>
  baseUrl ? `${baseUrl.replace(/\/$/, '')}/${path}` : openDistPage(path);

const assert = (condition: boolean, message: string) => {
  if (!condition) {
    throw new Error(message);
  }
};

const main = async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      permissions: ['clipboard-read', 'clipboard-write'],
      viewport: { height: 900, width: 1280 }
    });
    const page = await context.newPage();

    await page.goto(openPage('docs/components/avatar-group'), {
      waitUntil: 'networkidle'
    });

    const button = page.locator('[data-copy-prompt-root] button').first();
    await button.waitFor({ state: 'visible' });

    const componentMetrics = await page.evaluate(() => {
      const root = document.querySelector<HTMLElement>('[data-copy-prompt-root]');
      const buttonElement = root?.querySelector<HTMLButtonElement>('button');
      const tabs = document.querySelector<HTMLElement>('.codetabs_wrapper');
      const label = buttonElement?.textContent?.trim();
      const style = buttonElement ? getComputedStyle(buttonElement) : null;
      const rect = buttonElement?.getBoundingClientRect();
      const tabsRect = tabs?.getBoundingClientRect();

      return {
        background: style?.backgroundColor,
        borderColor: style?.borderColor,
        borderRadius: style?.borderRadius,
        borderWidth: style?.borderWidth,
        buttonBottom: rect?.bottom,
        buttonTop: rect?.top,
        display: style?.display,
        gap: tabsRect && rect ? tabsRect.top - rect.bottom : null,
        glyphCount: root?.querySelectorAll('.copy-prompt-glyph').length ?? 0,
        height: rect?.height,
        label,
        tabsTop: tabsRect?.top,
        width: rect?.width
      };
    });

    assert(
      componentMetrics.label === 'Prompt',
      `Expected default label, got ${componentMetrics.label}`
    );
    assert(
      componentMetrics.display === 'flex',
      `Prompt button is not flex: ${JSON.stringify(componentMetrics)}`
    );
    assert(
      componentMetrics.glyphCount === 3,
      `Expected three prompt glyphs: ${JSON.stringify(componentMetrics)}`
    );
    assert((componentMetrics.width ?? 0) > 140, 'Prompt button width is too small');
    assert((componentMetrics.height ?? 0) > 30, 'Prompt button height is too small');
    assert(componentMetrics.borderWidth === '1px', 'Prompt button border is not rendered');
    assert(
      componentMetrics.borderRadius === '6px',
      'Prompt button radius does not match subtle style'
    );
    assert(
      (componentMetrics.buttonBottom ?? 0) <= (componentMetrics.tabsTop ?? 0),
      'Prompt button is not above install tabs'
    );
    assert(
      (componentMetrics.gap ?? 0) >= 10,
      `Prompt button bottom margin is too small: ${JSON.stringify(componentMetrics)}`
    );

    await button.click();
    await page.waitForSelector('[data-copy-prompt-root].is-copied', { timeout: 1000 });
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    assert(clipboardText.length > 0, 'Copy prompt copied empty text');
    assert(
      clipboardText.includes(
        "Implement or refactor with the `AvatarGroup` component when it fits the email's content and layout."
      ),
      `Copy prompt is missing component-specific instruction: ${clipboardText}`
    );
    assert(
      clipboardText.includes('Use only to arrange `Avatar` children.'),
      `Copy prompt is missing AvatarGroup relationship guidance: ${clipboardText}`
    );

    await page.goto(openPage('docs/quick-start'), {
      waitUntil: 'networkidle'
    });
    const quickStartButtons = await page.locator('[data-copy-prompt-root]').count();
    assert(quickStartButtons === 0, 'Copy prompt should not render on Quick Start');

    console.log(JSON.stringify({ componentMetrics, quickStartButtons }, null, 2));
  } finally {
    await browser.close();
  }
};

main().catch(async (error) => {
  console.error(error);
  process.exitCode = 1;
});
