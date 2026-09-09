import type { Localized } from "./types";
import type { WindowId } from "@/store/window-defaults";

/**
 * What I'm up to right now. Edit freely and bump `updated`; this is the one
 * window that is meant to change often.
 */
export type NowItem = {
  id: string;
  label: Localized;
  body: Localized;
  /** Optional window to open from this item. */
  open?: WindowId;
};

export const now = {
  updated: "2026-09-09",
  items: [
    {
      id: "building",
      label: { en: "Building", pt: "Construindo" },
      body: {
        en: "This site. A desktop OS in the browser, a 3D version of me, and more widgets than strictly necessary.",
        pt: "Este site. Um sistema operacional no navegador, uma versão 3D de mim e mais widgets do que o estritamente necessário.",
      },
      open: "projects",
    },
    {
      id: "looking",
      label: { en: "Looking for", pt: "Procurando" },
      body: {
        en: "The next remote full-stack or frontend role. English or Portuguese teams, product-minded, ships often.",
        pt: "A próxima vaga remota full-stack ou frontend. Times em inglês ou português, com cabeça de produto, que entregam com frequência.",
      },
      open: "contact",
    },
    {
      id: "listening",
      label: { en: "Listening to", pt: "Ouvindo" },
      body: {
        en: "The playlist in the player on the desktop. Press play and watch what happens.",
        pt: "A playlist do player na área de trabalho. Dê play e veja o que acontece.",
      },
    },
    {
      id: "shooting",
      label: { en: "Shooting", pt: "Fotografando" },
      body: {
        en: "Street and travel frames, mostly on walks around São Paulo. New ones land in the Photography window.",
        pt: "Cenas de rua e viagem, quase sempre em caminhadas por São Paulo. As novas aparecem na janela Fotografia.",
      },
      open: "photography",
    },
    {
      id: "where",
      label: { en: "Where", pt: "Onde" },
      body: {
        en: "São Paulo, working London hours. Coffee level on the desktop is accurate.",
        pt: "São Paulo, no horário de Londres. O nível de café na área de trabalho é preciso.",
      },
    },
  ] satisfies NowItem[],
};
