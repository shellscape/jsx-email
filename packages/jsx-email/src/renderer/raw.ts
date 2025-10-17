import type { Comment, Content, Element, Literal, Parents, Root } from 'hast';

interface Match {
  index: number;
  node: Element;
  parent: Parents;
}

export interface ParentWithRaw {
  children: (Content | Raw)[];
}

// `raw` is an unofficial HAST node used by rehype to pass through HTML verbatim.
// Model it locally to avoid `any` casts while keeping the rest of the tree typed.
export interface Raw extends Literal {
  type: 'raw';
  value: string;
}

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
      const matches: Match[] = [];

      visit(tree, 'element', (node, index, parent) => {
        if (!parent || typeof index !== 'number') return;
        if (node.tagName !== 'jsx-email-raw') return;

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
          // The Raw component renders a single HTML comment child containing the
          // escaped raw content. Extract it and unescape back to the original.
          const commentChild = node.children.find((c): c is Comment => c.type === 'comment');

          if (commentChild) {
            const rawHtml = unescapeForRawComponent(commentChild.value);

            // Replace the wrapper element with a `raw` node to inject HTML verbatim.
            // rehype-stringify will pass this through when `allowDangerousHtml: true`.
            const rawNode: Raw = { type: 'raw', value: rawHtml };
            (parent as ParentWithRaw).children.splice(index, 1, rawNode);
          } else {
            // Fallback: no comment child (unexpected). Unwrap the wrapper by
            // splicing its children directly to ensure no <jsx-email-raw> tags
            // remain in output.
            (parent as ParentWithRaw).children.splice(index, 1, ...(node.children as Content[]));
          }
        }
      }
    };
  };
};
