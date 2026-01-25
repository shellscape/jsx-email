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
    <div className="block-preview border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden mb-8 bg-white dark:bg-black">
      <Tabs.Root defaultValue="preview" className="flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{name}</h3>
          <Tabs.List className="flex gap-1 bg-gray-200 dark:bg-gray-700 rounded-md p-1">
            <Tabs.Trigger
              value="preview"
              className="px-3 py-1 text-xs font-medium rounded transition-colors data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Preview
            </Tabs.Trigger>
            <Tabs.Trigger
              value="code"
              className="px-3 py-1 text-xs font-medium rounded transition-colors data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Code
            </Tabs.Trigger>
          </Tabs.List>
        </div>

        <div style={{ height }}>
          <Tabs.Content value="preview" className="p-6 bg-white dark:bg-gray-900 h-full">
            <iframe
              srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;padding:16px;font-family:system-ui,sans-serif;background:#fff;}</style></head><body>${renderedHtml}</body></html>`}
              className="border-0 w-full h-full bg-white rounded"
              title={`Preview: ${name}`}
            />
          </Tabs.Content>

          <Tabs.Content value="code" className="relative h-full bg-[#24292e]">
            <button
              onClick={copyCode}
              className="absolute top-2 right-2 z-10 px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
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
