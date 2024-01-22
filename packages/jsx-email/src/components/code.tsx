import mem from 'p-memoize';
import { Suspense } from 'react';
import { type BuiltinLanguage } from 'shikiji';

import { debug } from '../debug';
import { useData } from '../render/jsx-to-string';
import type { BaseProps, JsxEmailComponent } from '../types';

type RootProps = BaseProps<'pre'>;

export interface CodeProps extends RootProps {
  children: string;
  language: BuiltinLanguage;
  theme?: string;
}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/code' } : {};

const getHighlighter = mem(async (language?: string, theme = 'nord') => {
  const { getHighlighter: getHighBro } = await import('shikiji');
  const shiki = await getHighBro({
    langs: language ? [language] : [],
    themes: [theme]
  });

  return shiki;
});

const Renderer = (props: React.PropsWithChildren<CodeProps>) => {
  const { children, language, style, theme = 'nord', ...rest } = props;
  const highlighter = useData(props, () => getHighlighter(language, theme));

  const code = children as string;
  const html = highlighter.codeToHtml(code, { lang: language, theme });

  return <div {...rest} {...debugProps} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
};

export const Code: JsxEmailComponent<CodeProps> = ({ children, ...props }) => {
  if (typeof children !== 'string')
    throw new Error('Code: component children must be of type string');

  return (
    <>
      <Suspense fallback={<div>waiting</div>}>
        <Renderer {...props}>{children}</Renderer>
      </Suspense>
    </>
  );
};

Code.displayName = 'Code';
