import { pluginSymbol, type JsxEmailPlugin } from 'jsx-email';
import type { Element, Parents, Root } from 'hast';
import type { Plugin } from 'unified';

interface ElementWithParent extends Element {
  index: number;
  parent: Parents;
}

export const plugin: JsxEmailPlugin = {
  name: 'root/style',
  process: async () => {
    const { visit } = await import('unist-util-visit');

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
    } as Plugin;
  },

  symbol: pluginSymbol
};
