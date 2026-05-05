import { Check, Copy, Download } from 'iconoir-react';
import beautify from 'js-beautify';
import { useMemo, useState } from 'react';
import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import shikiHtmlLang from 'shiki/langs/html.mjs';
import shikiJsLang from 'shiki/langs/javascript.mjs';
import shikiTsxLang from 'shiki/langs/tsx.mjs';
import shikiGithubDarkHighContrastTheme from 'shiki/themes/github-dark-high-contrast.mjs';
import shikiGithubLightTheme from 'shiki/themes/github-light.mjs';

const shiki = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine(),
  langs: [shikiHtmlLang, shikiJsLang, shikiTsxLang],
  themes: [shikiGithubLightTheme, shikiGithubDarkHighContrastTheme]
});

interface CodeBlockProps {
  code: string;
  fileName: string;
  lang: 'tsx' | 'html' | 'text';
}

export function formatCode(code: string, lang: CodeBlockProps['lang']) {
  if (lang === 'html') return beautify.html(code, { indent_size: 2 });
  return code;
}

export function CodeBlock({ code, fileName, lang }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const visibleCode = useMemo(() => formatCode(code, lang), [code, lang]);
  const html = useMemo(() => {
    if (lang === 'text') return escapeHtml(visibleCode);
    return shiki.codeToHtml(visibleCode, {
      lang,
      theme: document.documentElement.classList.contains('dark')
        ? 'github-dark-high-contrast'
        : 'github-light'
    });
  }, [lang, visibleCode]);

  async function copy() {
    await navigator.clipboard.writeText(visibleCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="code-block-wrap h-full">
      <div className="code-actions">
        <a
          aria-label="Download code"
          className="code-action"
          download={fileName}
          href={URL.createObjectURL(new File([visibleCode], fileName))}
          title="Download code"
        >
          <Download className="size-4" />
        </a>
        <button
          aria-label={copied ? 'Copied code' : 'Copy code'}
          className="code-action"
          onClick={copy}
          title={copied ? 'Copied' : 'Copy code'}
          type="button"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
      <div
        className="card-code h-full overflow-auto rounded-[6px] border border-[var(--border)] p-4 pr-24 text-xs leading-5"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

function escapeHtml(value: string) {
  return `<pre class="shiki"><code>${value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')}</code></pre>`;
}
