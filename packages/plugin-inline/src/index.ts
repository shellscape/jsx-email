// Note: tshy has some bugs with dual-mode package importing in the cjs build https://github.com/isaacs/tshy/issues/50
// @ts-ignore
import { parse } from '@adobe/css-tools';
// @ts-ignore
import type { Root } from 'hast';
import { pluginSymbol, type JsxEmailPlugin } from 'jsx-email';
// @ts-ignore
import type { Plugin } from 'unified';

export const plugin: JsxEmailPlugin = {
  name: 'root/inline',
  process: async () => {
    const { selectAll } = await import('hast-util-select');
    const { toString } = await import('hast-util-to-string');
    const { remove } = await import('unist-util-remove');
    const { visit } = await import('unist-util-visit');

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
