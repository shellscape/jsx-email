import { EOL } from 'node:os';

import diffableHTML from 'diffable-html';
import dedent from 'dedent';
import type { Locator } from '@playwright/test';

const cleanHTML = (html: string) =>
  diffableHTML(dedent(html))
    .trim()
    // Consistent line-endings are important
    .replace(/\r?\n/g, EOL)
    // The .replace removes some playwright locator gunk that slips in otherwise
    .replace(/\r?\n^\s*__playwright_target__.+$/m, '')
    .replace(/@fs\/(.+)\/apps/g, '@fs/<path-removed>/apps');

interface GetHtmlOptions {
  deep: boolean;
}

const getHTML = async (locator: string | Locator, options?: GetHtmlOptions) => {
  if (typeof locator === 'string') {
    return cleanHTML(locator);
  }

  const { deep = true } = options || { deep: false };
  const raw = await locator.evaluate((node, d) => {
    const tgt = d ? node : (node as any).cloneNode();

    return tgt.outerHTML;
  }, deep);

  return cleanHTML(raw);
};

export { getHTML, cleanHTML };
