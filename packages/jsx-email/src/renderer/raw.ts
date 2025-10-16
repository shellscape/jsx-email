import type { Root } from 'hast';

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

// Convenience: normalize malformed MSO conditional closers that may be
// produced when nested comment content is serialized adjacent to the
// conditional terminator. Keeps this logic colocated with other Raw helpers.
export function normalizeMsoConditionalClosers(input: string): string {
  return input.replace(/<!--\[endif\]-+-->/g, '<![endif]-->');
}

// Return a rehype plugin that replaces <jsx-email-raw><!-- ... --></jsx-email-raw>
// with a HAST "raw" node containing the unescaped payload. This avoids nesting
// HTML comments when <Raw> appears inside Outlook conditional comments.
export const getRawPlugin = async () => {
  const { visit } = await import('unist-util-visit');

  return function rawPlugin() {
    return function transform(tree: Root) {
      visit(tree, 'element', (node: any, index: number | null, parent: any) => {
        if (!parent || index == null) return;

        // 1) Lift <jsx-email-raw> comment payloads into literal HTML
        if (node.tagName === 'jsx-email-raw') {
          const child = node.children && node.children[0];
          if (!child) return;

          if (child.type === 'comment') {
            const payload = String(child.value ?? '');
            const html = unescapeForRawComponent(payload);
            parent.children.splice(index, 1, { type: 'raw', value: html });
          }
          return;
        }

        // 2) Split <jsx-email-cond> single-comment content into
        //    raw conditional markers + inner HTML. This allows
        //    inner <jsx-email-raw> to be realized as markup and
        //    prevents illegal nested comments.
        if (node.tagName === 'jsx-email-cond') {
          const children = Array.isArray(node.children) ? node.children : [];
          const value = children
            .map((c: any) => (typeof c.value === 'string' ? c.value : ''))
            .join('');
          if (!value) return;

          // Skip downlevel-revealed form (`<!--[if !mso]><!-->` ... `<!--<![endif]-->`)
          // as it does not nest comment content and is already safe.
          if (value.includes(']><!-->')) return;

          const openIdx = value.indexOf(']>');
          const closeIdx = value.lastIndexOf('<![endif]');
          if (openIdx === -1 || closeIdx === -1 || closeIdx <= openIdx) return;

          // includes "]>"
          const openPart = value.slice(0, openIdx + 2);
          let inner = value.slice(openIdx + 2, closeIdx);

          // Inline any <jsx-email-raw><!--...--></jsx-email-raw> found
          // within the inner HTML by unescaping the payload.
          inner = inner.replace(
            /<jsx-email-raw[^>]*?>\s*(?:<!--|&#x3C;!--)([\s\S]*?)-->\s*<\/jsx-email-raw>/g,
            (_m: string, p1: string) => unescapeForRawComponent(p1)
          );

          const nodes = [
            { type: 'raw', value: `<!--${openPart}` },
            { type: 'raw', value: inner },
            { type: 'raw', value: '<![endif]-->' }
          ];

          parent.children.splice(index, 1, ...nodes);
        }
      });
    };
  };
};
