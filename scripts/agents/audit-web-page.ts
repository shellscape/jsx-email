import { chromium, type Page } from 'playwright';

const getArg = (name: string, fallback?: string) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
};

const url = getArg('--url', 'https://jsx.email/');

type BadResponse = {
  status: number;
  url: string;
};

type ConsoleMessage = {
  location: string;
  text: string;
  type: string;
};

const collectPageSignals = async (page: Page) => {
  const badResponses: BadResponse[] = [];
  const consoleMessages: ConsoleMessage[] = [];
  const failedRequests: { error: string | undefined; url: string }[] = [];
  const pageErrors: string[] = [];

  page.on('console', (message) => {
    if (message.type() !== 'error' && message.type() !== 'warning') return;

    const location = message.location();
    consoleMessages.push({
      location: `${location.url}:${location.lineNumber}:${location.columnNumber}`,
      text: message.text(),
      type: message.type()
    });
  });

  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });

  page.on('requestfailed', (request) => {
    failedRequests.push({
      error: request.failure()?.errorText,
      url: request.url()
    });
  });

  page.on('response', (response) => {
    if (response.status() < 400) return;

    badResponses.push({
      status: response.status(),
      url: response.url()
    });
  });

  await page.goto(url, { timeout: 45_000, waitUntil: 'networkidle' });
  await page.waitForTimeout(1_000);

  return {
    badResponses,
    consoleMessages,
    failedRequests,
    pageErrors,
    title: await page.title(),
    url: page.url()
  };
};

const main = async () => {
  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { height: 900, width: 1280 }
    });
    const page = await context.newPage();
    const signals = await collectPageSignals(page);

    console.log(JSON.stringify(signals, null, 2));

    if (
      signals.badResponses.length > 0 ||
      signals.failedRequests.length > 0 ||
      signals.pageErrors.length > 0
    ) {
      process.exitCode = 1;
    }
  } finally {
    await browser.close();
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
