import type { Todo } from './model'
import type { StorageFailure } from './storage'

export type TodoState = {
  status: 'loading' | 'ready'
  todos: Todo[]
  /**
   * The last storage problem worth telling the user about, or null. It is
   * separate from `todos`, which stays usable in every one of these cases: a
   * failed write loses durability, not the todo the user is looking at.
   */
  error: StorageFailure | null
}

export const initialTodoState: TodoState = {
  status: 'loading',
  todos: [],
  error: null,
}

export type TodoAction =
  | { type: 'loaded'; todos: Todo[] }
  | { type: 'load-failed'; error: StorageFailure }
  | { type: 'added'; todo: Todo }
  | { type: 'save-failed'; error: StorageFailure }

/**
 * The whole list, as a pure function. Kept out of React so that "what does
 * this action do to the stored todos" is answerable by a plain unit test --
 * which is what ticket 04 asks for, and what ticket 05's undo history will sit
 * on top of.
 *
 * Order is the array order. There is no position field, because a list nobody
 * has reordered yet has no positions to store, and ticket 14's manual order is
 * an array move.
 */
export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'loaded':
      return { status: 'ready', todos: action.todos, error: null }
    case 'load-failed':
      return { status: 'ready', todos: [], error: action.error }
    case 'added':
      return { ...state, todos: [...state.todos, action.todo], error: null }
    case 'save-failed':
      return { ...state, error: action.error }
  }
}
