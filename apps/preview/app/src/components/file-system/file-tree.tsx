import { FolderMinus, FolderPlus, Page } from 'iconoir-react';
import { useState } from 'react';

import { cn } from '../../helpers/cn';
import type { FileTreeNode } from '../../types/templates';

interface FileTreeProps {
  nodes: FileTreeNode[];
  onTemplateClick: (templateId: string) => void;
  selectedTemplateId: string | null;
}

export function FileTree({ nodes, onTemplateClick, selectedTemplateId }: FileTreeProps) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  function toggle(path: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  return (
    <>
      {nodes.map((node) => (
        <TreeNode
          expanded={expanded}
          key={node.path}
          node={node}
          onTemplateClick={onTemplateClick}
          selectedTemplateId={selectedTemplateId}
          toggle={toggle}
        />
      ))}
    </>
  );
}

interface TreeNodeProps extends Omit<FileTreeProps, 'nodes'> {
  expanded: Set<string>;
  node: FileTreeNode;
  toggle: (path: string) => void;
}

function TreeNode({
  expanded,
  node,
  onTemplateClick,
  selectedTemplateId,
  toggle
}: TreeNodeProps) {
  if (node.type === 'folder') {
    const isOpen = expanded.has(node.path);
    const FolderIcon = isOpen ? FolderMinus : FolderPlus;

    return (
      <div>
        <button
          className="tree-row text-xs font-medium uppercase tracking-wide"
          onClick={() => toggle(node.path)}
          type="button"
        >
          <FolderIcon className="size-[15px]" />
          <span>{node.name}</span>
        </button>
        <div className={cn('tree-branch tree-children', !isOpen && 'is-collapsed')}>
          {node.children.map((child) => (
            <TreeNode
              expanded={expanded}
              key={child.path}
              node={child}
              onTemplateClick={onTemplateClick}
              selectedTemplateId={selectedTemplateId}
              toggle={toggle}
            />
          ))}
        </div>
      </div>
    );
  }

  const isSelected = selectedTemplateId === node.template?.id;

  return (
    <button
      className={cn('tree-row text-sm', isSelected && 'is-active')}
      onClick={() => node.template && onTemplateClick(node.template.id)}
      type="button"
    >
      <Page className="size-[15px]" />
      <span className="truncate">{node.name}</span>
    </button>
  );
}
