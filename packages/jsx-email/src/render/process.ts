import { minifyPreset } from '@jsx-email/minify-preset';
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
  const settings = { emitParseErrors: true };
  const reJsxTags = new RegExp(`<[/]?(${jsxEmailTags.join('|')})>`, 'g');

  interface ElementWithParent extends Element {
    index: number;
    parent: Parents;
  }

  function rehypeMoveStyle() {
    return function moveStyle(tree: Root) {
      const matches: ElementWithParent[] = [];
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
          const found: ElementWithParent = node as any;
          found.parent = parent;
          found.index = parent.children.indexOf(node);
          matches.push(found);
        }
      });

      if (head) {
        head.children.push(...matches);

        for (const node of matches) {
          node.parent.children.splice(node.index, 1);
        }
      }
    };
  }

  let processor = rehype().data('settings', settings).use(rehypeMoveStyle);
  if (minify) {
    const preset = await minifyPreset();
    processor = processor.use(preset);
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
