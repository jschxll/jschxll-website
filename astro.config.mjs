import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './remark-reading-time.mjs';

import mdx from '@astrojs/mdx';

export default defineConfig({
  site: "https://jschall.net",
  integrations: [sitemap(), mdx()],
  vite: {
      plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});