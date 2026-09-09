import type { Localized } from "./types";

/**
 * The former skills checklist, rewritten as how I actually work. Technologies
 * appear only where they carry meaning; the full keyword list stays on the CV.
 */
export type Principle = { id: string; title: Localized; body: Localized };

export const howIWork: Principle[] = [
  {
    id: "stack",
    title: {
      en: "Front end first, whole stack always",
      pt: "Frontend primeiro, stack inteira sempre",
    },
    body: {
      en: "I am strongest in React and TypeScript, on the web with Next.js and on phones with React Native. But a feature is not done at the API boundary, so I write the Django endpoints, the migration and the Celery task too. I would rather own an outcome than a layer.",
      pt: "Sou mais forte em React e TypeScript, na web com Next.js e no celular com React Native. Mas uma feature não termina na fronteira da API, então escrevo também os endpoints Django, a migration e a task Celery. Prefiro ser dono de um resultado a ser dono de uma camada.",
    },
  },
  {
    id: "legacy",
    title: {
      en: "Migrations without stopping the line",
      pt: "Migrações sem parar a linha",
    },
    body: {
      en: "Legacy code pays the bills, so I replace it in slices: one screen at a time, each with tests and Storybook before it ships, while new features keep landing. Big-bang rewrites are how migrations die.",
      pt: "Código legado paga as contas, então eu o substituo em fatias: uma tela por vez, cada uma com testes e Storybook antes de ir ao ar, enquanto features novas continuam saindo. Reescritas big-bang é como migrações morrem.",
    },
  },
  {
    id: "safety",
    title: {
      en: "Tests and CI are the safety net",
      pt: "Testes e CI são a rede de segurança",
    },
    body: {
      en: "Unit tests where the logic lives, end-to-end tests where the user lives, and a pipeline that refuses type errors, known vulnerabilities and missing migrations. A green check should mean something.",
      pt: "Testes unitários onde vive a lógica, testes end-to-end onde vive o usuário, e uma pipeline que recusa erros de tipo, vulnerabilidades conhecidas e migrations faltando. Um check verde deve significar algo.",
    },
  },
  {
    id: "production",
    title: {
      en: "Calm when production is not",
      pt: "Calmo quando a produção não está",
    },
    body: {
      en: "When something breaks for real users I go looking for the root cause, not the quickest patch, then write down what happened and what stops it happening again. Incidents are the best documentation you never wanted.",
      pt: "Quando algo quebra para usuários reais eu vou atrás da causa raiz, não do remendo mais rápido, e depois documento o que aconteceu e o que impede que aconteça de novo. Incidentes são a melhor documentação que você nunca quis.",
    },
  },
  {
    id: "product",
    title: { en: "Product in the loop", pt: "Produto no circuito" },
    body: {
      en: "I work directly with product managers and designers, turn Figma into interfaces that feel finished, and write the discovery documents and tickets that let other people pick up the work. Specs are a form of kindness.",
      pt: "Trabalho direto com gerentes de produto e designers, transformo Figma em interfaces com cara de terminadas e escrevo as discoveries e os tickets que permitem outras pessoas pegarem o trabalho. Spec é uma forma de gentileza.",
    },
  },
  {
    id: "remote",
    title: { en: "Remote by default", pt: "Remoto por padrão" },
    body: {
      en: "Years of working from São Paulo on London time in English-speaking teams. I write things down, over-communicate in async channels, and treat time zones as a scheduling problem, not an excuse.",
      pt: "Anos trabalhando de São Paulo no horário de Londres em times que falam inglês. Deixo as coisas escritas, comunico demais nos canais assíncronos e trato fuso horário como um problema de agenda, não como desculpa.",
    },
  },
];
