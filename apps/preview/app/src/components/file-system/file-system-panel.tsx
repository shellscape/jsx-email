import { NavArrowDown, NavArrowUp } from 'iconoir-react';
import { useMemo, useState } from 'react';

import { buildFileTree } from '../../helpers/file-tree';
import { cn } from '../../helpers/cn';
import { usePreviewStore } from '../../stores/preview-store';
import { Button } from '../ui/button';
import { FileTree } from './file-tree';

export function FileSystemPanel() {
  const templates = usePreviewStore((state) => state.templates);
  const cards = usePreviewStore((state) => state.cards);
  const selectedId = usePreviewStore((state) => state.selectedId);
  const addOrFocusTemplate = usePreviewStore((state) => state.addOrFocusTemplate);
  const [collapsed, setCollapsed] = useState(false);
  const [animating, setAnimating] = useState(false);
  const selectedTemplateId = cards.find((card) => card.id === selectedId)?.templateId || null;
  const tree = useMemo(() => buildFileTree(templates), [templates]);

  function toggleCollapsed() {
    setCollapsed((value) => !value);
    setAnimating(true);
    window.setTimeout(() => setAnimating(false), 240);
  }

  return (
    <aside
      className={`app-panel fixed left-3 z-40 my-24 flex w-72 flex-col overflow-hidden p-3 transition-[height] duration-200 ease-out ${
        collapsed ? 'h-12' : 'h-[calc(100%_-_8rem)]'
      }`}
      id="templates-window"
    >
      <div className={`flex items-center justify-between ${collapsed ? '' : 'mb-3'}`}>
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
          Templates
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-[6px] border border-[var(--border)] px-2 py-1 text-xs font-medium text-[var(--text-subtle)]">
            {templates.length} files
          </span>
          <Button
            aria-label={collapsed ? 'Expand file system' : 'Collapse file system'}
            className={cn('panel-collapse-button min-h-0 px-1.5 py-1', animating && 'is-animating')}
            onClick={toggleCollapsed}
            title={collapsed ? 'Expand file system' : 'Collapse file system'}
            variant="ghost"
          >
            {collapsed ? <NavArrowDown className="size-[13px]" /> : <NavArrowUp className="size-[13px]" />}
          </Button>
        </div>
      </div>
      {!collapsed && (
        <div className="min-h-0 flex-1 space-y-1 overflow-auto pr-1">
          <FileTree
            nodes={tree}
            onTemplateClick={addOrFocusTemplate}
            selectedTemplateId={selectedTemplateId}
          />
        </div>
      )}
    </aside>
  );
}
