import { pluginSymbol, type JsxEmailPlugin } from 'jsx-email';
// Note: tshy has some bugs with dual-mode package importing in the cjs build https://github.com/isaacs/tshy/issues/50
// @ts-ignore
import type { Pluggable, Preset, Settings } from 'unified';

// Note: rehype is all ESM-only, so for CJS compat we're dynamically importing
// No, we're not going to force ESM on users
const importPlugins = async () => {
  const rehypeMinifyAttributeWhitespace = await import('rehype-minify-attribute-whitespace');
  const rehypeMinifyCssStyle = await import('rehype-minify-css-style');
  const rehypeMinifyEnumeratedAttribute = await import('rehype-minify-enumerated-attribute');
  const rehypeMinifyMediaAttribute = await import('rehype-minify-media-attribute');
  const rehypeMinifyMetaColor = await import('rehype-minify-meta-color');
  const rehypeMinifyMetaContent = await import('rehype-minify-meta-content');
  const rehypeMinifyStyleAttribute = await import('rehype-minify-style-attribute');
  const rehypeMinifyWhitespace = await import('rehype-minify-whitespace');
  const rehypeNormalizeAttributeValueCase = await import('rehype-normalize-attribute-value-case');
  const rehypeRemoveComments = await import('rehype-remove-comments');
  const rehypeRemoveDuplicateAttributeValues = await import(
    'rehype-remove-duplicate-attribute-values'
  );
  const rehypeRemoveEmptyAttribute = await import('rehype-remove-empty-attribute');
  const rehypeRemoveExternalScriptContent = await import('rehype-remove-external-script-content');
  const rehypeRemoveMetaHttpEquiv = await import('rehype-remove-meta-http-equiv');
  const rehypeRemoveStyleTypeCss = await import('rehype-remove-style-type-css');
  const rehypeSortAttributeValues = await import('rehype-sort-attribute-values');
  const rehypeSortAttributes = await import('rehype-sort-attributes');

  return [
    rehypeMinifyAttributeWhitespace,
    rehypeMinifyCssStyle,
    // Note: `rehypeRemoveMetaHttpEquiv` goes before
    // `rehypeMinifyEnumeratedAttribute`, as the latter might minify things further.
    rehypeRemoveMetaHttpEquiv,
    rehypeMinifyEnumeratedAttribute,
    rehypeMinifyMediaAttribute,
    rehypeMinifyMetaColor,
    rehypeMinifyMetaContent,
    rehypeMinifyStyleAttribute,
    rehypeMinifyWhitespace,
    rehypeNormalizeAttributeValueCase,
    rehypeRemoveComments,
    rehypeRemoveDuplicateAttributeValues,
    rehypeRemoveEmptyAttribute,
    rehypeRemoveExternalScriptContent,
    rehypeRemoveStyleTypeCss,
    rehypeSortAttributeValues,
    rehypeSortAttributes
  ].map((mod) => mod.default) as Pluggable[];
};

const settings = {
  allowParseErrors: true,
  bogusComments: true,
  characterReferences: {
    omitOptionalSemicolons: true,
    useShortestReferences: true
  },
  closeEmptyElements: true,
  collapseEmptyAttributes: true,
  omitOptionalTags: true,
  preferUnquoted: false,
  quoteSmart: true,
  tightAttributes: true,
  tightCommaSeparatedLists: true,
  tightDoctype: true,
  tightSelfClosing: true
} as Settings;

export const plugin: JsxEmailPlugin = {
  name: 'root/minify',
  process: async (): Promise<Preset> => {
    const plugins = await importPlugins();

    return { plugins, settings };
  },
  symbol: pluginSymbol
};
