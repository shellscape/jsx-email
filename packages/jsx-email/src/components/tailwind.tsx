// eslint-disable-next-line import/no-extraneous-dependencies
import { Suspense } from 'react';
import { create, type Configuration } from 'twind';
import { virtualSheet, shim, getStyleTag } from 'twind/shim/server';

import { jsxToString, useData } from '../render/jsx-to-string';

export interface TailwindProps {
  config?: Partial<Configuration>;
  isProduction?: boolean;
}

const renderTwind = (html: string, { config, isProduction = false }: TailwindProps) => {
  const sheet = virtualSheet();

  const { tw } = create({ sheet, ...(config || {}), hash: isProduction });

  sheet.reset();

  const shimmedHtml = shim(html, tw);
  const tag = getStyleTag(sheet);

  return { shimmedHtml, styleTag: tag.replace('id="__twind"', 'twind') };
};

const Renderer = (props: React.PropsWithChildren<TailwindProps>) => {
  const initialHtml = useData(props, () => jsxToString(<>{props.children}</>));
  const { shimmedHtml, styleTag } = renderTwind(initialHtml, props);
  const finalHtml = `${shimmedHtml}${styleTag}`;

  return <div data-id="__jsx-email-twnd" dangerouslySetInnerHTML={{ __html: finalHtml }} />;
};

export const Tailwind = ({ children, ...props }: React.PropsWithChildren<TailwindProps>) => (
  <>
    <Suspense fallback={<div>waiting</div>}>
      <Renderer {...props}>{children}</Renderer>
    </Suspense>
  </>
);
