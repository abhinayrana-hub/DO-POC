import {
  Database,
  Network,
  TableProperties,
  X,
} from 'lucide-react'
import type { DashboardPageConfig, PageId } from '../../types/dashboard'
import { IconButton } from '../ui'
import { navIcons } from './iconRegistry'

type SidebarProps = {
  activePageId: PageId
  open: boolean
  pages: DashboardPageConfig[]
  onClose: () => void
  onNavigate: (pageId: PageId) => void
}

export function Sidebar({ activePageId, open, pages, onClose, onNavigate }: SidebarProps) {
  return (
    <aside className={`sidebar ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
      <div className="sidebar-mobile-head">
        <span>Navigation</span>
        <IconButton label="Close navigation" onClick={onClose}>
          <X size={17} />
        </IconButton>
      </div>
      <nav className="nav-group">
        <div className="nav-label">Monitoring</div>
        {pages.map((page) => {
          const Icon = navIcons[page.icon]
          return (
            <button
              type="button"
              key={page.id}
              className={`nav-item ${page.id === activePageId ? 'active' : ''}`}
              onClick={() => onNavigate(page.id)}
            >
              <Icon size={17} />
              <span>{page.title}</span>
            </button>
          )
        })}
      </nav>
      <nav className="nav-group secondary">
        <div className="nav-label">Workspace</div>
        <button type="button" className="nav-item">
          <Database size={17} />
          <span>Asset Registry</span>
        </button>
        <button type="button" className="nav-item">
          <Network size={17} />
          <span>Environments</span>
        </button>
        <button type="button" className="nav-item">
          <TableProperties size={17} />
          <span>Reports</span>
        </button>
      </nav>
      <div className="sidebar-footer">
        <div className="env-dot" />
        <div>
          <strong>Production</strong>
          <span>Last sync 45 sec ago</span>
        </div>
      </div>
    </aside>
  )
}
