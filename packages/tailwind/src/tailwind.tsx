import { jsxToString } from '@jsx-email/render';
import chalk from 'chalk';
import { load } from 'cheerio';
import { defineConfig, extract, install } from '@twind/core';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetTailwind from '@twind/preset-tailwind';

const defaultConfig = defineConfig({
  presets: [presetAutoprefix(), presetTailwind()]
});

export interface TailwindProps {
  config?: typeof defaultConfig;
  isProduction?: boolean;
}

const renderTwind = (html: string, { config, isProduction = true }: TailwindProps) => {
  const tw = install({ ...defaultConfig, ...config }, isProduction);
  const { html: shimmedHtml, css } = extract(html, tw);

  return { shimmedHtml, styleTag: `<style twind>${css}</style>` };
};

export const Tailwind = ({ children, ...props }: React.PropsWithChildren<TailwindProps>) => {
  const initialHtml = jsxToString(<>{children}</>);
  const { shimmedHtml, styleTag } = renderTwind(initialHtml, props);
  const $doc = load(shimmedHtml, { xml: { decodeEntities: false }, xmlMode: true });
  const $head = $doc('head');

  if ($head.length) {
    $head.append(styleTag);
  } else {
    const { warn } = console;
    const warning = chalk`
   Some email clients (like Gmail) do not support <style> elements within the document body.
   Additionally, media queries and responsive styles may not work properly
   See: {cyan https://www.caniemail.com/features/html-style}
   We recommend using the Tailwind component like so:
     <Tailwind><Head/><Body>...</Body></Tailwind>
`;
    warn(chalk`\n{yellow ⚠️  jsx-email:Tailwind → No <head> tag was found}${warning}`);

    $doc.root().prepend(styleTag);
  }

  const finalHtml = $doc.html()!;

  return <section dangerouslySetInnerHTML={{ __html: finalHtml }} />;
};
