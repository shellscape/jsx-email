import type { Content, Element, Parents, Root } from 'hast';

import type { ParentWithRaw, Raw } from './raw.js';

/**
 * Returns a rehype plugin that replaces `<jsx-email-cond>` marker elements with a
 * single `raw` node containing the appropriate conditional comment wrapper and
 * the stringified children.
 *
 * The plugin also rejects nested `<jsx-email-cond>` elements since nested
 * `<!--[if ...]>` blocks are not supported and lead to fragile markup.
 */
export const getConditionalPlugin = async () => {
  const { visit } = await import('unist-util-visit');
  const { rehype } = await import('rehype');
  const { default: stringify } = await import('rehype-stringify');

  const stringifier = rehype().use(stringify, {
    allowDangerousCharacters: true,
    allowDangerousHtml: true,
    closeEmptyElements: true,
    collapseEmptyAttributes: true
  });

  return function conditionalPlugin() {
    return function transform(tree: Root) {
      const matches: Array<{ index: number; node: Element; parent: Parents }> = [];

      visit(tree, 'element', (node, index, parent) => {
        if (!parent || typeof index !== 'number') return;
        if ((node as Element).tagName !== 'jsx-email-cond') return;
        const props = ((node as Element).properties ?? {}) as Record<string, unknown>;
        const hasMarkerAttrs =
          Object.prototype.hasOwnProperty.call(props, 'data-mso') ||
          Object.prototype.hasOwnProperty.call(props, 'data-expression');
        if (!hasMarkerAttrs) return;
        matches.push({ index, node: node as Element, parent });
      });

      for (const { parent, index, node } of matches) {
        // Guard: disallow nested <Conditional>
        let nested = false;
        visit(node, 'element', (child) => {
          if (child !== node && (child as Element).tagName === 'jsx-email-cond') {
            nested = true;
          }
        });
        if (nested) {
          throw new RangeError(
            'jsx-email: Nested <Conditional> is not supported. Flatten your conditionals into a single block.'
          );
        }

        const props = (node.properties ?? {}) as Record<string, unknown>;
        const msoAttr = props['data-mso'];
        const msoStr =
          typeof msoAttr === 'boolean' ? String(msoAttr) : (msoAttr as string | undefined);
        const expr =
          (props['data-expression'] as string | undefined) ??
          (msoStr && msoStr !== 'false' ? 'mso' : void 0);

        // Only transform nodes that opted into plugin-mode. If neither
        // `data-mso` nor `data-expression` are present, this is a legacy
        // wrapper carrying pre-rendered HTML; leave it intact so snapshots
        // remain unchanged.
        const hasDirective = msoStr !== undefined || props['data-expression'] !== undefined;
        if (!hasDirective) {
          // legacy wrapper: do nothing
          (parent as ParentWithRaw).children[index] = node as any;
        } else {
          const open = msoStr === 'false' ? '<!--[if !mso]><!-->' : `<!--[if ${expr || 'mso'}]>`;
          const close = msoStr === 'false' ? '<!--<![endif]-->' : '<![endif]-->';

          // Preserve `raw` children exactly as-is to avoid HTML serializer
          // normalizing case or formatting (important for MSO XML tags).
          const parts: string[] = [];
          for (const child of node.children as Content[]) {
            if ((child as any).type === 'raw' && typeof (child as any).value === 'string') {
              parts.push((child as any).value as string);
            } else {
              parts.push(
                String(stringifier.stringify({ children: [child], type: 'root' } as Root))
              );
            }
          }
          const inner = parts.join('');

          const rawNode: Raw = { type: 'raw', value: `${open}${inner}${close}` };
          (parent as ParentWithRaw).children.splice(index, 1, rawNode);
        }
      }
    };
  };
};
