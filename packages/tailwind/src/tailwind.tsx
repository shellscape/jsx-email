import { jsxToString } from '@jsx-email/render';
import { load } from 'cheerio';
import { defineConfig, extract, install } from '@twind/core';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetTailwind from '@twind/preset-tailwind';

const defaultConfig = defineConfig({
  presets: [presetAutoprefix(), presetTailwind()]
});

export interface TailwindProps {
  config?: Partial<typeof defaultConfig>;
  isProduction?: boolean;
}

const renderTwind = (html: string, { config, isProduction = false }: TailwindProps) => {
  const tw = install({ ...defaultConfig, ...config }, isProduction);
  const { html: shimmedHtml, css } = extract(html, tw);

  return { shimmedHtml, styleTag: `<style twind>${css}</style>` };
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
