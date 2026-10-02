import { createContext, use, useEffect, useReducer } from 'react'
import type { ReactNode } from 'react'

import { createTodo } from './model'
import type { Todo } from './model'
import { loadTodos, saveTodos } from './storage'
import { initialTodoState, todoReducer } from './todoState'
import type { TodoState } from './todoState'

/**
 * The one transformation `addTodo` performs, shared by the reducer and the
 * save so the two cannot compute different lists.
 */
function appendTodo(todos: Todo[], todo: Todo): Todo[] {
  return [...todos, todo]
}

type TodoContextValue = TodoState & {
  addTodo: (title: string) => void
}

const TodoContext = createContext<TodoContextValue | null>(null)

export type TodoProviderProps = {
  children: ReactNode
  /**
   * Where to persist. Defaults to `window.localStorage`; every test injects a
   * fake, so a browser refusing storage, a corrupt payload and a failing write
   * are all reproducible without patching globals.
   */
  storage?: Storage
}

export function TodoProvider({ children, storage }: TodoProviderProps) {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState)

  useEffect(() => {
    const result = loadTodos(storage)

    if (result.ok) {
      dispatch({ type: 'loaded', todos: result.value })
    } else {
      dispatch({ type: 'load-failed', error: result.error })
    }
  }, [storage])

  const addTodo = (title: string) => {
    const todo = createTodo(title)
    const next = appendTodo(state.todos, todo)

    dispatch({ type: 'added', todo })

    const saved = saveTodos(next, storage)

    if (!saved.ok) {
      dispatch({ type: 'save-failed', error: saved.error })
    }
  }

  const value: TodoContextValue = { ...state, addTodo }

  return <TodoContext value={value}>{children}</TodoContext>
}

export function useTodos(): TodoContextValue {
  const value = use(TodoContext)

  if (value === null) {
    throw new Error('useTodos must be used inside a TodoProvider')
  }

  return value
}
