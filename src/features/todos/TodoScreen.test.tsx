import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useTodos } from './TodoProvider'
import { TodoScreen } from './TodoScreen'

vi.mock('./TodoProvider', () => ({ useTodos: vi.fn() }))

const given = vi.mocked(useTodos)

function ready(overrides: Partial<ReturnType<typeof useTodos>> = {}) {
  given.mockReturnValue({
    status: 'ready',
    todos: [],
    error: null,
    addTodo: vi.fn(),
    ...overrides,
  })
}

describe('TodoScreen', () => {
  it('renders nothing at all until the stored todos have been read', () => {
    given.mockReturnValue({
      status: 'loading',
      todos: [],
      error: null,
      addTodo: vi.fn(),
    })

    const { container } = render(<TodoScreen />)

    // Nothing on screen, not even the frame: content painted from state the
    // browser is about to replace is exactly what the gate exists to prevent.
    expect(container).toBeEmptyDOMElement()
  })

  it('shows the empty state once the read comes back with nothing', () => {
    ready()

    render(<TodoScreen />)

    expect(screen.getByText('No todos yet')).toBeInTheDocument()
  })

  it('shows a row per todo, in the order the state holds them', () => {
    ready({
      todos: [
        { id: '1', title: 'First' },
        { id: '2', title: 'Second' },
      ] as ReturnType<typeof useTodos>['todos'],
    })

    render(<TodoScreen />)

    expect(screen.getAllByRole('listitem').map((row) => row.textContent)).toEqual([
      'First',
      'Second',
    ])
    expect(screen.queryByText('No todos yet')).not.toBeInTheDocument()
  })

  it('keeps the list usable and says what went wrong when storage did', () => {
    ready({
      error: 'invalid-data',
      todos: [{ id: '1', title: 'Write it down' }] as ReturnType<typeof useTodos>['todos'],
    })

    render(<TodoScreen />)

    expect(screen.getByRole('alert')).toHaveTextContent(/could not be read/i)
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })
})
