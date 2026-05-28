import type { ReactNode } from 'react'
import type { DashboardPageConfig, PageId } from '../../types/dashboard'
import { Sidebar } from './Sidebar'
import { TopHeader } from './TopHeader'

type AppShellProps = {
  activePageId: PageId
  children: ReactNode
  pages: DashboardPageConfig[]
  sidebarOpen: boolean
  onCloseSidebar: () => void
  onNavigate: (pageId: PageId) => void
  onToggleSidebar: () => void
}

export function AppShell({
  activePageId,
  children,
  pages,
  sidebarOpen,
  onCloseSidebar,
  onNavigate,
  onToggleSidebar,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <TopHeader onToggleSidebar={onToggleSidebar} />
      <Sidebar
        activePageId={activePageId}
        open={sidebarOpen}
        pages={pages}
        onClose={onCloseSidebar}
        onNavigate={onNavigate}
      />
      {sidebarOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={onCloseSidebar} />}
      <main className="app-main">{children}</main>
    </div>
  )
}
