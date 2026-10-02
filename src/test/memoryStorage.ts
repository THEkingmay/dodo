export type MemoryStorageOptions = {
  seed?: Record<string, string>
  /** Makes setItem throw, the way a full or blocked quota does. */
  failWrites?: boolean
  /** Makes getItem throw, the way a sandboxed frame does. */
  failReads?: boolean
}

/**
 * A complete `Storage` over a Map, so tests can seed a payload, watch what gets
 * written and make either direction fail on demand. jsdom's own localStorage
 * cannot be told to start throwing.
 */
export function createMemoryStorage(options: MemoryStorageOptions = {}): Storage {
  const entries = new Map<string, string>(Object.entries(options.seed ?? {}))

  return {
    get length() {
      return entries.size
    },
    key: (index: number) => [...entries.keys()][index] ?? null,
    getItem: (key: string) => {
      if (options.failReads === true) {
        throw new DOMException('The operation is insecure.', 'SecurityError')
      }
      return entries.get(key) ?? null
    },
    setItem: (key: string, value: string) => {
      if (options.failWrites === true) {
        throw new DOMException('Quota exceeded.', 'QuotaExceededError')
      }
      entries.set(key, value)
    },
    removeItem: (key: string) => {
      entries.delete(key)
    },
    clear: () => {
      entries.clear()
    },
  }
}
