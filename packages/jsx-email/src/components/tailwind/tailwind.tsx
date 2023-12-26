// eslint-disable-next-line import/no-extraneous-dependencies
import { createGenerator, type ConfigBase } from '@unocss/core';
import { presetTypography } from '@unocss/preset-typography';
import { presetWind } from '@unocss/preset-wind';
import { presetUno } from '@unocss/preset-uno';
import transformerCompileClass from '@unocss/transformer-compile-class';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import MagicString from 'magic-string';
import postcss from 'postcss';
// @ts-ignore
// Note: https://github.com/csstools/postcss-plugins/issues/1217
import { postcssVarReplace } from 'postcss-var-replace';
import { Suspense } from 'react';

import { jsxToString, useData } from '../../render/jsx-to-string';

import { plugin as colorFunctions } from './color-functions';

const { warn } = console;

export interface TailwindProps {
  config?: Pick<
    ConfigBase,
    'layers' | 'presets' | 'rules' | 'separators' | 'shortcuts' | 'theme' | 'variants'
  >;
  production?: boolean;
}

const getUno = (config: ConfigBase, production: boolean) => {
  const transformers = [transformerVariantGroup()];

  if (production)
    transformers.push(
      transformerCompileClass({
        classPrefix: 'je',
        trigger: ':jsx:'
      })
    );

  if ((config?.theme as any)?.extend) {
    warn(
      'jsx-email → Tailwind: Use of `theme.extend` is not necessary. `theme.extend` has been merged into `theme`'
    );
    const { extend } = config.theme as any;
    delete (config.theme as any).extend;
    config.theme = { ...config.theme, ...extend };
  }

  const presets = [...(config.presets || []), presetTypography(), presetUno(), presetWind()];
  const uno = createGenerator({
    ...(config as any),
    presets,
    transformers
  });

  return uno;
};

const render = async ({
  children,
  config = {},
  production = false
}: React.PropsWithChildren<TailwindProps>) => {
  const uno = getUno(config, production);
  const html = await jsxToString(<>{children}</>);
  const code = production ? html.replace(/class="/g, 'class=":jsx: ') : html;
  const s = new MagicString(code);
  const invalidate = () => 0;

  for (const transformer of uno.config.transformers || []) {
    // eslint-disable-next-line no-await-in-loop
    await transformer.transform(s, 'Tailwind', { invalidate, tokens: new Set(), uno } as any);
  }

  const finalHtml = s.toString();
  const result = await uno.generate(finalHtml);
  // Note: Remove css variables, replace them with static values. It's not ideal to run PostCSS
  // after using Uno, but it's pretty quick. Uno doesn't have a transformer that can match this,
  // and it's crucial for email client support (e.g. Gmail)
  const { css } = postcss([
    postcssVarReplace({ preserveAtRulesOrder: true }),
    colorFunctions()
  ]).process(result.css);
  const styleTag = `<style tailwind>${css}</style>`;

  return `${finalHtml}${styleTag}`;
};

const Renderer = (props: React.PropsWithChildren<TailwindProps>) => {
  const html = useData(props, () => render(props));

  return <div data-id="__jsx-email-twnd" dangerouslySetInnerHTML={{ __html: html }} />;
};

export const Tailwind = ({ children, ...props }: React.PropsWithChildren<TailwindProps>) => (
  <>
    <Suspense fallback={<div>waiting</div>}>
      <Renderer {...props}>{children}</Renderer>
    </Suspense>
  </>
);
