/**
 * App wiring. Ticket 01 ships a deliberately blank shell (AC 9); ticket 02
 * replaces it with the first real screen.
 */
export function App() {
  return <main id="app-shell" className="min-h-dvh bg-bg text-fg" />
}
