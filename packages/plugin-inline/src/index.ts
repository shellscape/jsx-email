import { parse } from '@adobe/css-tools';
import type { Root } from 'hast';
import { selectAll } from 'hast-util-select';
import { toString } from 'hast-util-to-string';
import { type JsxEmailPlugin, pluginSymbol } from 'jsx-email';
import type { Plugin } from 'unified';
import { remove } from 'unist-util-remove';
import { visit } from 'unist-util-visit';

export const plugin: JsxEmailPlugin = {
  name: 'root/inline',
  process: async () => {
    return function inlineCssPlugin() {
      return function inline(tree: Root) {
        if (!tree) return null;

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

        remove(tree, { tagName: 'style' });
        // eslint-disable-next-line
        return visit(tree, 'element', function visitHandler(node) {
          // eslint-disable-next-line no-param-reassign
          node.properties.className = void 0;
        });
      };
    } as unknown as Plugin;
  },
  symbol: pluginSymbol
};
