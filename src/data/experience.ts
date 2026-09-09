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
    start: "2025-01",
    end: null,
    summary: {
      en: "Global food-tech company. Full-stack work across business-critical internal systems and customer-facing web and mobile applications.",
      pt: "Empresa global de food-tech. Trabalho full-stack em sistemas internos críticos e aplicações web e mobile voltadas ao cliente.",
    },
    bullets: {
      en: [
        "Spearheaded full-stack feature delivery for a global food-tech ecosystem, coordinating requirements between product owners, UI/UX designers and engineering squads.",
        "Architected and shipped production-ready features with React, React Native, TypeScript and Python (Django) across internal systems and user-facing apps.",
        "Led the migration of legacy Angular applications to modern React architectures, reducing technical debt and increasing component reusability and development velocity.",
        "Designed, extended and optimised secure REST APIs for low-latency data synchronisation between distributed backend services and frontend clients.",
        "Engineered automated CI/CD workflows with GitHub Actions, cutting deployment friction and increasing the reliability of automated testing across environments.",
        "Collaborated directly with UK-based product managers and designers to turn Figma prototypes into high-performance interfaces, while refactoring critical legacy code without pausing feature delivery.",
      ],
      pt: [
        "Liderei a entrega full-stack de features para um ecossistema global de food-tech, coordenando requisitos entre product owners, designers de UI/UX e squads de engenharia.",
        "Projetei e entreguei features prontas para produção com React, React Native, TypeScript e Python (Django) em sistemas internos e apps voltados ao usuário.",
        "Liderei a migração de aplicações Angular legadas para arquiteturas React modernas, reduzindo dívida técnica e aumentando a reutilização de componentes e a velocidade de desenvolvimento.",
        "Projetei, estendi e otimizei APIs REST seguras para sincronização de dados de baixa latência entre serviços backend distribuídos e clientes frontend.",
        "Construí workflows de CI/CD automatizados com GitHub Actions, reduzindo o atrito de deploy e aumentando a confiabilidade dos testes automatizados entre ambientes.",
        "Colaborei diretamente com gerentes de produto e designers no Reino Unido para transformar protótipos do Figma em interfaces de alta performance, refatorando código legado crítico sem pausar a entrega de features.",
      ],
    },
    stack: [
      "React",
      "React Native",
      "TypeScript",
      "Python",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "GitHub Actions",
      "Figma",
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
