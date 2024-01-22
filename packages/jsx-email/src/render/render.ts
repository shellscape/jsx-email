import { htmlToText } from 'html-to-text';

import type { PlainTextOptions, RenderOptions } from '../types';

import { jsxToString } from './jsx-to-string';
import { processHtml } from './process';

export const renderPlainText = async (
  component: React.ReactElement,
  options?: PlainTextOptions
) => {
  const result = await jsxToString(component);
  return htmlToText(result, {
    selectors: [
      { format: 'skip', selector: 'img' },
      { format: 'skip', selector: '[data-skip="true"]' },
      { options: { linkBrackets: false }, selector: 'a' }
    ],
    ...options
  });
};

export const render = async (component: React.ReactElement, options?: RenderOptions) => {
  const { minify = false, plainText, pretty = false } = options || {};

  if (plainText) return renderPlainText(component, typeof plainText === 'object' ? plainText : {});

  let html = await jsxToString(component);

  html = await processHtml({ html, minify, pretty });

  return html;
};
