import { access, readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium, type Page } from 'playwright';

const repoRoot = process.cwd();

const getArg = (name: string, fallback?: string) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
};

const baseUrl = getArg('--url');
const distRoot = `${repoRoot}/apps/web/dist`;

const openSamplesPage = (url = baseUrl) =>
  url
    ? `${url.replace(/\/$/, '')}/samples/#/airbnb-review`
    : pathToFileURL(`${distRoot}/samples/index.html`).toString();

const assert = (condition: boolean, message: string): asserts condition => {
  if (!condition) {
    throw new Error(message);
  }
};

const readSamplesHtml = () => readFile(`${distRoot}/samples/index.html`, 'utf-8');
const readSamplesBundle = async () => {
  const html = await readSamplesHtml();
  const src = html.match(/src="([^"]*\/assets\/[^"]+\.js)"/)?.[1];

  assert(src, 'Samples HTML does not reference a built JavaScript asset');

  return readFile(`${distRoot}${src}`, 'utf-8');
};

const assertStaticAsset = async (path: string) => {
  await access(`${distRoot}/samples/static/${path}`);
};

const contentTypes: Record<string, string> = {
  '.html': 'text/html',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const startServer = async () => {
  const server = createServer(async (request, response) => {
    const url = new URL(request.url || '/', 'http://localhost');
    const requestedPath =
      url.pathname === '/' || url.pathname.endsWith('/')
        ? `${url.pathname}index.html`
        : url.pathname;
    const filePath = normalize(join(distRoot, requestedPath));

    if (!filePath.startsWith(distRoot)) {
      response.writeHead(403);
      response.end();
      return;
    }

    try {
      response.setHeader(
        'Content-Type',
        contentTypes[extname(filePath)] || 'application/octet-stream'
      );
      response.end(await readFile(filePath));
    } catch {
      response.writeHead(404);
      response.end();
    }
  });

  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));

  const address = server.address();
  assert(address && typeof address === 'object', 'Local samples server did not start');

  return {
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
    url: `http://127.0.0.1:${address.port}`
  };
};

const collectFailures = async (page: Page, url = baseUrl) => {
  const failures: { status: number; url: string }[] = [];

  page.on('response', (response) => {
    const url = response.url();

    if (new URL(url).origin === new URL(page.url()).origin && response.status() >= 400) {
      failures.push({ status: response.status(), url });
    }
  });

  await page.goto(openSamplesPage(url), { waitUntil: 'networkidle' });

  return failures;
};

const main = async () => {
  const html = await readSamplesHtml();

  assert(
    html.includes('src="/samples/assets/'),
    'Samples HTML does not reference the hosted /samples asset path'
  );
  assert(html.includes('href="/favicon.svg"'), 'Samples HTML does not reference the web favicon');

  const bundle = await readSamplesBundle();
  assert(
    bundle.includes('static/airbnb-logo.png'),
    'Samples bundle does not include Airbnb static asset references'
  );
  assert(
    !bundle.includes('src=\\"https://jsx.email/assets/samples/'),
    'Samples bundle includes rendered image URLs for the removed /assets/samples path'
  );
  assert(
    bundle.includes('/static/apple-logo.png'),
    'Samples bundle does not include rewritten Apple static asset references'
  );
  assert(bundle.includes('"/samples/"'), 'Samples bundle does not include the /samples/ base path');
  await assertStaticAsset('airbnb-logo.png');
  await assertStaticAsset('batman-twilight.jpg');

  const localServer = baseUrl ? null : await startServer();
  const pageUrl = baseUrl || localServer!.url;

  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { height: 900, width: 1280 }
    });
    const page = await context.newPage();
    const failures = await collectFailures(page, pageUrl);
    const fileCount = await page
      .locator('#templates-window span')
      .filter({ hasText: /files$/ })
      .first()
      .textContent();

    assert(
      failures.length === 0,
      `Samples page has failing local requests: ${JSON.stringify(failures)}`
    );
    assert(fileCount === '21 files', `Samples app did not load templates: ${fileCount}`);

    console.log(JSON.stringify({ failures, fileCount, url: openSamplesPage(pageUrl) }, null, 2));
  } finally {
    await browser.close();
    await localServer?.close();
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
