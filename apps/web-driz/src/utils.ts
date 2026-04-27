import type { IHeading, TreeNode } from '@/types';

export const addNofollowToExternalLinks = (html: string): string => {
  const externalLinkPattern =
    /<a\s+(?![^>]*\brel=["']nofollow["'])([^>]*\bhref=["']https?:\/\/(?!(orm\.drizzle\.team|drizzle\.team)[^"']*)[^"']+["'][^>]*)>/gi;

  return html
    .replace(externalLinkPattern, '<a $1 rel="nofollow">')
    .replace(/<a(?![^>]*\btarget=["'][^"']*["'])/gi, '<a target="_blank"');
};

export type Months = Record<string, string[]>;

export const fillMonthsGaps = (monthsObject: Months): Months => {
  const months = { ...monthsObject };

  const getMonthStart = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const addMonths = (date: Date, monthsToAdd: number): Date => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + monthsToAdd);
    return result;
  };

  const parseDate = (dateString: string): Date => {
    return new Date(dateString);
  };

  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  const sortedKeys = Object.keys(months).sort(
    (a, b) => parseDate(a).getTime() - parseDate(b).getTime()
  );

  let currentMonthStart = getMonthStart(parseDate(sortedKeys[0]));

  const now = new Date();
  const currentMonth = getMonthStart(now);

  let filledMonths: Months = {};

  for (const key of sortedKeys) {
    const month = months[key];
    const monthStart = getMonthStart(parseDate(key));

    while (currentMonthStart.getTime() < monthStart.getTime()) {
      filledMonths = { ...filledMonths, [formatDate(currentMonthStart)]: [] };
      currentMonthStart = addMonths(currentMonthStart, 1);
    }

    filledMonths = { ...filledMonths, [key]: month };
    currentMonthStart = addMonths(currentMonthStart, 1);
  }

  while (currentMonthStart.getTime() <= currentMonth.getTime()) {
    filledMonths = { ...filledMonths, [formatDate(currentMonthStart)]: [] };
    currentMonthStart = addMonths(currentMonthStart, 1);
  }

  return filledMonths;
};

export interface SidebarItem {
  type: 'mdx' | 'subDir' | 'separator' | 'empty' | 'dot-separator' | 'collapsable';
  title: string;
  path: string;
  badge?: string;
}

type MetaBadge = 'open-source' | 'new-component';
type MetaTuple = [path: string, title: string, badge?: MetaBadge];
type MetaEntry = string | MetaTuple;

interface ContentTreeProps {
  headings?: IHeading[];
  slug?: string;
}

export const getContentTree = async (props: ContentTreeProps) => {
  const [metaFiles, mdxFiles] = await Promise.all([
    import.meta.glob('./content/**/*.json'),
    import.meta.glob('./content/**/*.mdx')
  ]);

  const mdxPaths = Object.keys(mdxFiles);
  const regex = /\.\/content\/(.*?)\/_meta\.json/;

  const navItems: SidebarItem[] = [];
  const headingBadges = new Map<string, MetaBadge>();

  const getTypeOfFile = (value: string): SidebarItem['type'] => {
    if (mdxPaths.includes(`./content/${value}.mdx`)) {
      return 'mdx';
    }
    if (mdxPaths.some((path) => path.includes(value))) {
      return 'subDir';
    }
    return 'empty';
  };

  const parsedMetaFiles = await Promise.all(
    Object.entries(metaFiles).map(async ([metaPath, loader]) => ({
      metaPath,
      parsed: (await loader()) as { default: MetaEntry[] }
    }))
  );

  parsedMetaFiles.forEach(({ metaPath, parsed }) => {
    const metaSlug = metaPath.match(regex);

    if (!metaSlug) {
      return;
    }

    const extractedText = metaSlug[1];

    parsed.default.forEach((entry, i) => {
      if (Array.isArray(entry)) {
        const [path, title, badge] = entry;

        if (path.includes('#')) {
          if (badge) {
            headingBadges.set(`${extractedText}/${path}`, badge);
          }

          return;
        }

        navItems.push({
          type: getTypeOfFile(`${metaSlug[1]}/${path}`),
          title,
          path: `${extractedText}/${path}`,
          badge
        });

        return;
      }

      if (entry === '---') {
        navItems.push({
          type: 'dot-separator',
          title: 'dot-separator',
          path: `${extractedText}/${entry}${i}`
        });
      } else if (entry.includes('::')) {
        navItems.push({
          type: 'collapsable',
          title: entry.replace('::', ''),
          path: `${extractedText}/${entry}`
        });
      } else {
        navItems.push({
          type: 'separator',
          title: entry,
          path: `${extractedText}/${entry}`
        });
      }
    });
  });

  const dialectNames = ['sqlite', 'pg', 'mysql'];

  const buildTree = (items: SidebarItem[]): TreeNode[] => {
    const tree: TreeNode[] = [];
    for (const item of items) {
      const pathParts = item.path?.split('/') ?? [];
      const parts =
        pathParts[0] === 'docs' && pathParts.length > 2
          ? [pathParts[0], pathParts.slice(1).join('/')]
          : pathParts;
      let currentNode = tree;
      for (const part of parts) {
        const existingNode = currentNode.find((node) => node.name === part);
        if (existingNode && existingNode.children) {
          if (part === parts.at(-1) && item.badge) {
            existingNode.badge = item.badge;
          }
          currentNode = existingNode.children;
        } else {
          const newNode: TreeNode = {
            name: part,
            type: item.type,
            title: item.title,
            children: [],
            badge: item.badge
          };
          currentNode.push(newNode);
          currentNode = newNode.children;
        }
      }
    }

    const findDialects = (node: TreeNode) => {
      if (node.children) {
        const dialects = node.children.filter((child) => dialectNames.includes(child.name));
        if (dialects.length > 0) {
          node.type = 'withDialects';
        }
        node.children.forEach((child) => findDialects(child));
      }
    };

    tree.forEach((node) => findDialects(node));

    return tree;
  };

  const tree = buildTree(navItems);

  const filteredHeadings =
    props.headings
      ?.filter((heading) => heading.depth === 2 || heading.depth === 3)
      .map((heading) => ({
        ...heading,
        badge: props.slug ? headingBadges.get(`${props.slug}#${heading.slug}`) : undefined
      })) ?? [];

  const findTitleBySlug = (tree: TreeNode[], slug: string): string | undefined => {
    const traverse = (node: TreeNode, currentSlug: string): string | undefined => {
      const currentPath = currentSlug ? `${currentSlug}/${node.name}` : node.name;
      if (currentPath === slug) {
        return node.title;
      }
      for (const child of node.children) {
        const result = traverse(child, currentPath);
        if (result !== undefined) {
          return result;
        }
      }
      return undefined;
    };
    for (const node of tree) {
      const result = traverse(node, '');
      if (result !== undefined) {
        return result;
      }
    }
    return undefined;
  };

  const title = findTitleBySlug(tree, props.slug ?? '');

  return {
    tree,
    filteredHeadings,
    title
  };
};

export const getMonthLabel = (startDate: string): string => {
  const start = new Date(startDate);
  const now = new Date();

  const inputMonthStart = new Date(start.getFullYear(), start.getMonth(), 1);

  const diffMonths =
    (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());

  if (diffMonths === 0) {
    return 'this month';
  }

  if (start.getFullYear() !== now.getFullYear()) {
    return inputMonthStart.toLocaleString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  }

  return inputMonthStart.toLocaleString('en-US', {
    month: 'long'
  });
};

export const isAbsoluteUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    void parsedUrl;
    return true;
  } catch {
    return false;
  }
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const BASE_DATE = new Date(Date.UTC(2025, 0, 1));

export function rotateArrayDaily<T>(items: T[]): T[] {
  if (items.length <= 1) return items;

  const todayUtc = Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate()
  );
  const baseUtc = Date.UTC(
    BASE_DATE.getUTCFullYear(),
    BASE_DATE.getUTCMonth(),
    BASE_DATE.getUTCDate()
  );

  const daysPassed = Math.floor((todayUtc - baseUtc) / MS_PER_DAY);
  const offset = daysPassed % items.length;

  return [...items.slice(offset), ...items.slice(0, offset)];
}
