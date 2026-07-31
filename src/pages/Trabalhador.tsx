import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from 'recharts'
import {
  Gauge,
  Coffee,
  HardHat,
  Droplets,
  Trophy,
  Flame,
  Lock,
  Lightbulb,
  AlertTriangle,
} from 'lucide-react'
import StatCard from '../components/StatCard'
import RiskBadge from '../components/RiskBadge'
import PageHeader from '../components/PageHeader'
import { trabalhador as t } from '../data/mock'

const tooltipStyle = {
  background: '#0f172a',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 12,
  color: '#e2e8f0',
  fontSize: 12,
}

export default function Trabalhador() {
  const delta = t.scoreHoje - t.scoreOntem
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analise em primeira pessoa"
        titulo="Meu bem-estar"
        subtitulo="Seu painel individual de saude no trabalho. So voce e o medico do trabalho veem estes dados."
        right={
          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-ink-850/70 px-4 py-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-500/15 font-bold text-brand-300">
              {t.iniciais}
            </span>
            <div className="leading-tight">
              <div className="font-semibold text-white">{t.nome}</div>
              <div className="text-xs text-slate-400">
                {t.funcao} - {t.setor}
              </div>
              <div className="text-xs text-slate-500">{t.turno}</div>
            </div>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid-tiles">
        <StatCard
          icon={Gauge}
          label="Indice de bem-estar hoje"
          valor={t.scoreHoje}
          sufixo="/ 100"
          accent="brand"
          trend={{
            dir: delta >= 0 ? 'up' : 'down',
            texto: `${delta >= 0 ? '+' : ''}${delta} vs ontem`,
            bom: delta >= 0,
          }}
        >
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-brand-500"
              style={{ width: `${t.scoreHoje}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-slate-500">Meta diaria: {t.metaScore}</div>
        </StatCard>

        <StatCard
          icon={Coffee}
          label="Pausas realizadas"
          valor={t.pausas.realizadas}
          sufixo={`/ ${t.pausas.recomendadas} recomendadas`}
          accent="amber"
          trend={{ dir: 'flat', texto: 'NR-17', bom: undefined }}
        />

        <StatCard
          icon={HardHat}
          label="EPI em conformidade"
          valor={`${t.ppe.conforme}%`}
          accent="green"
          trend={{ dir: 'up', texto: 'do turno', bom: true }}
        />

        <StatCard
          icon={Droplets}
          label="Hidratacao"
          valor={`${t.hidratacaoMl}`}
          sufixo={`/ ${t.metaHidratacaoMl} ml`}
          accent="sky"
        >
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-sky-500"
              style={{ width: `${(t.hidratacaoMl / t.metaHidratacaoMl) * 100}%` }}
            />
          </div>
        </StatCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Evolucao do indice */}
        <div className="card card-pad lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white">Evolucao do meu indice</h3>
              <p className="text-xs text-slate-400">Ultimos 14 dias uteis</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={t.scoreTrend} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
              <XAxis dataKey="dia" tickLine={false} axisLine={false} />
              <YAxis domain={[40, 100]} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <ReferenceLine y={t.metaScore} stroke="#f59e0b" strokeDasharray="4 4" />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--color-brand-400)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: 'var(--color-brand-400)' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radar fatores de risco */}
        <div className="card card-pad">
          <h3 className="font-semibold text-white">Meus fatores de risco</h3>
          <p className="text-xs text-slate-400">Quanto maior, maior a exposicao</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={t.fatoresRisco} outerRadius={80}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="fator" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Radar
                dataKey="valor"
                stroke="var(--color-risk-high)"
                fill="var(--color-risk-high)"
                fillOpacity={0.25}
              />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Postura no turno */}
        <div className="card card-pad lg:col-span-2">
          <h3 className="font-semibold text-white">Postura ao longo do turno</h3>
          <p className="text-xs text-slate-400">
            Qualidade postural por hora (queda entre 10h-11h gerou 5 alertas)
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={t.posturaTurno} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gpost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-brand-400)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-brand-400)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="hora" tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <ReferenceLine y={65} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'limite', fill: '#ef4444', fontSize: 10, position: 'insideBottomRight' }} />
              <Area
                type="monotone"
                dataKey="postura"
                stroke="var(--color-brand-400)"
                strokeWidth={2.5}
                fill="url(#gpost)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gamificacao */}
        <div className="card card-pad">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-400" />
            <h3 className="font-semibold text-white">Minhas conquistas</h3>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div>
              <div className="text-3xl font-bold text-white">{t.gamificacao.pontos}</div>
              <div className="text-xs text-slate-400">pontos - nivel {t.gamificacao.nivel}</div>
            </div>
            <div className="ml-auto flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-3 py-2 text-amber-400">
              <Flame className="h-4 w-4" />
              <span className="text-sm font-semibold">{t.gamificacao.sequenciaDias} dias</span>
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            {t.gamificacao.conquistas.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm text-slate-300">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-500/15 text-[10px] text-brand-400">
                  ✓
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Alertas hoje */}
        <div className="card card-pad">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <h3 className="font-semibold text-white">Meus alertas de hoje</h3>
          </div>
          <div className="mt-4 space-y-3">
            {t.alertasHoje.map((a, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/5 bg-ink-900/50 p-3">
                <div className="shrink-0 text-xs font-mono text-slate-500">{a.hora}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{a.tipo}</span>
                    <RiskBadge nivel={a.sev} />
                  </div>
                  <p className="mt-0.5 text-sm text-slate-400">{a.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recomendacoes */}
        <div className="card card-pad">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-brand-400" />
            <h3 className="font-semibold text-white">Recomendacoes para voce</h3>
          </div>
          <div className="mt-4 space-y-3">
            {t.recomendacoes.map((r, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-brand-500/5 p-3 ring-1 ring-brand-500/10">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-xs font-bold text-brand-400">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-300">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Privacidade */}
      <div className="card card-pad flex items-start gap-3 border-brand-500/10 bg-brand-500/5">
        <Lock className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
        <div>
          <div className="font-semibold text-white">Privacidade por design</div>
          <p className="mt-1 text-sm text-slate-400">{t.privacidade}</p>
        </div>
      </div>
    </div>
  )
}
