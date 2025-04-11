---
title: Hi, Obsidian!
pubDate: 2025-04-10
description: Presenting my - eventually - new setup, which uses Obsidian as a kind of "headless CMS"
---
I just migrated my website from Hugo to Astro and made an overall redesign of the UI. I wanted it to feel slightly more natural to me to write and therefore I hopped on the hype train of Obsidian.
I heard in the past a lot about its simplicity, but I never found a good usecase to get benefits from it. Nevertheless, I now gave it _finally_ a try since the content is stored in raw markdown files, like my content does on this page. Additionally, occasioned with the migration, it's a good opportunity to try something else and play with it.

At the moment I still tinker how I can use Obsidian the best for some type of a "headless CMS". To do this, I need to create and set up a pipeline from my local Markdown files in my vault to my production branch of my website.
This includes:
1. Markdown files are synced between my smartphone and PC via Syncthing
2. Install Obsidian's Git community plugin
3. Syncthing folder contains the git repository, pushing to the "content" branch of the website's repo

````
Local markdown files ==Synced via Syncthing==> Git repository ==>
Push to "content" branch with Obsidian's Git plugin ==> 
Merge to main branch ==> Deploy to jschall.net
````
This is the current idea for such a setup - I will see, whether it's just junky or _actually_ useful...