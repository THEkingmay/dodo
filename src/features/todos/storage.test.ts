import { describe, expect, it } from 'vitest'

import type { Result } from '../../lib/result'
import { createMemoryStorage } from '../../test/memoryStorage'
import { createTodo, payloadVersion } from './model'
import { loadTodos, saveTodos, todosStorageKey } from './storage'

const at = new Date('2026-10-02T09:00:00.000Z')

/** Unwraps a Result, failing loudly rather than narrowing on an assertion. */
function unwrap<T, E>(result: Result<T, E>): T {
  if (!result.ok) {
    throw new Error(`expected a successful result, got ${String(result.error)}`)
  }

  return result.value
}

/**
 * Swaps in a `window.localStorage` that throws on access, which is what a
 * sandboxed frame or a browser with storage switched off does, then puts the
 * real one back.
 */
function withBlockedLocalStorage(body: () => void): void {
  const real = Object.getOwnPropertyDescriptor(window, 'localStorage')

  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    get() {
      throw new DOMException('The operation is insecure.', 'SecurityError')
    },
  })

  try {
    body()
  } finally {
    if (real === undefined) {
      Reflect.deleteProperty(window, 'localStorage')
    } else {
      Object.defineProperty(window, 'localStorage', real)
    }
  }
}

describe('todo storage', () => {
  it('round-trips a todo through save and validation unchanged', () => {
    const storage = createMemoryStorage()
    const todo = createTodo('Write it down', at)
    // A detached copy: if the round trip added, dropped or reformatted anything,
    // the comparison below is against what went in, not against the same object.
    const sent = structuredClone(todo)

    expect(saveTodos([todo], storage)).toEqual({ ok: true, value: null })
    expect(unwrap(loadTodos(storage))).toEqual([sent])
  })

  it('keeps identity and order across a save and a load', () => {
    const storage = createMemoryStorage()
    const todos = [createTodo('First', at), createTodo('Second', at), createTodo('Third', at)]

    saveTodos(todos, storage)
    const loaded = unwrap(loadTodos(storage))

    expect(loaded.map((todo) => todo.id)).toEqual(todos.map((todo) => todo.id))
    expect(loaded.map((todo) => todo.title)).toEqual(['First', 'Second', 'Third'])
  })

  it('stamps the payload with the version its reader expects', () => {
    const storage = createMemoryStorage()

    saveTodos([createTodo('Write it down', at)], storage)

    expect(JSON.parse(String(storage.getItem(todosStorageKey)))).toMatchObject({
      version: payloadVersion,
    })
  })

  it('treats cleared site data as a first visit rather than a failure', () => {
    expect(loadTodos(createMemoryStorage())).toEqual({ ok: true, value: [] })
  })

  it('refuses text that is not JSON at all', () => {
    const storage = createMemoryStorage({ seed: { [todosStorageKey]: 'not json' } })

    expect(loadTodos(storage)).toEqual({ ok: false, error: 'invalid-data' })
  })

  it('refuses JSON that is not a payload', () => {
    const storage = createMemoryStorage({ seed: { [todosStorageKey]: '{"todos":"nope"}' } })

    expect(loadTodos(storage)).toEqual({ ok: false, error: 'invalid-data' })
  })

  it('refuses a payload holding a todo it cannot validate', () => {
    const storage = createMemoryStorage({
      seed: {
        [todosStorageKey]: JSON.stringify({ version: payloadVersion, todos: [{ id: 'x' }] }),
      },
    })

    expect(loadTodos(storage)).toEqual({ ok: false, error: 'invalid-data' })
  })

  it('reports a write that throws as a failed write, not as an unavailable browser', () => {
    expect(
      saveTodos([createTodo('Write it down', at)], createMemoryStorage({ failWrites: true })),
    ).toEqual({ ok: false, error: 'write-failed' })
  })

  it('reports a read that throws as an unavailable browser', () => {
    expect(loadTodos(createMemoryStorage({ failReads: true }))).toEqual({
      ok: false,
      error: 'unavailable',
    })
  })

  it('reports a browser that refuses to hand over storage at all as unavailable', () => {
    withBlockedLocalStorage(() => {
      expect(loadTodos()).toEqual({ ok: false, error: 'unavailable' })
      expect(saveTodos([])).toEqual({ ok: false, error: 'unavailable' })
    })
  })

  it('falls back to window.localStorage when no storage is given', () => {
    localStorage.clear()
    const todo = createTodo('Write it down', at)

    expect(saveTodos([todo])).toEqual({ ok: true, value: null })
    expect(loadTodos()).toEqual({ ok: true, value: [todo] })
  })
})
