import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    id: "natoora",
    company: "Natoora",
    url: "https://natoora.com",
    location: {
      en: "London, UK, remote",
      pt: "Londres, Reino Unido, remoto",
    },
    role: {
      en: "Full Stack Software Engineer",
      pt: "Engenheiro de Software Full Stack",
    },
    start: "2025-01",
    end: null,
    summary: {
      en: "A global food tech company. Full stack work across the internal systems the business runs on and the web and mobile apps customers use.",
      pt: "Uma empresa global de food tech. Trabalho full stack nos sistemas internos que fazem o negócio rodar e nos apps web e mobile que os clientes usam.",
    },
    bullets: {
      en: [
        "Feature delivery end to end, coordinating what gets built with product owners, designers and the other squads.",
        "Production features in React, React Native, TypeScript and Python with Django, on internal tools and on the apps customers use.",
        "Led the move from legacy Angular screens to React, one screen at a time. Less technical debt, components people actually reuse.",
        "Designed and maintained the REST APIs that keep distributed back end services and the front ends in sync.",
        "Built the team's CI/CD in GitHub Actions. Deploys got less painful and the automated tests became something people trust.",
        "Direct work with product managers and designers in the UK, turning Figma into finished interfaces, while refactoring critical legacy code without pausing feature work.",
      ],
      pt: [
        "Entrega de features de ponta a ponta, alinhando o que vai ser construído com product owners, designers e os outros squads.",
        "Features em produção com React, React Native, TypeScript e Python com Django, em ferramentas internas e nos apps que os clientes usam.",
        "Liderei a saída das telas legadas em Angular para React, uma tela por vez. Menos dívida técnica e componentes que o time reaproveita de verdade.",
        "Desenho e manutenção das APIs REST que mantêm os serviços de back end distribuídos e os front ends em sincronia.",
        "Construí a CI/CD do time no GitHub Actions. Os deploys ficaram menos dolorosos e os testes automatizados viraram algo em que as pessoas confiam.",
        "Trabalho direto com gerentes de produto e designers no Reino Unido, transformando Figma em interfaces terminadas, enquanto o código legado crítico é refatorado sem pausar as features.",
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
      en: "São Paulo, Brazil, remote",
      pt: "São Paulo, Brasil, remoto",
    },
    role: { en: "Full Stack Engineer", pt: "Engenheiro Full Stack" },
    start: "2024-09",
    end: "2025-01",
    summary: {
      en: "An education platform with over four million active users, on React Native and Next.js.",
      pt: "Uma plataforma de educação com mais de quatro milhões de usuários ativos, em React Native e Next.js.",
    },
    bullets: {
      en: [
        "Core features across the React Native app, the Next.js web app and the back end, including during the busiest traffic peaks.",
        "Handled the hardest production incidents within SLA and wrote the migration scripts that moved data off legacy databases without losing a row.",
        "Added Jest test suites that cut regressions during releases.",
      ],
      pt: [
        "Construí features centrais no app React Native, no web app Next.js e no back end, inclusive nos picos de tráfego mais pesados.",
        "Atendi os incidentes de produção mais difíceis dentro do SLA e escrevi os scripts que migraram dados de bancos legados sem perder uma linha.",
        "Adicionei suítes de testes com Jest que reduziram regressões nas releases.",
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
      en: "São Paulo, Brazil, on site",
      pt: "São Paulo, Brasil, presencial",
    },
    role: { en: "Full Stack Engineer", pt: "Engenheiro Full Stack" },
    start: "2022-12",
    end: "2024-11",
    summary: {
      en: "A consultancy that builds data and machine learning products for corporate clients.",
      pt: "Uma consultoria que constrói produtos de dados e machine learning para clientes corporativos.",
    },
    bullets: {
      en: [
        "Built an analytics portal in Next.js and Tailwind where clients explore the output of machine learning models.",
        "Developed an inventory app for phones that keeps working on bad connections.",
        "Prototyped in Figma, documented architectures in LaTeX, and ran internal workshops on React patterns for junior developers.",
      ],
      pt: [
        "Construí um portal de analytics em Next.js e Tailwind onde os clientes exploram o resultado de modelos de machine learning.",
        "Desenvolvi um app de inventário para celular que continua funcionando com conexão ruim.",
        "Prototipei no Figma, documentei arquiteturas em LaTeX e dei workshops internos sobre padrões React para desenvolvedores juniores.",
      ],
    },
    stack: ["Next.js", "Tailwind CSS", "Python", "Django", "Figma", "LaTeX"],
  },
];
