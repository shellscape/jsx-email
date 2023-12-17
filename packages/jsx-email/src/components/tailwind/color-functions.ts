import type { Declaration, PluginCreator } from 'postcss';

type Replacer = (substring: string, ...args: any[]) => string;

export const reFunction = /((rgb|hsl)a?)\(\s*(\d+)\s*(\d+)\s*(\d+)(?:\s*\/\s*([\d%.]+))?\s*\)/i;
export const reReplace = new RegExp(reFunction.source, 'gi');

export const replacer: Replacer = (_, name, __, r, g, b, a) => {
  const values = [r, g, b, !!a && a !== '1' ? a : ''].filter(Boolean).join(',');
  return `${name}(${values})`;
};

export const plugin: PluginCreator<void> = () => {
  return {
    Declaration: (decl: Declaration) => {
      const { value } = decl;

      if (!reFunction.test(value)) return;

      const replaced = value.replaceAll(reReplace, replacer);

      if (value === replaced) return;

      decl.cloneBefore({ value: replaced });
      decl.remove();
    },
    postcssPlugin: 'jsx-color-functions'
  };
};

plugin.postcss = true;
