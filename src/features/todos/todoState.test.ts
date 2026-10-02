import { describe, expect, it } from 'vitest'

import { createTodo } from './model'
import { initialTodoState, todoReducer } from './todoState'

const at = new Date('2026-10-02T09:00:00.000Z')

describe('todoReducer', () => {
  it('starts out loading, with nothing to show and nothing to complain about', () => {
    expect(initialTodoState).toEqual({ status: 'loading', todos: [], error: null })
  })

  it('appends a todo at the end of the list, which is the order it is stored in', () => {
    const first = createTodo('First', at)
    const ready = todoReducer(initialTodoState, { type: 'loaded', todos: [first] })
    const second = createTodo('Second', at)

    expect(todoReducer(ready, { type: 'added', todo: second })).toEqual({
      status: 'ready',
      todos: [first, second],
      error: null,
    })
  })

  it('starts empty and reports the problem when the stored data cannot be read', () => {
    expect(todoReducer(initialTodoState, { type: 'load-failed', error: 'invalid-data' })).toEqual({
      status: 'ready',
      todos: [],
      error: 'invalid-data',
    })
  })

  it('keeps the todo on screen when saving it fails, and clears the notice on the next good write', () => {
    const todo = createTodo('Write it down', at)
    const added = todoReducer(initialTodoState, { type: 'added', todo })

    const failed = todoReducer(added, { type: 'save-failed', error: 'write-failed' })
    expect(failed.todos).toEqual([todo])
    expect(failed.error).toBe('write-failed')

    expect(todoReducer(failed, { type: 'added', todo: createTodo('Second', at) }).error).toBeNull()
  })

  it('drops the notice once a load succeeds', () => {
    const broken = todoReducer(initialTodoState, { type: 'load-failed', error: 'unavailable' })

    expect(todoReducer(broken, { type: 'loaded', todos: [] }).error).toBeNull()
  })
})
