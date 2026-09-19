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
        src: "/projects/mundobee-hives.webp",
        alt: {
          en: "Four simulated hives reporting live readings",
          pt: "Quatro colmeias simuladas enviando leituras ao vivo",
        },
      },
      {
        src: "/projects/mundobee.webp",
        alt: {
          en: "Dashboard of one hive with entrance traffic, temperature and humidity charts",
          pt: "Dashboard de uma colmeia com gráficos de movimento na entrada, temperatura e umidade",
        },
      },
      {
        src: "/projects/mundobee-presets.webp",
        alt: {
          en: "Presets per bee species, orange palette in dark mode",
          pt: "Predefinições por espécie de abelha, paleta laranja no modo escuro",
        },
      },
      {
        src: "/projects/mundobee-login.webp",
        alt: {
          en: "Sign in page with the demo account and a note about the project",
          pt: "Tela de entrada com a conta demo e uma nota sobre o projeto",
        },
      },
      {
        src: "/projects/mundobee-mobile.webp",
        wide: false,
        alt: {
          en: "Hive cards on a phone",
          pt: "Cards das colmeias no celular",
        },
      },
    ],
    links: [
      { label: "Live", url: "https://mundobee.vercel.app" },
      { label: "GitHub", url: "https://github.com/jonabergamo/mundobee" },
    ],
    summary: {
      en: "Live monitoring for beehives. ESP32 sensors, an MQTT broker embedded in the API and a dashboard that shows every hive in real time. Won COMBRAPI 2024 and came back online in 2026 with simulated hives you can try right now.",
      pt: "Monitoramento de colmeias ao vivo. Sensores ESP32, um broker MQTT embutido na API e um dashboard que mostra cada colmeia em tempo real. Ganhou o COMBRAPI 2024 e voltou ao ar em 2026 com colmeias simuladas que você pode testar agora.",
    },
    description: {
      en: `A beehive monitor I led in 2024 with Senai São Paulo and UNITAU, for a research project on stingless bee colonies, biodiversity and honey production. An ESP32 in each hive reads brood temperature, humidity and the traffic of bees at the entrance, publishes it over MQTT, and the dashboard shows every hive live with the history behind it. It won first place at COMBRAPI 2024, the Brazilian Conference of Beekeeping.

The 2024 version ran on MariaDB with nine Docker services behind Nginx and needed a machine of your own. In 2026 I cut it down to a NestJS API and a Next.js dashboard that run on free tiers. The MQTT broker moved inside the API and speaks over WebSocket on the same port, so a real hive and the browser share one free web service. Readings are folded into five minute windows before they reach Postgres, which keeps the database tiny while the dashboard still updates every fifteen seconds.

Since the real sensors are back at the apiary, the API simulates hives. Four virtual colonies follow what the sensors showed in 2024, with brood held near 35 degrees, traffic that peaks at midday and stops at night, and the odd cold snap or dropped connection so the offline badge has something to do. The dashboard is in English with a Portuguese switch, has four colour palettes in light or dark, and lets you register hives, create presets per bee species and see the ideal band drawn on the charts. Open the demo and the hives are already publishing.`,
      pt: `Um monitor de colmeias que liderei em 2024 com o Senai São Paulo e a UNITAU, para uma pesquisa sobre colônias de abelhas sem ferrão, biodiversidade e produção de mel. Um ESP32 em cada colmeia lê a temperatura da cria, a umidade e o vai e vem das abelhas na entrada, publica via MQTT, e o dashboard mostra cada colmeia ao vivo com o histórico atrás. Ganhou o primeiro lugar no COMBRAPI 2024, o Congresso Brasileiro de Apicultura.

A versão de 2024 precisava de nove serviços Docker atrás de um Nginx e de uma máquina própria. Em 2026 enxuguei para uma API em NestJS e um dashboard em Next.js que rodam em planos gratuitos. O broker MQTT foi para dentro da API e fala por WebSocket na mesma porta, então uma colmeia de verdade e o navegador dividem um único serviço web gratuito. As leituras são agrupadas em janelas de cinco minutos antes de chegar no Postgres, o que mantém o banco minúsculo enquanto o dashboard segue atualizando a cada quinze segundos.

Como os sensores de verdade ficaram no apiário, a API simula colmeias. Quatro colônias virtuais seguem o que os sensores mostraram em 2024, com a cria perto de 35 graus, movimento que tem pico ao meio dia e para à noite, e de vez em quando uma noite fria ou uma conexão que cai, para o aviso de sem sinal ter o que fazer. O dashboard está em inglês com troca para português, tem quatro paletas de cor em claro ou escuro, e deixa você cadastrar colmeias, criar predefinições por espécie de abelha e ver a faixa ideal desenhada nos gráficos. Abra a demo e as colmeias já estão publicando.`,
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
    id: "kilobyte",
    title: "Kilobyte",
    featured: true,
    status: "live",
    period: "2023 to 2026",
    tags: [
      "Next.js",
      "TypeScript",
      "Drizzle",
      "Postgres",
      "Stripe",
      "Auth.js",
      "Tailwind",
    ],
    images: [
      {
        src: "/projects/kilobyte.webp",
        alt: {
          en: "Store home with the hero, categories and picks",
          pt: "Home da loja com destaque, categorias e escolhidos",
        },
      },
      {
        src: "/projects/kilobyte-product.webp",
        alt: {
          en: "Product page with specs, stock and the buy box",
          pt: "Página de produto com especificações, estoque e caixa de compra",
        },
      },
      {
        src: "/projects/kilobyte-checkout.webp",
        alt: {
          en: "Checkout with the address form and the order summary before Stripe",
          pt: "Checkout com o endereço e o resumo do pedido antes do Stripe",
        },
      },
      {
        src: "/projects/kilobyte-order.webp",
        alt: {
          en: "A paid order with its timeline",
          pt: "Um pedido pago com a linha do tempo",
        },
      },
      {
        src: "/projects/kilobyte-manage.webp",
        alt: {
          en: "Manager dashboard with sales per day, low stock and reviews",
          pt: "Painel do gerente com vendas por dia, estoque baixo e avaliações",
        },
      },
      {
        src: "/projects/kilobyte-manage-product.webp",
        alt: {
          en: "Editing a product in the manager area",
          pt: "Editando um produto na área do gerente",
        },
      },
      {
        src: "/projects/kilobyte-mobile.webp",
        wide: false,
        alt: { en: "The store on a phone", pt: "A loja no celular" },
      },
    ],
    links: [
      { label: "Live", url: "https://kilobyte-rho.vercel.app" },
      { label: "GitHub", url: "https://github.com/jonabergamo/kilobyte" },
    ],
    summary: {
      en: "An electronics store that works end to end. Search, cart, coupons, Stripe Checkout in test mode, orders with a status timeline, reviews, and a manager area for the catalogue. My 2023 college store rebuilt in 2026.",
      pt: "Uma loja de eletrônicos que funciona de ponta a ponta. Busca, carrinho, cupons, Stripe Checkout em modo de teste, pedidos com linha do tempo, avaliações e uma área de gerente para o catálogo. Minha loja da faculdade de 2023 refeita em 2026.",
    },
    description: {
      en: `The 2023 version was a college project called Informática, a Django API and a Next 13 front end with a cart and a checkout button that only decremented stock. In 2026 I kept the repo, renamed it and rebuilt it as a real store on one Next.js 16 app. Server components read straight from Postgres through Drizzle, server actions write, Auth.js handles accounts with a customer or manager role.

Checkout is the real thing. The order is written first with a snapshot of names and prices, Stripe gets a Checkout Session for exactly that, and its webhook marks the order paid, takes the stock, counts the coupon and empties the cart. The success page polls until that happened, because Stripe sends you back before its webhook may have arrived. Money is integer cents everywhere and the pricing rules are pure functions with tests. Coupons the manager creates are mirrored as Stripe coupons so the discount shows on Stripe's page too.

Customers get search with filters and sorting, a cart that follows the browser and merges into the account on sign in, a wishlist, reviews only for products they paid for, and an order timeline from paid to delivered. The manager area has a dashboard with sales per day and low stock, products with specs and images, categories, brands, orders with the status flow, coupons, review moderation and customers. Everything runs in Stripe test mode with the demo card, and a nightly cron reseeds the store.`,
      pt: `A versão de 2023 era um projeto da faculdade chamado Informática, uma API Django e um front end Next 13 com carrinho e um botão de finalizar que só baixava o estoque. Em 2026 mantive o repositório, renomeei e refiz como uma loja de verdade num único app Next.js 16. Server components leem direto do Postgres pelo Drizzle, server actions escrevem, Auth.js cuida das contas com papel de cliente ou gerente.

O checkout é de verdade. O pedido é gravado primeiro com uma cópia dos nomes e preços, o Stripe recebe uma Checkout Session exatamente para aquilo, e o webhook dele marca o pedido como pago, baixa o estoque, conta o cupom e esvazia o carrinho. A página de sucesso fica consultando até isso acontecer, porque o Stripe te devolve antes do webhook chegar. Dinheiro é inteiro em centavos em todo lugar e as regras de preço são funções puras com testes. Cupons que o gerente cria são espelhados como cupons do Stripe, então o desconto aparece na página do Stripe também.

O cliente tem busca com filtros e ordenação, um carrinho que acompanha o navegador e se junta à conta ao entrar, favoritos, avaliações só de produtos que pagou, e uma linha do tempo do pedido de pago a entregue. A área do gerente tem um painel com vendas por dia e estoque baixo, produtos com especificações e imagens, categorias, marcas, pedidos com o fluxo de status, cupons, moderação de avaliações e clientes. Tudo roda no modo de teste do Stripe com o cartão demo, e um cron noturno reinicia a loja.`,
    },
  },
  {
    id: "ninebox",
    title: "Ninebox",
    featured: true,
    status: "live",
    period: "2023 to 2026",
    tags: [
      "Django",
      "Django REST Framework",
      "Channels",
      "WebSocket",
      "Next.js",
      "TypeScript",
      "Postgres",
    ],
    images: [
      {
        src: "/projects/ninebox-landing.webp",
        alt: {
          en: "Landing page with the animated 9 box grid",
          pt: "Página inicial com o grid 9 box animado",
        },
      },
      {
        src: "/projects/ninebox.webp",
        alt: {
          en: "Teacher overview with the class placed on the grids, levels on each initial",
          pt: "Visão do professor com a turma posicionada nos grids, nível em cada inicial",
        },
      },
      {
        src: "/projects/ninebox-exam.webp",
        alt: {
          en: "Exam lobby with the live countdown and who is connected",
          pt: "Sala da prova com o cronômetro ao vivo e quem está conectado",
        },
      },
      {
        src: "/projects/ninebox-exam-student.webp",
        alt: {
          en: "A student answering the quiz against the clock",
          pt: "Uma aluna respondendo a prova contra o relógio",
        },
      },
      {
        src: "/projects/ninebox-timeline.webp",
        alt: {
          en: "A student's own progression, activities and exams",
          pt: "A progressão de uma aluna, atividades e provas",
        },
      },
      {
        src: "/projects/ninebox-activity.webp",
        alt: {
          en: "Submissions of one activity waiting for a grade",
          pt: "Entregas de uma atividade esperando correção",
        },
      },
    ],
    links: [
      { label: "Live", url: "https://ninebox-seven.vercel.app" },
      { label: "GitHub", url: "https://github.com/jonabergamo/Ninebox" },
    ],
    summary: {
      en: "A school platform where grades move students across a 9 box grid of performance and potential, with timed exams over WebSocket. Rewritten in 2026 with Django 5 and Next.js, with a demo school you can grade right now.",
      pt: "Uma plataforma escolar em que as notas movem os alunos por um grid 9 box de desempenho e potencial, com provas cronometradas por WebSocket. Refeita em 2026 com Django 5 e Next.js, com uma escola demo que você pode corrigir agora.",
    },
    description: {
      en: `Teachers create classes, hand out activities with weighted criteria and mark each student's work with four letters. Every grade moves the student across a 3x3 board of performance and potential, with levels on top, following a small set of rules I wrote in 2023. Fail twice and you drop a cell. Score high on something harder than your level and you climb two. Students see where they stand, what is due and the path that brought them there.

The first version was two repos, a Django 4 API on SQLite with Gmail for emails and a Next 13 front end full of UI kits. In 2026 I merged them into one repo, kept the API history, and rewrote both halves. Django 5 with JWT and Postgres, the grid rules as pure functions with a test per branch, a service layer that records every move, and object level permissions so a teacher only sees their own classes. Students join with a six character class code, no email anywhere.

Exams run live. The teacher writes a multiple choice quiz, opens it when the class is in the room, and every student's page flips at the same moment with a countdown. The clock belongs to the server, a Django Channels consumer over WebSocket, which closes the exam when time is up, grades whatever each student answered and tells every page. Scores feed the same grid rules as activities.

The dashboard is Next.js 16 with Tailwind 4 and shadcn. It has a heatmap with every student placed on every grid with their level, a progression timeline per student with the grade behind each move, grading with keyboard shortcuts, CSV export and one click demo logins for both roles. On every deploy the API wipes and rebuilds a demo school with two teachers, 26 students and a semester of graded work, leaving work to grade and a quiz ready to open.`,
      pt: `Professores criam turmas, passam atividades com critérios ponderados e avaliam o trabalho de cada aluno com quatro letras. Cada nota move o aluno por um quadro 3x3 de desempenho e potencial, com níveis por cima, seguindo um conjunto pequeno de regras que escrevi em 2023. Duas notas baixas seguidas e você desce uma casa. Nota alta em algo acima do seu nível e você sobe duas. Alunos veem onde estão, o que tem para entregar e o caminho que os trouxe até ali.

A primeira versão eram dois repositórios, uma API Django 4 em SQLite com Gmail para emails e um front end Next 13 cheio de kits de UI. Em 2026 juntei os dois num repositório só, mantive o histórico da API e reescrevi as duas metades. Django 5 com JWT e Postgres, as regras do grid como funções puras com um teste por ramo, uma camada de serviço que registra cada movimento e permissões por objeto para um professor ver só as próprias turmas. Alunos entram com um código de seis caracteres, sem email em lugar nenhum.

As provas acontecem ao vivo. O professor escreve um questionário de múltipla escolha, abre quando a turma está na sala, e a página de cada aluno vira no mesmo instante com uma contagem regressiva. O relógio pertence ao servidor, um consumer do Django Channels por WebSocket, que encerra a prova quando o tempo acaba, corrige o que cada aluno respondeu e avisa todas as páginas. As notas alimentam as mesmas regras do grid que as atividades.

O dashboard é Next.js 16 com Tailwind 4 e shadcn. Tem um mapa com cada aluno posicionado em cada grid com o nível, uma linha do tempo de progressão por aluno com a nota atrás de cada movimento, correção com atalhos de teclado, exportação em CSV e logins demo de um clique para os dois papéis. A cada deploy a API apaga e reconstrói uma escola demo com dois professores, 26 alunos e um semestre de trabalhos corrigidos, deixando trabalho para corrigir e uma prova pronta para abrir.`,
    },
  },
];

export const allTags = Array.from(
  new Set(projects.flatMap((p) => p.tags)),
).sort();
