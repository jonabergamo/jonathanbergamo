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
      pt: "Front end primeiro, stack inteira sempre",
    },
    body: {
      en: "I'm strongest in React and TypeScript, on the web with Next.js and on phones with React Native. But a feature isn't done at the API. I write the Django endpoints, the migration and the background job too. I'd rather own an outcome than a layer.",
      pt: "Sou mais forte em React e TypeScript, na web com Next.js e no celular com React Native. Mas uma feature não termina na API. Eu escrevo também os endpoints Django, a migration e o job em background. Prefiro ser dono de um resultado a ser dono de uma camada.",
    },
  },
  {
    id: "legacy",
    title: {
      en: "Migrations without stopping the line",
      pt: "Migrações sem parar a linha",
    },
    body: {
      en: "Legacy code pays the bills, so I replace it in slices. One screen at a time, each with tests and Storybook before it ships, while new features keep landing. Big rewrites are how migrations die.",
      pt: "Código legado paga as contas, então eu troco em fatias. Uma tela por vez, cada uma com testes e Storybook antes de ir ao ar, enquanto as features novas continuam saindo. Reescrever tudo de uma vez é como as migrações morrem.",
    },
  },
  {
    id: "safety",
    title: {
      en: "Tests and CI are the safety net",
      pt: "Testes e CI são a rede de segurança",
    },
    body: {
      en: "Unit tests where the logic lives, end to end tests where the user lives, and a pipeline that refuses type errors, known vulnerabilities and missing migrations. A green check has to mean something.",
      pt: "Testes unitários onde vive a lógica, testes de ponta a ponta onde vive o usuário, e uma pipeline que recusa erro de tipo, vulnerabilidade conhecida e migration faltando. Um check verde tem que significar algo.",
    },
  },
  {
    id: "production",
    title: {
      en: "Calm when production isn't",
      pt: "Calmo quando a produção não está",
    },
    body: {
      en: "When something breaks for real users I go looking for the root cause, not the quickest patch. Then I write down what happened and what stops it from happening again. Incidents are the best documentation nobody asked for.",
      pt: "Quando algo quebra para usuários de verdade eu vou atrás da causa raiz, não do remendo mais rápido. Depois deixo escrito o que aconteceu e o que impede de acontecer de novo. Incidente é a melhor documentação que ninguém pediu.",
    },
  },
  {
    id: "product",
    title: { en: "Product in the loop", pt: "Produto no circuito" },
    body: {
      en: "I work directly with product managers and designers. I turn Figma into interfaces that feel finished, and I write the discovery docs and tickets that let other people pick up the work. A good spec is a form of kindness.",
      pt: "Trabalho direto com gerentes de produto e designers. Transformo Figma em interfaces com cara de terminadas e escrevo as discoveries e os tickets que deixam outras pessoas pegarem o trabalho. Uma boa spec é uma forma de gentileza.",
    },
  },
  {
    id: "remote",
    title: { en: "Remote by default", pt: "Remoto por padrão" },
    body: {
      en: "Years of working from São Paulo on London time with teams that speak English. I write things down, I say too much in async channels rather than too little, and I treat time zones as a calendar problem, not an excuse.",
      pt: "Anos trabalhando de São Paulo no horário de Londres com times que falam inglês. Deixo as coisas escritas, falo demais nos canais assíncronos em vez de falar de menos, e trato fuso horário como problema de agenda, não como desculpa.",
    },
  },
];
