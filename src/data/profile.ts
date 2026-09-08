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
    en: "Results-driven full-stack software engineer with over three years of experience architecting and deploying scalable web, mobile and distributed applications. Strong in the React and TypeScript ecosystem (Next.js, React Native) and in backend development with Node.js (NestJS), Python (Django) and Java. A track record of leading technical migrations, automating CI/CD pipelines and delivering features in high-scale environments, working in global, remote, English-speaking teams with a focus on software craftsmanship, clean architecture and SOLID principles.",
    pt: "Engenheiro de software full-stack orientado a resultados, com mais de três anos de experiência arquitetando e publicando aplicações web, mobile e distribuídas escaláveis. Forte no ecossistema React e TypeScript (Next.js, React Native) e no backend com Node.js (NestJS), Python (Django) e Java. Histórico de liderar migrações técnicas, automatizar pipelines de CI/CD e entregar features em ambientes de alta escala, trabalhando em times globais, remotos e em inglês, com foco em software craftsmanship, arquitetura limpa e princípios SOLID.",
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
