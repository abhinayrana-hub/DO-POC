import { CheckCircle2, LineChart } from "lucide-react";
import type {
  ChartTone,
  DashboardPageConfig,
  GroupedBarsConfig,
  LineageConfig,
  MatrixConfig,
  StackedBarConfig,
  TrendChartConfig,
} from "../../types/dashboard";
import { Card, StatusPill } from "../ui";

type ObservabilityChartsProps = {
  activeTab: string;
  page: DashboardPageConfig;
  totalHealth: number;
};

export function ObservabilityCharts({
  activeTab,
  page,
  totalHealth,
}: ObservabilityChartsProps) {
  if (page.id === "pipeline") {
    return (
      <section className="wireframe-grid pipeline-grid">
        {page.visuals.trend && <TrendLineChart config={page.visuals.trend} />}
        {page.visuals.performance && (
          <PerformanceGroupedChart config={page.visuals.performance} />
        )}
      </section>
    );
  }

  if (page.id === "quality") {
    return (
      <section className="wireframe-grid quality-grid">
        {page.visuals.stackedStatus && (
          <HorizontalStackedBars config={page.visuals.stackedStatus} />
        )}
        {page.visuals.trend && <TrendLineChart config={page.visuals.trend} />}
        {page.visuals.matrix && <QualityMatrix config={page.visuals.matrix} />}
        {page.visuals.hierarchy && (
          <GroupedBars config={page.visuals.hierarchy} compact />
        )}
        {page.visuals.dimensionBars && (
          <GroupedBars config={page.visuals.dimensionBars} />
        )}
      </section>
    );
  }

  if (page.id === "metadata") {
    return (
      <section className="wireframe-grid metadata-grid">
        {page.visuals.lineage && <LineageMap config={page.visuals.lineage} />}
        <FocusPanel page={page} />
      </section>
    );
  }

  if (page.id === "api") {
    return (
      <section className="wireframe-grid api-grid">
        {page.visuals.traffic && <GroupedBars config={page.visuals.traffic} />}
        {page.visuals.latency && (
          <TrendLineChart config={page.visuals.latency} />
        )}
        <SignalBars
          activeTab={activeTab}
          page={page}
          totalHealth={totalHealth}
        />
      </section>
    );
  }

  return (
    <section className="wireframe-grid">
      <SignalBars activeTab={activeTab} page={page} totalHealth={totalHealth} />
      <FocusPanel page={page} />
    </section>
  );
}

function TrendLineChart({ config }: { config: TrendChartConfig }) {
  const width = 640;
  const height = 260;
  const padding = { top: 24, right: 24, bottom: 38, left: 42 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const pointFor = (value: number, index: number, total: number) => {
    const x =
      padding.left + (total <= 1 ? 0 : (index / (total - 1)) * plotWidth);
    const y = padding.top + plotHeight - (value / config.yMax) * plotHeight;
    return [x, y];
  };

  return (
    <Card className="chart-card">
      <ChartHeader title={config.title} subtitle={config.subtitle} />
      <div className="trend-row">
        <svg
          className="line-chart-svg"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={config.title}
        >
          {[0, 0.25, 0.5, 0.75, 1].map((step) => {
            const y = padding.top + plotHeight - step * plotHeight;
            return (
              <g key={step}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={y}
                  y2={y}
                  className="chart-grid-line"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  className="chart-axis-text"
                  textAnchor="end"
                >
                  {Math.round(config.yMax * step)}
                </text>
              </g>
            );
          })}
          {config.labels.map((label, index) => {
            if (
              index % Math.ceil(config.labels.length / 5) !== 0 &&
              index !== config.labels.length - 1
            ) {
              return null;
            }
            const x =
              padding.left + (index / (config.labels.length - 1)) * plotWidth;
            return (
              <text
                key={label}
                x={x}
                y={height - 12}
                className="chart-axis-text"
                textAnchor="middle"
              >
                {label}
              </text>
            );
          })}
          {config.series.map((series) => {
            const points = series.values.map((value, index) =>
              pointFor(value, index, series.values.length),
            );
            const path = points
              .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
              .join(" ");
            return (
              <g key={series.name}>
                <path d={path} className={`line-path tone-${series.tone}`} />
                {points.map(([x, y], index) => (
                  <circle
                    key={`${series.name}-${index}`}
                    cx={x}
                    cy={y}
                    r="3"
                    className={`line-dot tone-${series.tone}`}
                  />
                ))}
              </g>
            );
          })}
        </svg>
        <div style={{ width: 220 }}>
          <Legend
            items={config.series.map((series) => ({
              label: series.name,
              tone: series.tone,
            }))}
          />
        </div>
      </div>
    </Card>
  );
}

function PerformanceGroupedChart({ config }: { config: StackedBarConfig }) {
  // adapt stacked segments into grouped bars for side-by-side success/fail per product
  const grouped: GroupedBarsConfig = {
    title: config.title ?? 'Job Success / Failure over Data Product',
    subtitle: config.subtitle,
    categories: config.categories.map((c) => ({
      label: c.label,
      bars: c.segments.map((s) => ({ label: s.label, value: s.value, tone: s.tone })),
    })),
  };
  return <GroupedBars config={grouped} />;
}

function StackedColumnChart({ config }: { config: StackedBarConfig }) {
  const max = Math.max(
    ...config.categories.map((category) =>
      sum(category.segments.map((segment) => segment.value)),
    ),
  );

  return (
    <Card className="chart-card">
      <ChartHeader title={config.title} subtitle={config.subtitle} />
      <div className="stacked-column-chart" aria-label={config.title}>
        {config.categories.map((category) => {
          const total = sum(category.segments.map((segment) => segment.value));
          return (
            <div className="stacked-column" key={category.label}>
              <div
                className="stacked-column-stack"
                style={{ height: `${Math.max((total / max) * 100, 8)}%` }}
              >
                {category.segments.map((segment) => (
                  <span
                    key={`${category.label}-${segment.label}`}
                    className={`stacked-column-segment tone-${segment.tone}`}
                    style={{ height: `${(segment.value / total) * 100}%` }}
                    title={`${category.label} ${segment.label}: ${segment.value}`}
                  />
                ))}
              </div>
              <span title={category.label}>{category.label}</span>
            </div>
          );
        })}
      </div>
      <Legend
        items={
          config.categories[0]?.segments.map((segment) => ({
            label: segment.label,
            tone: segment.tone,
          })) ?? []
        }
      />
    </Card>
  );
}

function HorizontalStackedBars({ config }: { config: StackedBarConfig }) {
  return (
    <Card className="chart-card">
      <ChartHeader title={config.title} subtitle={config.subtitle} />
      <div className="horizontal-stack-chart">
        {config.categories.map((category) => {
          const total = sum(category.segments.map((segment) => segment.value));
          return (
            <div className="horizontal-stack-row" key={category.label}>
              <span>{category.label}</span>
              <div className="horizontal-stack-track">
                {category.segments.map((segment) => (
                  <span
                    key={`${category.label}-${segment.label}`}
                    className={`horizontal-stack-segment tone-${segment.tone}`}
                    style={{ width: `${(segment.value / total) * 100}%` }}
                  >
                    {segment.value}%
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <Legend
        items={
          config.categories[0]?.segments.map((segment) => ({
            label: segment.label,
            tone: segment.tone,
          })) ?? []
        }
      />
    </Card>
  );
}

function QualityMatrix({ config }: { config: MatrixConfig }) {
  return (
    <Card className="chart-card">
      <ChartHeader title={config.title} subtitle={config.subtitle} />
      <div className="matrix-scroll">
        <div
          className="quality-matrix"
          style={{
            gridTemplateColumns: `150px repeat(${config.columns.length}, minmax(98px, 1fr))`,
          }}
        >
          <div className="matrix-head">Dimension</div>
          {config.columns.map((column) => (
            <div className="matrix-head" key={column}>
              {column}
            </div>
          ))}
          {config.rows
            .map((row) => (
              <div className="matrix-row-label" key={row.label}>
                {row.label}
              </div>
            ))
            .flatMap((label, index) => [
              label,
              ...config.rows[index].cells.map((cell, cellIndex) => (
                <div
                  className={`matrix-cell tone-${cell.tone}`}
                  key={`${config.rows[index].label}-${cellIndex}`}
                >
                  {cell.value}
                </div>
              )),
            ])}
        </div>
      </div>
    </Card>
  );
}

function GroupedBars({
  config,
  compact = false,
}: {
  config: GroupedBarsConfig;
  compact?: boolean;
}) {
  const max = Math.max(
    ...config.categories.flatMap((category) =>
      category.bars.map((bar) => bar.value),
    ),
  );

  return (
    <Card className={`chart-card ${compact ? "compact-chart-card" : ""}`}>
      <ChartHeader title={config.title} subtitle={config.subtitle} />
      <div className="grouped-bar-chart">
        {config.categories.map((category) => (
          <div className="grouped-category" key={category.label}>
            <div className="grouped-bars">
              {category.bars.map((bar) => (
                <span
                  key={`${category.label}-${bar.label}`}
                  className={`grouped-bar tone-${bar.tone}`}
                  style={{ height: `${Math.max((bar.value / max) * 100, 6)}%` }}
                  title={`${bar.label}: ${bar.value}`}
                />
              ))}
            </div>
            <span title={category.label}>{category.label}</span>
          </div>
        ))}
      </div>
      <Legend
        items={dedupeLegend(
          config.categories.flatMap((category) =>
            category.bars.map((bar) => ({ label: bar.label, tone: bar.tone })),
          ),
        )}
      />
    </Card>
  );
}

function LineageMap({ config }: { config: LineageConfig }) {
  const width = 760;
  const height = 360;
  const nodeWidth = 170;
  const nodeHeight = 28;
  const positions = new Map(
    config.nodes.map((node) => [
      node.id,
      {
        x: 34 + node.level * 270,
        y: 28 + node.row * 48,
      },
    ]),
  );

  return (
    <Card className="chart-card lineage-card">
      <ChartHeader title={config.title} subtitle={config.subtitle} />
      <div className="lineage-content">
        <svg
          className="lineage-svg"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={config.title}
        >
          {config.edges.map((edge) => {
            const from = positions.get(edge.from);
            const to = positions.get(edge.to);
            if (!from || !to) return null;
            const startX = from.x + nodeWidth;
            const startY = from.y + nodeHeight / 2;
            const endX = to.x;
            const endY = to.y + nodeHeight / 2;
            const mid = (endX - startX) / 2;
            return (
              <path
                key={`${edge.from}-${edge.to}`}
                d={`M ${startX} ${startY} C ${startX + mid} ${startY}, ${endX - mid} ${endY}, ${endX} ${endY}`}
                className="lineage-edge"
              />
            );
          })}
          {config.nodes.map((node) => {
            const position = positions.get(node.id);
            if (!position) return null;
            return (
              <g key={node.id}>
                <rect
                  x={position.x}
                  y={position.y}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx="3"
                  className={`lineage-node tone-${node.tone}`}
                />
                <text
                  x={position.x + 10}
                  y={position.y + 18}
                  className="lineage-node-text"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="lineage-details">
          <p>{config.description}</p>
          <div className="attribute-grid">
            {config.attributes.map((attribute) => (
              <div key={attribute.label}>
                <span>{attribute.label}</span>
                <strong>{attribute.value}</strong>
              </div>
            ))}
          </div>
          <div className="classification-list">
            {config.classifications.map((classification) => (
              <span key={classification}>{classification}</span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function SignalBars({
  activeTab,
  page,
  totalHealth,
}: ObservabilityChartsProps) {
  return (
    <Card className="chart-card">
      <div className="panel-header">
        <div>
          <h2>{activeTab}</h2>
          <p>Current operational posture and service activity.</p>
        </div>
        <StatusPill status={totalHealth >= 75 ? "healthy" : "warning"}>
          {totalHealth}% healthy
        </StatusPill>
      </div>
      <div className="signal-chart" aria-label="Operational signal chart">
        {page.timeline.map((item) => (
          <div className="signal-row" key={item.label}>
            <span>{item.label}</span>
            <div className="signal-track">
              <div
                className={`signal-fill ${item.status}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
            <strong>{item.value}%</strong>
          </div>
        ))}
      </div>
    </Card>
  );
}

function FocusPanel({ page }: { page: DashboardPageConfig }) {
  return (
    <Card className="chart-card">
      <div className="panel-header compact">
        <div>
          <h2>{page.focusTitle}</h2>
          <p>Prioritized for operators.</p>
        </div>
        <LineChart size={18} />
      </div>
      <ul className="focus-list">
        {page.focusItems.map((item) => (
          <li key={item}>
            <CheckCircle2 size={15} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function ChartHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="chart-header">
      <h2>{title}</h2>
      <span>{subtitle}</span>
    </div>
  );
}

function Legend({
  items,
}: {
  items: Array<{ label: string; tone: ChartTone }>;
}) {
  return (
    <div className="chart-legend">
      {items.map((item) => (
        <span key={`${item.label}-${item.tone}`}>
          <i className={`tone-${item.tone}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

function dedupeLegend(items: Array<{ label: string; tone: ChartTone }>) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.label}-${item.tone}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}
