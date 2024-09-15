// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'JSX email',
      social: {
        github: 'https://github.com/shellscape/jsx-email',
        discord: 'https://discord.gg/FywZN57mTg'
      },
      logo: {
        replacesTitle: true,
        src: '@assets/logo.svg'
      },
      editLink: {
        baseUrl: 'https://github.com/shellscape/jsx-email/edit/main/'
      },
      sidebar: [
        {
          label: 'Getting started',
          autogenerate: { directory: 'getting-started' }
        },
        {
          label: 'Core',
          autogenerate: { directory: 'core' }
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' }
        }
      ],
      credits: true
    })
  ]
});
