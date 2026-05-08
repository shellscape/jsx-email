import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const repoRoot = process.cwd();

const getArg = (name: string, fallback?: string) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
};

const baseUrl = getArg('--url');
const docsPath = 'docs/components/avatar';

const openPage = () =>
  baseUrl
    ? `${baseUrl.replace(/\/$/, '')}/${docsPath}`
    : pathToFileURL(`${repoRoot}/apps/web/dist/${docsPath}.html`).toString();

const assert = (condition: boolean, message: string): asserts condition => {
  if (!condition) {
    throw new Error(message);
  }
};

const main = async () => {
  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { height: 900, width: 1280 }
    });
    const page = await context.newPage();

    await page.goto(openPage(), { waitUntil: 'networkidle' });

    const metrics = await page.evaluate(() => {
      const header = document.querySelector<HTMLElement>('#header')?.getBoundingClientRect();
      const heading = document
        .querySelector<HTMLElement>('.documentation-content h1')
        ?.getBoundingClientRect();

      return {
        gap: header && heading ? heading.top - header.bottom : null,
        headingText: document
          .querySelector<HTMLElement>('.documentation-content h1')
          ?.textContent?.trim(),
        headerBottom: header?.bottom,
        headerHeight: header?.height,
        headingTop: heading?.top
      };
    });

    assert(metrics.headingText === 'Avatar', `Unexpected heading: ${metrics.headingText}`);
    assert(metrics.headerHeight === 64, `Unexpected docs header height: ${metrics.headerHeight}`);
    assert(
      Number(metrics.gap) >= 16,
      `Docs heading overlaps fixed header: ${JSON.stringify(metrics)}`
    );

    console.log(JSON.stringify(metrics, null, 2));
  } finally {
    await browser.close();
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
