import { AssertionError } from 'assert';

import { useData } from '@jsx-email/render';
import mem from 'p-memoize';
import { Suspense } from 'react';
import { getHighlighter as shikiGetHighlighter } from 'shiki';

type RootProps = React.ComponentPropsWithoutRef<'pre'>;

export interface CodeProps extends RootProps {
  children: string;
  language?: string;
  theme?: string;
}

const highlighterPromise = shikiGetHighlighter({});

const getHighlighter = mem(async (language?: string, theme?: string) => {
  const highlighter = await highlighterPromise;
  const loadedLanguages = highlighter.getLoadedLanguages();
  const loadedThemes = highlighter.getLoadedThemes();
  const promises = [];

  if (language && !loadedLanguages.includes(language as any))
    promises.push(highlighter.loadLanguage(language as any));

  if (theme && !loadedThemes.includes(theme as any)) promises.push(highlighter.loadTheme(theme));

  await Promise.all(promises);

  return highlighter;
});

const Renderer = (props: React.PropsWithChildren<CodeProps>) => {
  const { children, language, style, theme = 'nord', ...rest } = props;
  const highlighter = useData(props, () => getHighlighter(language, theme));

  const code = children as string;
  const html = highlighter.codeToHtml(code, {
    lang: language,
    theme
  });

  return (
    <pre {...rest} data-id="@jsx-email/code" style={style}>
      <code dangerouslySetInnerHTML={{ __html: html }}></code>
    </pre>
  );
};

export const Code = ({ children, ...props }: React.PropsWithChildren<CodeProps>) => {
  if (typeof children !== 'string')
    throw new AssertionError({ message: 'Code: component children must be of type string' });

  return (
    <>
      <Suspense fallback={<div>waiting</div>}>
        <Renderer {...props}>{children}</Renderer>
      </Suspense>
    </>
  );
};

Code.displayName = 'Code';
