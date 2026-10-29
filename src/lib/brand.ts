export type Theme = 'dark' | 'light'

type ThemeSources = Record<Theme, string>

export const brandAssets = {
  horizontal: {
    dark: '/brand/naj-builds_horizontal_dark-mode_transparent.svg',
    light: '/brand/naj-builds_horizontal_light-mode_transparent.svg',
  } satisfies ThemeSources,
  horizontalCompact: {
    dark: '/brand/naj-builds_horizontal-compact_dark-mode_transparent.svg',
    light: '/brand/naj-builds_horizontal-compact_light-mode_transparent.svg',
  } satisfies ThemeSources,
  monogram: {
    dark: '/brand/naj-builds_icon_dark-mode_transparent.svg',
    light: '/brand/naj-builds_icon_light-mode_transparent.svg',
  } satisfies ThemeSources,
} as const
