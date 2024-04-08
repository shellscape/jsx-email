import { htmlToText } from 'html-to-text';

import type { PlainTextOptions, RenderOptions } from '../types';

import { defineConfig, loadConfig } from '../config';

import { jsxToString } from './jsx-to-string';

export const jsxEmailTags = ['jsx-email-cond'];

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
  let config = await loadConfig();
  if (config.render.plainText || options?.plainText)
    return renderPlainText(
      component,
      typeof options?.plainText === 'object' ? options.plainText : {}
    );

  const { default: merge } = await import('defaults');
  const renderOptions = { render: options };

  if (options) {
    config = await defineConfig(merge(config as any, renderOptions));
  }

  let html = await jsxToString(component);

  for (const plugin of config.plugins) {
    // eslint-disable-next-line no-await-in-loop
    if (plugin.beforeRender) html = await plugin.beforeRender(html);
  }

  html = await processHtml(html);

  for (const plugin of config.plugins) {
    // eslint-disable-next-line no-await-in-loop
    if (plugin.afterRender) html = await plugin.afterRender(html);
  }

  return html;
};

export const processHtml = async (html: string) => {
  const config = await loadConfig();
  const { rehype } = await import('rehype');
  const { default: stringify } = await import('rehype-stringify');
  const docType =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
  const settings = { emitParseErrors: true };
  const reJsxTags = new RegExp(`<[/]?(${jsxEmailTags.join('|')})>`, 'g');
  const processor = rehype().data('settings', settings);

  for (const plugin of config.plugins) {
    if (plugin.process) {
      // eslint-disable-next-line no-await-in-loop
      const pluggable = await plugin.process();
      processor.use(pluggable as any);
    }
  }

  const doc = await processor
    .use(stringify, {
      allowDangerousCharacters: true,
      allowDangerousHtml: true,
      closeEmptyElements: true,
      collapseEmptyAttributes: true
    })
    .process(html);

  let result = docType + String(doc).replace('<!doctype html>', '').replace('<head></head>', '');

  result = result.replace(reJsxTags, '');

  return result;
};
