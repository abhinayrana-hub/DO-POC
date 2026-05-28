import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import runTrends from '../../data/runTrendsData'

function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex flex-col">
      <span className="text-sm text-slate-500 dark:text-slate-300">{label}</span>
      <strong className="text-2xl mt-1">{value}</strong>
      {hint && <span className="text-xs text-slate-400 mt-1">{hint}</span>}
    </div>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null
  const success = payload.find((p: any) => p.dataKey === 'success')
  const failed = payload.find((p: any) => p.dataKey === 'failed')
  return (
    <div className="bg-white dark:bg-slate-800 border rounded-md p-2 text-sm shadow">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 flex gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          <div>
            <div className="text-xs text-slate-400">Successful</div>
            <div className="font-medium">{success ? success.value : '-'}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
          <div>
            <div className="text-xs text-slate-400">Failed</div>
            <div className="font-medium">{failed ? failed.value : '-'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function RunTrendsCard() {
  const totalPipelines = 24
  const totalRuns = runTrends.reduce((s, r) => s + r.success + r.failed, 0)
  const failedRuns = runTrends.reduce((s, r) => s + r.failed, 0)
  const successRate = Math.round(((totalRuns - failedRuns) / totalRuns) * 100)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Kpi label="Total Pipelines" value={`${totalPipelines}`} />
        <Kpi label="Total Runs" value={`${totalRuns}`} />
        <Kpi label="Failed Runs" value={`${failedRuns}`} />
        <Kpi label="Success Rate" value={`${successRate}%`} />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div className="text-lg font-semibold">Run Trends Over Time</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">(Last 30 days)</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <AreaChart data={runTrends} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradientSuccess" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.24} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0.04} />
                </linearGradient>
                <linearGradient id="gradientFailed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0.03} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--color-muted)' }} padding={{ left: 10, right: 10 }} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--color-muted)' }} />
              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="success"
                stroke="#059669"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#gradientSuccess)"
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                isAnimationActive={true}
                animationDuration={800}
              />

              <Area
                type="monotone"
                dataKey="failed"
                stroke="#ef4444"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#gradientFailed)"
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                isAnimationActive={true}
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-6 mt-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
            <span className="text-sm text-slate-600 dark:text-slate-300">Successful</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
            <span className="text-sm text-slate-600 dark:text-slate-300">Failed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RunTrendsCard
