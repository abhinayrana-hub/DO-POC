import type { ReactNode } from 'react'

type IconButtonProps = {
  children: ReactNode
  label: string
  onClick?: () => void
}

export function IconButton({ children, label, onClick }: IconButtonProps) {
  return (
    <button type="button" className="icon-button" aria-label={label} title={label} onClick={onClick}>
      {children}
    </button>
  )
}
