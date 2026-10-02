import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { describe, expect, it } from 'vitest'

import { applyTheme, currentTheme, themeStorageKey } from './theme'

describe('theme', () => {
  it('applies a theme to the given element', () => {
    const root = document.createElement('html')

    applyTheme('dark', root)

    expect(root.dataset['theme']).toBe('dark')
  })

  it('reads the applied theme back, and falls back to light for anything else', () => {
    const root = document.createElement('html')

    applyTheme('dark', root)
    expect(currentTheme(root)).toBe('dark')

    root.dataset['theme'] = 'neon'
    expect(currentTheme(root)).toBe('light')
  })

  it('agrees with the blocking script in index.html about where the theme is stored', () => {
    const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')

    expect(html).toContain(`'${themeStorageKey}'`)
  })

  // The boot script is a copy of the theme read, because it has to run before
  // any module exists. Testing the copy that actually ships, rather than a
  // second hand-written version of the same three lines, is the only way this
  // is worth having at all.
  it('applies a stored theme, and leaves the default alone, when the shipped boot script runs', () => {
    expect(appliedTheme('dark')).toBe('dark')
    expect(appliedTheme('light')).toBe('light')
    expect(appliedTheme(null)).toBeUndefined()
    expect(appliedTheme('neon')).toBeUndefined()
    expect(appliedTheme('dark', { blockAccess: true })).toBeUndefined()
  })
})

/**
 * Extracts the inline boot script from index.html, runs it against a stand-in
 * document, and returns the `data-theme` it ended up setting.
 */
function appliedTheme(
  stored: string | null,
  options: { blockAccess?: boolean } = {},
): string | undefined {
  const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')
  const body = /<script>([\s\S]*?)<\/script>/.exec(html)?.[1]

  if (body === undefined) {
    throw new Error('index.html has no inline boot script')
  }

  const dataset: Record<string, string> = {}
  const localStorage =
    options.blockAccess === true
      ? {
          getItem() {
            throw new DOMException('The operation is insecure.', 'SecurityError')
          },
        }
      : { getItem: () => stored }

  new Function('localStorage', 'document', body)(localStorage, { documentElement: { dataset } })

  return dataset['theme']
}
