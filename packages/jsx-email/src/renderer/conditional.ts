import type { Content, Element, Parents, Root } from 'hast';
import { visit, EXIT, CONTINUE } from 'unist-util-visit';

type ParentWithChildren = Parents & { children: Content[] };

/**
 * Returns a rehype plugin that:
 * - forbids nested `<jsx-email-cond>` elements (throws on detection); and
 * - unwraps each `<jsx-email-cond>` by replacing it with its children.
 *
 * The Conditional component renders a temporary `<jsx-email-cond>` wrapper
 * around already-stringified conditional comment content. This plugin removes
 * that wrapper so we don't rely on brittle regex replacement later in the
 * pipeline.
 */
export const getConditionalPlugin = () =>
  function conditionalPlugin() {
    return function transform(tree: Root) {
      // Gather matches with parent/index for safe, ordered mutation.
      const matches: Array<{ index: number; node: Element; parent: Parents }> = [];

      visit(tree, 'element', (node, index, parent) => {
        if (!parent || typeof index !== 'number') return;
        if ((node as Element).tagName !== 'jsx-email-cond') return;

        // Enforce: no nested <jsx-email-cond> inside this node.
        let nested = false;
        visit(node, 'element', (child) => {
          if (child !== node && (child as Element).tagName === 'jsx-email-cond') {
            nested = true;
            return EXIT;
          }
          return CONTINUE;
        });

        if (nested) {
          throw new RangeError(
            'jsx-email: Nested <Conditional> is not supported. Flatten your conditionals into a single block.'
          );
        }

        matches.push({ index, node: node as Element, parent });
      });

      // Unwrap by parent in descending index order to avoid index invalidation
      // when multiple siblings are replaced under the same parent.
      const byParent = new Map<Parents, Array<{ index: number; node: Element }>>();
      for (const { parent, index, node } of matches) {
        const arr = byParent.get(parent) ?? [];
        arr.push({ index, node });
        byParent.set(parent, arr);
      }

      for (const [parent, items] of byParent) {
        items.sort((a, b) => b.index - a.index);
        for (const { index, node } of items) {
          const children = (node.children as Content[]) ?? [];
          (parent as ParentWithChildren).children.splice(index, 1, ...children);
        }
      }
    };
  };
