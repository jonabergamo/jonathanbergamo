import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    id: "natoora",
    company: "Natoora",
    url: "https://natoora.com",
    location: {
      en: "London, UK · remote",
      pt: "Londres, Reino Unido · remoto",
    },
    role: {
      en: "Full-Stack Software Engineer",
      pt: "Engenheiro de Software Full-Stack",
    },
    start: "2025-02",
    end: null,
    summary: {
      en: "Fresh-produce distribution platform: a Django/DRF wholesale ERP, Django microservices and React Native/Expo ordering apps across London, Paris, New York, Miami, Melbourne and Copenhagen.",
      pt: "Plataforma de distribuição de produtos frescos: ERP de atacado em Django/DRF, microsserviços Django e apps de pedidos em React Native/Expo em Londres, Paris, Nova York, Miami, Melbourne e Copenhague.",
    },
    bullets: {
      en: [
        "Owned the AngularJS-to-React migrations of the Customer Details and Transport tabs end to end, backend included, and co-designed the /v2 REST pattern the wider team adopted.",
        "Led the Global Search microfrontend (one search bar across customers, orders and purchase orders) and the Switch Accounts project spanning the Customers microservice, Django backend and React Native app.",
        "Shipped the Pro app to the web with React Native for Web and drove Expo SDK upgrades from 26 to 57 across both apps and shared libraries.",
        "Resolved 64 production incidents, including a broken price-band sync showing wrong prices to customers, fixed with detection and repair scripts run across regions.",
        "Built the team's CI gates in GitHub Actions: CVE audits blocking high and critical advisories, TypeScript type-checking, and a check that PRs ship their migrations.",
        "Root-caused a 130-test backend suite failure to Python 3.14 changing multiprocessing to forkserver, and profiled the 37-minute CI job to recover 15 minutes per run.",
        "Wrote the technical discoveries and specs that defined other engineers' tickets, mentored a new backend engineer, and built an internal on-call and PR-review platform the whole tech team adopted.",
      ],
      pt: [
        "Dono das migrações de AngularJS para React das abas Customer Details e Transport de ponta a ponta, incluindo backend, e co-autor do padrão REST /v2 adotado pelo time.",
        "Liderei o microfrontend de Busca Global (uma barra de busca para clientes, pedidos e ordens de compra) e o projeto Switch Accounts, abrangendo o microsserviço de Clientes, o backend Django e o app React Native.",
        "Levei o app Pro para a web com React Native for Web e conduzi upgrades do Expo SDK 26 ao 57 nos dois apps e nas bibliotecas compartilhadas.",
        "Resolvi 64 incidentes de produção, incluindo uma sincronização de faixas de preço quebrada que mostrava preços errados aos clientes, corrigida com scripts de detecção e reparo rodados por região.",
        "Construí os gates de CI do time no GitHub Actions: auditoria de CVEs bloqueando vulnerabilidades altas e críticas, checagem de tipos TypeScript e verificação de que PRs incluem suas migrations.",
        "Encontrei a causa raiz de 130 testes de backend falhando: o Python 3.14 mudou o multiprocessing para forkserver. Também perfilei o job de CI de 37 minutos e recuperei 15 minutos por execução.",
        "Escrevi as discoveries e specs técnicas que definiram tickets de outros engenheiros, mentorei um engenheiro backend novo e construí uma plataforma interna de plantão e revisão de PRs adotada por todo o time.",
      ],
    },
    stack: [
      "Django",
      "DRF",
      "Celery",
      "PostgreSQL",
      "React 19",
      "TypeScript",
      "React Native",
      "Expo",
      "TanStack Query",
      "GitHub Actions",
      "GKE",
      "Stripe",
    ],
  },
  {
    id: "curseduca",
    company: "Curseduca / Waid",
    location: {
      en: "São Paulo, Brazil · remote",
      pt: "São Paulo, Brasil · remoto",
    },
    role: { en: "Full-Stack Engineer", pt: "Engenheiro Full-Stack" },
    start: "2024-09",
    end: "2025-01",
    summary: {
      en: "Education technology platform serving over four million active users on React Native and Next.js.",
      pt: "Plataforma de tecnologia educacional com mais de quatro milhões de usuários ativos em React Native e Next.js.",
    },
    bullets: {
      en: [
        "Built core features across the React Native app, the Next.js web app and the backend during high-concurrency peaks.",
        "Handled tier-3 production incidents under SLA and wrote zero-data-loss migration scripts from legacy databases.",
        "Added Jest unit test suites that cut regressions during release cycles.",
      ],
      pt: [
        "Construí features centrais no app React Native, no web app Next.js e no backend durante picos de alta concorrência.",
        "Atendi incidentes de produção nível 3 dentro do SLA e escrevi scripts de migração sem perda de dados a partir de bancos legados.",
        "Adicionei suítes de testes unitários com Jest que reduziram regressões nos ciclos de release.",
      ],
    },
    stack: [
      "React Native",
      "Next.js",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Jest",
    ],
  },
  {
    id: "2rp",
    company: "2RP Net",
    location: {
      en: "São Paulo, Brazil · on-site",
      pt: "São Paulo, Brasil · presencial",
    },
    role: { en: "Full-Stack Engineer", pt: "Engenheiro Full-Stack" },
    start: "2022-12",
    end: "2024-11",
    summary: {
      en: "Consultancy building data and machine-learning products for corporate clients.",
      pt: "Consultoria construindo produtos de dados e machine learning para clientes corporativos.",
    },
    bullets: {
      en: [
        "Built a data-analytics portal in Next.js and Tailwind where clients explore machine-learning models.",
        "Developed a mobile-first inventory app designed for unstable network conditions.",
        "Prototyped in Figma, documented architectures in LaTeX, and ran internal workshops on React patterns for junior developers.",
      ],
      pt: [
        "Construí um portal de analytics em Next.js e Tailwind onde clientes exploram modelos de machine learning.",
        "Desenvolvi um app de inventário mobile-first pensado para redes instáveis.",
        "Prototipei no Figma, documentei arquiteturas em LaTeX e conduzi workshops internos sobre padrões React para desenvolvedores juniores.",
      ],
    },
    stack: ["Next.js", "Tailwind CSS", "Python", "Django", "Figma", "LaTeX"],
  },
];
