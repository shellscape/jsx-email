import { convert } from 'html-to-text';

import type { RenderOptions } from './types';
import { jsxToString } from './jsx-to-string';
import { processHtml } from './process';

export const renderPlainText = async (
  component: React.ReactElement,
  /**
   * @deprecated `options` will be removed in the next major version
   */
  _options?: RenderOptions
) => {
  const result = await jsxToString(component);
  return convert(result, {
    selectors: [
      { format: 'skip', selector: 'img' },
      { format: 'skip', selector: '[data-id="@jsx-email/preview"]' }
    ]
  });
};

export const render = async (component: React.ReactElement, options?: RenderOptions) => {
  const { minify = false, plainText, pretty = false, strip = true } = options || {};

  if (plainText) return renderPlainText(component, options);

  let html = await jsxToString(component);

  html = await processHtml({ html, minify, pretty, strip });

  return html;
};
