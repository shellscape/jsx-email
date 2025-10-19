import type { Content, Element, Literal, Parents, Root } from 'hast';
// dynamic import of 'unist-util-visit' within factory to support CJS build

interface Match {
  index: number;
  node: Element;
  parent: Parents;
}

// `raw` is an unofficial HAST node used by rehype to pass through HTML verbatim.
// Model it locally to avoid `any` casts while keeping the rest of the tree typed.
interface Raw extends Literal {
  type: 'raw';
  value: string;
}

interface ParentWithRaw {
  children: (Content | Raw)[];
}

/**
 * Returns a rehype plugin that replaces `<jsx-email-cond>` elements (from
 * the Conditional component) with conditional comment wrappers, based on the
 * `data-mso` and `data-expression` attributes.
 *
 * Mirrors the async factory pattern used by `getRawPlugin()`.
 */
export const getConditionalPlugin = async () => {
  const { visit } = await import('unist-util-visit');

  return function conditionalPlugin() {
    return function transform(tree: Root) {
      const matches: Match[] = [];
      let headEl: Element | undefined;

      visit(tree, 'element', (node, index, parent) => {
        if (node.tagName === 'head') headEl = node;

        if (!parent || typeof index !== 'number') return;
        if (node.tagName !== 'jsx-email-cond') return;

        matches.push({ index, node, parent });
      });

      for (const { node, parent, index } of matches) {
        const props = (node.properties || {}) as Record<string, unknown>;
        const msoProp = (props['data-mso'] ?? (props as any).dataMso) as unknown;
        const msoAttr =
          typeof msoProp === 'undefined' ? void 0 : msoProp === 'false' ? false : Boolean(msoProp);
        const exprRaw = (props['data-expression'] ?? (props as any).dataExpression) as unknown;
        const exprAttr = typeof exprRaw === 'string' ? exprRaw : void 0;
        const headProp = (props['data-head'] ?? (props as any).dataHead) as unknown;
        const toHead = typeof headProp === 'undefined' ? false : Boolean(headProp);

        let openRaw: string | undefined;
        let closeRaw: string | undefined;

        if (msoAttr === false) {
          // Not MSO: <!--[if !mso]><!--> ... <!--<![endif]-->
          openRaw = '<!--[if !mso]><!-->';
          closeRaw = '<!--<![endif]-->';
        } else {
          // MSO / expression path
          const expression = exprAttr || (msoAttr === true ? 'mso' : void 0);
          if (expression) {
            openRaw = `<!--[if ${expression}]>`;
            closeRaw = '<![endif]-->';
          }
        }

        // If no directive attributes present, leave the element in place.
        // eslint-disable-next-line no-continue
        if (!openRaw || !closeRaw) continue;

        const before: Raw = { type: 'raw', value: openRaw };
        const after: Raw = { type: 'raw', value: closeRaw };
        const children = (node.children || []) as Content[];

        if (toHead && headEl) {
          // Remove wrapper from current location
          (parent as ParentWithRaw).children.splice(index, 1);
          // Append the conditional to the <head>
          (headEl as unknown as ParentWithRaw).children.push(before, ...children, after);
        } else {
          // Replace in place: open raw, original children, close raw.
          (parent as ParentWithRaw).children.splice(index, 1, before, ...children, after);
        }
      }
    };
  };
};
