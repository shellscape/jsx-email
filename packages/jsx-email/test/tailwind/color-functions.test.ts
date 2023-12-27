import postcss from 'postcss';
// @ts-ignore
// Note: https://github.com/csstools/postcss-plugins/issues/1217
import { postcssVarReplace } from 'postcss-var-replace';

import {
  plugin as colorFunctions,
  reFunction,
  reReplace
} from '../../src/components/tailwind/color-functions';

const values = ['100 90 80 / 1', '1 20 3 / 0.5'];
const functions = ['rgb', 'rgba', 'hsl', 'hsla'];
const input = `
/* layer: preflights */
/* layer: default */
@media (min-width: 1280px) {
  .xl\\:bg-green-500 {
    background-color: rgb(34 197 94);
  }

  @media (min-width: 1280px) {
    .xl\\:bg-green-500 {
      background-color: rgb(34 197 94);
    }
  }
}

@media (min-width: 1536px) {
  .\\32 xl\\:bg-blue-500 {
    background-color: rgb(59 130 246);
  }

  @media (min-width: 1536px) {
    .\\32 xl\\:bg-blue-500 {
      background-color: rgb(59 130 246);
    }
  }
}
`;

describe('color functions', () => {
  it('should accurately detect color functions', () => {
    for (const func of functions) {
      for (const value of values) {
        const css = `${func}(${value})`;

        expect(reFunction.test(css)).toBe(true);

        const replaced = css.replaceAll(reReplace, (_, name, __, r, g, b, a) => {
          const values = [r, g, b, !!a && a !== '1' ? a : ''].filter(Boolean).join(',');
          return `${name}(${values})`;
        });

        expect(replaced).toMatchSnapshot();
      }
    }
  });

  it('should replace all color functions in a css block', () => {
    const { css } = postcss([
      postcssVarReplace({ preserveAtRulesOrder: true }),
      colorFunctions()
    ]).process(input);

    expect(css).toMatchSnapshot();
  });
});
