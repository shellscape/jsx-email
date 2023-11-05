import { jsxToString } from '@jsx-email/render';
import chalk from 'chalk';
import { load } from 'cheerio';
// import { create } from 'twind';
import { defineConfig, extract, install } from '@twind/core';
// import { setup } from 'twind';
// import { virtualSheet, shim, getStyleTag, type Configuration } from 'twind/shim/server';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetTailwind from '@twind/preset-tailwind';

const defaultConfig = defineConfig({
  presets: [presetAutoprefix(), presetTailwind()]
});

export interface TailwindProps {
  config?: typeof defaultConfig;
}

// @ts-ignore
const renderTwind = (html: string, config: TailwindProps['config']) => {
  // const sheet = virtualSheet();
  // const { tw } = create({ sheet, ...config });
  // setup({ sheet, ...config });
  // const shimmedHtml = shim(html, tw);
  const tw = install({ ...defaultConfig, ...config });
  // const shimmedHtml = shim(html, tw);
  const { html: shimmedHtml, css } = extract(html, tw);
  console.log(html);
  console.log(shimmedHtml);
  console.log(css);

  // const styleTag = getStyleTag(sheet);

  return { shimmedHtml, styleTag: `<style>${css}</style>` };
};

export const Tailwind = ({ children, config }: React.PropsWithChildren<TailwindProps>) => {
  const initialHtml = jsxToString(<>{children}</>);
  const { shimmedHtml, styleTag } = renderTwind(initialHtml, config);
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

  const finalHtml = $doc.html()!.replace(/id="__twind"/g, `twind`);

  return <section dangerouslySetInnerHTML={{ __html: finalHtml }} />;
};
