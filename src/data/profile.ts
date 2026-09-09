import type { Localized } from "./types";

export const profile = {
  name: "Jonathan Oliveira Bergamo",
  shortName: "Jonathan Bergamo",
  email: "jonathanbergamo16@gmail.com",
  linkedin: "https://www.linkedin.com/in/jonathanbergamo",
  github: "https://github.com/jonabergamo",
  location: {
    en: "São Paulo, Brazil",
    pt: "São Paulo, Brasil",
  } satisfies Localized,
  openToWork: true,
  cv: {
    en: "/cv/jonathan-bergamo-cv-en.pdf",
    pt: "/cv/jonathan-bergamo-cv-pt.pdf",
  },
  summary: {
    en: "I'm a full stack engineer with a bit over three years of shipping web, mobile and distributed systems. My home turf is React and TypeScript, on the web with Next.js and on phones with React Native. On the back end I work mostly in Python with Django, and I've shipped Node with NestJS and Java too. I've led migrations off legacy code, built the CI that teams rely on, and delivered features to a lot of users, always in remote teams that work in English. I care about clean code and about software that keeps working after I've moved on to the next thing.",
    pt: "Sou engenheiro full stack com um pouco mais de três anos entregando sistemas web, mobile e distribuídos. Meu terreno é React e TypeScript, na web com Next.js e no celular com React Native. No back end trabalho principalmente com Python e Django, e já entreguei Node com NestJS e Java também. Liderei migrações de código legado, construí a CI que os times usam todo dia e entreguei features para muita gente, sempre em times remotos que trabalham em inglês. Me importo com código limpo e com software que continua funcionando depois que eu passo para a próxima coisa.",
  } satisfies Localized,
  traits: {
    en: [
      {
        title: "Whole stack, whole feature",
        body: "From the migration and the background job to the screen and its tests. I'd rather own the result than one layer of it.",
      },
      {
        title: "Calm in production",
        body: "When something breaks I look for the root cause, fix it, and write down what will stop it from happening again.",
      },
      {
        title: "Writes it down",
        body: "Discoveries, specs and docs that let other people pick up the work. Bilingual, remote first, comfortable in async.",
      },
    ],
    pt: [
      {
        title: "Stack inteira, feature inteira",
        body: "Da migration e do job em background até a tela e seus testes. Prefiro ser dono do resultado a ser dono de uma camada dele.",
      },
      {
        title: "Calmo em produção",
        body: "Quando algo quebra eu procuro a causa raiz, corrijo e deixo escrito o que impede de acontecer de novo.",
      },
      {
        title: "Deixa escrito",
        body: "Discoveries, specs e docs que deixam outras pessoas pegarem o trabalho. Bilíngue, remoto de raiz, à vontade no assíncrono.",
      },
    ],
  } satisfies Localized<{ title: string; body: string }[]>,
  since: { year: 2022, month: 12 },
};
