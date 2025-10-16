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

// Normalize corrupted MSO conditional closers that can occur when nested
// comment boundaries abut the `<![endif]-->` sequence (e.g. `<!--[endif]---->`).
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

        // 2) Replace <jsx-email-cond> wrapper with raw nodes that
        //    represent the actual Outlook conditional bytes. Handle
        //    both the single-comment form (<!--[if mso]>...<![endif]-->)
        //    and the downlevel-revealed form (<!--[if !mso]><!-->...<!--<![endif]-->).
        if (node.tagName === 'jsx-email-cond') {
          // NOTE: keep transformation logic local to this plugin.
          const children = Array.isArray(node.children) ? (node.children as any[]) : [];
          if (!children.length) return;

          // Prefer transforming AST nodes directly over string parsing.

          // Replace the wrapper element with: opening comment, transformed
          // children (with <jsx-email-raw> lifted), and closing comment.
          const transformRaw = (nodes: any[]): any[] =>
            nodes.flatMap((n) => {
              if (n.type === 'element' && n.tagName === 'jsx-email-raw') {
                const first = n.children && n.children[0];
                const payload = typeof first?.value === 'string' ? first.value : '';
                return [{ type: 'raw', value: unescapeForRawComponent(payload) }];
              }
              if (n.children && Array.isArray(n.children)) {
                n.children = transformRaw(n.children);
              }
              return [n];
            });

          const first = children[0];
          const last = children[children.length - 1];
          // Downlevel-revealed form produces 2 comment siblings around real
          // element/text children: `<!--[if !mso]><!-->` … `<!--<![endif]-->`.
          // Preserve the exact serializer bytes by keeping the original
          // comment nodes and only transforming any nested <jsx-email-raw>
          // elements found between them.
          if (first?.type === 'comment' && last?.type === 'comment' && children.length > 1) {
            const middle = transformRaw(children.slice(1, -1));
            parent.children.splice(index, 1, first, ...middle, last);
            return;
          }

          // Single-comment form packs everything into a single comment node:
          // `<!--[if mso]>…<![endif]-->`. Split it into raw nodes so that
          // nested <jsx-email-raw> wrappers can be safely inlined.
          if (first?.type === 'comment') {
            const value = String(first.value ?? '');
            const openIdx = value.indexOf(']>');
            const closeIdx = value.lastIndexOf('<![endif]');

            // Construct opening marker comment bytes
            const openRaw = openIdx >= 0 ? `<!--${value.slice(0, openIdx + 2)}` : `<!--${value}`;

            // Extract inner HTML strictly between the open and close markers when both exist
            let innerHtml = '';
            if (openIdx >= 0 && closeIdx > openIdx) {
              innerHtml = value.slice(openIdx + 2, closeIdx);
            } else if (openIdx >= 0) {
              innerHtml = value.slice(openIdx + 2);
            }

            // Inline any nested <jsx-email-raw><!-- … --></jsx-email-raw> occurrences inside the
            // single-comment payload, being tolerant of a corrupted element closer like
            // "</jsx-email-raw-->" that some serializers may emit when adjacent to comment ends.
            innerHtml = innerHtml.replace(
              /<jsx-email-raw[^>]*?>\s*(?:<!--|&#x3C;!--)([\s\S]*?)-->\s*<\/jsx-email-raw(?:--)?\s*>/g,
              (_m: string, p1: string) => unescapeForRawComponent(p1)
            );

            // Include any middle child nodes (downlevel-revealed form produces real nodes)
            parent.children.splice(
              index,
              1,
              { type: 'raw', value: openRaw },
              { type: 'raw', value: innerHtml },
              ...transformRaw(children.slice(1, -1)),
              { type: 'raw', value: '<![endif]-->' }
            );
            return;
          }

          // Fallback: drop the wrapper and keep transformed children as-is.
          parent.children.splice(index, 1, ...transformRaw(children));
        }
      });
    };
  };
};
