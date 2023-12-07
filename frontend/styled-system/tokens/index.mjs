const tokens = {
  "animations.spin": {
    "value": "spin 1s linear infinite",
    "variable": "var(--animations-spin)"
  },
  "breakpoints.sm": {
    "value": "640px",
    "variable": "var(--breakpoints-sm)"
  },
  "breakpoints.md": {
    "value": "768px",
    "variable": "var(--breakpoints-md)"
  },
  "breakpoints.lg": {
    "value": "1024px",
    "variable": "var(--breakpoints-lg)"
  },
  "breakpoints.xl": {
    "value": "1280px",
    "variable": "var(--breakpoints-xl)"
  },
  "breakpoints.2xl": {
    "value": "1536px",
    "variable": "var(--breakpoints-2xl)"
  },
  "sizes.breakpoint-sm": {
    "value": "640px",
    "variable": "var(--sizes-breakpoint-sm)"
  },
  "sizes.breakpoint-md": {
    "value": "768px",
    "variable": "var(--sizes-breakpoint-md)"
  },
  "sizes.breakpoint-lg": {
    "value": "1024px",
    "variable": "var(--sizes-breakpoint-lg)"
  },
  "sizes.breakpoint-xl": {
    "value": "1280px",
    "variable": "var(--sizes-breakpoint-xl)"
  },
  "sizes.breakpoint-2xl": {
    "value": "1536px",
    "variable": "var(--sizes-breakpoint-2xl)"
  },
  "colors.background": {
    "value": "var(--colors-background)",
    "variable": "var(--colors-background)"
  },
  "colors.alert.success": {
    "value": "var(--colors-alert-success)",
    "variable": "var(--colors-alert-success)"
  },
  "colors.alert.success.dark": {
    "value": "var(--colors-alert-success-dark)",
    "variable": "var(--colors-alert-success-dark)"
  },
  "colors.alert.warning": {
    "value": "var(--colors-alert-warning)",
    "variable": "var(--colors-alert-warning)"
  },
  "colors.alert.warning.dark": {
    "value": "var(--colors-alert-warning-dark)",
    "variable": "var(--colors-alert-warning-dark)"
  },
  "colors.alert.danger": {
    "value": "var(--colors-alert-danger)",
    "variable": "var(--colors-alert-danger)"
  },
  "colors.alert.danger.dark": {
    "value": "var(--colors-alert-danger-dark)",
    "variable": "var(--colors-alert-danger-dark)"
  },
  "colors.alert.info": {
    "value": "var(--colors-alert-info)",
    "variable": "var(--colors-alert-info)"
  },
  "colors.alert.info.dark": {
    "value": "var(--colors-alert-info-dark)",
    "variable": "var(--colors-alert-info-dark)"
  },
  "colors.brand": {
    "value": "var(--colors-brand)",
    "variable": "var(--colors-brand)"
  },
  "colors.brand.alt": {
    "value": "var(--colors-brand-alt)",
    "variable": "var(--colors-brand-alt)"
  },
  "colors.surface": {
    "value": "var(--colors-surface)",
    "variable": "var(--colors-surface)"
  },
  "colors.surface.alt": {
    "value": "var(--colors-surface-alt)",
    "variable": "var(--colors-surface-alt)"
  },
  "colors.surface.light": {
    "value": "var(--colors-surface-light)",
    "variable": "var(--colors-surface-light)"
  },
  "colors.text": {
    "value": "var(--colors-text)",
    "variable": "var(--colors-text)"
  },
  "colors.text.light": {
    "value": "var(--colors-text-light)",
    "variable": "var(--colors-text-light)"
  },
  "colors.border": {
    "value": "var(--colors-border)",
    "variable": "var(--colors-border)"
  },
  "fontSizes.display.lg": {
    "value": "var(--font-sizes-display-lg)",
    "variable": "var(--font-sizes-display-lg)"
  },
  "fontSizes.display.md": {
    "value": "var(--font-sizes-display-md)",
    "variable": "var(--font-sizes-display-md)"
  },
  "fontSizes.display.sm": {
    "value": "var(--font-sizes-display-sm)",
    "variable": "var(--font-sizes-display-sm)"
  },
  "fontSizes.title.lg": {
    "value": "var(--font-sizes-title-lg)",
    "variable": "var(--font-sizes-title-lg)"
  },
  "fontSizes.title.md": {
    "value": "var(--font-sizes-title-md)",
    "variable": "var(--font-sizes-title-md)"
  },
  "fontSizes.title.sm": {
    "value": "var(--font-sizes-title-sm)",
    "variable": "var(--font-sizes-title-sm)"
  },
  "fontSizes.body.lg": {
    "value": "var(--font-sizes-body-lg)",
    "variable": "var(--font-sizes-body-lg)"
  },
  "fontSizes.body.md": {
    "value": "var(--font-sizes-body-md)",
    "variable": "var(--font-sizes-body-md)"
  },
  "fontSizes.body.sm": {
    "value": "var(--font-sizes-body-sm)",
    "variable": "var(--font-sizes-body-sm)"
  },
  "fontSizes.label.lg": {
    "value": "var(--font-sizes-label-lg)",
    "variable": "var(--font-sizes-label-lg)"
  },
  "fontSizes.label.md": {
    "value": "var(--font-sizes-label-md)",
    "variable": "var(--font-sizes-label-md)"
  },
  "fontSizes.label.sm": {
    "value": "var(--font-sizes-label-sm)",
    "variable": "var(--font-sizes-label-sm)"
  },
  "colors.colorPalette": {
    "value": "var(--colors-color-palette)",
    "variable": "var(--colors-color-palette)"
  },
  "colors.colorPalette.success": {
    "value": "var(--colors-color-palette-success)",
    "variable": "var(--colors-color-palette-success)"
  },
  "colors.colorPalette.success.dark": {
    "value": "var(--colors-color-palette-success-dark)",
    "variable": "var(--colors-color-palette-success-dark)"
  },
  "colors.colorPalette.dark": {
    "value": "var(--colors-color-palette-dark)",
    "variable": "var(--colors-color-palette-dark)"
  },
  "colors.colorPalette.warning": {
    "value": "var(--colors-color-palette-warning)",
    "variable": "var(--colors-color-palette-warning)"
  },
  "colors.colorPalette.warning.dark": {
    "value": "var(--colors-color-palette-warning-dark)",
    "variable": "var(--colors-color-palette-warning-dark)"
  },
  "colors.colorPalette.danger": {
    "value": "var(--colors-color-palette-danger)",
    "variable": "var(--colors-color-palette-danger)"
  },
  "colors.colorPalette.danger.dark": {
    "value": "var(--colors-color-palette-danger-dark)",
    "variable": "var(--colors-color-palette-danger-dark)"
  },
  "colors.colorPalette.info": {
    "value": "var(--colors-color-palette-info)",
    "variable": "var(--colors-color-palette-info)"
  },
  "colors.colorPalette.info.dark": {
    "value": "var(--colors-color-palette-info-dark)",
    "variable": "var(--colors-color-palette-info-dark)"
  },
  "colors.colorPalette.alt": {
    "value": "var(--colors-color-palette-alt)",
    "variable": "var(--colors-color-palette-alt)"
  },
  "colors.colorPalette.light": {
    "value": "var(--colors-color-palette-light)",
    "variable": "var(--colors-color-palette-light)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar