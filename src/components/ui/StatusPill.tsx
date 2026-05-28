import type { ReactNode } from 'react'
import type { Status } from '../../types/dashboard'

export function StatusPill({ children, status }: { children: ReactNode; status: Status }) {
  return <span className={`status-pill ${status}`}>{children}</span>
}
