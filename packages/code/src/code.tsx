import { AssertionError } from 'assert';

import mem from 'p-memoize';
import React from 'react';
import { getHighlighter as shikiGetHighlighter } from 'shiki';

type RootProps = React.ComponentPropsWithoutRef<'pre'>;

interface CodeOptions {
  language?: string;
  theme?: string;
}

export interface CodeProps extends RootProps {
  children: string;
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

export const getCode = async ({ language, theme = 'nord' }: CodeOptions) => {
  const highlighter = await getHighlighter(language, theme);

  const Code = ({ children, style, ...props }: React.PropsWithChildren<Readonly<CodeProps>>) => {
    if (typeof children !== 'string')
      throw new AssertionError({ message: 'Code: component children must be of type string' });

    const code = children as string;
    const html = highlighter.codeToHtml(code, {
      lang: language,
      theme
    });

    return (
      <pre {...props} data-id="@jsx-email/code" style={style}>
        <code dangerouslySetInnerHTML={{ __html: html }}></code>
      </pre>
    );
  };

  Code.displayName = 'Code';

  return Code;
};
