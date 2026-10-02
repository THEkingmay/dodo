/**
 * Shown instead of the list when there is nothing in it. Ticket 02 has one
 * list and one reason for it to be empty; ticket 08 gives each of the seven
 * views its own wording.
 */
export function EmptyState() {
  return (
    <div className="rounded-md border border-border bg-surface px-6 py-10 text-center">
      <p className="font-medium text-fg">No todos yet</p>
      <p className="mt-1 text-sm text-fg-muted">Add one above to get started.</p>
    </div>
  )
}
