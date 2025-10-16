import type { Element, Parents, Root } from 'hast';

const START_TAG = '__COMMENT_START';
const END_TAG = '__COMMENT_END';
export function escapeForRawComponent(input: string): string {
  // escape comment sequences
  return input.replace(/<!--/g, START_TAG).replace(/-->/g, END_TAG);
}

export function unescapeForRawComponent(input: string): string {
  return input
    .replace(new RegExp(START_TAG, 'g'), '<!--')
    .replace(new RegExp(END_TAG, 'g'), '/-->');
}

/**
 * Returns a rehype plugin that replaces `<jsx-email-raw><!--...--></jsx-email-raw>`
 * elements with a raw HTML node using the original, unescaped content.
 *
 * Mirrors the async factory pattern used by `getMovePlugin()`.
 */
export const getRawPlugin = async () => {
  const { visit } = await import('unist-util-visit');

  return function rawPlugin() {
    return function transform(tree: Root) {
      interface Match {
        index: number;
        node: Element;
        parent: Parents;
      }
      const matches: Match[] = [];

      visit(tree, 'element', (node, index, parent) => {
        if (!parent || typeof index !== 'number') return;
        if (node.tagName !== 'jsx-email-raw') return;

        matches.push({ index, node: node as Element, parent });
      });

      for (const { node, parent, index } of matches) {
        // The Raw component renders a single HTML comment child containing the
        // escaped raw content. Extract it and unescape back to the original.
        const commentChild = node.children.find((c: any) => c.type === 'comment') as
          | { type: 'comment'; value: string }
          | undefined;

        if (commentChild) {
          const rawHtml = unescapeForRawComponent(commentChild.value);

          // Replace the wrapper element with a `raw` node to inject HTML verbatim.
          // rehype-stringify will pass this through when `allowDangerousHtml: true`.
          (parent as any).children.splice(index, 1, {
            // `raw` is not part of the typed HAST nodes; cast to `any` to avoid
            // importing additional types or changing configs.
            type: 'raw',
            value: rawHtml
          } as any);
        }
      }
    };
  };
};
