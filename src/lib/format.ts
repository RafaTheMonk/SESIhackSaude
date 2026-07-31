export const brl = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export const brlCents = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export const num = (v: number) => v.toLocaleString('pt-BR')

export const pct = (v: number) => `${v.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`

import type { Nivel } from '../data/mock'

export const nivelCor: Record<Nivel, string> = {
  baixo: 'var(--color-risk-low)',
  medio: 'var(--color-risk-mid)',
  alto: 'var(--color-risk-high)',
}

export const nivelLabel: Record<Nivel, string> = {
  baixo: 'Baixo',
  medio: 'Medio',
  alto: 'Alto',
}
