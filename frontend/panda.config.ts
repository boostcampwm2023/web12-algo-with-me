import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
  theme: {
    semanticTokens: {
      colors: {
        brand: {
          DEFAULT: { value: '{colors.cyan.300}' },
        },
        surface: {
          DEFAULT: { value: '{colors.gray.50}' },
        },
        text: {
          DEFAULT: { value: '{colors.gray.800}' },
          week: { value: '{colors.gray.400}' },
        },
        border: {
          DEFAULT: { value: '{colors.gray.200}' },
        },
      },
    },
  },
});
