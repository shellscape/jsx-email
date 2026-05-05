import { chromium } from 'playwright';

const url = process.env.PREVIEW_PACKED_URL || 'http://localhost:8788';
const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { height: 900, width: 1280 } });

const errors: string[] = [];
const failedResponses: string[] = [];
page.on('console', (message) => {
  if (message.type() === 'error' && !message.text().includes('404')) errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(error.message));
page.on('response', (response) => {
  const { pathname } = new URL(response.url());
  if (response.status() >= 400 && pathname !== '/favicon.ico') {
    failedResponses.push(`${response.status()} ${pathname}`);
  }
});

await page.goto(`${url}?check=${Date.now()}`, { waitUntil: 'networkidle' });
await page.waitForSelector('#templates-window');

const result = await page.evaluate(() => {
  const fileCount = document.querySelector('#templates-window')?.textContent?.match(/\d+ files/i);
  const treeButtons = document.querySelectorAll('#templates-window button').length;
  const mainScript = document.querySelector<HTMLScriptElement>('script[src="/main.js"]');
  const inlineStyle = document.querySelector('style')?.textContent || '';

  return {
    fileCount: fileCount?.[0] || null,
    hasInlineStyles: inlineStyle.includes('--bg') && inlineStyle.includes('.templates-window'),
    hasMainScript: Boolean(mainScript),
    treeButtons
  };
});

await browser.close();

if (!result.hasMainScript) throw new TypeError('Packed app did not load /main.js.');
if (!result.hasInlineStyles) throw new TypeError('Packed app did not inline compiled styles.');
if (!result.fileCount) throw new TypeError('Packed app did not render a fixture file count.');
if (result.treeButtons < 1) throw new TypeError('Packed app did not render the file tree.');
if (failedResponses.length) throw new TypeError(failedResponses.join('\n'));
if (errors.length) throw new TypeError(errors.join('\n'));

console.log(JSON.stringify(result, null, 2));
