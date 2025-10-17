import type { Element, Root } from 'hast';

/**
 * Returns a rehype plugin that enforces that `<jsx-email-cond>` elements are
 * not nested. This plugin does not perform any transformation or serialization
 * of conditionals. In the current renderer, conditional comments are produced
 * by the legacy `jsxToString()` path and any `<jsx-email-cond>` wrappers are
 * stripped later in the pipeline.
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
