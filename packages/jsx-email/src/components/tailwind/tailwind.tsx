// eslint-disable-next-line import/no-extraneous-dependencies
// @ts-ignore
import type { ConfigBase } from '@unocss/core';
import MagicString from 'magic-string';
import postcss from 'postcss';
// @ts-ignore
// Note: https://github.com/csstools/postcss-plugins/issues/1217
import { postcssVarReplace } from 'postcss-var-replace';
import { Suspense } from 'react';

import { debug } from '../../debug.js';
import { log } from '../../log.js';
import { jsxToString } from '../../renderer/jsx-to-string.js';
import { useData } from '../../renderer/suspense.js';

import { plugin as colorFunctions } from './color-functions.js';

export interface TailwindProps {
  config?: Pick<
    ConfigBase,
    'layers' | 'presets' | 'rules' | 'separators' | 'shortcuts' | 'theme' | 'variants'
  >;
  production?: boolean;
}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/tailwind' } : {};

const getUno = async (config: ConfigBase, production: boolean) => {
  // @ts-ignore
  const { createGenerator } = await import('@unocss/core');
  // @ts-ignore
  const { presetTypography } = await import('@unocss/preset-typography');
  // @ts-ignore
  const { presetWind } = await import('@unocss/preset-wind');
  // @ts-ignore
  const { presetUno } = await import('@unocss/preset-uno');
  // @ts-ignore
  const { presetRemToPx } = await import('@unocss/preset-rem-to-px');
  // @ts-ignore
  const { default: transformerCompileClass } = await import('@unocss/transformer-compile-class');
  // @ts-ignore
  const { default: transformerVariantGroup } = await import('@unocss/transformer-variant-group');

  const transformers = [transformerVariantGroup()];

  if (production)
    transformers.push(
      transformerCompileClass({
        classPrefix: 'je-',
        trigger: ':jsx:'
      })
    );

  if ((config?.theme as any)?.extend) {
    log.warn(
      'Tailwind: Use of `theme.extend` is not necessary. `theme.extend` has been merged into `theme`'
    );
    const { extend } = config.theme as any;
    delete (config.theme as any).extend;
    config.theme = { ...config.theme, ...extend };
  }

  const presets = [
    ...(config.presets || []),
    // Convert all `rem` values to `px`
    presetRemToPx(),
    presetTypography(),
    presetUno({ dark: 'media' }),
    presetWind()
  ];
  const uno = await createGenerator({
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
  const uno = await getUno(config, production);
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

  return <head {...debugProps} dangerouslySetInnerHTML={{ __html: html }} />;
};

export const Tailwind = ({ children, ...props }: React.PropsWithChildren<TailwindProps>) => (
  <>
    <Suspense fallback={<div>waiting</div>}>
      <Renderer {...props}>{children}</Renderer>
    </Suspense>
  </>
);
