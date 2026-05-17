import { Check, Copy, Download } from 'iconoir-react';
import beautify from 'js-beautify';
import { useMemo, useState } from 'react';
import type { ShikiTransformer } from 'shiki';
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

const lineNumberTransformer: ShikiTransformer = {
  name: 'jsx-email-preview-line-numbers',
  line(node, line) {
    const { children } = node;
    node.children = [
      {
        type: 'element',
        tagName: 'span',
        properties: {
          ariaHidden: 'true',
          className: ['code-line-number'],
          dataLineNumber: String(line)
        },
        children: [{ type: 'text', value: String(line) }]
      },
      {
        type: 'element',
        tagName: 'span',
        properties: { className: ['code-line-content'] },
        children
      }
    ];
  }
};

interface CodeBlockProps {
  code: string;
  fileName: string;
  lang: 'tsx' | 'html' | 'text';
}

export function formatCode(code: string, lang: CodeBlockProps['lang']) {
  if (lang === 'html') return beautify.html(code, { indent_size: 2 });
  return code;
}

export function codeToLineNumberedHtml(
  code: string,
  lang: CodeBlockProps['lang'],
  theme: 'github-light' | 'github-dark-high-contrast'
) {
  if (lang === 'text') return escapeHtml(code);
  return shiki.codeToHtml(code, {
    lang,
    theme,
    transformers: [lineNumberTransformer]
  });
}

export function CodeBlock({ code, fileName, lang }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const visibleCode = useMemo(() => formatCode(code, lang), [code, lang]);
  const html = useMemo(() => {
    const theme = document.documentElement.classList.contains('dark')
      ? 'github-dark-high-contrast'
      : 'github-light';

    return codeToLineNumberedHtml(visibleCode, lang, theme);
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
        className="card-code h-full overflow-auto rounded-[6px] border border-[var(--border)] py-4 pl-3 pr-24 text-xs leading-5"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

function escapeHtml(value: string) {
  const lines = value.split('\n');
  return `<pre class="shiki"><code>${lines
    .map((line, index) => {
      const lineNumber = index + 1;
      return `<span class="line"><span class="code-line-number" aria-hidden="true" data-line-number="${lineNumber}">${lineNumber}</span><span class="code-line-content">${line
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')}</span></span>`;
    })
    .join('')}</code></pre>`;
}
