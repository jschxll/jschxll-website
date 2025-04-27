import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
    const notes = await getCollection("notes");
    return rss({
        title: "Jan's site",
        description: "My RSS feed",
        site: context.site,
        items: notes.map(note => ({
            title: note.data.title,
            description: note.data.description,
            categories: note.data.tags,
            pubDate: note.data.pubDate,
            link: `/notes/${note.slug}`,
        })),
    });
}