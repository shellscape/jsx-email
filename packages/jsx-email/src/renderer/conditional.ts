import type { Content, Element, Parents, Root } from 'hast';

import { OFFICE_SETTINGS_XML } from './constants.js';

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
        const isCustomMarker = node.tagName === 'jsx-email-cond';
        const isMetaMarker =
          node.tagName === 'meta' &&
          (typeof (node.properties as any)?.['data-jsx-email-cond'] !== 'undefined' ||
            typeof (node.properties as any)?.dataJsxEmailCond !== 'undefined');
        if (!isCustomMarker && !isMetaMarker) return;

        const props = (node.properties || {}) as Record<string, unknown>;
        const msoProp = (props['data-mso'] ?? (props as any).dataMso) as unknown;
        const exprRaw = props['data-expression'] ?? (props as any).dataExpression;
        const hasMso = typeof msoProp !== 'undefined';
        const hasExpr = typeof exprRaw === 'string' && exprRaw.trim() !== '';

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
          const exprSource = props['data-expression'] ?? (props as any).dataExpression;
          const expr = typeof exprSource === 'string' ? exprSource.trim() : void 0;
          const msoRaw = props['data-mso'] ?? (props as any).dataMso;

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

          if (node.tagName === 'meta') {
            // Only inject the Office XML when explicitly targeting MSO and
            // not using an arbitrary expression.
            const shouldInjectOfficeXml = !expr && String(msoRaw) === 'true';
            const inner = shouldInjectOfficeXml ? OFFICE_SETTINGS_XML : '';
            const block: RawNode = { type: 'raw', value: `${start}${inner}${end}` };
            (parent as ParentWithRaw).children.splice(index, 1, block);
          } else {
            // Preserve children as HAST nodes so downstream plugins can still
            // operate on them; only the boundary comments are raw.
            const startRaw: RawNode = { type: 'raw', value: start };
            const endRaw: RawNode = { type: 'raw', value: end };
            const children = (node.children as Content[]) || [];
            (parent as ParentWithRaw).children.splice(index, 1, startRaw, ...children, endRaw);
          }
        }
      }
    };
  };
};
