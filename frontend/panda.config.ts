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
          success: { value: '#82DD55' },
          warning: { value: '#8E6F3A' },
          error: { value: '#E23636' },
          info: { value: '#C8CDD0' },
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
      fontSizes: {
        display: {
          lg: { value: '57px' },
          md: { value: '45px' },
          sm: { value: '36px' },
        },
        title: {
          lg: { value: '22px' },
          md: { value: '16px' },
          sm: { value: '14px' },
        },
        body: {
          lg: { value: '16px' },
          md: { value: '14px' },
          sm: { value: '12px' },
        },
        label: {
          lg: { value: '14px' },
          md: { value: '12px' },
          sm: { value: '11px' },
        },
      },
    },
  },
});
