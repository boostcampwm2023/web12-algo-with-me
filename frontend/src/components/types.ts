export const THEME = ['success', 'danger', 'warning', 'info'] as const;
export type Theme = (typeof THEME)[number];
