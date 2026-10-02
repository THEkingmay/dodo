import type { Result } from '../../lib/result'
import type { ParseFailure, Todo } from './model'
import { parseTodos, payloadVersion } from './model'

/**
 * Why a storage call did not produce what was asked for.
 *
 * - `unavailable`  the browser will not give us storage at all (private
 *                  browsing, sandboxed frame, storage disabled)
 * - `invalid-data` something is stored, but it is not a payload this build
 *                  understands
 * - `write-failed` the read worked, the write did not (quota exceeded)
 *
 * The three are separate because they need three different messages: one says
 * nothing will ever be saved, one says the old data was not readable, one says
 * the last change was lost.
 */
export type StorageFailure = ParseFailure | 'unavailable' | 'write-failed'

export type LoadResult = Result<Todo[], StorageFailure>
export type SaveResult = Result<null, StorageFailure>

export const todosStorageKey = 'dodo.todos'

/**
 * Resolves the storage to use, treating a browser that refuses to hand it over
 * as a failure rather than an exception.
 *
 * Reading `window.localStorage` is itself a throwing operation in a sandboxed
 * frame, so the access has to sit inside the try. That is also why this is not
 * a default parameter: default expressions are evaluated before the function
 * body, and a throw there would escape the catch below.
 */
function resolveStorage(storage?: Storage): Storage | null {
  try {
    return storage ?? window.localStorage
  } catch {
    return null
  }
}

export function loadTodos(storage?: Storage): LoadResult {
  const store = resolveStorage(storage)

  if (store === null) {
    return { ok: false, error: 'unavailable' }
  }

  let raw: string | null

  try {
    raw = store.getItem(todosStorageKey)
  } catch {
    return { ok: false, error: 'unavailable' }
  }

  // No key at all is a first visit or cleared site data, not a failure: the
  // app starts empty and says nothing.
  if (raw === null) {
    return { ok: true, value: [] }
  }

  let decoded: unknown

  try {
    decoded = JSON.parse(raw)
  } catch {
    return { ok: false, error: 'invalid-data' }
  }

  return parseTodos(decoded)
}

export function saveTodos(todos: Todo[], storage?: Storage): SaveResult {
  const store = resolveStorage(storage)

  if (store === null) {
    return { ok: false, error: 'unavailable' }
  }

  try {
    store.setItem(todosStorageKey, JSON.stringify({ version: payloadVersion, todos }))
  } catch {
    return { ok: false, error: 'write-failed' }
  }

  return { ok: true, value: null }
}
