import type { Element, Parents, Root } from 'hast';
import prettyHtml from 'pretty';

import type { ProcessOptions } from './types';

export { prettyHtml };

export const processHtml = async ({ html, minify, pretty, strip }: ProcessOptions) => {
  const { rehype } = await import('rehype');
  const { default: stringify } = await import('rehype-stringify');
  const { visit } = await import('unist-util-visit');
  const docType =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

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

  function rehypeRemoveDataId() {
    return function (tree: Root) {
      visit(tree, 'element', (node) => {
        // eslint-disable-next-line guard-for-in
        for (const prop in node.properties) {
          if (Object.hasOwn(node.properties, prop)) {
            if (prop === 'dataId') node.properties[prop] = undefined;
          }
        }
      });
    };
  }

  let processor = rehype().use(rehypeMoveStyle);

  if (strip) processor = processor.use(rehypeRemoveDataId);
  if (minify) {
    const { default: rehypeMinify } = await import('rehype-preset-minify');
    processor = processor.use(rehypeMinify);
  }

  const doc = await processor.use(stringify, { allowDangerousCharacters: true }).process(html);
  let result = docType + String(doc).replace('<!doctype html>', '').replace('<head></head>', '');

  if (pretty) result = prettyHtml(result);

  return result;
};
