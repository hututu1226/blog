import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hututu1226.github.io',
  base: '/blog',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  }
});
