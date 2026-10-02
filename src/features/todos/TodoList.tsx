import type { Todo } from './model'
import { TodoRow } from './TodoRow'

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul className="divide-y divide-border rounded-md border border-border bg-surface">
      {todos.map((todo) => (
        <TodoRow key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
