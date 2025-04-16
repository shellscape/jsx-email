import { pluginSymbol, type JsxEmailPlugin } from 'jsx-email';
import rehypeMinifyAttributeWhitespace from 'rehype-minify-attribute-whitespace';
import rehypeMinifyCssStyle from 'rehype-minify-css-style';
import rehypeMinifyEnumeratedAttribute from 'rehype-minify-enumerated-attribute';
import rehypeMinifyMediaAttribute from 'rehype-minify-media-attribute';
import rehypeMinifyMetaColor from 'rehype-minify-meta-color';
import rehypeMinifyMetaContent from 'rehype-minify-meta-content';
import rehypeMinifyStyleAttribute from 'rehype-minify-style-attribute';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';
import rehypeNormalizeAttributeValueCase from 'rehype-normalize-attribute-value-case';
import rehypeRemoveComments from 'rehype-remove-comments';
import rehypeRemoveDuplicateAttributeValues from 'rehype-remove-duplicate-attribute-values';
import rehypeRemoveEmptyAttribute from 'rehype-remove-empty-attribute';
import rehypeRemoveExternalScriptContent from 'rehype-remove-external-script-content';
import rehypeRemoveMetaHttpEquiv from 'rehype-remove-meta-http-equiv';
import rehypeRemoveStyleTypeCss from 'rehype-remove-style-type-css';
import rehypeSortAttributeValues from 'rehype-sort-attribute-values';
import rehypeSortAttributes from 'rehype-sort-attributes';
import type { Preset, Settings } from 'unified';

const settings = {
  allowParseErrors: true,
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
    const plugins = [
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
    ];

    return { plugins, settings };
  },
  symbol: pluginSymbol
};
