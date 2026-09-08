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
    en: "I build products end to end: Django and DRF services, React and React Native apps, and the CI that keeps them honest. At Natoora I build features across internal systems and customer-facing apps for a global food-tech company. I like the unglamorous work too: finding root causes in production, migrating legacy code, writing the discovery that defines the next sprint.",
    pt: "Construo produtos de ponta a ponta: serviços Django e DRF, apps React e React Native, e a CI que mantém tudo honesto. Na Natoora construo features em sistemas internos e apps voltados ao cliente para uma empresa global de food-tech. Também gosto do trabalho sem glamour: achar a causa raiz em produção, migrar código legado, escrever a discovery que define o próximo sprint.",
  } satisfies Localized,
  traits: {
    en: [
      {
        title: "Whole stack, whole feature",
        body: "From the migration and the Celery task to the screen and its tests. I would rather own the outcome than a layer.",
      },
      {
        title: "Calm in production",
        body: "When something breaks in production, I go find the root cause, fix it, and write down how it will not happen again.",
      },
      {
        title: "Writes it down",
        body: "Discoveries, specs and docs that let other people pick up the work. Bilingual, remote-first, Slack-native.",
      },
    ],
    pt: [
      {
        title: "Stack inteira, feature inteira",
        body: "Da migration e da task Celery até a tela e seus testes. Prefiro ser dono do resultado a ser dono de uma camada.",
      },
      {
        title: "Calmo em produção",
        body: "Quando algo quebra em produção, vou atrás da causa raiz, corrijo e documento como não vai acontecer de novo.",
      },
      {
        title: "Deixa escrito",
        body: "Discoveries, specs e docs que permitem outras pessoas pegarem o trabalho. Bilíngue, remoto de raiz, fluente em Slack.",
      },
    ],
  } satisfies Localized<{ title: string; body: string }[]>,
  since: { year: 2022, month: 12 },
};
