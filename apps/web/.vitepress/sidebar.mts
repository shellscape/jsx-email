import { basename, resolve } from 'path';

import titleize from 'titleize';
import globby from 'globby';
import type { DefaultTheme } from 'vitepress';

const files = await globby(['**/*.md'], { cwd: resolve(__dirname, '../markdown/docs') });
const nested = files.filter((file) => file.includes('/')).sort();
const groups = nested.reduce((prev, file) => {
  // Note: This assumes we'll only have one level of nesting
  const [dirName, fileName] = file.split('/');
  const groupName = titleize(dirName);
  const itemName = basename(fileName, '.md');
  console.log(itemName);
  const item = { link: `/docs/${dirName}/${itemName}`, text: titleize(itemName) };

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
    text: 'Meat and Potatos',
    items: [
      { text: 'Introduction', link: '/docs/introduction' },
      { text: 'Getting Started', link: '/docs/getting-started' },
      { text: 'Contributing', link: '/docs/contributing' }
    ]
  },
  ...entries
];
