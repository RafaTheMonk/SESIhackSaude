# CorporAI - Olhando seu corpo

Painel de demonstracao (pitch) para o **SESI Hack Saude 2026**.

CorporAI e um **ecossistema SaaS integrado a hardware de visao computacional** para
monitoramento inteligente de trabalhadores, com analise em **primeira e terceira pessoa**
para prevencao de doencas ocupacionais, mitigacao de riscos e apoio a medicina do trabalho.

> Todos os dados exibidos sao **ficticios** e servem apenas para a demonstracao do produto.

## O que tem no painel

| Tela | Descricao |
|------|-----------|
| **Visao geral** | Pitch do produto: proposta de valor, como funciona (captura -> IA na borda -> nuvem -> acao) e diferenciais. |
| **Portal do trabalhador** | Analise em **1a pessoa**: indice de bem-estar, alertas de postura, pausas, hidratacao, gamificacao e recomendacoes. Privacidade por design. |
| **Portal da empresa** | Analise em **3a pessoa**: risco por setor, alertas em tempo real, camera com visao computacional, conformidade com NRs e modulo de medicina do trabalho. |
| **Precificacao** | Planos SaaS (por trabalhador/mes) + camera (compra ou aluguel/CaaS) e uma **calculadora de ROI** interativa. |
| **Hardware** | Como construir a camera com **componentes disponiveis no Brasil**: lista de materiais (BOM), custo por opcao e viabilidade. |

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Recharts (graficos)
- lucide-react (icones)

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Build de producao

```bash
npm run build
npm run preview
```

## Deploy no GitHub Pages

O projeto ja vem configurado (`base` = `/SESIhackSaude/` no `vite.config.ts`).

**Opcao A - automatico (GitHub Actions):** faca push na branch `main`. O workflow em
`.github/workflows/deploy.yml` builda e publica. Em *Settings > Pages*, defina
**Source = GitHub Actions**.

**Opcao B - manual:**

```bash
npm run deploy
```

Depois a URL fica em: `https://rafathemonk.github.io/SESIhackSaude/`

## Estrutura

```
src/
  data/mock.ts        # todos os dados mockados (numeros ficticios)
  lib/format.ts       # formatacao BRL, %, cores de risco
  components/         # Layout, StatCard, RiskBadge, PageHeader
  pages/             # Home, Trabalhador, Empresa, Precificacao, Hardware
```
