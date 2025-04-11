import { defineCollection, z } from "astro:content";

const posts = defineCollection({
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
    type: 'content',
});

const gallery = defineCollection({
    schema: ({ image }) => z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        location: z.string().optional(),
        tags: z.array(z.string()).optional(),
        image: z.array(image()),
    }),
});

export const collections = { posts, gallery };