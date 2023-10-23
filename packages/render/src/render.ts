import { convert } from 'html-to-text';
import pretty from 'pretty';

import { jsxToString } from './jsx-to-string';

export interface Options {
  plainText?: boolean;
  pretty?: boolean;
}

export const render = (component: React.ReactElement, options?: Options) => {
  if (options?.plainText) {
    return renderAsPlainText(component, options);
  }
  const doctype =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
  const markup = jsxToString(component);
  const document = `${doctype}${markup}`;

  if (options && options.pretty) {
    return pretty(document);
  }

  return document;
};

export const renderAsync = async (component: React.ReactElement, options?: Options) =>
  render(component, options);

const renderAsPlainText = (component: React.ReactElement, _options?: Options) =>
  convert(jsxToString(component), {
    selectors: [
      { format: 'skip', selector: 'img' },
      { format: 'skip', selector: '[data-id="@jsx-email/preview"]' }
    ]
  });
