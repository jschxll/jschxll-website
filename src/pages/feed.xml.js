import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { formattedDate } from "../consts";

export async function GET(context) {
  const posts = await getCollection("posts");
  const gallery = await getCollection("gallery");
  return rss({
    title: "Jan's site",
    description: "",
    site: context.site,
    items: [
      ...posts.map((post) => ({
        title: post.data.title,
        pubDate: formattedDate(post.data.pubDate),
        description: post.data.description,
        link: `/posts/${post.slug}`,
      })),
      ...gallery.map((image) => ({
        title: image.data.title,
        pubDate: image.data.pubDate,
        link: `/gallery/${image.slug}`,
      })),
    ],
  });
}