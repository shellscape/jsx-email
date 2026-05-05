import { Icon } from '@iconify/react';
import clsx from 'clsx';
import beautify from 'js-beautify';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import shikiHtmlLang from 'shiki/langs/html.mjs';
import shikiJsLang from 'shiki/langs/javascript.mjs';
import shikiTsxLang from 'shiki/langs/tsx.mjs';
import shikiGithubDarkHighContrastTheme from 'shiki/themes/github-dark-high-contrast.mjs';
import shikiGithubLightTheme from 'shiki/themes/github-light.mjs';

import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../composables/useAppStore';
import { Views } from '../../lib/types';

import { FlaotingToolbarPositioningController } from './floating-toolbar';
import type { BaseRendererProps } from './types';

interface CodePreviewProps extends BaseRendererProps {
  mode: Views.Html | Views.Jsx | Views.Plain;
}

const themes = {
  dark: 'github-dark-high-contrast',
  light: 'github-light'
};

const shiki = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine(),
  langs: [shikiHtmlLang, shikiJsLang, shikiTsxLang],
  themes: [shikiGithubLightTheme, shikiGithubDarkHighContrastTheme]
});

const PreviewContent = observer(({ mode, template }: CodePreviewProps) => {
  const appStore = useAppStore();
  const beautifulHtml = beautify.html(template.html, { indent_size: 2 });

  return mode === Views.Html ? (
    <>
      <FlaotingToolbarPositioningController>
        <div className="flex gap-2">
          <DownloadButton content={beautifulHtml} fileName={`${template.templateName}.html`} />
          <CopyButton content={beautifulHtml} />
        </div>
      </FlaotingToolbarPositioningController>
      <WithLineCounter
        content={shiki.codeToHtml(beautifulHtml, {
          lang: 'html',
          theme: themes[appStore.colorScheme.getCurrentColorScheme()]
        })}
      />
    </>
  ) : mode === Views.Jsx ? (
    <>
      <FlaotingToolbarPositioningController>
        <div className="flex gap-2">
          <DownloadButton content={template.source} fileName={`${template.templateName}.tsx`} />
          <CopyButton content={template.source} />
        </div>
      </FlaotingToolbarPositioningController>
      <WithLineCounter
        content={shiki.codeToHtml(template.source, {
          lang: 'tsx',
          theme: themes[appStore.colorScheme.getCurrentColorScheme()]
        })}
      />
    </>
  ) : mode === Views.Plain ? (
    <>
      <FlaotingToolbarPositioningController>
        <div className="flex gap-2">
          <DownloadButton content={template.plain} fileName={`${template.templateName}.txt`} />
          <CopyButton content={template.plain} />
        </div>
      </FlaotingToolbarPositioningController>
      <div
        className="whitespace-pre px-8 pt-8 pb-24"
        dangerouslySetInnerHTML={{ __html: template.plain }}
      />
    </>
  ) : (
    <></>
  );
});

export const CodePreview = observer(({ mode, template }: CodePreviewProps) => (
  <div className={clsx('bg-white dark:bg-black w-full h-max inline-block relative')}>
    <PreviewContent mode={mode} template={template} />
  </div>
));

function WithLineCounter({ content }: { content: string }) {
  const lineCount = content.split('\n').length;
  const maxLineCountLength = `${lineCount}`.length;

  return (
    <div
      className={clsx(
        'pr-24 text-sm',
        // TODO: remove bad override
        '[&_.shiki]:whitespace-pre dark:[&_.shiki]:!bg-black',
        '[&_.shiki]:[counter-reset:line_0]',
        '[&_.shiki_.line]:before:content-[counter(line)]',
        '[&_.shiki_.line]:before:[counter-increment:line]',
        '[&_.shiki_.line]:before:text-right',
        '[&_.shiki_.line]:before:text-sm',
        '[&_.shiki_.line]:before:mr-4',
        '[&_.shiki_.line]:before:pl-4',
        '[&_.shiki_.line]:before:pr-4',
        '[&_.shiki_.line]:before:box-content',
        '[&_.shiki_.line]:before:text-neutral-400 dark:[&_.shiki_.line]:before:text-neutral-600',
        '[&_.shiki_.line:hover]:before:text-neutral-900 dark:[&_.shiki_.line:hover]:before:text-neutral-100',
        '[&_.shiki_.line]:before:bg-neutral-50 dark:[&_.shiki_.line]:before:bg-neutral-950',
        '[&_.shiki_.line]:before:inline-block',
        '[&_.shiki_.line]:before:w-[calc(1ch*var(--max-line-count-length))]',
        '[&_.shiki_.line:first-child]:before:pt-8',
        '[&_.shiki_.line:last-child]:before:pb-[25vh]'
      )}
      style={{ '--max-line-count-length': maxLineCountLength } as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

function DownloadButton({ content, fileName }: { content: string; fileName: string }) {
  const file = new File([content], fileName);
  const downloadUrl = URL.createObjectURL(file);

  return (
    <Button size="icon" variant="outline" className="pointer-events-auto" asChild>
      <a href={downloadUrl} download={fileName} target="_blank">
        <Icon icon="tabler:download" />
        <span className="sr-only">Download</span>
      </a>
    </Button>
  );
}

function CopyButton({ content }: { content: string }) {
  const [hasCopied, setHasCopied] = useState(false);

  async function handleCopy() {
    setHasCopied(true);

    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {
      throw new Error(`jsx-email Preview: Unable to copy text: ${error}`);
    }

    setTimeout(() => setHasCopied(false), 3000);
  }

  return (
    <Button size="icon" variant="outline" className="pointer-events-auto" onClick={handleCopy}>
      <Icon icon={hasCopied ? 'tabler:clipboard-check' : 'tabler:clipboard'} />
      <span className="sr-only">Copy</span>
    </Button>
  );
}
