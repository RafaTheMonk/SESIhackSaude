// =============================================================
//  DADOS MOCKADOS - VigIA (painel de pitch, SESI Hack Saude)
//  Todos os numeros sao ficticios e servem apenas para demonstracao.
// =============================================================

export type Nivel = 'baixo' | 'medio' | 'alto'

export const PRODUTO = {
  nome: 'CorporAI',
  tagline: 'Olhando seu corpo',
  descricao:
    'Ecossistema SaaS integrado a hardware de visao computacional para monitoramento inteligente de trabalhadores, prevencao de doencas ocupacionais, mitigacao de riscos e apoio a medicina do trabalho.',
  empresaDemo: 'Metalurgica Horizonte Ltda.',
  setorDemo: 'Industria metal-mecanica - 3 unidades / BA',
}

// -------------------------------------------------------------
//  PORTAL DO TRABALHADOR (analise em primeira pessoa)
// -------------------------------------------------------------

export const trabalhador = {
  nome: 'Joana Ribeiro',
  iniciais: 'JR',
  matricula: 'MH-04821',
  funcao: 'Operadora de solda',
  setor: 'Linha de montagem B',
  turno: 'Turno 1 (06h-14h)',

  scoreHoje: 78, // indice de bem-estar ergonomico 0-100
  scoreOntem: 71,
  metaScore: 85,

  // evolucao do indice nos ultimos 14 dias
  scoreTrend: [
    { dia: '16/07', score: 64 },
    { dia: '17/07', score: 62 },
    { dia: '18/07', score: 68 },
    { dia: '19/07', score: 66 },
    { dia: '22/07', score: 70 },
    { dia: '23/07', score: 69 },
    { dia: '24/07', score: 73 },
    { dia: '25/07', score: 72 },
    { dia: '26/07', score: 75 },
    { dia: '29/07', score: 71 },
    { dia: '30/07', score: 78 },
  ],

  // qualidade postural ao longo do turno (0-100)
  posturaTurno: [
    { hora: '06h', postura: 88, alertas: 0 },
    { hora: '07h', postura: 84, alertas: 0 },
    { hora: '08h', postura: 76, alertas: 1 },
    { hora: '09h', postura: 71, alertas: 1 },
    { hora: '10h', postura: 62, alertas: 2 },
    { hora: '11h', postura: 58, alertas: 3 },
    { hora: '12h', postura: 80, alertas: 0 },
    { hora: '13h', postura: 74, alertas: 1 },
  ],

  // fatores de risco individuais (radar) - quanto maior, pior
  fatoresRisco: [
    { fator: 'Postura', valor: 62 },
    { fator: 'Repetitividade', valor: 74 },
    { fator: 'Pausas', valor: 40 },
    { fator: 'Hidratacao', valor: 35 },
    { fator: 'Ruido', valor: 58 },
    { fator: 'Esforco', valor: 66 },
  ],

  pausas: { realizadas: 3, recomendadas: 5 },
  ppe: { conforme: 96 }, // % do tempo com EPI correto
  repeticoes: 4820, // movimentos repetitivos contabilizados no turno
  hidratacaoMl: 900,
  metaHidratacaoMl: 2000,

  gamificacao: {
    pontos: 1240,
    nivel: 'Prata',
    sequenciaDias: 6,
    conquistas: ['Semana sem alerta grave', 'Pausas em dia (4/5)', 'Hidratacao +20%'],
  },

  alertasHoje: [
    { hora: '11h12', tipo: 'Postura', sev: 'alto' as Nivel, msg: 'Flexao de tronco > 60 por 4min. Ajuste a altura da bancada.' },
    { hora: '10h35', tipo: 'Repetitividade', sev: 'medio' as Nivel, msg: 'Ciclo repetitivo acima do limite. Sugerida micro-pausa.' },
    { hora: '09h48', tipo: 'Pausa', sev: 'baixo' as Nivel, msg: 'Pausa recomendada nao realizada no horario.' },
  ],

  recomendacoes: [
    'Faca a micro-pausa das 14h - alongamento de punho e ombro (2 min).',
    'Eleve a bancada em ~8 cm para reduzir a flexao de tronco.',
    'Voce bebeu 45% da meta de agua. Proxima dose sugerida: 13h30.',
  ],

  privacidade:
    'A camera processa apenas esqueleto e postura (sem gravar rosto ou audio). Seus dados individuais so aparecem para voce e para o medico do trabalho.',
}

// -------------------------------------------------------------
//  PORTAL DA EMPRESA (analise em terceira pessoa)
// -------------------------------------------------------------

export const empresa = {
  kpis: {
    trabalhadores: 342,
    monitorados: 318,
    alertasAtivos: 27,
    riscoMedio: 41, // 0-100
    conformidadeNR: 87, // %
    incidentesEvitados: 14, // no mes
    absenteismo: 3.1, // %
    roiMes: 4.2, // x sobre o investimento
  },

  // distribuicao de trabalhadores por nivel de risco
  distribuicaoRisco: [
    { nivel: 'Baixo', qtd: 214, cor: 'var(--color-risk-low)' },
    { nivel: 'Medio', qtd: 78, cor: 'var(--color-risk-mid)' },
    { nivel: 'Alto', qtd: 26, cor: 'var(--color-risk-high)' },
  ],

  setores: [
    { setor: 'Solda', headcount: 58, risco: 68, nivel: 'alto' as Nivel, alertas: 9 },
    { setor: 'Montagem A', headcount: 74, risco: 52, nivel: 'medio' as Nivel, alertas: 6 },
    { setor: 'Montagem B', headcount: 66, risco: 47, nivel: 'medio' as Nivel, alertas: 5 },
    { setor: 'Usinagem', headcount: 41, risco: 58, nivel: 'medio' as Nivel, alertas: 4 },
    { setor: 'Expedicao', headcount: 39, risco: 33, nivel: 'baixo' as Nivel, alertas: 2 },
    { setor: 'Pintura', headcount: 40, risco: 29, nivel: 'baixo' as Nivel, alertas: 1 },
  ],

  // afastamentos x incidentes evitados nos ultimos 8 meses
  tendencia: [
    { mes: 'Dez', afastamentos: 12, evitados: 3 },
    { mes: 'Jan', afastamentos: 11, evitados: 5 },
    { mes: 'Fev', afastamentos: 13, evitados: 6 },
    { mes: 'Mar', afastamentos: 10, evitados: 8 },
    { mes: 'Abr', afastamentos: 8, evitados: 9 },
    { mes: 'Mai', afastamentos: 7, evitados: 11 },
    { mes: 'Jun', afastamentos: 6, evitados: 12 },
    { mes: 'Jul', afastamentos: 5, evitados: 14 },
  ],

  // conformidade por Norma Regulamentadora
  normas: [
    { nr: 'NR-17', nome: 'Ergonomia', conformidade: 82 },
    { nr: 'NR-06', nome: 'EPI', conformidade: 94 },
    { nr: 'NR-12', nome: 'Maquinas', conformidade: 89 },
    { nr: 'NR-15', nome: 'Insalubridade', conformidade: 78 },
    { nr: 'NR-01', nome: 'GRO / PGR', conformidade: 91 },
  ],

  // feed de alertas em tempo (quase) real
  feed: [
    { hora: '13h58', setor: 'Solda', worker: 'C. Andrade', tipo: 'EPI ausente', sev: 'alto' as Nivel, detalhe: 'Sem oculos de protecao detectado por 90s' },
    { hora: '13h51', setor: 'Usinagem', worker: 'R. Lima', tipo: 'Postura', sev: 'medio' as Nivel, detalhe: 'Rotacao de tronco repetida acima do limite' },
    { hora: '13h44', setor: 'Montagem A', worker: 'P. Souza', tipo: 'Zona de risco', sev: 'alto' as Nivel, detalhe: 'Mao na zona de prensa com protecao aberta' },
    { hora: '13h30', setor: 'Montagem B', worker: 'J. Ribeiro', tipo: 'Repetitividade', sev: 'medio' as Nivel, detalhe: 'Ciclo repetitivo 18% acima do recomendado' },
    { hora: '13h12', setor: 'Solda', worker: 'M. Farias', tipo: 'Pausa', sev: 'baixo' as Nivel, detalhe: 'Pausa NR-17 nao realizada' },
    { hora: '12h55', setor: 'Expedicao', worker: 'A. Nunes', tipo: 'Levantamento', sev: 'medio' as Nivel, detalhe: 'Carga > 23kg levantada sem flexao de joelho' },
  ],

  // deteccoes da camera (mock do feed de visao computacional)
  camera: {
    unidade: 'Unidade Simoes Filho - Galpao 2',
    fps: 24,
    deteccoesMin: 312,
    caixas: [
      { id: 1, label: 'Postura OK', sev: 'baixo' as Nivel, x: 12, y: 22, w: 20, h: 46 },
      { id: 2, label: 'Flexao tronco', sev: 'alto' as Nivel, x: 46, y: 30, w: 22, h: 44 },
      { id: 3, label: 'Sem oculos', sev: 'medio' as Nivel, x: 74, y: 26, w: 18, h: 40 },
    ],
  },

  // medicina do trabalho
  medicina: {
    asoEmDia: 296,
    asoTotal: 342,
    examesVencendo30d: 18,
    afastamentosAtivos: 5,
    diasPerdidosMes: 41,
    diasPerdidosAnterior: 63,
    cids: [
      { cid: 'M54', nome: 'Dorsalgia / lombalgia', casos: 9 },
      { cid: 'M75', nome: 'Lesao no ombro', casos: 5 },
      { cid: 'G56', nome: 'Sind. tunel do carpo', casos: 4 },
      { cid: 'H83', nome: 'PAIR (ruido)', casos: 3 },
    ],
  },

  // lista de trabalhadores (amostra)
  trabalhadores: [
    { nome: 'Joana Ribeiro', setor: 'Montagem B', score: 78, risco: 'medio' as Nivel, tendencia: 'up', ultimo: 'Repetitividade' },
    { nome: 'Carlos Andrade', setor: 'Solda', score: 54, risco: 'alto' as Nivel, tendencia: 'down', ultimo: 'EPI ausente' },
    { nome: 'Rita Lima', setor: 'Usinagem', score: 61, risco: 'medio' as Nivel, tendencia: 'flat', ultimo: 'Postura' },
    { nome: 'Paulo Souza', setor: 'Montagem A', score: 49, risco: 'alto' as Nivel, tendencia: 'down', ultimo: 'Zona de risco' },
    { nome: 'Marcos Farias', setor: 'Solda', score: 66, risco: 'medio' as Nivel, tendencia: 'up', ultimo: 'Pausa' },
    { nome: 'Ana Nunes', setor: 'Expedicao', score: 83, risco: 'baixo' as Nivel, tendencia: 'up', ultimo: 'Levantamento' },
    { nome: 'Diego Alves', setor: 'Pintura', score: 88, risco: 'baixo' as Nivel, tendencia: 'flat', ultimo: '-' },
    { nome: 'Bruna Teles', setor: 'Montagem B', score: 72, risco: 'medio' as Nivel, tendencia: 'up', ultimo: 'Postura' },
  ],
}

// -------------------------------------------------------------
//  PRECIFICACAO (SaaS + Camera)
// -------------------------------------------------------------

export const planos = [
  {
    nome: 'Essencial',
    alvo: 'PME / piloto',
    precoPorTrab: 18,
    minTrab: 20,
    destaque: false,
    inclui: [
      'Portal do trabalhador (app)',
      'Portal da empresa (dashboard)',
      'Ate 1 camera por setor',
      'Alertas de postura e EPI',
      'Relatorios NR-17 basicos',
      'Suporte por e-mail',
    ],
  },
  {
    nome: 'Profissional',
    alvo: 'Industria media',
    precoPorTrab: 32,
    minTrab: 50,
    destaque: true,
    inclui: [
      'Tudo do Essencial',
      'Cameras ilimitadas por unidade',
      'Analise de zona de risco (NR-12)',
      'Modulo medicina do trabalho (ASO/CID)',
      'Integracao eSocial / PGR',
      'Painel de ROI e absenteismo',
      'Suporte prioritario',
    ],
  },
  {
    nome: 'Enterprise',
    alvo: 'Multi-unidade',
    precoPorTrab: 26,
    minTrab: 300,
    destaque: false,
    inclui: [
      'Tudo do Profissional',
      'Multi-planta consolidado',
      'API e data lake dedicado',
      'IA preditiva de afastamento',
      'SLA 99,9% + gerente de conta',
      'On-premise opcional',
    ],
  },
]

export const camera = {
  modeloNome: 'CorporAI Cam Edge',
  precoVendaUnit: 1290, // preco de venda ao cliente (BRL)
  custoBOM: 612, // custo estimado de fabricacao (BRL)
  aluguelMes: 79, // opcao CaaS (camera as a service) por mes
  cobertura: 'Ate ~120 m2 / 8-12 postos por camera',
  garantia: '24 meses',
}

// simulacao de ROI (valores base para a calculadora)
export const roiBase = {
  custoAfastamentoMedio: 8200, // BRL por afastamento (INSS + reposicao + produtividade)
  afastamentosAno: 96,
  reducaoEsperada: 0.35, // 35% de reducao
}

// -------------------------------------------------------------
//  HARDWARE - materiais e viabilidade (precos BR, jul/2026 aprox.)
// -------------------------------------------------------------

export type Item = {
  item: string
  spec: string
  qtd: number
  precoUnit: number
  fonte: string
}

// Opcao recomendada para o piloto do hackathon: Raspberry Pi + camera
export const bomPiloto: Item[] = [
  { item: 'Raspberry Pi 4 (4GB)', spec: 'SBC quad-core, roda modelo de pose', qtd: 1, precoUnit: 520, fonte: 'Mercado Livre / Robocore' },
  { item: 'Camera IMX219 8MP', spec: 'Modulo CSI grande angular', qtd: 1, precoUnit: 95, fonte: 'Mercado Livre' },
  { item: 'Cartao microSD 32GB', spec: 'Classe 10 / A1', qtd: 1, precoUnit: 38, fonte: 'Kabum' },
  { item: 'Fonte 5V 3A USB-C', spec: 'Oficial / com chave', qtd: 1, precoUnit: 55, fonte: 'Robocore' },
  { item: 'Coral USB Accelerator', spec: 'TPU p/ inferencia (opcional)', qtd: 1, precoUnit: 420, fonte: 'Importado / revenda' },
  { item: 'Case + dissipador', spec: 'Gabinete ventilado industrial', qtd: 1, precoUnit: 60, fonte: 'Mercado Livre' },
  { item: 'Suporte / fixacao', spec: 'Bracket de teto ajustavel', qtd: 1, precoUnit: 45, fonte: 'Loja de CFTV' },
  { item: 'Cabo + conectores', spec: 'Rede PoE / energia', qtd: 1, precoUnit: 40, fonte: 'Loja local' },
]

// Opcao de baixo custo (prova de conceito)
export const bomBudget: Item[] = [
  { item: 'ESP32-CAM', spec: 'MCU + camera OV2640', qtd: 1, precoUnit: 42, fonte: 'Mercado Livre' },
  { item: 'Placa gravadora FTDI', spec: 'USB-serial p/ flash', qtd: 1, precoUnit: 25, fonte: 'Mercado Livre' },
  { item: 'Fonte 5V 2A', spec: 'Alimentacao', qtd: 1, precoUnit: 30, fonte: 'Loja local' },
  { item: 'Case impresso 3D', spec: 'PLA, projeto aberto', qtd: 1, precoUnit: 18, fonte: 'Impressao propria' },
  { item: 'Suporte simples', spec: 'Bracket de parede', qtd: 1, precoUnit: 25, fonte: 'Loja local' },
]

// Opcao pro (produto final, borda mais robusta)
export const bomPro: Item[] = [
  { item: 'NVIDIA Jetson Orin Nano', spec: 'Borda com GPU p/ visao', qtd: 1, precoUnit: 2400, fonte: 'Revenda BR / importado' },
  { item: 'Camera IMX477 12MP', spec: 'Sensor de alta qualidade', qtd: 1, precoUnit: 320, fonte: 'Revenda' },
  { item: 'SSD NVMe 128GB', spec: 'Buffer de video local', qtd: 1, precoUnit: 190, fonte: 'Kabum' },
  { item: 'Gabinete IP54 industrial', spec: 'Vedado contra po/umidade', qtd: 1, precoUnit: 280, fonte: 'Loja industrial' },
  { item: 'Fonte + PoE injector', spec: 'Alimentacao robusta', qtd: 1, precoUnit: 160, fonte: 'Loja de rede' },
  { item: 'Modulo Wi-Fi/4G', spec: 'Conectividade redundante', qtd: 1, precoUnit: 210, fonte: 'Revenda' },
  { item: 'Suporte industrial', spec: 'Bracket articulado', qtd: 1, precoUnit: 120, fonte: 'Loja de CFTV' },
]

export const buildOptions = [
  {
    id: 'budget',
    nome: 'Prova de conceito',
    base: 'ESP32-CAM',
    ideal: 'Demo de hackathon, validar deteccao',
    bom: bomBudget,
    prosCons: {
      pros: ['Custo minimo', 'Facil de replicar', 'Baixo consumo'],
      cons: ['Processa na nuvem', 'Resolucao limitada', 'Sem borda pesada'],
    },
  },
  {
    id: 'piloto',
    nome: 'Piloto recomendado',
    base: 'Raspberry Pi 4 + TPU',
    ideal: 'Piloto real em 1-2 setores',
    bom: bomPiloto,
    prosCons: {
      pros: ['Inferencia na borda (privacidade)', 'Custo/beneficio', 'Ecossistema maduro'],
      cons: ['Precisa dissipacao', 'Coral importado'],
    },
  },
  {
    id: 'pro',
    nome: 'Produto final',
    base: 'Jetson Orin Nano',
    ideal: 'Escala industrial, multi-postos',
    bom: bomPro,
    prosCons: {
      pros: ['Alta capacidade de IA', 'Robusto (IP54)', 'Multi-stream'],
      cons: ['Custo elevado', 'Importacao'],
    },
  },
]

export const somaBom = (bom: Item[]) => bom.reduce((acc, i) => acc + i.precoUnit * i.qtd, 0)

// -------------------------------------------------------------
//  Como funciona (pipeline do produto)
// -------------------------------------------------------------

export const comoFunciona = [
  {
    passo: '1. Captura',
    titulo: 'Camera de borda',
    texto: 'Camera com visao computacional observa o posto de trabalho e extrai apenas o esqueleto (pose), sem gravar rosto ou audio.',
  },
  {
    passo: '2. Analise na borda',
    titulo: 'IA local (edge)',
    texto: 'Modelos de pose e deteccao rodam no proprio dispositivo, classificando postura, EPI, repetitividade e zonas de risco em tempo real.',
  },
  {
    passo: '3. Nuvem SaaS',
    titulo: 'Plataforma CorporAI',
    texto: 'Eventos sao agregados na nuvem, cruzados com NRs e historico de saude, gerando indices individuais e coletivos.',
  },
  {
    passo: '4. Acao',
    titulo: 'Trabalhador + Empresa + SESMT',
    texto: 'Trabalhador recebe orientacoes em 1a pessoa; empresa e medicina do trabalho agem em 3a pessoa para prevenir e mitigar riscos.',
  },
]

export const diferenciais = [
  { titulo: 'Primeira + terceira pessoa', texto: 'O mesmo dado serve o autocuidado do trabalhador e a gestao de risco da empresa.' },
  { titulo: 'Privacidade por design', texto: 'Processa esqueleto/pose na borda. Sem rosto, sem audio, LGPD-friendly.' },
  { titulo: 'Aderente as NRs', texto: 'Relatorios prontos para NR-17, NR-06, NR-12 e PGR (NR-01).' },
  { titulo: 'Preventivo, nao punitivo', texto: 'Foco em corrigir o ambiente e o habito antes do afastamento.' },
]
