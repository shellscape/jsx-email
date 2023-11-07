import { jsxToString } from '@jsx-email/render';
import { load } from 'cheerio';
import { create, type Configuration } from 'twind';
import { virtualSheet, shim, getStyleTag } from 'twind/shim/server';

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

export const Tailwind = ({ children, ...props }: React.PropsWithChildren<TailwindProps>) => {
  const initialHtml = jsxToString(<>{children}</>);
  const { shimmedHtml, styleTag } = renderTwind(initialHtml, props);
  const $doc = load(shimmedHtml, { xml: { decodeEntities: false }, xmlMode: true } as any);

  const $head = $doc('<head data-id="__jsx-email-twnd" />');
  $head.append(styleTag);

  $doc.root().prepend($head);

  const finalHtml = $doc.html()!;

  return <div data-id="__jsx-email-twnd" dangerouslySetInnerHTML={{ __html: finalHtml }} />;
};
