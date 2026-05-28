import {
  Bell,
  Boxes,
  Menu,
  RefreshCw,
  Search,
  Settings,
} from 'lucide-react'
import { IconButton } from '../ui'

type TopHeaderProps = {
  onToggleSidebar: () => void
}

export function TopHeader({ onToggleSidebar }: TopHeaderProps) {
  return (
    <header className="top-header">
      <div className="header-left">
        <IconButton label="Open navigation" onClick={onToggleSidebar}>
          <Menu size={18} />
        </IconButton>
        <div className="product-mark" aria-label="DataOps Console">
          <span className="product-icon"><Boxes size={17} /></span>
          <span className="product-name">DataOps Console</span>
        </div>
      </div>
      <label className="global-search">
        <Search size={15} />
        <input aria-label="Search dashboards" placeholder="Search datasets, pipelines, APIs" />
      </label>
      <div className="header-actions">
        <IconButton label="Refresh">
          <RefreshCw size={16} />
        </IconButton>
        <IconButton label="Notifications">
          <Bell size={16} />
        </IconButton>
        <IconButton label="Settings">
          <Settings size={16} />
        </IconButton>
        <div className="avatar" aria-label="Signed in as AR">AR</div>
      </div>
    </header>
  )
}
