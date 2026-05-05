import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().default('未命名草稿'),
    description: z.string().default('这篇草稿还没有摘要。'),
    pubDate: z.coerce.date().default(new Date('1970-01-01')),
    updatedDate: z.coerce.date().optional(),
    category: z.string().default('生活杂谈'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(true)
  })
});

export const collections = { blog };
