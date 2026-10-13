'use strict';

import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        meta_title: z.string(),
        meta_description: z.string(),
        created_at: z.string(),
        updated_at: z.string(),
        locale: z.enum(['en', 'fr']),
        visibility: z.enum(['public', 'private']),
        category: z.string(),
        // tags: z.array(z.string()),
        slug: z.string(),
      }),
    }),
  },
});
