import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-fg hover:opacity-90',
  secondary: 'bg-surface-2 text-fg hover:bg-border',
}

export function Button({ variant = 'primary', className, type, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      type={type ?? 'button'}
      className={[
        'rounded-md border border-border px-3 py-1.5 font-medium',
        variants[variant],
        className,
      ]
        .filter((part): part is string => Boolean(part))
        .join(' ')}
    />
  )
}
