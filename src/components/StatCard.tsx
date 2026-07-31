import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type Trend = { dir: 'up' | 'down' | 'flat'; texto: string; bom?: boolean }

export default function StatCard({
  icon: Icon,
  label,
  valor,
  sufixo,
  trend,
  accent = 'brand',
  children,
}: {
  icon: LucideIcon
  label: string
  valor: ReactNode
  sufixo?: string
  trend?: Trend
  accent?: 'brand' | 'green' | 'amber' | 'red' | 'sky'
  children?: ReactNode
}) {
  const accents: Record<string, string> = {
    brand: 'text-brand-400 bg-brand-500/10',
    green: 'text-risk-low bg-risk-low/10',
    amber: 'text-risk-mid bg-risk-mid/10',
    red: 'text-risk-high bg-risk-high/10',
    sky: 'text-sky-400 bg-sky-500/10',
  }
  const trendCor = trend
    ? trend.bom
      ? 'text-risk-low'
      : trend.bom === false
        ? 'text-risk-high'
        : 'text-slate-400'
    : ''
  const arrow = trend?.dir === 'up' ? '▲' : trend?.dir === 'down' ? '▼' : '—'

  return (
    <div className="card card-pad">
      <div className="flex items-start justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${accents[accent]}`}>
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        {trend && (
          <span className={`text-xs font-semibold ${trendCor}`}>
            {arrow} {trend.texto}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight text-white">{valor}</span>
        {sufixo && <span className="text-sm text-slate-400">{sufixo}</span>}
      </div>
      <div className="mt-1 text-sm text-slate-400">{label}</div>
      {children}
    </div>
  )
}
