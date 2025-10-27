import type { Root } from 'hast';
/**
 * Returns a rehype plugin that replaces `<jsx-email-cond>` elements (from
 * the Conditional component) with conditional comment wrappers, based on the
 * `data-mso` and `data-expression` attributes.
 *
 * Mirrors the async factory pattern used by `getRawPlugin()`.
 */
export declare const getConditionalPlugin: () => Promise<() => (tree: Root) => void>;
//# sourceMappingURL=conditional.d.ts.map