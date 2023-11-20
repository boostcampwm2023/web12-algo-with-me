import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: 'frontend/dist/index.html',
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
  plugins: [react()],
});
