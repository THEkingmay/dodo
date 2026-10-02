import { TodoProvider } from '../features/todos/TodoProvider'
import type { TodoProviderProps } from '../features/todos/TodoProvider'
import { TodoScreen } from '../features/todos/TodoScreen'

/**
 * App wiring: the provider that owns the todos, and the screen that shows
 * them. The storage prop is threaded through rather than reached for inside the
 * feature so that "the browser will not save this" is testable end to end.
 */
export function App(props: Pick<TodoProviderProps, 'storage'>) {
  return (
    <TodoProvider {...props}>
      <TodoScreen />
    </TodoProvider>
  )
}
