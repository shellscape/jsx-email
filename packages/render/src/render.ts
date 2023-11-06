import { load } from 'cheerio';
import { minify as minifyHtml } from 'html-minifier-terser';
import { convert } from 'html-to-text';
import prettyHtml from 'pretty';

import { jsxToString } from './jsx-to-string';

export interface Options {
  minify?: boolean;
  plainText?: boolean;
  pretty?: boolean;
  strip?: boolean;
}

const cheeioOptions = { xml: { decodeEntities: false }, xmlMode: true };

const combineHeads = (html: string) => {
  const $ = load(html, cheeioOptions);
  const $heads = $('head');

  if ($heads.length <= 1) return html;

  const $first = $($heads.get(0));
  const $others = $heads.slice(1);
  const firstHtml = $first.html()!;
  const othersHtml = $others.html()!;

  $others.remove();
  $first.html(firstHtml + othersHtml);

  return $.html()!;
};

const stripHtml = (html: string) => {
  const $ = load(html, cheeioOptions);

  $('*').removeAttr('data-id');

  return $.html()!;
};

const renderPlainText = (component: React.ReactElement, _options?: Options) =>
  convert(jsxToString(component), {
    selectors: [
      { format: 'skip', selector: 'img' },
      { format: 'skip', selector: '[data-id="@jsx-email/preview"]' }
    ]
  });

export const render = async (component: React.ReactElement, options?: Options) => {
  const { minify, plainText, pretty, strip = true } = options || {};

  if (plainText) return renderPlainText(component, options);

  const doctype =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
  const markup = jsxToString(component);
  let html = `${doctype}${markup}`;

  html = combineHeads(html);

  if (minify) html = await minifyHtml(html);
  if (pretty) html = prettyHtml(html);
  if (strip) html = stripHtml(html);

  return html;
};
