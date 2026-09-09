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
      en: "An internal tool for the on call rotation and for routing pull request reviews. I built it on my own initiative and the engineering team adopted it.",
      pt: "Uma ferramenta interna para o rodízio de plantão e para rotear revisões de pull request. Construí por conta própria e o time de engenharia adotou.",
    },
    description: {
      en: `The team's weekly on call and reviewer rotation lived in a spreadsheet. The rules depended on memory and swaps were negotiated by hand. I designed, built and deployed a replacement, then kept improving it with feedback from the people using it.

What it does

A weekly rotation where the system enforces the constraints, not convention. Fair swaps when someone is unavailable, modelled as trading turns. Pull request review requests that land with the right reviewer automatically. Notifications that only fire for what actually needs you.

How it's built

Next.js, React, TypeScript, Prisma and PostgreSQL. The scheduling and rotation rules are pure modules with unit tests, and the UI stays thin. The code is internal, so there's no public link.`,
      pt: `O rodízio semanal de plantão e revisores do time vivia numa planilha. As regras dependiam da memória e as trocas eram negociadas na mão. Projetei, construí e publiquei um substituto e continuei melhorando com o feedback de quem usa.

O que faz

Um rodízio semanal em que o sistema garante as restrições, não a convenção. Trocas justas quando alguém não pode, modeladas como troca de turno. Pedidos de revisão de pull request que chegam ao revisor certo automaticamente. Notificações que só disparam para o que realmente precisa de você.

Como foi feito

Next.js, React, TypeScript, Prisma e PostgreSQL. As regras de agenda e rodízio são módulos puros com testes unitários, e a UI fica fina. O código é interno, então não há link público.`,
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
      en: "An IoT platform that reads smart beehives in real time. It won first place at the Brazilian Conference of Beekeeping.",
      pt: "Uma plataforma IoT que lê colmeias inteligentes em tempo real. Ganhou o primeiro lugar no Congresso Brasileiro de Apicultura.",
    },
    description: {
      en: `A complete IoT platform for beekeepers. ESP32 sensors on each hive publish weight, temperature and humidity over MQTT. A NestJS service ingests the stream into MariaDB, and a Next.js dashboard shows hive health and alerts.

Everything runs as Docker Compose services behind an Nginx reverse proxy, so a beekeeper can host it on a single cheap box.

It won first place at COMBRAPI 2024, the Brazilian Conference of Beekeeping.`,
      pt: `Uma plataforma IoT completa para apicultores. Sensores ESP32 em cada colmeia publicam peso, temperatura e umidade via MQTT. Um serviço NestJS ingere o fluxo no MariaDB, e um dashboard em Next.js mostra a saúde das colmeias e os alertas.

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
      en: "The site you're looking at. A desktop in the browser with draggable windows, a 3D version of me and a bilingual static build.",
      pt: "O site que você está vendo. Uma área de trabalho no navegador com janelas arrastáveis, uma versão 3D de mim e um build estático bilíngue.",
    },
    description: {
      en: `Every section is a window you can drag, resize, minimise and maximise. Layout, theme and language are saved in your browser.

The avatar is my own Ready Player Me model. It follows your cursor, waves when you click it and dances when the music player is playing. Devices that prefer reduced motion get a drawn portrait instead.

On phones the same windows become full screen sheets with a bottom bar, sharing one state with the desktop.`,
      pt: `Cada seção é uma janela que você pode arrastar, redimensionar, minimizar e maximizar. Layout, tema e idioma ficam salvos no seu navegador.

O avatar é meu próprio modelo do Ready Player Me. Ele segue o seu cursor, acena quando você clica e dança quando o player está tocando. Aparelhos que preferem menos movimento recebem um retrato desenhado.

No celular as mesmas janelas viram telas cheias com uma barra inferior, compartilhando o mesmo estado da versão desktop.`,
    },
  },
  {
    id: "ecommerce",
    title: "Online Store",
    status: "archived",
    period: "2023",
    tags: ["Next.js", "Django", "PostgreSQL", "Tailwind CSS", "Docker"],
    summary: {
      en: "An online store with JWT login, inventory management and a secure checkout.",
      pt: "Uma loja online com login por JWT, gestão de estoque e checkout seguro.",
    },
    description: {
      en: `A complete storefront and back office. Login with JWT, a live product inventory, a secure checkout and a PostgreSQL schema built to grow. Next.js on the front, Django on the back, Docker so local matches production.`,
      pt: `Loja e back office completos. Login com JWT, estoque de produtos ao vivo, checkout seguro e um esquema PostgreSQL feito para crescer. Next.js na frente, Django atrás, Docker para o local bater com a produção.`,
    },
  },
  {
    id: "27box",
    title: "27Box Educational Portal",
    status: "archived",
    period: "2023",
    tags: ["TypeScript", "Next.js", "Python", "Django REST Framework"],
    summary: {
      en: "An academic portal built around the 9 Box talent assessment method.",
      pt: "Um portal acadêmico construído em torno do método 9 Box de avaliação de talentos.",
    },
    description: {
      en: `An academic portal that applies the 9 Box talent assessment to students and cohorts. A Next.js front end talks to authenticated Django REST APIs.`,
      pt: `Um portal acadêmico que aplica a avaliação de talentos 9 Box a alunos e turmas. Um front end Next.js conversa com APIs Django REST autenticadas.`,
    },
  },
];

export const allTags = Array.from(
  new Set(projects.flatMap((p) => p.tags)),
).sort();
