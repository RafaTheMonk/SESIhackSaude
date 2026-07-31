import type { Nivel } from '../data/mock'
import { nivelLabel } from '../lib/format'

const styles: Record<Nivel, string> = {
  baixo: 'bg-risk-low/15 text-risk-low ring-1 ring-risk-low/30',
  medio: 'bg-risk-mid/15 text-risk-mid ring-1 ring-risk-mid/30',
  alto: 'bg-risk-high/15 text-risk-high ring-1 ring-risk-high/30',
}

export default function RiskBadge({ nivel, label }: { nivel: Nivel; label?: string }) {
  return (
    <span className={`pill ${styles[nivel]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label ?? nivelLabel[nivel]}
    </span>
  )
}
