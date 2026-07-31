import { useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Tooltip, LabelList } from 'recharts'
import { Cpu, ShoppingCart, Check, X, Wrench, TrendingUp, MapPin, Boxes } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { buildOptions, somaBom, camera } from '../data/mock'
import { brl } from '../lib/format'

const tooltipStyle = {
  background: '#0f172a',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 12,
  color: '#e2e8f0',
  fontSize: 12,
}

const montagem = [
  'Fixar a camera no teto/parede cobrindo o posto (angulo ~30 da vertical).',
  'Ligar energia (PoE ou fonte) e conectar a rede local da fabrica.',
  'Flashear o firmware CorporAI e parear com a plataforma via QR.',
  'Calibrar a area de interesse (postos, zona de risco) pelo painel web.',
  'Rodar o modelo de pose na borda - so metadados sobem para a nuvem.',
]

export default function Hardware() {
  const [sel, setSel] = useState('piloto')
  const opt = buildOptions.find((o) => o.id === sel)!
  const total = somaBom(opt.bom)

  const comparativo = buildOptions.map((o) => ({
    nome: o.nome,
    total: somaBom(o.bom),
    cor: o.id === sel ? 'var(--color-brand-400)' : 'var(--color-ink-600)',
  }))

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Viabilidade tecnica"
        titulo="Hardware - a camera de borda"
        subtitulo="Como construir a camera com componentes disponiveis no Brasil. Tres niveis: prova de conceito, piloto e produto final."
      />

      {/* seletor de build */}
      <div className="grid gap-4 md:grid-cols-3">
        {buildOptions.map((o) => {
          const t = somaBom(o.bom)
          const ativo = o.id === sel
          return (
            <button
              key={o.id}
              onClick={() => setSel(o.id)}
              className={`card card-pad text-left transition ${
                ativo ? 'ring-2 ring-brand-500/60' : 'hover:bg-ink-800/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 text-brand-400">
                  <Cpu className="h-5 w-5" />
                </span>
                {ativo && <span className="pill bg-brand-500/15 text-brand-300">Selecionado</span>}
              </div>
              <div className="mt-3 font-semibold text-white">{o.nome}</div>
              <div className="text-xs text-slate-400">{o.base}</div>
              <div className="mt-3 text-2xl font-bold text-white">{brl(t)}</div>
              <div className="text-xs text-slate-500">custo de materiais / unidade</div>
              <div className="mt-2 text-xs text-slate-400">{o.ideal}</div>
            </button>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* BOM */}
        <div className="card overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between border-b border-white/5 p-5">
            <div className="flex items-center gap-2">
              <Boxes className="h-5 w-5 text-brand-400" />
              <h3 className="font-semibold text-white">Lista de materiais - {opt.nome}</h3>
            </div>
            <span className="text-xs text-slate-400">base: {opt.base}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-slate-500">
                <tr className="border-b border-white/5">
                  <th className="px-5 py-3 font-medium">Item</th>
                  <th className="px-5 py-3 font-medium">Especificacao</th>
                  <th className="px-5 py-3 text-center font-medium">Qtd</th>
                  <th className="px-5 py-3 text-right font-medium">Preco</th>
                  <th className="px-5 py-3 font-medium">Onde comprar</th>
                </tr>
              </thead>
              <tbody>
                {opt.bom.map((i) => (
                  <tr key={i.item} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-3 font-medium text-white">{i.item}</td>
                    <td className="px-5 py-3 text-slate-400">{i.spec}</td>
                    <td className="px-5 py-3 text-center text-slate-300">{i.qtd}</td>
                    <td className="px-5 py-3 text-right font-semibold text-white">{brl(i.precoUnit * i.qtd)}</td>
                    <td className="px-5 py-3 text-xs text-slate-500">{i.fonte}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-white/[0.03]">
                  <td colSpan={3} className="px-5 py-3 font-semibold text-white">
                    Custo total de materiais
                  </td>
                  <td className="px-5 py-3 text-right text-lg font-bold text-brand-400">{brl(total)}</td>
                  <td className="px-5 py-3 text-xs text-slate-500">por unidade</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* pros/cons + comparativo */}
        <div className="space-y-6">
          <div className="card card-pad">
            <h3 className="font-semibold text-white">Trade-offs</h3>
            <div className="mt-3 space-y-2">
              {opt.prosCons.pros.map((p) => (
                <div key={p} className="flex items-start gap-2 text-sm text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-risk-low" /> {p}
                </div>
              ))}
              {opt.prosCons.cons.map((c) => (
                <div key={c} className="flex items-start gap-2 text-sm text-slate-400">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-risk-high" /> {c}
                </div>
              ))}
            </div>
          </div>

          <div className="card card-pad">
            <h3 className="font-semibold text-white">Comparativo de custo</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={comparativo} margin={{ top: 16, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="nome" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => brl(v)} />
                <Bar dataKey="total" radius={[6, 6, 0, 0]} barSize={44}>
                  {comparativo.map((d) => (
                    <Cell key={d.nome} fill={d.cor} />
                  ))}
                  <LabelList dataKey="total" position="top" formatter={(v: number) => brl(v)} fill="#94a3b8" fontSize={10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* margem / precificacao */}
      <section className="card card-pad">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-brand-400" />
          <h3 className="font-semibold text-white">Da BOM ao preco de venda</h3>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/5 bg-ink-900/50 p-4">
            <div className="text-xs text-slate-400">Custo de materiais (piloto)</div>
            <div className="mt-1 text-2xl font-bold text-white">{brl(somaBom(buildOptions[1].bom))}</div>
          </div>
          <div className="rounded-xl border border-white/5 bg-ink-900/50 p-4">
            <div className="text-xs text-slate-400">+ Montagem, teste e IA</div>
            <div className="mt-1 text-2xl font-bold text-white">~{brl(camera.custoBOM - somaBom(buildOptions[1].bom) > 0 ? camera.custoBOM - somaBom(buildOptions[1].bom) : 90)}</div>
          </div>
          <div className="rounded-xl border border-white/5 bg-ink-900/50 p-4">
            <div className="text-xs text-slate-400">Custo total estimado</div>
            <div className="mt-1 text-2xl font-bold text-white">{brl(camera.custoBOM)}</div>
          </div>
          <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
            <div className="text-xs text-slate-400">Preco de venda</div>
            <div className="mt-1 text-2xl font-bold text-brand-400">{brl(camera.precoVendaUnit)}</div>
            <div className="text-xs text-slate-500">
              ou {brl(camera.aluguelMes)}/mes (CaaS)
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          A margem cobre suporte, atualizacoes do modelo de IA, troca em garantia ({camera.garantia}) e
          o custo do SaaS de borda. Escala reduz o custo unitario da camera.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* montagem */}
        <div className="card card-pad">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-brand-400" />
            <h3 className="font-semibold text-white">Como montar (piloto)</h3>
          </div>
          <ol className="mt-4 space-y-3">
            {montagem.map((m, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-xs font-bold text-brand-400">
                  {i + 1}
                </span>
                {m}
              </li>
            ))}
          </ol>
        </div>

        {/* onde comprar / viabilidade */}
        <div className="card card-pad">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-brand-400" />
            <h3 className="font-semibold text-white">Onde comprar no Brasil</h3>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            {[
              { loja: 'Mercado Livre', o: 'Raspberry Pi, ESP32-CAM, modulos de camera, cases' },
              { loja: 'Robocore / FilipeFlop', o: 'SBCs, sensores, fontes - foco em maker/robotica' },
              { loja: 'Kabum / Pichau', o: 'Armazenamento, SSD, cartoes, perifericos' },
              { loja: 'Lojas de CFTV', o: 'Suportes, cabos PoE, gabinetes industriais' },
            ].map((f) => (
              <div key={f.loja} className="flex items-start gap-3 rounded-lg bg-white/[0.03] p-3">
                <ShoppingCart className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <div>
                  <div className="font-medium text-white">{f.loja}</div>
                  <div className="text-xs text-slate-400">{f.o}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 rounded-lg bg-brand-500/5 p-3 text-xs text-slate-400 ring-1 ring-brand-500/10">
            Viavel para o hackathon: a prova de conceito com ESP32-CAM sai por menos de {brl(somaBom(buildOptions[0].bom))}
            {' '}e ja demonstra deteccao de postura e EPI.
          </p>
        </div>
      </div>
    </div>
  )
}
