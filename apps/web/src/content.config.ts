import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/[^_]*.mdx' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    params: z.string().optional(),
    type: z.string().optional(),
    copyPrompt: z.string().optional(),
    copyPromptComponent: z.string().optional()
  })
});

export const collections = { docs };
