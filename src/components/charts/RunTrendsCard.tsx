import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  export function RunTrendsCard({ compact = false }: { compact?: boolean }) {
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
    if (compact) {
      return (
        <>
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

          <div className="chart-legend">
            <span>
              <i className="tone-healthy" /> Successful
            </span>
            <span>
              <i className="tone-critical" /> Failed
            </span>
          </div>
        </>
      )
    }

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
                <div className="text-lg font-semibold">
                  Run Trends Over Time
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  (Last 30 days)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <AreaChart
              data={runTrends}
              margin={{ top: 8, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="gradientSuccess"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.24} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0.04} />
                </linearGradient>
                <linearGradient id="gradientFailed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0.03} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                strokeOpacity={0.06}
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "var(--color-muted)" }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis tick={{ fontSize: 12, fill: "var(--color-muted)" }} />
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
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Successful
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Failed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RunTrendsCard;
