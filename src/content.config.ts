import { defineCollection, z} from "astro:content";

const notes = defineCollection({
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        modDate: z.coerce.date().optional(),
        tags: z.array(z.string()).optional(),
        description: z.string().optional(),
    }),
    type: "content",
});

export const collections = { notes };