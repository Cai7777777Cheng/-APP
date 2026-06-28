import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        index2: resolve(process.cwd(), 'index2.html'),
        index3: resolve(process.cwd(), 'index3.html')
      }
    }
  }
});
