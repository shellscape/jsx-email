import type { Element, Root } from 'hast';

/**
 * Returns a rehype plugin that replaces `<jsx-email-cond>` marker elements with a
 * single `raw` node containing the appropriate conditional comment wrapper and
 * the stringified children.
 *
 * The plugin also rejects nested `<jsx-email-cond>` elements since nested
 * `<!--[if ...]>` blocks are not supported and lead to fragile markup.
 */
export const getConditionalPlugin = async () => {
  const { visit, EXIT } = await import('unist-util-visit');

  return function conditionalPlugin() {
    return function transform(tree: Root) {
      // Only enforce the nested-Conditional rule. Transformation is handled
      // elsewhere (legacy jsxToString path) and wrappers are stripped later.
      visit(tree, 'element', (node) => {
        if ((node as Element).tagName !== 'jsx-email-cond') return;

        let nested = false;
        visit(node, 'element', (child) => {
          if (child !== node && (child as Element).tagName === 'jsx-email-cond') {
            nested = true;
            return EXIT;
          }
          return void 0;
        });

        if (nested) {
          throw new RangeError(
            'jsx-email: Nested <Conditional> is not supported. Flatten your conditionals into a single block.'
          );
        }
      });
    };
  };
};
