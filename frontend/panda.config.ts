import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
  theme: {
    semanticTokens: {
      colors: {
        background: { value: '#263238' },
        alert: {
          success: {
            DEFAULT: { value: '#82DD55' },
            dark: { value: '#355A23' },
            light: { value: '#82DD55B2' },
          },
          warning: {
            DEFAULT: { value: '#8E6F3A' },
            dark: { value: '#EDB95E' },
            light: { value: '#EDB95EB2' },
          },
          error: {
            DEFAULT: { value: '#E23636' },
            dark: { value: '#751919' },
            light: { value: '#E23636B2' },
          },
          info: {
            DEFAULT: { value: '#C8CDD0' },
            dark: { value: '#444749' },
            light: { value: '#C8CDD0B2' },
          },
        },
        brand: {
          DEFAULT: { value: '#FFA800' },
          alt: { value: '#FFBB36' },
        },
        surface: {
          DEFAULT: { value: '#37474F' },
          alt: { value: '#455A64' },
        },
        text: {
          DEFAULT: { value: '#F5F5F5' },
          light: { value: '#FAFAFA' },
        },
        border: {
          DEFAULT: { value: '#455A64' },
        },
      },
    },
  },
});
