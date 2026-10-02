import { describe, expect, it } from 'vitest'

import { createTodo, parseTodos, payloadVersion } from './model'
import type { Todo } from './model'

const at = new Date('2026-10-02T09:00:00.000Z')

function payload(todos: unknown[], overrides: Record<string, unknown> = {}): unknown {
  return { version: payloadVersion, todos, ...overrides }
}

function withField(field: keyof Todo, value: unknown): unknown {
  return { ...createTodo('Write it down', at), [field]: value }
}

describe('createTodo', () => {
  it('fills in every field the domain defines', () => {
    expect(createTodo('Write it down', at)).toEqual({
      id: expect.any(String),
      title: 'Write it down',
      description: '',
      priority: 'medium',
      dueDate: null,
      tags: [],
      completed: false,
      completedAt: null,
      archived: false,
      createdAt: '2026-10-02T09:00:00.000Z',
      updatedAt: '2026-10-02T09:00:00.000Z',
    })
  })

  it('trims the title, so no todo can be created with a blank one', () => {
    expect(createTodo('  Write it down  ', at).title).toBe('Write it down')
  })

  it('gives every todo a distinct id', () => {
    const first = createTodo('One', at)
    const second = createTodo('Two', at)

    expect(first.id).not.toBe(second.id)
  })
})

describe('parseTodos', () => {
  it('reads back a todo it just created', () => {
    const todo = createTodo('Write it down', at)

    expect(parseTodos(payload([todo]))).toEqual({ ok: true, value: [todo] })
  })

  it('accepts an empty list', () => {
    expect(parseTodos(payload([]))).toEqual({ ok: true, value: [] })
  })

  it.each([
    ['a string', 'nope'],
    ['null', null],
    ['an array', []],
    ['a todo with no envelope', createTodo('Write it down', at)],
  ])('refuses %s', (_label, value) => {
    expect(parseTodos(value)).toEqual({ ok: false, error: 'invalid-data' })
  })

  it.each([
    ['the version is missing', { todos: [] }],
    ['the version is from a future build', { version: payloadVersion + 1, todos: [] }],
  ])('refuses a payload where %s', (_label, value) => {
    expect(parseTodos(value)).toEqual({ ok: false, error: 'invalid-data' })
  })

  it('refuses a payload whose todos are not a list', () => {
    expect(parseTodos({ version: payloadVersion, todos: { '0': 'Write it down' } })).toEqual({
      ok: false,
      error: 'invalid-data',
    })
  })

  it.each<[string, keyof Todo, unknown]>([
    ['the title is not a string', 'title', 42],
    ['the title is blank', 'title', '   '],
    ['the id is empty', 'id', ''],
    ['the description is not a string', 'description', null],
    ['the priority is not one of the three', 'priority', 'urgent'],
    ['the due date is not a calendar date', 'dueDate', '02/10/2026'],
    ['the tags are not all text', 'tags', ['home', 7]],
    ['the completed flag is not a boolean', 'completed', 'yes'],
    ['the archived flag is not a boolean', 'archived', 0],
    ['the completedAt is not a timestamp', 'completedAt', 'yesterday'],
    ['the createdAt is not a timestamp', 'createdAt', 1759395600],
  ])('refuses a todo where %s', (_label, field, value) => {
    expect(parseTodos(payload([withField(field, value)]))).toEqual({
      ok: false,
      error: 'invalid-data',
    })
  })

  it('refuses a todo with a field this build does not know about, rather than dropping it', () => {
    const todo = { ...createTodo('Write it down', at), assignees: ['Robin'] }

    expect(parseTodos(payload([todo]))).toEqual({ ok: false, error: 'invalid-data' })
  })

  it('refuses a todo that is missing a field', () => {
    const todo: Record<string, unknown> = { ...createTodo('Write it down', at) }
    delete todo['description']

    expect(parseTodos(payload([todo]))).toEqual({ ok: false, error: 'invalid-data' })
  })

  it('refuses a list where only the last entry is broken', () => {
    const good = createTodo('One', at)

    expect(parseTodos(payload([good, { id: 'nope' }]))).toEqual({
      ok: false,
      error: 'invalid-data',
    })
  })
})
