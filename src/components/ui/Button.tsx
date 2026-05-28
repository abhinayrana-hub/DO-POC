import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  icon?: ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({ children, icon, variant = 'primary' }: ButtonProps) {
  return (
    <button type="button" className={`button ${variant}`}>
      {icon}
      <span>{children}</span>
    </button>
  )
}
