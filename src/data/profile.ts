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
    en: "I build products end to end: Django and DRF services, React and React Native apps, and the CI that keeps them honest. At Natoora I own features across a wholesale ERP, Django microservices and Expo apps used by chefs and home cooks from London to Melbourne. I like the unglamorous work too: root-causing production incidents, migrating legacy code, writing the discovery that defines the next sprint.",
    pt: "Construo produtos de ponta a ponta: serviços Django e DRF, apps React e React Native, e a CI que mantém tudo honesto. Na Natoora sou dono de features em um ERP de atacado, microsserviços Django e apps Expo usados por chefs e cozinheiros de casa de Londres a Melbourne. Também gosto do trabalho sem glamour: achar a causa raiz de incidentes em produção, migrar código legado, escrever a discovery que define o próximo sprint.",
  } satisfies Localized,
  traits: {
    en: [
      {
        title: "Whole stack, whole feature",
        body: "From the migration and the Celery task to the screen and its tests. I would rather own the outcome than a layer.",
      },
      {
        title: "Calm in production",
        body: "When prices are wrong or invoices will not send, I go find the root cause, fix it, and write down how it will not happen again.",
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
        body: "Quando os preços estão errados ou a fatura não sai, vou atrás da causa raiz, corrijo e documento como não vai acontecer de novo.",
      },
      {
        title: "Deixa escrito",
        body: "Discoveries, specs e docs que permitem outras pessoas pegarem o trabalho. Bilíngue, remoto de raiz, fluente em Slack.",
      },
    ],
  } satisfies Localized<{ title: string; body: string }[]>,
  since: { year: 2022, month: 12 },
};
