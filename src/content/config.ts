import { z, defineCollection } from 'astro:content';

const journeyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    step: z.number(),
    author: z.string().default('Medical Review Team'),
    last_medically_reviewed_date: z.string(),
    authoritative_sources: z.array(z.string()).optional(),
    lang: z.enum(['en', 'fr', 'zh'])
  })
});

const tumorsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    incidence: z.string(),
    author: z.string().default('Medical Review Team'),
    last_medically_reviewed_date: z.string(),
    authoritative_sources: z.array(z.string()).optional(),
    lang: z.enum(['en', 'fr', 'zh'])
  })
});

export const collections = {
  'journey': journeyCollection,
  'tumors': tumorsCollection,
};
