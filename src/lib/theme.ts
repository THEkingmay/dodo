export const themes = ['light', 'dark'] as const

export type Theme = (typeof themes)[number]

/**
 * Where the active theme is persisted.
 *
 * The blocking script in `index.html` reads this same key before the first
 * paint, because a React effect runs after the browser has already painted
 * `--bg` and a stored dark theme would flash light for a frame. That script
 * cannot import from here, so the key is written out twice on purpose;
 * `src/lib/theme.test.ts` fails the build if the two ever drift apart.
 *
 * Ticket 11 adds the third option (`system`) and the source of truth that
 * decides between them. Nothing writes this key until then.
 */
export const themeStorageKey = 'dodo.theme'

export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement): void {
  root.dataset['theme'] = theme
}

export function currentTheme(root: HTMLElement = document.documentElement): Theme {
  const value = root.dataset['theme']
  return themes.find((theme) => theme === value) ?? 'light'
}
