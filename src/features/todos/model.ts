import type { Result } from '../../lib/result'

export const priorities = ['low', 'medium', 'high'] as const

export type Priority = (typeof priorities)[number]

/**
 * The whole domain shape, defined before any of it is editable.
 *
 * Ticket 02 only ever writes a title; tickets 03, 04 and 06 add the remaining
 * fields one at a time. Defining them now means storage validation, the JSON
 * export in ticket 16 and the stats in ticket 10 all read one shape, and those
 * later tickets are pure UI work with no data migration attached.
 *
 * `dueDate` is a date-only `YYYY-MM-DD` string, never a timestamp: "due today"
 * has to mean the user's local day, and an ISO instant would drag a timezone
 * into a question that has no timezone.
 */
export type Todo = {
  id: string
  title: string
  description: string
  priority: Priority
  dueDate: string | null
  tags: string[]
  completed: boolean
  completedAt: string | null
  archived: boolean
  createdAt: string
  updatedAt: string
}

/**
 * What a stored payload must look like. The version is the contract: a payload
 * claiming a version this build does not know is refused rather than guessed
 * at, which is what ticket 16's forward migration will hang off.
 */
export type TodoPayload = {
  version: typeof payloadVersion
  todos: Todo[]
}

export const payloadVersion = 1

export const parseFailures = ['invalid-data'] as const

export type ParseFailure = (typeof parseFailures)[number]

/**
 * Builds a todo from a title, filling every field the domain defines. The one
 * way a Todo comes into existence, so defaults cannot drift between call sites.
 */
export function createTodo(title: string, now: Date = new Date()): Todo {
  const timestamp = now.toISOString()

  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    description: '',
    priority: 'medium',
    dueDate: null,
    tags: [],
    completed: false,
    completedAt: null,
    archived: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}

const todoKeys = [
  'id',
  'title',
  'description',
  'priority',
  'dueDate',
  'tags',
  'completed',
  'completedAt',
  'archived',
  'createdAt',
  'updatedAt',
] as const

const dueDatePattern = /^\d{4}-\d{2}-\d{2}$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isTimestamp(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

function isOptionalTimestamp(value: unknown): value is string | null {
  return value === null || isTimestamp(value)
}

function isOptionalDueDate(value: unknown): value is string | null {
  return value === null || (typeof value === 'string' && dueDatePattern.test(value))
}

function isTags(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((tag) => typeof tag === 'string')
}

function isPriority(value: unknown): value is Priority {
  return priorities.some((priority) => priority === value)
}

/**
 * Projects one stored entry onto a Todo, or returns null if it is not one.
 *
 * Unknown keys are refused rather than dropped. Silently discarding a field a
 * newer build wrote is data loss the user would never see; a payload carrying
 * a key this build does not recognise has to bump `payloadVersion` instead.
 */
function toTodo(value: unknown): Todo | null {
  if (!isRecord(value)) {
    return null
  }

  const hasEveryKey = todoKeys.every((key) => key in value)
  const hasOnlyKnownKeys = Object.keys(value).every((key) =>
    todoKeys.some((known) => known === key),
  )

  if (!hasEveryKey || !hasOnlyKnownKeys) {
    return null
  }

  const {
    id,
    title,
    description,
    priority,
    dueDate,
    tags,
    completed,
    completedAt,
    archived,
    createdAt,
    updatedAt,
  } = value

  if (!isNonEmptyString(id) || !isNonEmptyString(title)) {
    return null
  }
  if (typeof description !== 'string' || !isPriority(priority) || !isTags(tags)) {
    return null
  }
  if (typeof completed !== 'boolean' || typeof archived !== 'boolean') {
    return null
  }
  if (!isOptionalDueDate(dueDate) || !isOptionalTimestamp(completedAt)) {
    return null
  }
  if (!isTimestamp(createdAt) || !isTimestamp(updatedAt)) {
    return null
  }

  return {
    id,
    title,
    description,
    priority,
    dueDate,
    tags,
    completed,
    completedAt,
    archived,
    createdAt,
    updatedAt,
  }
}

/**
 * Reads a stored payload. Nothing here throws: an unreadable payload is a
 * result the caller turns into an empty list plus a message, never a crash.
 */
export function parseTodos(value: unknown): Result<Todo[], ParseFailure> {
  if (!isRecord(value) || value['version'] !== payloadVersion) {
    return { ok: false, error: 'invalid-data' }
  }

  const stored = value['todos']

  if (!Array.isArray(stored)) {
    return { ok: false, error: 'invalid-data' }
  }

  const todos: Todo[] = []

  for (const entry of stored) {
    const todo = toTodo(entry)

    if (todo === null) {
      return { ok: false, error: 'invalid-data' }
    }

    todos.push(todo)
  }

  return { ok: true, value: todos }
}
