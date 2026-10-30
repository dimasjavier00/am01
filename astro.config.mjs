import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://am01.pages.dev',
  build: { format: 'directory' },
  vite: { plugins: [tailwindcss()] },
});
