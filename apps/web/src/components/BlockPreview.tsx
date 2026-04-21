import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';

interface BlockPreviewProps {
  name: string;
  renderedHtml: string;
  code: string;
  codeHtml: string;
  height?: number;
}

export function BlockPreview({
  name,
  renderedHtml,
  code,
  codeHtml,
  height = 200
}: BlockPreviewProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="block-preview border border-docs-border rounded overflow-hidden mb-8 bg-docs-surface">
      <Tabs.Root defaultValue="preview" className="flex flex-col">
        <div className="flex items-center justify-between border-b border-docs-border bg-docs-surface-raised px-4 py-2">
          <h3 className="font-semibold text-docs-text-strong text-sm">{name}</h3>
          <Tabs.List className="flex gap-1 bg-[var(--surface-muted)] rounded p-1">
            <Tabs.Trigger
              value="preview"
              className="px-3 py-1 text-xs font-medium rounded transition-colors data-[state=active]:bg-docs-bg data-[state=active]:text-docs-text-strong text-docs-text-subtle hover:text-docs-text-strong"
            >
              Preview
            </Tabs.Trigger>
            <Tabs.Trigger
              value="code"
              className="px-3 py-1 text-xs font-medium rounded transition-colors data-[state=active]:bg-docs-bg data-[state=active]:text-docs-text-strong text-docs-text-subtle hover:text-docs-text-strong"
            >
              Code
            </Tabs.Trigger>
          </Tabs.List>
        </div>

        <div style={{ height }}>
          <Tabs.Content value="preview" className="p-6 bg-docs-surface-raised h-full">
            <iframe
              srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;padding:16px;font-family:system-ui,sans-serif;background:#fff;}</style></head><body>${renderedHtml}</body></html>`}
              className="border-0 w-full h-full bg-white rounded"
              title={`Preview: ${name}`}
            />
          </Tabs.Content>

          <Tabs.Content value="code" className="relative h-full bg-[#24292e]">
            <button
              onClick={copyCode}
              className="absolute top-2 right-2 z-10 px-3 py-1 text-xs bg-docs-brand text-[var(--brand-button-fg)] rounded transition-colors hover:bg-docs-brand"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <div
              className="h-full overflow-auto [&>pre]:min-h-full [&>pre]:m-0 [&>pre]:p-4 [&>pre]:text-sm"
              dangerouslySetInnerHTML={{ __html: codeHtml }}
            />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}
