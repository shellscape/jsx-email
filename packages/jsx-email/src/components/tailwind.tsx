// eslint-disable-next-line import/no-extraneous-dependencies
import { createGenerator, type ConfigBase } from '@unocss/core';
import { presetWind } from '@unocss/preset-wind';
import { presetUno } from '@unocss/preset-uno';
import transformerCompileClass from '@unocss/transformer-compile-class';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import MagicString from 'magic-string';
import postcss from 'postcss';
import cssvariables from 'postcss-css-variables';
import { Suspense } from 'react';

import { jsxToString, useData } from '../render/jsx-to-string';

export interface TailwindProps {
  config?: Pick<ConfigBase, 'layers' | 'rules' | 'separators' | 'shortcuts' | 'theme' | 'variants'>;
  production?: boolean;
}

const getUno = (production: boolean) => {
  const transformers = [transformerVariantGroup()];

  if (production)
    transformers.push(
      transformerCompileClass({
        classPrefix: '',
        trigger: ':jsx:'
      })
    );

  const uno = createGenerator({
    presets: [presetUno(), presetWind()],
    transformers
  });

  return uno;
};

const render = async ({ children, production = false }: React.PropsWithChildren<TailwindProps>) => {
  const uno = getUno(production);
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
  const { css } = postcss([cssvariables({ preserveAtRulesOrder: true })]).process(result.css);
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
