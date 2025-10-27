import type { Root } from 'hast';
export declare function escapeForRawComponent(input: string): string;
export declare function unescapeForRawComponent(input: string): string;
/**
 * Returns a rehype plugin that replaces `<jsx-email-raw><!--...--></jsx-email-raw>`
 * elements with a raw HTML node using the original, unescaped content.
 *
 * Mirrors the async factory pattern used by `getMovePlugin()`.
 */
export declare const getRawPlugin: () => Promise<() => (tree: Root) => void>;
//# sourceMappingURL=raw.d.ts.map