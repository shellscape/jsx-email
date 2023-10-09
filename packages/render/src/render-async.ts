import { jsxToString } from '@jsx-email/jsx-to-string';
import { convert } from 'html-to-text';
import pretty from 'pretty';
import { type ReactNode } from 'react';

export const renderToString = async (children: ReactNode) => {
  const html = jsxToString(children);
  return (
    html
      // Remove leading doctype because we add it manually
      .replace(/^<!DOCTYPE html>/, '')
      // Remove empty comments to match the output of renderToStaticMarkup
      .replace(/<!-- -->/g, '')
  );
};

export const renderAsync = async (
  component: React.ReactElement,
  options?: {
    plainText?: boolean;
    pretty?: boolean;
  }
) => {
  const markup = await renderToString(component);

  if (options?.plainText) {
    return convert(markup, {
      selectors: [
        { format: 'skip', selector: 'img' },
        { format: 'skip', selector: '[data-id="@jsx-email/preview"]' }
      ]
    });
  }

  const doctype =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

  const document = `${doctype}${markup}`;

  if (options?.pretty) return pretty(document);

  return document;
};
