import { useMemo, useState } from 'react'
import {
  CircleDot,
  Clock3,
  Download,
  Filter,
  LayoutDashboard,
  MoreHorizontal,
  SlidersHorizontal,
  Zap,
} from 'lucide-react'
import { ObservabilityCharts } from '../components/charts/ObservabilityCharts'
import type { DashboardPageConfig, Status } from '../types/dashboard'
import {
  Button,
  Card,
  IconButton,
  StatusDot,
  StatusPill,
  Tabs,
  Toolbar,
} from '../components/ui'

const statusLabels: Record<Status, string> = {
  healthy: 'Healthy',
  warning: 'Warning',
  critical: 'Critical',
  neutral: 'Review',
}

export function DashboardPage({ page }: { page: DashboardPageConfig }) {
  const [activeTab, setActiveTab] = useState(page.tabs[0])

  const totalHealth = useMemo(() => {
    const healthy = page.workItems.filter((item) => item.status === 'healthy').length
    return Math.round((healthy / page.workItems.length) * 100)
  }, [page])

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">
            <CircleDot size={13} />
            {page.eyebrow}
          </div>
          <h1>{page.title}</h1>
          <p>{page.summary}</p>
        </div>
        <div className="header-toolbar">
          <Button variant="secondary" icon={<Download size={15} />}>Export</Button>
          <Button icon={<Zap size={15} />}>Create alert</Button>
        </div>
      </div>

      <section className="kpi-grid" aria-label="Key metrics">
        {page.kpis.map((kpi) => (
          <Card key={kpi.label} className="kpi-card">
            <div className="kpi-topline">
              <span>{kpi.label}</span>
              <StatusDot status={kpi.status} />
            </div>
            <strong>{kpi.value}</strong>
            <small>{kpi.delta}</small>
          </Card>
        ))}
      </section>

      <Toolbar>
        <Tabs tabs={page.tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div className="toolbar-controls">
          <label className="compact-select">
            <span>Window</span>
            <select aria-label="Time window" defaultValue="24h">
              <option value="1h">1 hour</option>
              <option value="24h">24 hours</option>
              <option value="7d">7 days</option>
            </select>
          </label>
          <Button variant="secondary" icon={<Filter size={15} />}>Filter</Button>
          <IconButton label="More actions">
            <MoreHorizontal size={16} />
          </IconButton>
        </div>
      </Toolbar>

      <ObservabilityCharts activeTab={activeTab} page={page} totalHealth={totalHealth} />

      <Card className="table-card">
        <div className="panel-header">
          <div>
            <h2>Operational Work Queue</h2>
            <p>Owner, status, and latest measurement for monitored assets.</p>
          </div>
          <Button variant="secondary" icon={<SlidersHorizontal size={15} />}>Columns</Button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Metric</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {page.workItems.map((item) => (
                <tr key={item.name}>
                  <td>
                    <div className="resource-cell">
                      <span className="resource-icon"><LayoutDashboard size={15} /></span>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>{item.owner}</td>
                  <td><StatusPill status={item.status}>{statusLabels[item.status]}</StatusPill></td>
                  <td>{item.metric}</td>
                  <td>
                    <span className="time-cell">
                      <Clock3 size={14} />
                      {item.updated}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
