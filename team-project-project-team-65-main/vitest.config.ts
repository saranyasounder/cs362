import { defineConfig } from 'vitest/config';
import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  test: {
    environment: 'jsdom',
    globals: true
  },
  resolve: {
    alias: {
      $src: path.resolve('./src')
    },
    conditions: ['browser']
  }
});
