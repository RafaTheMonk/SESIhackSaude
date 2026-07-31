import { NavLink, Outlet } from 'react-router-dom'
import { ShieldCheck, Home, User, Building2, Tag, Cpu } from 'lucide-react'

const nav = [
  { to: '/', label: 'Visao geral', icon: Home, end: true },
  { to: '/trabalhador', label: 'Trabalhador', icon: User },
  { to: '/empresa', label: 'Empresa', icon: Building2 },
  { to: '/precificacao', label: 'Precificacao', icon: Tag },
  { to: '/hardware', label: 'Hardware', icon: Cpu },
]

export default function Layout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <NavLink to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500/15 text-brand-400 ring-1 ring-brand-500/30">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="text-[15px] font-bold text-white">
                Corpor<span className="text-brand-400">AI</span>
              </div>
              <div className="hidden text-[10px] uppercase tracking-wider text-slate-500 sm:block">
                Olhando seu corpo
              </div>
            </div>
          </NavLink>

          <nav className="ml-2 hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-white/5 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`
                }
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-400 ring-1 ring-amber-500/20 sm:inline">
              Demo - dados mockados
            </span>
          </div>
        </div>

        {/* nav mobile */}
        <nav className="flex items-center gap-1 overflow-x-auto border-t border-white/5 px-3 py-2 md:hidden">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  isActive ? 'bg-white/5 text-white' : 'text-slate-400'
                }`
              }
            >
              <n.icon className="h-3.5 w-3.5" />
              {n.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-slate-500 sm:px-6">
          CorporAI - painel de demonstracao (pitch) - SESI Hack Saude 2026. Dados ficticios.
        </div>
      </footer>
    </div>
  )
}
