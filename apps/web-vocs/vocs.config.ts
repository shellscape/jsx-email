import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'JSX Email',
  description: 'Build and send emails using JSX with a delightful developer experience',
  iconUrl: '/favicon.svg',
  logoUrl: '/logo.svg',
  topNav: [
    { text: 'Docs', link: '/getting-started/introduction' },
    { text: 'Components', link: '/components/background' },
    { text: 'Core', link: '/core/cli' },
    { text: 'GitHub', link: 'https://github.com/shellscape/jsx-email' }
  ],
  socials: [
    { icon: 'github', link: 'https://github.com/shellscape/jsx-email' },
    { icon: 'discord', link: 'https://discord.gg/FywZN57mTg' },
    { icon: 'x', link: 'https://twitter.com/jsxemail' }
  ],
  sidebar: [
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction', link: '/getting-started/introduction' },
        { text: 'Quick Start', link: '/getting-started/quick-start' },
        { text: 'Recipes', link: '/getting-started/recipes' },
        { text: 'Email Providers', link: '/getting-started/email-providers' },
        { text: 'FAQ', link: '/getting-started/faq' },
        { text: 'Contributing', link: '/getting-started/contributing' }
      ]
    },
    {
      text: 'Components',
      items: [
        { text: 'Avatar', link: '/components/avatar' },
        { text: 'Avatar Group', link: '/components/avatar-group' },
        { text: 'Background', link: '/components/background' },
        { text: 'Barcode', link: '/components/barcode' },
        { text: 'Body', link: '/components/body' },
        { text: 'Butan', link: '/components/butan' },
        { text: 'Button', link: '/components/button' },
        { text: 'Code', link: '/components/code' },
        { text: 'Color Scheme', link: '/components/colorscheme' },
        { text: 'Column', link: '/components/column' },
        { text: 'Conditional', link: '/components/conditional' },
        { text: 'Container', link: '/components/container' },
        { text: 'Font', link: '/components/font' },
        { text: 'Graph', link: '/components/graph' },
        { text: 'Head', link: '/components/head' },
        { text: 'Heading', link: '/components/heading' },
        { text: 'Hr', link: '/components/hr' },
        { text: 'Html', link: '/components/html' },
        { text: 'Img', link: '/components/img' },
        { text: 'Link', link: '/components/link' },
        { text: 'Markdown', link: '/components/markdown' },
        { text: 'Preview', link: '/components/preview' },
        { text: 'Raw', link: '/components/raw' },
        { text: 'Row', link: '/components/row' },
        { text: 'Section', link: '/components/section' },
        { text: 'Tailwind', link: '/components/tailwind' },
        { text: 'Text', link: '/components/text' }
      ]
    },
    {
      text: 'Core',
      items: [
        { text: 'CLI', link: '/core/cli' },
        { text: 'Compile', link: '/core/compile' },
        { text: 'Configuration', link: '/core/config' },
        { text: 'Plugins', link: '/core/plugins' },
        { text: 'Render', link: '/core/render' }
      ]
    },
    {
      text: 'Plugins',
      items: [
        { text: 'Inline', link: '/plugins/inline' },
        { text: 'Minify', link: '/plugins/minify' },
        { text: 'Pretty', link: '/plugins/pretty' }
      ]
    },
    {
      text: 'Upgrade',
      items: [{ text: 'Version 2', link: '/upgrade/v2' }]
    }
  ]
})
