import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Add todo</Button>)

    expect(screen.getByRole('button', { name: 'Add todo' })).toBeInTheDocument()
  })

  it('fires onClick', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Add</Button>)

    fireEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('defaults to type="button" so it cannot submit a form by accident', () => {
    render(<Button>Add</Button>)

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('wires the design tokens through as utility classes', () => {
    render(<Button>Add</Button>)

    expect(screen.getByRole('button')).toHaveClass('bg-accent', 'text-accent-fg')
  })

  it('switches token classes for the secondary variant', () => {
    render(<Button variant="secondary">Add</Button>)

    expect(screen.getByRole('button')).toHaveClass('bg-surface-2', 'text-fg')
  })
})
