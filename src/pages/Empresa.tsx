import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import {
  Users,
  BellRing,
  Activity,
  ShieldCheck,
  TrendingUp,
  BadgeDollarSign,
  Video,
  Stethoscope,
  CalendarClock,
  UserMinus,
  CalendarX,
} from 'lucide-react'
import StatCard from '../components/StatCard'
import RiskBadge from '../components/RiskBadge'
import PageHeader from '../components/PageHeader'
import { empresa as e, PRODUTO } from '../data/mock'
import { num, nivelCor } from '../lib/format'
import type { Nivel } from '../data/mock'

const tooltipStyle = {
  background: '#0f172a',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 12,
  color: '#e2e8f0',
  fontSize: 12,
}

const sevBox: Record<Nivel, string> = {
  baixo: 'border-risk-low text-risk-low',
  medio: 'border-risk-mid text-risk-mid',
  alto: 'border-risk-high text-risk-high',
}

const tendIcon: Record<string, string> = { up: '▲', down: '▼', flat: '—' }
const tendCor: Record<string, string> = {
  up: 'text-risk-low',
  down: 'text-risk-high',
  flat: 'text-slate-500',
}

export default function Empresa() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analise em terceira pessoa"
        titulo="Painel da empresa"
        subtitulo={`${PRODUTO.empresaDemo} - gestao de risco ocupacional, conformidade e medicina do trabalho.`}
        right={
          <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-ink-850/70 px-4 py-2.5 text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-risk-low" />
            <span className="text-slate-300">Ao vivo</span>
            <span className="text-slate-500">- 3 unidades</span>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard icon={Users} label="Monitorados" valor={num(e.kpis.monitorados)} sufixo={`/ ${e.kpis.trabalhadores}`} accent="brand" />
        <StatCard icon={BellRing} label="Alertas ativos" valor={e.kpis.alertasAtivos} accent="amber" trend={{ dir: 'down', texto: '-6 hoje', bom: true }} />
        <StatCard icon={Activity} label="Risco medio" valor={e.kpis.riscoMedio} sufixo="/ 100" accent="amber" trend={{ dir: 'down', texto: '-4 pts', bom: true }} />
        <StatCard icon={ShieldCheck} label="Conformidade NR" valor={`${e.kpis.conformidadeNR}%`} accent="green" trend={{ dir: 'up', texto: '+3%', bom: true }} />
        <StatCard icon={ShieldCheck} label="Incidentes evitados" valor={e.kpis.incidentesEvitados} sufixo="/ mes" accent="green" trend={{ dir: 'up', texto: 'no mes', bom: true }} />
        <StatCard icon={BadgeDollarSign} label="ROI estimado" valor={`${e.kpis.roiMes}x`} accent="brand" trend={{ dir: 'up', texto: 'sobre invest.', bom: true }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Distribuicao de risco */}
        <div className="card card-pad">
          <h3 className="font-semibold text-white">Distribuicao de risco</h3>
          <p className="text-xs text-slate-400">Trabalhadores por nivel</p>
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie
                data={e.distribuicaoRisco}
                dataKey="qtd"
                nameKey="nivel"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                stroke="none"
              >
                {e.distribuicaoRisco.map((d) => (
                  <Cell key={d.nivel} fill={d.cor} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-1 flex justify-center gap-4">
            {e.distribuicaoRisco.map((d) => (
              <div key={d.nivel} className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.cor }} />
                {d.nivel} <span className="font-semibold text-white">{d.qtd}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tendencia */}
        <div className="card card-pad lg:col-span-2">
          <h3 className="font-semibold text-white">Afastamentos x incidentes evitados</h3>
          <p className="text-xs text-slate-400">
            Ultimos 8 meses - afastamentos caem enquanto a prevencao sobe
          </p>
          <ResponsiveContainer width="100%" height={210}>
            <ComposedChart data={e.tendencia} margin={{ top: 10, right: 8, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="mes" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="afastamentos" name="Afastamentos" fill="var(--color-risk-high)" radius={[4, 4, 0, 0]} barSize={18} />
              <Line type="monotone" dataKey="evitados" name="Evitados (CorporAI)" stroke="var(--color-brand-400)" strokeWidth={2.5} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Camera ao vivo (mock visao computacional) */}
        <div className="card card-pad">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-sky-400" />
              <h3 className="font-semibold text-white">Camera - visao computacional</h3>
            </div>
            <span className="pill bg-risk-high/15 text-risk-high ring-1 ring-risk-high/30">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" /> REC
            </span>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 via-ink-800 to-ink-900 ring-1 ring-white/5">
            {/* piso / perspectiva */}
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
            {/* linha de scan */}
            <div className="scanline absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-400/70 to-transparent" />

            {/* silhuetas */}
            <div className="absolute bottom-[24%] left-[15%] h-[42%] w-[10%] rounded-t-full bg-slate-600/50" />
            <div className="absolute bottom-[24%] left-[49%] h-[38%] w-[10%] rotate-6 rounded-t-full bg-slate-600/50" />
            <div className="absolute bottom-[26%] left-[77%] h-[36%] w-[9%] rounded-t-full bg-slate-600/50" />

            {/* bounding boxes */}
            {e.camera.caixas.map((c) => (
              <div
                key={c.id}
                className={`absolute rounded border-2 ${sevBox[c.sev]}`}
                style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%`, height: `${c.h}%` }}
              >
                <span className={`absolute -top-5 left-0 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-semibold ${sevBox[c.sev]} bg-ink-950/80`}>
                  {c.label}
                </span>
              </div>
            ))}

            <div className="absolute left-2 top-2 rounded bg-ink-950/70 px-2 py-1 font-mono text-[10px] text-slate-300">
              {e.camera.unidade}
            </div>
            <div className="absolute bottom-2 right-2 rounded bg-ink-950/70 px-2 py-1 font-mono text-[10px] text-slate-400">
              {e.camera.fps} fps - {e.camera.deteccoesMin} det/min
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Processamento na borda: apenas pose/esqueleto, sem gravar rosto ou audio (LGPD).
          </p>
        </div>

        {/* Feed de alertas */}
        <div className="card card-pad">
          <div className="mb-3 flex items-center gap-2">
            <BellRing className="h-5 w-5 text-amber-400" />
            <h3 className="font-semibold text-white">Alertas em tempo real</h3>
          </div>
          <div className="max-h-[320px] space-y-2 overflow-y-auto pr-1">
            {e.feed.map((a, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/5 bg-ink-900/50 p-3">
                <div className="shrink-0 font-mono text-xs text-slate-500">{a.hora}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-white">{a.tipo}</span>
                    <RiskBadge nivel={a.sev} />
                    <span className="text-xs text-slate-500">{a.setor} - {a.worker}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-400">{a.detalhe}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Risco por setor */}
        <div className="card card-pad">
          <h3 className="font-semibold text-white">Risco por setor</h3>
          <p className="text-xs text-slate-400">Indice de risco e alertas por area</p>
          <div className="mt-4 space-y-3">
            {e.setores.map((s) => (
              <div key={s.setor}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-300">{s.setor}</span>
                  <span className="flex items-center gap-2 text-slate-400">
                    <span className="text-xs">{s.headcount} pessoas</span>
                    <RiskBadge nivel={s.nivel} label={`${s.alertas} alertas`} />
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${s.risco}%`, background: nivelCor[s.nivel] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conformidade NR */}
        <div className="card card-pad">
          <h3 className="font-semibold text-white">Conformidade com Normas Regulamentadoras</h3>
          <p className="text-xs text-slate-400">Relatorios prontos para auditoria e PGR</p>
          <div className="mt-4 space-y-4">
            {e.normas.map((n) => {
              const cor = n.conformidade >= 90 ? 'var(--color-risk-low)' : n.conformidade >= 80 ? 'var(--color-risk-mid)' : 'var(--color-risk-high)'
              return (
                <div key={n.nr}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-300">
                      <span className="font-semibold text-white">{n.nr}</span> - {n.nome}
                    </span>
                    <span className="font-semibold text-white">{n.conformidade}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full" style={{ width: `${n.conformidade}%`, background: cor }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Medicina do trabalho */}
      <div className="card card-pad">
        <div className="mb-4 flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-brand-400" />
          <h3 className="font-semibold text-white">Medicina do trabalho</h3>
        </div>
        <div className="grid gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-white/5 bg-ink-900/50 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <ShieldCheck className="h-4 w-4 text-risk-low" /> ASO em dia
            </div>
            <div className="mt-2 text-2xl font-bold text-white">
              {e.medicina.asoEmDia}
              <span className="text-sm font-normal text-slate-500"> / {e.medicina.asoTotal}</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full bg-risk-low" style={{ width: `${(e.medicina.asoEmDia / e.medicina.asoTotal) * 100}%` }} />
            </div>
          </div>
          <div className="rounded-xl border border-white/5 bg-ink-900/50 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CalendarClock className="h-4 w-4 text-risk-mid" /> Exames vencendo (30d)
            </div>
            <div className="mt-2 text-2xl font-bold text-white">{e.medicina.examesVencendo30d}</div>
            <div className="mt-1 text-xs text-slate-500">agendar convocacao</div>
          </div>
          <div className="rounded-xl border border-white/5 bg-ink-900/50 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <UserMinus className="h-4 w-4 text-risk-high" /> Afastamentos ativos
            </div>
            <div className="mt-2 text-2xl font-bold text-white">{e.medicina.afastamentosAtivos}</div>
            <div className="mt-1 text-xs text-slate-500">acompanhamento clinico</div>
          </div>
          <div className="rounded-xl border border-white/5 bg-ink-900/50 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CalendarX className="h-4 w-4 text-sky-400" /> Dias perdidos (mes)
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{e.medicina.diasPerdidosMes}</span>
              <span className="text-xs font-semibold text-risk-low">
                ▼ {e.medicina.diasPerdidosAnterior - e.medicina.diasPerdidosMes} vs mes ant.
              </span>
            </div>
          </div>
        </div>

        {/* CIDs */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {e.medicina.cids.map((c) => (
            <div key={c.cid} className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2.5">
              <div>
                <div className="text-sm font-semibold text-white">{c.cid}</div>
                <div className="text-xs text-slate-400">{c.nome}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">{c.casos}</div>
                <div className="text-[10px] uppercase text-slate-500">casos</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela de trabalhadores */}
      <div className="card overflow-hidden">
        <div className="flex items-center gap-2 border-b border-white/5 p-5">
          <TrendingUp className="h-5 w-5 text-brand-400" />
          <h3 className="font-semibold text-white">Trabalhadores em acompanhamento</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-slate-500">
              <tr className="border-b border-white/5">
                <th className="px-5 py-3 font-medium">Trabalhador</th>
                <th className="px-5 py-3 font-medium">Setor</th>
                <th className="px-5 py-3 font-medium">Indice</th>
                <th className="px-5 py-3 font-medium">Risco</th>
                <th className="px-5 py-3 font-medium">Tend.</th>
                <th className="px-5 py-3 font-medium">Ultimo alerta</th>
              </tr>
            </thead>
            <tbody>
              {e.trabalhadores.map((w) => (
                <tr key={w.nome} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-medium text-white">{w.nome}</td>
                  <td className="px-5 py-3 text-slate-400">{w.setor}</td>
                  <td className="px-5 py-3">
                    <span className="font-semibold text-white">{w.score}</span>
                    <span className="text-slate-500"> / 100</span>
                  </td>
                  <td className="px-5 py-3"><RiskBadge nivel={w.risco} /></td>
                  <td className={`px-5 py-3 font-semibold ${tendCor[w.tendencia]}`}>{tendIcon[w.tendencia]}</td>
                  <td className="px-5 py-3 text-slate-400">{w.ultimo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
