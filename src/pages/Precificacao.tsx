import { useMemo, useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Tooltip, LabelList } from 'recharts'
import { Check, Star, Camera, Calculator, TrendingUp, Clock, PiggyBank, Cctv } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { planos, camera, roiBase } from '../data/mock'
import { brl, num } from '../lib/format'

const tooltipStyle = {
  background: '#0f172a',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 12,
  color: '#e2e8f0',
  fontSize: 12,
}

export default function Precificacao() {
  const [trab, setTrab] = useState(120)
  const [planoIdx, setPlanoIdx] = useState(1)
  const [modo, setModo] = useState<'compra' | 'aluguel'>('aluguel')
  const [reducao, setReducao] = useState(35)

  const cameras = Math.max(1, Math.ceil(trab / 10))
  const plano = planos[planoIdx]

  const r = useMemo(() => {
    const saasMes = trab * plano.precoPorTrab
    const hwUpfront = modo === 'compra' ? cameras * camera.precoVendaUnit : 0
    const hwMes = modo === 'aluguel' ? cameras * camera.aluguelMes : 0
    const custoMes = saasMes + hwMes
    const custoAno = custoMes * 12 + hwUpfront

    const afastamentosAno = Math.round(trab * (roiBase.afastamentosAno / 342))
    const evitados = Math.round(afastamentosAno * (reducao / 100))
    const economiaAno = evitados * roiBase.custoAfastamentoMedio
    const economiaMes = economiaAno / 12

    const liquidoAno = economiaAno - custoAno
    const roi = custoAno > 0 ? economiaAno / custoAno : 0
    const saldoMes = economiaMes - custoMes
    const payback = saldoMes > 0 ? (hwUpfront > 0 ? hwUpfront / saldoMes : custoMes / saldoMes) : 0

    return { saasMes, hwUpfront, hwMes, custoMes, custoAno, afastamentosAno, evitados, economiaAno, economiaMes, liquidoAno, roi, payback }
  }, [trab, plano, modo, cameras, reducao])

  const chartData = [
    { nome: 'Custo/ano', valor: r.custoAno, cor: 'var(--color-risk-mid)' },
    { nome: 'Economia/ano', valor: r.economiaAno, cor: 'var(--color-risk-low)' },
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Modelo comercial"
        titulo="Precificacao"
        subtitulo="Assinatura SaaS por trabalhador/mes + camera de borda (compra ou aluguel). Simule o retorno abaixo."
      />

      {/* PLANOS SaaS */}
      <section className="grid gap-5 lg:grid-cols-3">
        {planos.map((p, i) => (
          <div
            key={p.nome}
            className={`card relative flex flex-col p-6 ${
              p.destaque ? 'ring-2 ring-brand-500/60' : ''
            }`}
          >
            {p.destaque && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-ink-950">
                <Star className="mr-1 inline h-3 w-3" /> Mais escolhido
              </span>
            )}
            <div className="text-sm font-semibold text-brand-400">{p.nome}</div>
            <div className="mt-0.5 text-xs text-slate-500">{p.alvo}</div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{brl(p.precoPorTrab)}</span>
              <span className="text-sm text-slate-400">/ trab. / mes</span>
            </div>
            <div className="mt-1 text-xs text-slate-500">a partir de {p.minTrab} trabalhadores</div>

            <ul className="mt-5 flex-1 space-y-2.5">
              {p.inclui.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setPlanoIdx(i)}
              className={`mt-6 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                planoIdx === i
                  ? 'bg-brand-500 text-ink-950'
                  : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {planoIdx === i ? 'Selecionado' : 'Simular com este plano'}
            </button>
          </div>
        ))}
      </section>

      {/* CAMERA */}
      <section className="grid gap-5 md:grid-cols-2">
        <div className="card card-pad">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-sky-400" />
            <h3 className="font-semibold text-white">Camera {camera.modeloNome}</h3>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            {camera.cobertura} - garantia {camera.garantia}. Dois modelos de aquisicao:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => setModo('compra')}
              className={`rounded-xl border p-4 text-left transition ${
                modo === 'compra' ? 'border-brand-500/60 bg-brand-500/10' : 'border-white/10 bg-white/[0.03] hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-400">
                <Cctv className="h-4 w-4" /> Compra (CAPEX)
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{brl(camera.precoVendaUnit)}</div>
              <div className="text-xs text-slate-500">por camera - pagamento unico</div>
            </button>
            <button
              onClick={() => setModo('aluguel')}
              className={`rounded-xl border p-4 text-left transition ${
                modo === 'aluguel' ? 'border-brand-500/60 bg-brand-500/10' : 'border-white/10 bg-white/[0.03] hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-400">
                <Cctv className="h-4 w-4" /> Aluguel (CaaS)
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{brl(camera.aluguelMes)}</div>
              <div className="text-xs text-slate-500">por camera / mes - sem CAPEX</div>
            </button>
          </div>
          <div className="mt-4 rounded-lg bg-white/[0.03] p-3 text-xs text-slate-400">
            Custo de fabricacao estimado: <span className="font-semibold text-slate-200">{brl(camera.custoBOM)}</span> por unidade -
            margem embutida cobre suporte, atualizacoes de IA e troca em garantia. Detalhes em Hardware.
          </div>
        </div>

        {/* Resumo do pacote */}
        <div className="card card-pad">
          <h3 className="font-semibold text-white">Seu pacote simulado</h3>
          <p className="text-xs text-slate-400">
            {num(trab)} trabalhadores - plano {plano.nome} - {cameras} camera(s) ({modo})
          </p>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <dt className="text-slate-400">SaaS ({num(trab)} x {brl(plano.precoPorTrab)})</dt>
              <dd className="font-semibold text-white">{brl(r.saasMes)}/mes</dd>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <dt className="text-slate-400">Cameras</dt>
              <dd className="font-semibold text-white">
                {modo === 'compra' ? `${brl(r.hwUpfront)} unico` : `${brl(r.hwMes)}/mes`}
              </dd>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <dt className="text-slate-400">Custo mensal recorrente</dt>
              <dd className="font-semibold text-white">{brl(r.custoMes)}/mes</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-300">Custo total no 1o ano</dt>
              <dd className="text-lg font-bold text-white">{brl(r.custoAno)}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* CALCULADORA DE ROI */}
      <section className="card card-pad">
        <div className="mb-5 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-brand-400" />
          <h3 className="text-lg font-semibold text-white">Calculadora de retorno</h3>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* controles */}
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <label className="text-slate-300">Trabalhadores monitorados</label>
                <span className="font-semibold text-white">{num(trab)}</span>
              </div>
              <input
                type="range" min={20} max={1000} step={10} value={trab}
                onChange={(ev) => setTrab(Number(ev.target.value))}
                className="w-full accent-teal-400"
              />
              <div className="mt-1 text-xs text-slate-500">
                Estimativa de {cameras} camera(s) - 1 a cada ~10 postos
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <label className="text-slate-300">Reducao esperada de afastamentos</label>
                <span className="font-semibold text-white">{reducao}%</span>
              </div>
              <input
                type="range" min={10} max={50} step={5} value={reducao}
                onChange={(ev) => setReducao(Number(ev.target.value))}
                className="w-full accent-teal-400"
              />
              <div className="mt-1 text-xs text-slate-500">
                Base: {r.afastamentosAno} afastamentos/ano esperados neste porte
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.03] p-3">
                <div className="text-xs text-slate-400">Plano</div>
                <div className="text-sm font-semibold text-white">{plano.nome}</div>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-3">
                <div className="text-xs text-slate-400">Aquisicao camera</div>
                <div className="text-sm font-semibold capitalize text-white">{modo}</div>
              </div>
            </div>
          </div>

          {/* resultado */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <TrendingUp className="h-3.5 w-3.5 text-brand-400" /> ROI (12 meses)
                </div>
                <div className="mt-1 text-3xl font-bold text-brand-400">{r.roi.toFixed(1)}x</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-ink-900/50 p-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="h-3.5 w-3.5 text-sky-400" /> Payback
                </div>
                <div className="mt-1 text-3xl font-bold text-white">
                  {r.payback > 0 ? `${r.payback.toFixed(1)}` : '-'}
                  <span className="text-base font-normal text-slate-400"> meses</span>
                </div>
              </div>
              <div className="rounded-xl border border-white/5 bg-ink-900/50 p-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <PiggyBank className="h-3.5 w-3.5 text-risk-low" /> Economia/ano
                </div>
                <div className="mt-1 text-2xl font-bold text-risk-low">{brl(r.economiaAno)}</div>
                <div className="text-xs text-slate-500">{r.evitados} afastamentos evitados</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-ink-900/50 p-4">
                <div className="text-xs text-slate-400">Ganho liquido/ano</div>
                <div className={`mt-1 text-2xl font-bold ${r.liquidoAno >= 0 ? 'text-white' : 'text-risk-high'}`}>
                  {brl(r.liquidoAno)}
                </div>
                <div className="text-xs text-slate-500">economia - custo total</div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 40 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="nome" tickLine={false} axisLine={false} width={90} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => brl(v)} />
                <Bar dataKey="valor" radius={[0, 6, 6, 0]} barSize={30}>
                  {chartData.map((d) => (
                    <Cell key={d.nome} fill={d.cor} />
                  ))}
                  <LabelList dataKey="valor" position="right" formatter={(v: number) => brl(v)} fill="#e2e8f0" fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Custo medio por afastamento ({brl(roiBase.custoAfastamentoMedio)}) inclui INSS, reposicao e perda de
          produtividade. Valores ilustrativos para o pitch.
        </p>
      </section>
    </div>
  )
}
