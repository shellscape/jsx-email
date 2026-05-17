import { chromium } from 'playwright';

const defaultUrl = 'http://localhost:8789';
const defaultPath = '/tmp/preview-line-numbers.png';

function getArg(name: string, fallback: string) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : (process.argv[index + 1] ?? fallback);
}

async function main() {
  const url = getArg('--url', defaultUrl);
  const path = getArg('--path', defaultPath);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    deviceScaleFactor: 2,
    viewport: { height: 900, width: 1280 }
  });

  await page.goto(`${url}?lineNumbers=${Date.now()}`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { exact: true, name: 'Google Play Policy Update' }).click();
  await page.waitForTimeout(900);
  await page.getByRole('tab', { exact: true, name: 'JSX' }).click();
  await page.waitForTimeout(300);

  const card = page.locator('main article').filter({ hasText: 'Google Play Policy Update' });
  await card.screenshot({ path });

  const lineNumbers = await card.locator('.code-line-number').count();
  const firstLine = await card.locator('.code-line-number').first().textContent();
  const hasCodeContent = (await card.locator('.code-line-content').count()) > 0;
  await browser.close();

  console.log(JSON.stringify({ firstLine, hasCodeContent, lineNumbers, path }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
