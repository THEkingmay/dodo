import type { Todo } from './model'

/**
 * A todo as it appears in the list, showing only its title.
 *
 * Deliberately inert. Ticket 04 adds the whole lifecycle -- edit, complete,
 * delete -- and ticket 05 adds undo for it; shipping a delete button here
 * would put an irreversible control in front of a user who cannot take it
 * back.
 */
export function TodoRow({ todo }: { todo: Todo }) {
  return (
    <li className="px-3 py-2.5 text-fg">
      <span className="block truncate">{todo.title}</span>
    </li>
  )
}
