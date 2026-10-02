/**
 * The outcome of something that can fail in a way the caller has to handle.
 *
 * Ticket 02 needs three distinguishable storage failures (unavailable, invalid
 * data, failed write) that each produce a different visible message, so the
 * failure travels as a value rather than as an exception. Nothing here throws.
 */
export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }
