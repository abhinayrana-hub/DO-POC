import {
  Activity,
  Braces,
  GitBranch,
  ShieldCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { IconKey } from '../../types/dashboard'

export const navIcons: Record<IconKey, LucideIcon> = {
  pipeline: Activity,
  quality: ShieldCheck,
  metadata: GitBranch,
  api: Braces,
}
