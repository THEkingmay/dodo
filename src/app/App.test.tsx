import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { createMemoryStorage } from '../test/memoryStorage'
import { todosStorageKey } from '../features/todos/storage'
import { App } from './App'

function addTodo(title: string) {
  fireEvent.change(screen.getByRole('textbox', { name: 'New todo' }), { target: { value: title } })
  fireEvent.click(screen.getByRole('button', { name: 'Add' }))
}

function titles(): string[] {
  return screen.queryAllByRole('listitem').map((row) => row.textContent ?? '')
}

function storedIds(storage: Storage): string[] {
  const payload = JSON.parse(String(storage.getItem(todosStorageKey))) as {
    todos: { id: string }[]
  }

  return payload.todos.map((todo) => todo.id)
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows an intentional empty state before anything has been added', () => {
    render(<App storage={createMemoryStorage()} />)

    expect(screen.getByText('No todos yet')).toBeInTheDocument()
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('adds one todo that immediately appears in the list', () => {
    render(<App storage={createMemoryStorage()} />)

    addTodo('Write it down')

    expect(titles()).toEqual(['Write it down'])
    expect(screen.queryByText('No todos yet')).not.toBeInTheDocument()
  })

  it('will not add a todo without a title', () => {
    render(<App storage={createMemoryStorage()} />)
    const add = screen.getByRole('button', { name: 'Add' })

    expect(add).toBeDisabled()

    addTodo('   ')

    expect(add).toBeDisabled()
    expect(titles()).toEqual([])
  })

  it('clears the field and leaves the caret in it, ready for the next one', () => {
    render(<App storage={createMemoryStorage()} />)
    const field = screen.getByRole('textbox', { name: 'New todo' })

    addTodo('Write it down')

    expect(field).toHaveValue('')
    expect(field).toHaveFocus()

    addTodo('Then read it back')

    expect(titles()).toEqual(['Write it down', 'Then read it back'])
  })

  it('keeps every todo, with the same identity and order, after a reload', () => {
    const storage = createMemoryStorage()
    const first = render(<App storage={storage} />)

    addTodo('First')
    addTodo('Second')
    addTodo('Third')

    const before = storedIds(storage)
    first.unmount()

    render(<App storage={storage} />)

    expect(titles()).toEqual(['First', 'Second', 'Third'])

    // A reload must not mint new ids, or every stored reference to a todo --
    // the undo history in ticket 05, the selection in ticket 15 -- would be
    // pointing at nothing.
    addTodo('Fourth')

    const after = storedIds(storage)
    expect(after).toHaveLength(4)
    expect(after.slice(0, 3)).toEqual(before)
  })

  it('starts empty and working when site data has been cleared, using real browser storage', () => {
    const first = render(<App />)

    addTodo('Write it down')
    first.unmount()

    localStorage.clear()

    render(<App />)

    expect(screen.getByText('No todos yet')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    addTodo('Start again')

    expect(titles()).toEqual(['Start again'])
  })

  it('survives a reload on real browser storage', () => {
    const first = render(<App />)

    addTodo('Write it down')
    first.unmount()

    render(<App />)

    expect(titles()).toEqual(['Write it down'])
  })

  it('starts empty and says so when the stored data fails validation', () => {
    const storage = createMemoryStorage({
      seed: { [todosStorageKey]: '{"version":1,"todos":[{"id":1}]}' },
    })

    expect(() => render(<App storage={storage} />)).not.toThrow()

    expect(screen.getByRole('alert')).toHaveTextContent(/could not be read/i)
    expect(screen.getByText('No todos yet')).toBeInTheDocument()
  })

  it('keeps the todo on screen and says so when the write fails', () => {
    const storage = createMemoryStorage({ failWrites: true })

    render(<App storage={storage} />)
    addTodo('Write it down')

    expect(titles()).toEqual(['Write it down'])
    expect(screen.getByRole('alert')).toHaveTextContent(/could not be saved/i)
  })
})
