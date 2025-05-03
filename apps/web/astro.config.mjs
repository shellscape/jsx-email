// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import { fileURLToPath } from 'url';
import path from 'path';

import react from '@astrojs/react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://jsx.email',
  integrations: [
    tailwind({
      configFile: './tailwind.config.mjs'
    }),
    starlight({
      title: 'JSX Email',
      logo: {
        src: './src/assets/logo.svg',
        alt: 'JSX Email Logo'
      },
      description: 'Build and send emails using JSX with a delightful developer experience',
      defaultLocale: 'en',
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://jsx.email/og.png'
          }
        },
        {
          tag: 'meta',
          attrs: {
            property: 'twitter:image',
            content: 'https://jsx.email/og.png'
          }
        }
      ],
      social: {
        github: 'https://github.com/shellscape/jsx-email',
        discord: 'https://discord.gg/FywZN57mTg',
        twitter: 'https://twitter.com/jsxemail'
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/getting-started/introduction' },
            { label: 'Quick Start', link: '/getting-started/quick-start' },
            { label: 'Recipes', link: '/getting-started/recipes' },
            { label: 'Email Providers', link: '/getting-started/email-providers' },
            { label: 'FAQ', link: '/getting-started/faq' },
            { label: 'Contributing', link: '/getting-started/contributing' }
          ]
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' }
        },
        {
          label: 'Core',
          autogenerate: { directory: 'core' }
        },
        {
          label: 'Plugins',
          autogenerate: { directory: 'plugins' }
        },
        {
          label: 'Upgrade',
          autogenerate: { directory: 'upgrade' }
        }
      ],
      customCss: [
        // Path to your custom CSS file
        './src/styles/custom.css'
      ],
      components: {
        // Use our custom component to hide the title
        PageTitle: './src/components/starlight/PageTitle.astro'
      }
    }),
    react()
  ],
  // Define content directories that exist outside of the typical src/content
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components')
      }
    }
  }
});
