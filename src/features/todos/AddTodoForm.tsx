import { useRef, useState } from 'react'
import type { FormEvent } from 'react'

import { Button } from '../../ui/Button'
import { useTodos } from './TodoProvider'

/**
 * The one-field form ticket 02 ships. Ticket 03 adds the rest of the domain
 * fields to it; the required-title message lands there too, which is why this
 * version prevents an empty submit by disabling the button rather than by
 * explaining the rule.
 */
export function AddTodoForm() {
  const { addTodo } = useTodos()
  const [title, setTitle] = useState('')
  const field = useRef<HTMLInputElement>(null)

  const trimmed = title.trim()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (trimmed === '') {
      return
    }

    addTodo(trimmed)
    setTitle('')
    // The submit moved focus to the button, and clearing the field disables
    // that button, which drops focus on the floor. Put the caret back so the
    // next todo can be typed without reaching for the mouse.
    field.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor="new-todo" className="sr-only">
        New todo
      </label>
      <input
        id="new-todo"
        ref={field}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs doing?"
        className="min-w-0 flex-1 rounded-md border border-border bg-surface px-3 py-1.5 placeholder:text-fg-muted"
      />
      <Button type="submit" disabled={trimmed === ''}>
        Add
      </Button>
    </form>
  )
}
