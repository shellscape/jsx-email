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
      }
    })
  ]
});
