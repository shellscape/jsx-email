import type { Content, Element, Parents, Root } from 'hast';

interface Match {
  index: number;
  node: Element;
  parent: Parents;
}

interface RawNode {
  type: 'raw';
  value: string;
}

interface ParentWithRaw {
  children: (Content | RawNode)[];
}

/**
 * Returns a rehype plugin that replaces `<jsx-email-cond>` wrappers carrying
 * `data-mso` or `data-expression` with a single raw HTML block containing the
 * appropriate conditional comment and serialized children.
 *
 * Mirrors the async factory pattern used by other renderer plugins.
 */
export const getConditionalPlugin = async () => {
  const { visit } = await import('unist-util-visit');

  return function conditionalPlugin() {
    return function transform(tree: Root) {
      const matches: Match[] = [];

      visit(tree, 'element', (node, index, parent) => {
        if (!parent || typeof index !== 'number') return;
        if (node.tagName !== 'jsx-email-cond') return;

        const props = (node.properties || {}) as Record<string, unknown>;
        const hasMso = typeof props['data-mso'] !== 'undefined';
        const hasExpr = typeof props['data-expression'] !== 'undefined';

        // Only transform wrappers that explicitly declare intent via data-*.
        if (!hasMso && !hasExpr) return;

        matches.push({ index, node, parent });
      });

      // Group by parent and splice in descending index order to avoid index invalidation
      const byParent = new Map<Parents, Match[]>();
      for (const m of matches) {
        (byParent.get(m.parent) ?? byParent.set(m.parent, []).get(m.parent)!).push(m);
      }

      for (const [parent, list] of byParent) {
        list.sort((a, b) => b.index - a.index);

        for (const { node, index } of list) {
          const props = (node.properties || {}) as Record<string, unknown>;
          const expr = (props['data-expression'] as string | undefined)?.trim();
          const msoRaw = props['data-mso'];

          let start = '';
          let end = '';

          if (expr) {
            start = `<!--[if ${expr}]>`;
            end = '<![endif]-->';
          } else if (String(msoRaw) === 'false') {
            start = '<!--[if !mso]><!-->';
            end = '<!--<![endif]-->';
          } else {
            start = '<!--[if mso]>';
            end = '<![endif]-->';
          }

          // Children are already HAST nodes representing HTML; no need to stringify.
          // Replace the wrapper element with start comment, original children, and end comment.
          const startRaw: RawNode = { type: 'raw', value: start };
          const endRaw: RawNode = { type: 'raw', value: end };
          const children = (node.children as Content[]) || [];
          (parent as ParentWithRaw).children.splice(index, 1, startRaw, ...children, endRaw);
        }
      }
    };
  };
};
