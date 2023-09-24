import { defineConfig } from 'vitepress';

import { sidebar } from './sidebar.mjs';

// TODO: make a vitepress plugins for pnpm, yarn, npm, etc based on
// https://github.com/vuejs/vitepress/blob/6edc588e5c1f01f50c1e158c705e04c1745db1e0/src/node/markdown/plugins/containers.ts#L56

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  cleanUrls: true,
  description: 'Build emails with a delightful DX',
  markdown: {
    theme: {
      dark: 'slack-dark',
      light: 'slack-ochin'
    }
  },
  srcDir: 'markdown',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Documentation', link: '/docs/introduction' },
      { text: 'Quick Start', link: '/docs/quick-start' },
      { text: 'Email Samples', link: '/docs/samples' }
    ],

    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/shellscape/jsx-email' }]
  },
  title: 'JSX email',
  titleTemplate: 'JSX email • :title'
});
