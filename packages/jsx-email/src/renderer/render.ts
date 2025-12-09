import { htmlToText } from 'html-to-text';

import { type JsxEmailConfig, defineConfig, loadConfig, mergeConfig } from '../config.js';
import { callHook, callProcessHook } from '../plugins.js';
import type { PlainTextOptions, RenderOptions } from '../types.js';

import { getConditionalPlugin } from './conditional.js';
import { jsxToString } from './jsx-to-string.js';
import { getMovePlugin } from './move-style.js';
import { getRawPlugin, unescapeForRawComponent } from './raw.js';

export const jsxEmailTags = ['jsx-email-cond'];

export const renderPlainText = async (
  component: React.ReactElement,
  options?: PlainTextOptions
) => {
  const { formatters, selectors } = options || {};

  const result = await jsxToString(component);
  return htmlToText(result, {
    formatters: {
      raw: (elem, _walk, builder) => {
        if (elem.children.length && elem.children[0].type === 'comment') {
          builder.addInline(unescapeForRawComponent(elem.children[0].data!.trim()));
        }
      },
      ...formatters
    },

    selectors: [
      { format: 'skip', selector: 'img' },
      { format: 'skip', selector: '[data-skip="true"]' },
      { options: { linkBrackets: false }, selector: 'a' },
      {
        format: 'raw',
        options: {},
        selector: 'jsx-email-raw'
      },
      ...(selectors || [])
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

  const renderOptions = { render: options };

  if (options) {
    // Note: structuredClone chokes on symbols
    const { symbol: _, ...cloneTarget } = config as any;
    const merged = await mergeConfig(cloneTarget, renderOptions);

    config = await defineConfig(merged);
  }

  let html = await jsxToString(component);

  html = await callHook({ config, hookType: 'beforeRender', html });
  html = await processHtml(config, html);
  html = await callHook({ config, hookType: 'afterRender', html });
  return html;
};

const processHtml = async (config: JsxEmailConfig, html: string) => {
  const { rehype } = await import('rehype');
  const { default: stringify } = await import('rehype-stringify');
  const docType =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
  const movePlugin = await getMovePlugin();
  const rawPlugin = await getRawPlugin();
  const conditionalPlugin = await getConditionalPlugin();
  const settings = { emitParseErrors: true };
  // Remove any stray jsx-email markers (with or without attributes)
  const reJsxTags = new RegExp(`<[/]?(${jsxEmailTags.join('|')})(?:\\s[^>]*)?>`, 'g');

  // @ts-ignore: This is perfectly valid, see here: https://www.npmjs.com/package/rehype#examples
  const processor = rehype().data('settings', settings);

  processor.use(movePlugin);
  processor.use(rawPlugin);
  // Ensure conditional processing happens after raw hoisting
  processor.use(conditionalPlugin);
  await callProcessHook({ config, processor });

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
