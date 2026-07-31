import type { ReactNode } from 'react'

export default function PageHeader({
  eyebrow,
  titulo,
  subtitulo,
  right,
}: {
  eyebrow?: string
  titulo: string
  subtitulo?: string
  right?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-400">
            {eyebrow}
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{titulo}</h1>
        {subtitulo && <p className="mt-1 max-w-2xl text-sm text-slate-400">{subtitulo}</p>}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  )
}
