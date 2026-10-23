import { useState } from 'react'
import { formatCompactPrice, formatPrice } from '../../utils/format'

const WIDTH = 640
const HEIGHT = 240
const PAD = { top: 16, right: 8, bottom: 28, left: 52 }
const GRID_STEPS = 4

// Single-series bar chart: monthly revenue with a hover tooltip per bar.
export default function RevenueChart({ data }) {
  const [hovered, setHovered] = useState(null)

  const plotWidth = WIDTH - PAD.left - PAD.right
  const plotHeight = HEIGHT - PAD.top - PAD.bottom
  const rawMax = Math.max(...data.map((d) => d.revenue))
  const step = Math.ceil(rawMax / GRID_STEPS / 100000) * 100000
  const max = step * GRID_STEPS
  const slot = plotWidth / data.length
  const barWidth = Math.min(28, slot - 8)
  const y = (value) => PAD.top + plotHeight - (value / max) * plotHeight

  const active = hovered !== null ? data[hovered] : null

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="Monthly revenue bar chart">
        {Array.from({ length: GRID_STEPS + 1 }, (_, i) => {
          const value = step * i
          return (
            <g key={value}>
              <line
                x1={PAD.left}
                x2={WIDTH - PAD.right}
                y1={y(value)}
                y2={y(value)}
                stroke={i === 0 ? '#cbd5e1' : '#e2e8f0'}
                strokeWidth="1"
              />
              <text x={PAD.left - 8} y={y(value) + 4} textAnchor="end" className="fill-slate-500 text-[11px]">
                {formatCompactPrice(value)}
              </text>
            </g>
          )
        })}

        {data.map((d, i) => {
          const x = PAD.left + slot * i + (slot - barWidth) / 2
          const top = y(d.revenue)
          const height = PAD.top + plotHeight - top
          const radius = 4
          // Rounded top corners, flat on the baseline.
          const path = `M${x},${top + height} V${top + radius} Q${x},${top} ${x + radius},${top} H${x + barWidth - radius} Q${x + barWidth},${top} ${x + barWidth},${top + radius} V${top + height} Z`
          return (
            <g key={d.month}>
              <path d={path} className={hovered === null || hovered === i ? 'fill-emerald-600' : 'fill-emerald-600/40'} />
              <text x={x + barWidth / 2} y={HEIGHT - 8} textAnchor="middle" className="fill-slate-500 text-[11px]">
                {d.month}
              </text>
              {/* Hit target covers the full column, wider than the bar. */}
              <rect
                x={PAD.left + slot * i}
                y={PAD.top}
                width={slot}
                height={plotHeight}
                fill="transparent"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            </g>
          )
        })}
      </svg>

      {active && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-md"
          style={{
            left: `${((PAD.left + slot * hovered + slot / 2) / WIDTH) * 100}%`,
            top: `${(y(active.revenue) / HEIGHT) * 100}%`,
            transform: 'translate(-50%, calc(-100% - 8px))',
          }}
        >
          <p className="font-medium text-slate-900">{active.month}</p>
          <p className="text-slate-600">{formatPrice(active.revenue)}</p>
        </div>
      )}
    </div>
  )
}
