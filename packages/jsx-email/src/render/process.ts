// Note: For some reason CI has a hard time with this, even though the dependency is installed, and
// it builds locally fine
// @ts-ignore
import type { Element, Parents, Root } from 'hast';
import prettyHtml from 'pretty';

import type { ProcessOptions } from '../types';

export { prettyHtml };

export const jsxEmailTags = ['jsx-email-cond'];

export const processHtml = async ({ html, minify, pretty }: ProcessOptions) => {
  const { rehype } = await import('rehype');
  const { default: stringify } = await import('rehype-stringify');
  const { visit } = await import('unist-util-visit');
  const docType =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
  const settings = {
    emitParseErrors: true
    // fragment: true
  };
  const reJsxTags = new RegExp(`<[/]?(${jsxEmailTags.join('|')})>`, 'g');

  function rehypeMoveStyle() {
    return function (tree: Root) {
      const matches: Array<[Parents, Element]> = [];
      let head: Element | undefined;

      visit(tree, 'element', (node, _, parent) => {
        if (node.tagName === 'head') {
          head = node;
        }

        if (
          parent &&
          node.tagName === 'style' &&
          (parent.type !== 'element' || parent.tagName !== 'head')
        ) {
          matches.push([parent, node]);
        }
      });

      if (head) {
        let index = -1;

        // eslint-disable-next-line no-plusplus
        while (++index < matches.length) {
          const match = matches[index];
          const siblings = match[0].children;
          siblings.splice(siblings.indexOf(match[1]), 1);
          head.children.push(match[1]);
        }
      }
    };
  }

  let processor = rehype().data('settings', settings).use(rehypeMoveStyle);

  if (minify) {
    const { default: rehypeMinify } = await import('rehype-preset-minify');
    processor = processor.use(rehypeMinify);
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

  if (pretty) result = prettyHtml(result);

  return result;
};
