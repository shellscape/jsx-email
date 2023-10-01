import { basename, resolve } from 'path';

import titleize from 'titleize';
import globby from 'globby';
import type { DefaultTheme } from 'vitepress';

const files = await globby(['**/*.md'], { cwd: resolve(__dirname, '../src/docs') });
const nested = files.filter((file) => file.includes('/')).sort();
const groups = nested.reduce((prev, file) => {
  // Note: This assumes we'll only have one level of nesting
  const [dirName, fileName] = file.split('/');
  const groupName = titleize(dirName);
  const itemName = basename(fileName, '.md');
  let linkName = titleize(itemName);

  if (linkName === 'Cli') linkName = 'CLI';

  const item = { link: `/docs/${dirName}/${itemName}`, text: linkName };

  if (prev[groupName]) {
    prev[groupName].items.push(item);
  } else {
    prev[groupName] = { items: [item] };
  }

  return prev;
}, {} as Record<string, DefaultTheme.SidebarItem> | void);
const entries = Object.entries(groups!).map(([key, value]) => {
  return {
    text: key,
    ...value
  };
});

export const sidebar = [
  {
    text: 'Meat and Potatoes',
    items: [
      { text: 'Introduction', link: '/docs/introduction' },
      { text: 'Quick Start', link: '/docs/quick-start' },
      { text: 'Contributing', link: '/docs/contributing' }
    ]
  },
  ...entries
];
