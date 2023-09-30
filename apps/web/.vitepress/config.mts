import { defineConfig } from 'vitepress';

import { sidebar } from './sidebar.mjs';

// TODO: make a vitepress plugins for pnpm, yarn, npm, etc based on
// https://github.com/vuejs/vitepress/blob/6edc588e5c1f01f50c1e158c705e04c1745db1e0/src/node/markdown/plugins/containers.ts#L56

// https://vitepress.dev/reference/site-config
export default defineConfig({
  appearance: 'force-dark',
  base: '/',
  cleanUrls: true,
  description: 'Build emails with a delightful DX',
  head: [
    [
      'link',
      {
        rel: 'shortcut icon',
        href: `data:image/svg+xml;charset=UTF-8,%3csvg width='126' height='113' viewBox='0 0 126 113' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.199951 50V109V113H4.19995H121.8H125.8V109V50H117.8V105H8.19995V50H0.199951Z' fill='%2364595C'/%3e%3cpath d='M0 53.429V47.4258L48.3069 22.8124V32.4176L11.2516 50.2773L11.5517 49.677V51.1778L11.2516 50.5775L48.3069 68.4372V78.0424L0 53.429Z' fill='%2364595C'/%3e%3cpath d='M79.4367 0L54.6832 92H46.582L71.3356 0H79.4367Z' fill='%2364595C'/%3e%3cpath d='M126 53.429L77.6931 78.0424V68.4372L114.748 50.5775L114.448 51.1778V49.677L114.748 50.2773L77.6931 32.4176V22.8124L126 47.4258V53.429Z' fill='%2364595C'/%3e%3c/svg%3e `
      }
    ]
  ],
  ignoreDeadLinks: true,
  markdown: {
    theme: {
      dark: 'slack-dark',
      light: 'slack-ochin'
    }
  },
  outDir: './dist',
  srcDir: 'markdown',
  themeConfig: {
    docFooter: {
      prev: false,
      next: false
    },
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Documentation', link: '/docs/introduction' },
      { text: 'Quick Start', link: '/docs/quick-start' },
      { text: 'Email Samples', link: '/docs/samples' }
    ],
    sidebar,
    siteTitle: '',
    socialLinks: [
      { icon: 'discord', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'github', link: 'https://github.com/shellscape/jsx-email' }
    ]
  },
  titleTemplate: 'JSX email • :title'
});
