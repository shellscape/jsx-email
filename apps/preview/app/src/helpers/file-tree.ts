import type { FileTreeNode, TemplateData } from '../types/templates';
import { sortByName } from './file';

export function buildFileTree(templates: TemplateData[]) {
  const root: FileTreeNode[] = [];

  for (const template of templates) {
    const parts = template.path.split('/');
    let branch = root;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;
      const path = parts.slice(0, index + 1).join('/');
      let node = branch.find((item) => item.path === path);

      if (!node) {
        node = {
          children: [],
          name: isFile ? template.templateName : part,
          path,
          type: isFile ? 'file' : 'folder'
        };
        branch.push(node);
      }

      if (isFile) node.template = template;
      branch = node.children;
    });
  }

  return sortTree(root);
}

function sortTree(nodes: FileTreeNode[]): FileTreeNode[] {
  const folders = sortByName(nodes.filter((node) => node.type === 'folder'));
  const files = sortByName(nodes.filter((node) => node.type === 'file'));

  return [...folders, ...files].map((node) => ({
    ...node,
    children: sortTree(node.children)
  }));
}
