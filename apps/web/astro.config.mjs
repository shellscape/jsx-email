// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import path from 'path';

import react from '@astrojs/react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://jsx.email',
  integrations: [
    starlight({
      title: '',
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
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/shellscape/jsx-email' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/FywZN57mTg' }
      ],
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
      expressiveCode: {
        themes: ['one-light', 'slack-dark'],
        frames: {
          extractFileNameFromCode: false
        }
      },
      customCss: [
        './src/styles/global.css',
        // Path to your custom CSS file
        './src/styles/custom.css'
      ],
      components: {
        Footer: './src/components/starlight/Footer.astro',
        Header: './src/components/starlight/Header.astro',
        PageFrame: './src/components/starlight/PageFrame.astro',
        SocialIcons: './src/components/starlight/SocialIcons.astro',
        ThemeSelect: './src/components/starlight/ThemeSelect.astro',
        // Use our custom component to hide the title
        PageTitle: './src/components/starlight/PageTitle.astro'
      }
    }),
    react()
  ],
  // Define content directories that exist outside of the typical src/content
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components')
      }
    }
  }
});
