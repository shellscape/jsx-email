import { codeToHtml } from 'shiki';
import { createCssVariablesTheme } from 'shiki/core';

const codeTheme = createCssVariablesTheme({
  variablePrefix: '--astro-code-'
});

export async function highlightCode(code: string): Promise<string> {
  return await codeToHtml(code, {
    lang: 'tsx',
    theme: codeTheme
  });
}
