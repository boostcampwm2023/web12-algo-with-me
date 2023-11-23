import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: process.env.NODE_ENV === 'development' ? '' : 'dist/index.html',
  },
  base: '',
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        find: '@style',
        replacement: path.resolve(__dirname, 'styled-system'),
      },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  worker: {
    format: 'es',
  },
  plugins: [react()],
});
