export const themes = ['light', 'dark'] as const

export type Theme = (typeof themes)[number]

export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement): void {
  root.dataset['theme'] = theme
}

export function currentTheme(root: HTMLElement = document.documentElement): Theme {
  const value = root.dataset['theme']
  return themes.find((theme) => theme === value) ?? 'light'
}
