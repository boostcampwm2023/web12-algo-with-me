import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default () => {
  const env = loadEnv('', process.cwd(), 'APP');
  console.log(env, process.env, env.APP_API_URL);
  return defineConfig({
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
    define: {
      __API_URL__: JSON.stringify(env.APP_API_URL),
    },
  });
};
