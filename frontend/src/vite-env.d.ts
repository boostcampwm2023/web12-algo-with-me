// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    __API_URL__: string;
  }
}
