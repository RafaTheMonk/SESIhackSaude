import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  User,
  Building2,
  ArrowRight,
  Camera,
  Cpu,
  Cloud,
  Activity,
  HeartPulse,
  Lock,
  FileCheck,
  TrendingDown,
} from 'lucide-react'
import { PRODUTO, comoFunciona, diferenciais, empresa } from '../data/mock'
import { num } from '../lib/format'

const passoIcons = [Camera, Cpu, Cloud, Activity]
const difIcons = [Activity, Lock, FileCheck, HeartPulse]

export default function Home() {
  return (
    <div className="space-y-14">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-ink-850 to-ink-900 px-6 py-12 sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <span className="pill bg-brand-500/10 text-brand-300 ring-1 ring-brand-500/20">
            <ShieldCheck className="h-3.5 w-3.5" /> SaaS + Hardware de visao computacional
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Corpor<span className="text-brand-400">AI</span>
            <span className="block text-2xl font-semibold text-slate-300 sm:text-3xl">
              {PRODUTO.tagline}
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-400">{PRODUTO.descricao}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/trabalhador"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-brand-400"
            >
              <User className="h-4 w-4" /> Portal do trabalhador
            </Link>
            <Link
              to="/empresa"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Building2 className="h-4 w-4" /> Portal da empresa
            </Link>
          </div>

          <div className="mt-6 text-xs text-slate-500">
            Cenario demo: <span className="text-slate-300">{PRODUTO.empresaDemo}</span> - {PRODUTO.setorDemo}
          </div>
        </div>
      </section>

      {/* IMPACTO */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { icon: User, v: `${num(empresa.kpis.monitorados)}`, l: 'Trabalhadores monitorados' },
          { icon: ShieldCheck, v: `${empresa.kpis.incidentesEvitados}`, l: 'Incidentes evitados no mes' },
          { icon: TrendingDown, v: '-35%', l: 'Dias perdidos (proj. 12m)' },
          { icon: HeartPulse, v: `${empresa.kpis.conformidadeNR}%`, l: 'Conformidade com NRs' },
        ].map((s) => (
          <div key={s.l} className="card card-pad">
            <s.icon className="h-5 w-5 text-brand-400" />
            <div className="mt-3 text-3xl font-bold text-white">{s.v}</div>
            <div className="mt-1 text-sm text-slate-400">{s.l}</div>
          </div>
        ))}
      </section>

      {/* COMO FUNCIONA */}
      <section>
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand-400">O ecossistema</div>
          <h2 className="mt-1 text-2xl font-bold text-white">Como funciona</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">
            Do posto de trabalho a decisao clinica: captura na borda, IA local, plataforma na nuvem e acao.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {comoFunciona.map((p, i) => {
            const Icon = passoIcons[i]
            return (
              <div key={p.passo} className="card card-pad relative">
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 text-brand-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-4xl font-bold text-white/5">{i + 1}</span>
                </div>
                <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-400">
                  {p.passo}
                </div>
                <div className="mt-0.5 font-semibold text-white">{p.titulo}</div>
                <p className="mt-1.5 text-sm text-slate-400">{p.texto}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* DOIS PORTAIS */}
      <section className="grid gap-4 lg:grid-cols-2">
        <Link
          to="/trabalhador"
          className="card card-pad group transition hover:border-brand-500/30 hover:bg-ink-800/70"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-400">
              <User className="h-5 w-5" />
            </span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-brand-400">
                Primeira pessoa
              </div>
              <div className="text-lg font-bold text-white">Portal do trabalhador</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Autocuidado: indice de bem-estar, alertas de postura, pausas, hidratacao e recomendacoes -
            com privacidade garantida.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-400">
            Abrir portal <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          to="/empresa"
          className="card card-pad group transition hover:border-brand-500/30 hover:bg-ink-800/70"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-500/10 text-sky-400">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                Terceira pessoa
              </div>
              <div className="text-lg font-bold text-white">Portal da empresa</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Gestao de risco: mapa por setor, alertas em tempo real, conformidade com NRs, ROI e modulo de
            medicina do trabalho.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-400">
            Abrir portal <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>
      </section>

      {/* DIFERENCIAIS */}
      <section>
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand-400">Por que VigIA</div>
          <h2 className="mt-1 text-2xl font-bold text-white">Diferenciais</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {diferenciais.map((d, i) => {
            const Icon = difIcons[i]
            return (
              <div key={d.titulo} className="card card-pad">
                <Icon className="h-5 w-5 text-brand-400" />
                <div className="mt-3 font-semibold text-white">{d.titulo}</div>
                <p className="mt-1 text-sm text-slate-400">{d.texto}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA final */}
      <section className="card card-pad flex flex-col items-center gap-4 bg-gradient-to-br from-ink-850 to-ink-900 py-10 text-center">
        <h2 className="text-2xl font-bold text-white">Modelo comercial viavel para o hackathon</h2>
        <p className="max-w-2xl text-sm text-slate-400">
          SaaS por trabalhador/mes + camera de borda montada com componentes disponiveis no Brasil.
          Veja a precificacao e a lista de materiais.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/precificacao"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-brand-400"
          >
            Ver precificacao <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/hardware"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Cpu className="h-4 w-4" /> Lista de materiais (BR)
          </Link>
        </div>
      </section>
    </div>
  )
}
