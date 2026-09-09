import type { Localized } from "./types";

/** Things I used to ship and happily deleted. */
export type RecycledItem = {
  id: string;
  name: string;
  kind: Localized;
  deleted: string;
  size: string;
  reason: Localized;
};

export const recycled: RecycledItem[] = [
  {
    id: "angularjs",
    name: "angularjs-1.x",
    kind: { en: "Framework", pt: "Framework" },
    deleted: "2025",
    size: "1.4 GB",
    reason: {
      en: "Migrated page by page to React. $scope has left the building.",
      pt: "Migrado tela a tela para React. O $scope foi embora e não deixou recado.",
    },
  },
  {
    id: "bower",
    name: "bower_components",
    kind: { en: "Package manager", pt: "Gerenciador de pacotes" },
    deleted: "2025",
    size: "612 MB",
    reason: {
      en: "One lockfile is enough. pnpm took the job.",
      pt: "Um lockfile basta. O pnpm assumiu o cargo.",
    },
  },
  {
    id: "proptypes",
    name: "PropTypes.js",
    kind: {
      en: "Almost type checking",
      pt: "Quase checagem de tipos",
    },
    deleted: "2025",
    size: "38 MB",
    reason: {
      en: "Replaced by TypeScript. Warnings in the console were never a type system.",
      pt: "Substituído por TypeScript. Avisos no console nunca foram um sistema de tipos.",
    },
  },
  {
    id: "class-components",
    name: "class-components.jsx",
    kind: { en: "Pattern", pt: "Padrão" },
    deleted: "2024",
    size: "97 MB",
    reason: {
      en: "Hooks won. componentDidMount and I had a good run.",
      pt: "Os hooks venceram. Eu e o componentDidMount tivemos bons momentos.",
    },
  },
  {
    id: "any",
    name: "any.ts",
    kind: { en: "Type", pt: "Tipo" },
    deleted: "2025",
    size: "∞",
    reason: {
      en: "If everything is any, nothing is typed. Now the CI refuses it.",
      pt: "Se tudo é any, nada é tipado. Agora a CI recusa.",
    },
  },
  {
    id: "spreadsheet",
    name: "on-call-rotation.xlsx",
    kind: {
      en: "Spreadsheet as a database",
      pt: "Planilha como banco de dados",
    },
    deleted: "2026",
    size: "2.1 MB",
    reason: {
      en: "Became a real app with rules the computer enforces. See Projects.",
      pt: "Virou um app de verdade com regras que o computador garante. Veja em Projetos.",
    },
  },
  {
    id: "jquery",
    name: "jquery.min.js",
    kind: { en: "Library", pt: "Biblioteca" },
    deleted: "2023",
    size: "87 KB",
    reason: {
      en: "Thank you for everything. document.querySelector has it from here.",
      pt: "Obrigado por tudo. O document.querySelector assume daqui.",
    },
  },
];
