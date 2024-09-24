import classnames from 'classnames';
import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import js from 'shiki/langs/javascript.mjs';
import html from 'shiki/langs/html.mjs';
import tsx from 'shiki/langs/tsx.mjs';
import darkPlus from 'shiki/themes/dark-plus.mjs';

export type PreviewLanguage = 'html' | 'jsx' | 'plain';

interface CodeProps {
  children: string;
  className?: string;
  language?: PreviewLanguage;
}

const theme = 'dark-plus';
const shiki = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine(),
  langs: [html, js, tsx],
  themes: [darkPlus]
});

export const Code = ({ children: value, language = 'html' }: CodeProps) => {
  const lang = language === 'jsx' ? 'tsx' : language;
  const code = language === 'plain' ? value : shiki.codeToHtml(value, { lang, theme });
  const lines = value.split('\n').length;
  const css = `
    .${language} .shiki .line:before {
      width: calc(${lines.toString().length} * 12px + 12px);
    }`;

  return (
    <>
      <style>{css}</style>
      <div
        className={classnames(language)}
        dangerouslySetInnerHTML={{ __html: code }}
        style={{
          fontFamily:
            'SFMono-Regular,Consolas,"Liberation Mono",Menlo,Monaco,"Lucida Console","Liberation Mono","DejaVu Sans Mono","Bitstream Vera Sans Mono","Courier New"'
        }}
      ></div>
    </>
  );
};
