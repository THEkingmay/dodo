import type { StorageFailure } from './storage'

const messages: Record<StorageFailure, string> = {
  unavailable: 'This browser is not letting dodo use storage, so nothing will be saved.',
  'invalid-data':
    'The saved todos could not be read, so dodo started with an empty list. Adding a todo will replace the unreadable data.',
  'write-failed': 'Your last change could not be saved to this browser.',
}

/**
 * The one place a storage problem reaches the user.
 *
 * `role="alert"` because a failed write is a consequence of something the user
 * just did and needs announcing, not a static caption. Ticket 05 replaces this
 * with a toast; until then it has to be inline, since a failed write has no
 * other on-screen trace.
 */
export function StorageNotice({ failure }: { failure: StorageFailure }) {
  return (
    <p
      role="alert"
      className="rounded-md border border-danger bg-surface px-3 py-2 text-sm text-danger"
    >
      {messages[failure]}
    </p>
  )
}
