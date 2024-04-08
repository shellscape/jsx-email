import { parse } from '@adobe/css-tools';
import type { Root } from 'hast';
import { pluginSymbol, type JsxEmailPlugin } from 'jsx-email';
import type { Plugin } from 'unified';

export const plugin: JsxEmailPlugin = {
  name: 'root/inline',
  process: async () => {
    const { selectAll } = await import('hast-util-select');
    const { toString } = await import('hast-util-to-string');
    const { remove } = await import('unist-util-remove');

    return function inlineCss(tree: Root) {
      const stylesheet = selectAll('style', tree).map(toString).join('\n');
      const cast = parse(stylesheet);
      for (const rule of cast.stylesheet?.rules ?? []) {
        if ('selectors' in rule) {
          for (const selector of rule.selectors ?? []) {
            const elems = selectAll(selector, tree);
            for (const elem of elems) {
              for (const declaration of rule.declarations ?? []) {
                if ('property' in declaration) {
                  elem.properties ??= {};
                  elem.properties.style ??= '';
                  if (/[^;]\s*$/.test(elem.properties.style as string)) {
                    elem.properties.style += ';';
                  }
                  elem.properties.style += `${declaration.property}:${declaration.value};`;
                }
              }
            }
          }
        }
      }

      return remove(tree, { tagName: 'style' });
    } as Plugin;
  },
  symbol: pluginSymbol
};
