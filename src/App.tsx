import { useEffect, useMemo, useState } from 'react'
import { AppShell } from './components/layout'
import { pages } from './data/dashboardData'
import { DashboardPage } from './pages/DashboardPage'
import type { PageId } from './types/dashboard'
import './styles/app.css'

const fallbackPageId: PageId = 'pipeline'

function App() {
  const pageById = useMemo(() => new Map(pages.map((page) => [page.id, page])), [])
  const [activePageId, setActivePageId] = useState<PageId>(() => getInitialPage(pageById))
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const onHashChange = () => setActivePageId(getInitialPage(pageById))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [pageById])

  const activePage = pageById.get(activePageId) ?? pages[0]

  const handleNavigate = (pageId: PageId) => {
    setActivePageId(pageId)
    setSidebarOpen(false)
    window.history.replaceState(null, '', `#/${pageId}`)
  }

  return (
    <AppShell
      activePageId={activePageId}
      pages={pages}
      sidebarOpen={sidebarOpen}
      onNavigate={handleNavigate}
      onToggleSidebar={() => setSidebarOpen((open) => !open)}
      onCloseSidebar={() => setSidebarOpen(false)}
    >
      <DashboardPage key={activePage.id} page={activePage} />
    </AppShell>
  )
}

function getInitialPage(pageById: Map<PageId, unknown>): PageId {
  const hash = window.location.hash.replace('#/', '') as PageId
  return pageById.has(hash) ? hash : fallbackPageId
}

export default App
