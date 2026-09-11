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
      "Docker",
    ],
    images: [
      {
        src: "/projects/sharedmd.webp",
        alt: {
          en: "Three people editing the same trip plan, each with a named cursor",
          pt: "Três pessoas editando o mesmo plano de viagem, cada uma com o cursor nomeado",
        },
      },
      {
        src: "/projects/sharedmd-paper.webp",
        alt: {
          en: "The Paper theme in light mode with the theme menu open",
          pt: "O tema Paper no modo claro com o menu de temas aberto",
        },
      },
      {
        src: "/projects/sharedmd-mobile.webp",
        wide: false,
        alt: {
          en: "Preview mode on a phone in the Forest theme",
          pt: "Modo de leitura no celular com o tema Forest",
        },
      },
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

The first line of the document is its title, the way Obsidian does it. You can rename yourself from your avatar, jump back to any room you visited from this device, pick one of four themes in light or dark, and download the result as markdown or PDF.

The server keeps a live document per room, saves a snapshot to Redis two seconds after the last edit, and unloads rooms a minute after they empty. One container on Render serves the API, the sockets and the React front end, on a free instance that naps when nobody is around. Presence, remote cursors, reconnection and persistence are all covered by tests I ran in real browsers, including killing the server while two tabs were typing.`,
      pt: `Abra um link e digite. Todo mundo na sala vê o que você escreve e onde está o seu cursor, com nome e cor. Caiu a conexão, você continua digitando. Quando ela volta, as suas mudanças se juntam às dos outros.

Por baixo, cada documento é um CRDT, usando Yjs. Cada cliente guarda a própria cópia e aplica as edições na hora, as atualizações viajam como mensagens binárias pequenas pelo Socket.io, e a matemática garante que todas as cópias terminam iguais em qualquer ordem que as atualizações chegarem. Escolhi isso em vez de Operational Transformation porque o servidor continua sendo só um repassador, reconectar é o mesmo caminho de código da edição normal e as atualizações otimistas vêm de graça. O README entra nos detalhes.

A primeira linha do documento é o título, do jeito que o Obsidian faz. Dá para trocar o seu nome pelo avatar, voltar para qualquer sala que você abriu naquele aparelho, escolher um de quatro temas em claro ou escuro e baixar o resultado em markdown ou PDF.

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
    status: "live",
    period: "2024 to 2026",
    tags: [
      "NestJS",
      "Next.js",
      "MQTT",
      "ESP32",
      "Postgres",
      "Socket.io",
      "Docker",
    ],
    award: { en: "1st place, COMBRAPI 2024", pt: "1º lugar, COMBRAPI 2024" },
    images: [
      {
        src: "/projects/mundobee.webp",
        alt: {
          en: "Dashboard of one hive with entrance traffic, temperature and humidity charts",
          pt: "Dashboard de uma colmeia com gráficos de movimento na entrada, temperatura e umidade",
        },
      },
      {
        src: "/projects/mundobee-hives.webp",
        alt: {
          en: "Four simulated hives reporting live readings",
          pt: "Quatro colmeias simuladas enviando leituras ao vivo",
        },
      },
    ],
    links: [
      { label: "Live", url: "https://mundobee-one.vercel.app" },
      { label: "GitHub", url: "https://github.com/jonabergamo/mundobee" },
    ],
    summary: {
      en: "An IoT platform that reads smart beehives in real time. It won first place at the Brazilian Conference of Beekeeping, and in 2026 it came back online with simulated hives.",
      pt: "Uma plataforma IoT que lê colmeias inteligentes em tempo real. Ganhou o primeiro lugar no Congresso Brasileiro de Apicultura e em 2026 voltou ao ar com colmeias simuladas.",
    },
    description: {
      en: `A complete IoT platform for beekeepers. An ESP32 in each hive reads brood temperature, humidity and the traffic of bees at the entrance, publishes it over MQTT, and a dashboard shows every hive live with the history behind it. It won first place at COMBRAPI 2024, the Brazilian Conference of Beekeeping.

The 2024 version needed nine Docker services behind Nginx and a machine of your own. In 2026 I cut it down to a NestJS API and a Next.js dashboard that run on free tiers. The MQTT broker now lives inside the API and speaks over WebSocket on the same port, which is what lets a real hive and the browser share one free web service. Readings land in Postgres and go out to the dashboard over Socket.io.

Because the real sensors are back at the apiary, the API can simulate hives. Four virtual colonies follow what the sensors showed in 2024. Brood temperature held near 35 degrees, humidity in the fifties, traffic that peaks at midday and stops at night, and the odd cold snap or dropped connection so the alerts have something to do. Log in with the demo account and they are already publishing.`,
      pt: `Uma plataforma IoT completa para apicultores. Um ESP32 em cada colmeia lê a temperatura da cria, a umidade e o vai e vem das abelhas na entrada, publica via MQTT, e um dashboard mostra todas as colmeias ao vivo com o histórico atrás. Ganhou o primeiro lugar no COMBRAPI 2024, o Congresso Brasileiro de Apicultura.

A versão de 2024 precisava de nove serviços Docker atrás de um Nginx e de uma máquina própria. Em 2026 enxuguei para uma API em NestJS e um dashboard em Next.js que rodam em planos gratuitos. O broker MQTT agora mora dentro da API e fala por WebSocket na mesma porta, e é isso que deixa uma colmeia de verdade e o navegador dividirem um único serviço web gratuito. As leituras caem no Postgres e saem para o dashboard por Socket.io.

Como os sensores de verdade ficaram no apiário, a API consegue simular colmeias. Quatro colônias virtuais seguem o que os sensores mostraram em 2024. Temperatura da cria perto de 35 graus, umidade na faixa dos cinquenta, movimento que tem pico ao meio dia e para à noite, e de vez em quando uma noite fria ou uma conexão que cai, para os alertas terem o que fazer. Entre com a conta demo e elas já estão publicando.`,
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
