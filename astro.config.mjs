import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    config: './tailwind.config.js'
  })],
  output: 'server',
  adapter: undefined,
  srcDir: './src',
  publicDir: './public',
  outDir: './dist',
  server: {
    port: 3001
  },
});