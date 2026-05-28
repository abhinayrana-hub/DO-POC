import { AlertTriangle } from 'lucide-react'
import type { Status } from '../../types/dashboard'

export function StatusDot({ status }: { status: Status }) {
  if (status === 'critical') {
    return <AlertTriangle size={15} className={`status-dot ${status}`} />
  }

  return <span className={`status-dot ${status}`} />
}
