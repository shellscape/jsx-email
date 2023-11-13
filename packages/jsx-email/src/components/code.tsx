import mem from 'p-memoize';
import { Suspense } from 'react';
import { getHighlighter as getHighBro, type BuiltinLanguage } from 'shikiji';

import { useData } from '../render/jsx-to-string';

type RootProps = React.ComponentPropsWithoutRef<'pre'>;

export interface CodeProps extends RootProps {
  children: string;
  language: BuiltinLanguage;
  theme?: string;
}

const getHighlighter = mem(async (language?: string, theme = 'nord') => {
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

  return (
    <div
      {...rest}
      data-id="@jsx-email/code"
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const Code = ({ children, ...props }: React.PropsWithChildren<CodeProps>) => {
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
