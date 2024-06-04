import type { Element, Parents, Root } from 'hast';

interface ElementWithParent extends Element {
  index: number;
  parent: Parents;
}

export const getMovePlugin = async () => {
  const { visit } = await import('unist-util-visit');

  return function moveStylePlugin() {
    return function move(tree: Root) {
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
          (node.parent as Element).children.splice(node.index, 1);
        }
      }
    };
  };
};
