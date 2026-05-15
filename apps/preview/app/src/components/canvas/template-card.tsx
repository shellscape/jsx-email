import { Xmark } from 'iconoir-react';
import { useEffect, useMemo, useState } from 'react';

import { CodeBlock } from '../code/code-block';
import { applyGmailInversion } from '../../helpers/color-inversion';
import { cn } from '../../helpers/cn';
import { previewPresets } from '../../helpers/presets';
import { usePreviewStore } from '../../stores/preview-store';
import type { CardState } from '../../types/lab';
import type { TemplateData, TemplateTab } from '../../types/templates';
import { Button } from '../ui/button';
import { PreviewIframe } from './preview-iframe';
import { SpamButton } from './spam-button';

interface TemplateCardProps {
  card: CardState;
  selected: boolean;
  setCardNode: (id: string, node: HTMLDivElement | null) => void;
  template: TemplateData;
}

const tabs: TemplateTab[] = ['preview', 'jsx', 'html', 'plain'];
const tabLabels: Record<TemplateTab, string> = {
  html: 'HTML',
  jsx: 'JSX',
  plain: 'Plain',
  preview: 'Preview'
};

export function TemplateCard({ card, selected, setCardNode, template }: TemplateCardProps) {
  const [tab, setTab] = useState<TemplateTab>('preview');
  const lab = usePreviewStore((state) => state.labs[card.id]);
  const spamState = usePreviewStore((state) => state.spamByTemplateId[template.id]);
  const ensureLab = usePreviewStore((state) => state.ensureLab);
  const focusCard = usePreviewStore((state) => state.focusCard);
  const closeCard = usePreviewStore((state) => state.closeCard);

  useEffect(() => ensureLab(card.id), [card.id, ensureLab]);

  const activePreset =
    previewPresets.find((item) => item.name === lab?.preset) || previewPresets[0];
  const previewHtml = lab?.invertColors ? applyGmailInversion(template.html) : template.html;
  const code = useMemo(() => {
    if (tab === 'html') return template.html;
    if (tab === 'plain') return template.plain;
    return template.source;
  }, [tab, template]);
  const sourceLang = tab === 'jsx' ? 'tsx' : tab === 'html' ? 'html' : 'text';
  const sourceFileName = `${template.path}.${tab === 'jsx' ? 'tsx' : tab === 'html' ? 'html' : 'txt'}`;

  return (
    <div
      className={cn(
        'inline-block w-[var(--card-width)] rounded-[6px] align-top transition',
        selected
          ? 'cursor-default ring-2 ring-[var(--ring)] ring-offset-2 ring-offset-white dark:ring-offset-black'
          : 'cursor-pointer'
      )}
      onClick={() => focusCard(card.id)}
      ref={(node) => setCardNode(card.id, node)}
    >
      <article className="app-panel h-[680px] overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--border)] p-3">
          <button
            className="min-w-0 text-left"
            onClick={(event) => {
              event.stopPropagation();
              focusCard(card.id);
            }}
            type="button"
          >
            <h2 className="truncate font-medium text-[var(--text-strong)]">
              {template.templateName}
            </h2>
          </button>
          <div className="ml-3 flex shrink-0 items-center gap-2">
            <SpamButton className="mr-2" state={spamState} />
            <div aria-label={`${template.templateName} views`} className="card-tabs" role="tablist">
              {tabs.map((item) => (
                <button
                  aria-selected={tab === item}
                  className={cn('card-tab', tab === item && 'is-active')}
                  key={item}
                  onClick={(event) => {
                    event.stopPropagation();
                    setTab(item);
                  }}
                  role="tab"
                  type="button"
                >
                  {tabLabels[item]}
                </button>
              ))}
            </div>
            <Button
              aria-label={`Close ${template.templateName}`}
              className="card-close-button px-2"
              onClick={(event) => {
                event.stopPropagation();
                closeCard(card.id);
              }}
              onPointerDown={(event) => event.stopPropagation()}
              size="icon"
              title={`Close ${template.templateName}`}
              type="button"
              variant="ghost"
            >
              <Xmark className="size-4" />
            </Button>
          </div>
        </div>
        <div className="h-[623px] bg-[var(--surface-muted)] p-5">
          {tab === 'preview' ? (
            <div
              className={cn(
                'preview-frame-shell h-full overflow-hidden rounded-[var(--radius)] border border-[var(--border)] shadow-sm',
                activePreset.width && 'is-mobile',
                lab?.colorScheme && 'is-dark-scheme'
              )}
              style={{
                width: activePreset.width ? `${activePreset.width}px` : '100%'
              }}
            >
              <PreviewIframe html={previewHtml} title={template.templateName} />
            </div>
          ) : (
            <CodeBlock code={code} fileName={sourceFileName} lang={sourceLang} />
          )}
        </div>
      </article>
    </div>
  );
}
