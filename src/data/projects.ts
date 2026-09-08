import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "tech-team-platform",
    title: "Tech Team Platform",
    featured: true,
    status: "live",
    period: "2026",
    tags: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Auth.js",
      "Kubernetes",
    ],
    summary: {
      en: "On-call rotation and PR-review routing tool that replaced my team's spreadsheet. Built solo in eight days, adopted by the whole tech team.",
      pt: "Ferramenta de rodízio de plantão e roteamento de revisão de PRs que substituiu a planilha do time. Feita sozinho em oito dias, adotada por todo o time técnico.",
    },
    description: {
      en: `Nobody asked for this. The team's weekly on-call and reviewer rotation lived in a shared spreadsheet, so the rules were enforced by memory and swaps were negotiated by hand.

I designed, built and deployed a replacement in eight days, then iterated on real feedback from the people using it.

**What it does**

- Weekly rotation of primary and secondary on-call plus a frontend and a backend reviewer, with the constraints enforced by the system: four distinct people every week.
- Fair unavailability swaps modelled as turn trades, so covering for someone earns your slot back later.
- PR review requests with the right reviewer pinned automatically, never your own PR.
- Notifications that get noticed: a chime, a desktop notification and a tab-title nag, scoped to what needs you.

**Engineering**

Roughly 8,600 lines of TypeScript across 112 files. The scheduling and rotation engines are pure, unit-tested modules; the UI is thin. A reconciliation tool diffs the database against the old spreadsheet with a dry run by default.

Adopted team-wide on 13 August 2026. Improvements now arrive as Jira tickets and the app is moving into the company Kubernetes cluster. The code is internal, so there is no public link.`,
      pt: `Ninguém pediu isso. O rodízio semanal de plantão e revisores do time vivia numa planilha compartilhada, então as regras eram cumpridas de memória e as trocas negociadas na mão.

Projetei, construí e publiquei um substituto em oito dias e depois iterei com o feedback real de quem usava.

**O que faz**

- Rodízio semanal de plantão primário e secundário mais um revisor de frontend e um de backend, com as restrições garantidas pelo sistema: quatro pessoas distintas toda semana.
- Trocas de indisponibilidade justas, modeladas como troca de turnos.
- Pedidos de revisão de PR com o revisor certo fixado automaticamente, nunca o seu próprio PR.
- Notificações que chamam atenção: som, notificação de desktop e aviso no título da aba, só para o que precisa de você.

**Engenharia**

Cerca de 8.600 linhas de TypeScript em 112 arquivos. Os motores de agenda e rodízio são módulos puros com testes unitários; a UI é fina. Uma ferramenta de reconciliação compara o banco com a planilha antiga, em modo dry run por padrão.

Adotada por todo o time em 13 de agosto de 2026. Melhorias agora chegam como tickets no Jira e o app está migrando para o cluster Kubernetes da empresa. O código é interno, então não há link público.`,
    },
  },
  {
    id: "mundobee",
    title: "MundoBee",
    featured: true,
    status: "archived",
    period: "2024",
    tags: ["NestJS", "Next.js", "MQTT", "ESP32", "MariaDB", "Docker", "Nginx"],
    award: { en: "1st place, COMBRAPI 2024", pt: "1º lugar, COMBRAPI 2024" },
    summary: {
      en: "IoT platform for real-time smart beehive telemetry. Won first place at the Brazilian Conference of Beekeeping.",
      pt: "Plataforma IoT para telemetria de colmeias inteligentes em tempo real. Primeiro lugar no Congresso Brasileiro de Apicultura.",
    },
    description: {
      en: `An end-to-end IoT platform for beekeepers: ESP32 sensors on each hive publish weight, temperature and humidity over MQTT; a NestJS service ingests the stream into MariaDB; a Next.js dashboard shows hive health and alerts.

Everything runs as Docker Compose services behind an Nginx reverse proxy, so a beekeeper can host it on a single cheap box.

It won first place at COMBRAPI 2024, the Brazilian Conference of Beekeeping.`,
      pt: `Uma plataforma IoT completa para apicultores: sensores ESP32 em cada colmeia publicam peso, temperatura e umidade via MQTT; um serviço NestJS ingere o fluxo no MariaDB; um dashboard em Next.js mostra a saúde das colmeias e alertas.

Tudo roda como serviços Docker Compose atrás de um proxy reverso Nginx, então um apicultor consegue hospedar numa única máquina barata.

Ganhou o primeiro lugar no COMBRAPI 2024, o Congresso Brasileiro de Apicultura.`,
    },
  },
  {
    id: "portfolio-os",
    title: "This portfolio",
    status: "live",
    period: "2026",
    tags: [
      "Next.js",
      "React 19",
      "Tailwind v4",
      "React Three Fiber",
      "Zustand",
      "Playwright",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/jonabergamo/jonathanbergamo",
      },
    ],
    summary: {
      en: "The site you are looking at: a desktop-OS metaphor with draggable windows, a procedural 3D avatar and a bilingual, static build.",
      pt: "O site que você está vendo: uma metáfora de sistema operacional com janelas arrastáveis, um avatar 3D procedural e build estático bilíngue.",
    },
    description: {
      en: `Every section is a window you can drag, resize, minimise and maximise. Layout, theme and language persist in the browser.

The avatar is built from primitives in React Three Fiber, no model file, and falls back to an SVG when the device prefers reduced motion or is low on resources.

On phones the same windows become full-screen sheets with a bottom navigation, sharing one store with the desktop.`,
      pt: `Cada seção é uma janela que você pode arrastar, redimensionar, minimizar e maximizar. Layout, tema e idioma ficam salvos no navegador.

O avatar é construído com primitivas no React Three Fiber, sem arquivo de modelo, e cai para um SVG quando o dispositivo prefere menos movimento ou tem poucos recursos.

No celular as mesmas janelas virem sheets em tela cheia com navegação inferior, compartilhando o mesmo estado da versão desktop.`,
    },
  },
  {
    id: "ecommerce",
    title: "Full-Stack E-commerce",
    status: "archived",
    period: "2023",
    tags: ["Next.js", "Django", "PostgreSQL", "Tailwind CSS", "Docker"],
    summary: {
      en: "E-commerce platform with JWT auth, inventory management and a secure checkout flow.",
      pt: "Plataforma de e-commerce com autenticação JWT, gestão de estoque e checkout seguro.",
    },
    description: {
      en: `A complete storefront and back office: JWT-based authentication, dynamic product inventory, secure checkout and a PostgreSQL schema designed to scale. Next.js on the front, Django on the back, Docker for local parity.`,
      pt: `Loja e back office completos: autenticação baseada em JWT, estoque dinâmico de produtos, checkout seguro e um esquema PostgreSQL pensado para escalar. Next.js na frente, Django atrás, Docker para paridade local.`,
    },
  },
  {
    id: "27box",
    title: "27Box Educational Portal",
    status: "archived",
    period: "2023",
    tags: ["TypeScript", "Next.js", "Python", "Django REST Framework"],
    summary: {
      en: "Academic management portal built on the 9-Box talent assessment method.",
      pt: "Portal de gestão acadêmica baseado no método de avaliação de talentos 9-Box.",
    },
    description: {
      en: `An academic portal that applies the 9-Box talent assessment to students and cohorts, bridging a Next.js front end with authenticated Django REST APIs.`,
      pt: `Um portal acadêmico que aplica a avaliação de talentos 9-Box a alunos e turmas, ligando um front end Next.js a APIs Django REST autenticadas.`,
    },
  },
];

export const allTags = Array.from(
  new Set(projects.flatMap((p) => p.tags)),
).sort();
