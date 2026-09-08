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
    ],
    summary: {
      en: "Internal tool for on-call rotation and pull-request review routing, built on my own initiative and adopted by the engineering team.",
      pt: "Ferramenta interna de rodízio de plantão e roteamento de revisão de PRs, construída por iniciativa própria e adotada pelo time de engenharia.",
    },
    description: {
      en: `The team's weekly on-call and reviewer rotation lived in a spreadsheet, so the rules depended on memory and swaps were negotiated by hand. I designed, built and deployed a replacement, then iterated on feedback from the people using it.

**What it does**

- Weekly rotation with the constraints enforced by the system rather than by convention.
- Fair unavailability swaps modelled as turn trades.
- Pull-request review requests routed to the right reviewer automatically.
- Notifications scoped to what actually needs your attention.

**Engineering**

Next.js, React, TypeScript, Prisma and PostgreSQL. The scheduling and rotation rules are pure, unit-tested modules; the UI is thin. The code is internal, so there is no public link.`,
      pt: `O rodízio semanal de plantão e revisores do time vivia numa planilha, então as regras dependiam da memória e as trocas eram negociadas na mão. Projetei, construí e publiquei um substituto e iterei com o feedback de quem usa.

**O que faz**

- Rodízio semanal com as restrições garantidas pelo sistema, não por convenção.
- Trocas de indisponibilidade justas, modeladas como troca de turnos.
- Pedidos de revisão de PR roteados automaticamente para o revisor certo.
- Notificações só para o que realmente precisa de você.

**Engenharia**

Next.js, React, TypeScript, Prisma e PostgreSQL. As regras de agenda e rodízio são módulos puros com testes unitários; a UI é fina. O código é interno, então não há link público.`,
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
