import { AddTodoForm } from './AddTodoForm'
import { EmptyState } from './EmptyState'
import { StorageNotice } from './StorageNotice'
import { useTodos } from './TodoProvider'
import { TodoList } from './TodoList'

/**
 * The whole ticket-02 screen.
 *
 * Renders nothing until the stored todos have been read. That gate is the
 * point of the ticket: content must never be painted from state the browser is
 * about to replace, and nothing at all beats a skeleton that is on screen for a
 * single frame. The read is from `localStorage`, so the gate is invisible in
 * practice and load-bearing if the store ever becomes slower.
 */
export function TodoScreen() {
  const { status, todos, error } = useTodos()

  if (status === 'loading') {
    return null
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-fg">Todos</h1>

      <div className="mt-6 flex flex-col gap-4">
        <AddTodoForm />

        {error !== null && <StorageNotice failure={error} />}

        {todos.length === 0 ? <EmptyState /> : <TodoList todos={todos} />}
      </div>
    </main>
  )
}
