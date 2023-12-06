/* eslint-disable */
export type Token = "animations.spin" | "breakpoints.sm" | "breakpoints.md" | "breakpoints.lg" | "breakpoints.xl" | "breakpoints.2xl" | "sizes.breakpoint-sm" | "sizes.breakpoint-md" | "sizes.breakpoint-lg" | "sizes.breakpoint-xl" | "sizes.breakpoint-2xl" | "colors.background" | "colors.alert.success" | "colors.alert.success.dark" | "colors.alert.warning" | "colors.alert.warning.dark" | "colors.alert.danger" | "colors.alert.danger.dark" | "colors.alert.info" | "colors.alert.info.dark" | "colors.brand" | "colors.brand.alt" | "colors.surface" | "colors.surface.alt" | "colors.surface.light" | "colors.text" | "colors.text.light" | "colors.border" | "fontSizes.display.lg" | "fontSizes.display.md" | "fontSizes.display.sm" | "fontSizes.title.lg" | "fontSizes.title.md" | "fontSizes.title.sm" | "fontSizes.body.lg" | "fontSizes.body.md" | "fontSizes.body.sm" | "fontSizes.label.lg" | "fontSizes.label.md" | "fontSizes.label.sm" | "colors.colorPalette" | "colors.colorPalette.success" | "colors.colorPalette.success.dark" | "colors.colorPalette.dark" | "colors.colorPalette.warning" | "colors.colorPalette.warning.dark" | "colors.colorPalette.danger" | "colors.colorPalette.danger.dark" | "colors.colorPalette.info" | "colors.colorPalette.info.dark" | "colors.colorPalette.alt" | "colors.colorPalette.light"

export type ColorPalette = "background" | "alert" | "alert.success" | "alert.warning" | "alert.danger" | "alert.info" | "brand" | "surface" | "text" | "border"

export type AnimationToken = "spin"

export type BreakpointToken = "sm" | "md" | "lg" | "xl" | "2xl"

export type SizeToken = "breakpoint-sm" | "breakpoint-md" | "breakpoint-lg" | "breakpoint-xl" | "breakpoint-2xl"

export type ColorToken = "background" | "alert.success" | "alert.success.dark" | "alert.warning" | "alert.warning.dark" | "alert.danger" | "alert.danger.dark" | "alert.info" | "alert.info.dark" | "brand" | "brand.alt" | "surface" | "surface.alt" | "surface.light" | "text" | "text.light" | "border" | "colorPalette" | "colorPalette.success" | "colorPalette.success.dark" | "colorPalette.dark" | "colorPalette.warning" | "colorPalette.warning.dark" | "colorPalette.danger" | "colorPalette.danger.dark" | "colorPalette.info" | "colorPalette.info.dark" | "colorPalette.alt" | "colorPalette.light"

export type FontSizeToken = "display.lg" | "display.md" | "display.sm" | "title.lg" | "title.md" | "title.sm" | "body.lg" | "body.md" | "body.sm" | "label.lg" | "label.md" | "label.sm"

export type AnimationName = "spin" | "ping" | "pulse" | "bounce"

export type Tokens = {
		animations: AnimationToken
		breakpoints: BreakpointToken
		sizes: SizeToken
		colors: ColorToken
		fontSizes: FontSizeToken
		animationName: AnimationName
} & { [token: string]: never }

export type TokenCategory = "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "shadows" | "spacing" | "radii" | "borders" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"