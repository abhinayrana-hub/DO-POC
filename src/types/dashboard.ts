export type PageId = 'pipeline' | 'quality' | 'metadata' | 'api'

export type Status = 'healthy' | 'warning' | 'critical' | 'neutral'

export type IconKey = 'pipeline' | 'quality' | 'metadata' | 'api'

export type Kpi = {
  label: string
  value: string
  delta: string
  status: Status
}

export type WorkItem = {
  name: string
  owner: string
  status: Status
  metric: string
  updated: string
}

export type TimelineItem = {
  label: string
  value: number
  status: Status
}

export type ChartTone = Status | 'blue' | 'purple' | 'orange' | 'teal'

export type ChartSeries = {
  name: string
  tone: ChartTone
  values: number[]
}

export type TrendChartConfig = {
  title: string
  subtitle: string
  labels: string[]
  yMax: number
  series: ChartSeries[]
  legendBelow?: boolean
}

export type StackedSegment = {
  label: string
  value: number
  tone: ChartTone
}

export type StackedBarConfig = {
  title: string
  subtitle: string
  categories: Array<{
    label: string
    segments: StackedSegment[]
  }>
}

export type MatrixConfig = {
  title: string
  subtitle: string
  columns: string[]
  rows: Array<{
    label: string
    cells: Array<{
      value: string
      tone: ChartTone
    }>
  }>
}

export type GroupedBarsConfig = {
  title: string
  subtitle: string
  categories: Array<{
    label: string
    bars: Array<{
      label: string
      value: number
      tone: ChartTone
    }>
  }>
}

export type LineageConfig = {
  title: string
  subtitle: string
  description: string
  nodes: Array<{
    id: string
    label: string
    level: number
    row: number
    tone: ChartTone
  }>
  edges: Array<{
    from: string
    to: string
  }>
  attributes: Array<{
    label: string
    value: string
  }>
  classifications: string[]
}

export type DashboardVisuals = {
  trend?: TrendChartConfig
  performance?: StackedBarConfig
  stackedStatus?: StackedBarConfig
  matrix?: MatrixConfig
  hierarchy?: GroupedBarsConfig
  dimensionBars?: GroupedBarsConfig
  lineage?: LineageConfig
  traffic?: GroupedBarsConfig
  latency?: TrendChartConfig
}

export type DashboardPageConfig = {
  id: PageId
  title: string
  eyebrow: string
  summary: string
  icon: IconKey
  kpis: Kpi[]
  timeline: TimelineItem[]
  workItems: WorkItem[]
  tabs: string[]
  focusTitle: string
  focusItems: string[]
  visuals: DashboardVisuals
}
