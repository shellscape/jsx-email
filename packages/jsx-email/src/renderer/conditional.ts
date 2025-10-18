import type { Comment, Content, Element, Parents, Root } from 'hast';

import { unescapeForRawComponent } from './raw.js';

// Allow splicing in a `raw` node without unsafe casts
type WithRawChildren = Parents & {
  children: Array<Content | { type: 'raw'; value: string }>;
};

type ParentWithChildren = Parents & { children: Content[] };

// Trim only ASCII whitespace characters
function trimSpaces(input: string): string {
  let start = 0;
  let end = input.length;
  while (start < end) {
    const ch = input.charCodeAt(start);
    // space,\t,\n,\r,\f
    if (ch === 32 || ch === 9 || ch === 10 || ch === 13 || ch === 12) start += 1;
    else break;
  }
  while (end > start) {
    const ch = input.charCodeAt(end - 1);
    if (ch === 32 || ch === 9 || ch === 10 || ch === 13 || ch === 12) end -= 1;
    else break;
  }
  return input.slice(start, end);
}

/**
 * Parse the legacy single-comment Conditional payload without using regex.
 * Expected shape inside the comment value:
 *   "[if <expr>]>\n<jsx-email-raw><!--<payload>--></jsx-email-raw>\n<![endif]"
 * Returns null when the shape deviates (we then fall back to simple unwrap).
 */
function parseLegacyConditional(value: string): { expression: string; payload: string } | null {
  if (!value) return null;

  // 1) Header: starts with "[if " and contains a closing "]"
  if (value.charCodeAt(0) !== 91 /* '[' */) return null;
  if (!(value.startsWith('[if ') || value.startsWith('[if\t') || value.startsWith('[if\n')))
    return null;
  const close = value.indexOf(']');
  if (close === -1) return null;
  const expr = trimSpaces(value.slice(4, close));

  // 2) After header, expect optional spaces then '>'
  let rest = value.slice(close + 1);
  rest = trimSpaces(rest);
  if (rest[0] !== '>') return null;
  rest = rest.slice(1);

  // 3) Optional whitespace, then the raw placeholder start
  rest = trimSpaces(rest);
  const rawOpen = '<jsx-email-raw><!--';
  const openIdx = rest.indexOf(rawOpen);
  // only accept if placeholder is first content
  if (openIdx !== 0) return null;
  let afterOpen = rest.slice(rawOpen.length);

  // 4) Find the close for the inner raw placeholder: '--></jsx-email-raw>'
  const rawClose = '--></jsx-email-raw>';
  const closeIdx = afterOpen.indexOf(rawClose);
  if (closeIdx === -1) return null;
  const escapedPayload = afterOpen.slice(0, closeIdx);
  afterOpen = afterOpen.slice(closeIdx + rawClose.length);

  // 5) Optional whitespace, then the trailer '<![endif]'
  afterOpen = trimSpaces(afterOpen);
  if (!afterOpen.startsWith('<![endif]')) return null;
  const trailer = afterOpen.slice('<![endif]'.length);
  // no other content allowed
  if (trimSpaces(trailer) !== '') return null;

  return { expression: expr, payload: escapedPayload };
}

/**
 * Returns a rehype plugin that:
 * - forbids nested `<jsx-email-cond>` elements (throws on detection); and
 * - unwraps each `<jsx-email-cond>` by replacing it with its children.
 *
 * The Conditional component renders a temporary `<jsx-email-cond>` wrapper
 * around already-stringified conditional comment content. This plugin removes
 * that wrapper so we don't rely on brittle regex replacement later in the
 * pipeline.
 */
export const getConditionalPlugin = () =>
  function conditionalPlugin() {
    return function transform(tree: Root) {
      // Gather matches with parent/index for safe, ordered mutation.
      const matches: Array<{ index: number; node: Element; parent: Parents }> = [];

      const isElement = (n: any): n is Element => n && n.type === 'element';

      const hasNestedConditional = (el: Element): boolean => {
        const children = (el.children || []) as Content[];
        for (const c of children) {
          if (isElement(c)) {
            if (c.tagName === 'jsx-email-cond') return true;
            if (hasNestedConditional(c)) return true;
          }
        }
        return false;
      };

      const walk = (parent: Parents) => {
        const children = ((parent as any).children || []) as Content[];
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (isElement(child)) {
            const el = child;
            if (el.tagName === 'jsx-email-cond') {
              if (hasNestedConditional(el)) {
                throw new RangeError(
                  'jsx-email: Nested <Conditional> is not supported. Flatten your conditionals into a single block.'
                );
              }
              matches.push({ index: i, node: el, parent });
            }
            // Recurse
            walk(el);
          }
        }
      };

      walk(tree as unknown as Parents);

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
          // Special-case: legacy path renders a single HTML comment containing
          // the conditional wrapper and an inner <jsx-email-raw><!--...--></jsx-email-raw>
          // placeholder. In that case, emit a single `raw` node with the
          // correct conditional wrapper and the unescaped inner HTML so the
          // content is preserved byte-for-byte.
          const onlyChild = node.children?.[0] as Comment | undefined;
          if (node.children?.length === 1 && onlyChild?.type === 'comment') {
            const parsed = parseLegacyConditional(onlyChild.value);
            if (parsed) {
              const inner = unescapeForRawComponent(parsed.payload);
              const value =
                parsed.expression === '!mso'
                  ? `<!--[if !mso]><!-->${inner}<!--<![endif]-->`
                  : `<!--[if ${parsed.expression}]>${inner}<![endif]-->`;

              (parent as WithRawChildren).children.splice(index, 1, { type: 'raw', value });
            } else {
              // Default: unwrap the wrapper and splice its children in place.
              const children = (node.children as Content[]) ?? [];
              (parent as ParentWithChildren).children.splice(index, 1, ...children);
            }
          } else {
            // Default: unwrap the wrapper and splice its children in place.
            const children = (node.children as Content[]) ?? [];
            (parent as ParentWithChildren).children.splice(index, 1, ...children);
          }
        }
      }
    };
  };
