import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "sharedmd",
    title: "SharedMD",
    featured: true,
    status: "live",
    period: "2026",
    tags: [
      "React",
      "TypeScript",
      "Yjs",
      "Socket.io",
      "Node",
      "Redis",
      "Fly.io",
    ],
    links: [
      { label: "Live", url: "https://sharedmd.onrender.com" },
      { label: "GitHub", url: "https://github.com/jonabergamo/sharedmd" },
    ],
    summary: {
      en: "A markdown document several people can write at the same time, with live cursors, offline edits that merge back, and no accounts.",
      pt: "Um documento markdown que várias pessoas escrevem ao mesmo tempo, com cursores ao vivo, edições offline que voltam a se juntar e sem contas.",
    },
    description: {
      en: `Open a link and type. Everyone in the room sees your keystrokes and your cursor, with a name and a colour. Lose the connection and you keep typing. When it comes back, your changes merge with everyone else's.

Under the hood every document is a CRDT, using Yjs. Each client keeps its own copy and applies edits immediately, updates travel as small binary messages over Socket.io, and the maths guarantees every copy ends up identical whatever order the updates arrive in. I chose that over Operational Transformation because the server stays a dumb relay, reconnection is the same code path as normal editing, and optimistic updates come for free. The README goes into the trade offs.

The server keeps a live document per room, saves a snapshot to Redis two seconds after the last edit, and unloads rooms a minute after they empty. One container on Render serves the API, the sockets and the React front end, on a free instance that naps when nobody is around. Presence, remote cursors, reconnection and persistence are all covered by tests I ran in real browsers, including killing the server while two tabs were typing.`,
      pt: `Abra um link e digite. Todo mundo na sala vê o que você escreve e onde está o seu cursor, com nome e cor. Caiu a conexão, você continua digitando. Quando ela volta, as suas mudanças se juntam às dos outros.

Por baixo, cada documento é um CRDT, usando Yjs. Cada cliente guarda a própria cópia e aplica as edições na hora, as atualizações viajam como mensagens binárias pequenas pelo Socket.io, e a matemática garante que todas as cópias terminam iguais em qualquer ordem que as atualizações chegarem. Escolhi isso em vez de Operational Transformation porque o servidor continua sendo só um repassador, reconectar é o mesmo caminho de código da edição normal e as atualizações otimistas vêm de graça. O README entra nos detalhes.

O servidor mantém um documento vivo por sala, salva um snapshot no Redis dois segundos depois da última edição e descarrega salas um minuto depois de esvaziarem. Um container na Render serve a API, os sockets e o front end em React, numa instância gratuita que tira uma soneca quando não tem ninguém por perto. Presença, cursores remotos, reconexão e persistência foram todos testados em navegadores de verdade, inclusive matando o servidor enquanto duas abas digitavam.`,
    },
  },
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
