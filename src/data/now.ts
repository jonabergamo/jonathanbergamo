import type { Localized } from "./types";
import type { WindowId } from "@/store/window-defaults";

/**
 * What I'm up to right now. Edit freely and bump `updated`; this is the one
 * window that is meant to change often.
 */
export type NowItem = {
  id: string;
  icon:
    | "book"
    | "gamepad"
    | "cube"
    | "music"
    | "camera"
    | "hammer"
    | "search"
    | "pin";
  label: Localized;
  /** The headline: a title, a number, a place. */
  value: Localized;
  body: Localized;
  /** Optional window to open from this item. */
  open?: WindowId;
};

export const now = {
  updated: "2026-09-09",
  items: [
    {
      id: "reading",
      icon: "book",
      label: { en: "Reading", pt: "Lendo" },
      value: { en: "The Fellowship of the Ring", pt: "A Sociedade do Anel" },
      body: {
        en: "J. R. R. Tolkien. Book one of three. The hobbits have barely left the Shire.",
        pt: "J. R. R. Tolkien. Livro um de três. Os hobbits mal saíram do Condado.",
      },
    },
    {
      id: "playing",
      icon: "gamepad",
      label: { en: "Playing", pt: "Jogando" },
      value: { en: "Red Dead Redemption 2", pt: "Red Dead Redemption 2" },
      body: {
        en: "Slowly. Mostly riding around and petting horses.",
        pt: "Devagar. Principalmente cavalgando por aí e fazendo carinho nos cavalos.",
      },
    },
    {
      id: "cube",
      icon: "cube",
      label: { en: "Rubik's cube PB", pt: "Recorde no cubo mágico" },
      value: { en: "58 s", pt: "58 s" },
      body: {
        en: "Personal best on a 3×3. The goal is under a minute every time, not once.",
        pt: "Recorde pessoal no 3×3. A meta é fechar abaixo de um minuto sempre, não só uma vez.",
      },
    },
    {
      id: "listening",
      icon: "music",
      label: { en: "Listening to", pt: "Ouvindo" },
      value: { en: "This is Jonathan Bergamo", pt: "This is Jonathan Bergamo" },
      body: {
        en: "The playlist in the player on the desktop. Press play and watch what he does.",
        pt: "A playlist do player na área de trabalho. Dê play e veja o que ele faz.",
      },
    },
    {
      id: "shooting",
      icon: "camera",
      label: { en: "Shooting", pt: "Fotografando" },
      value: { en: "São Paulo streets", pt: "Ruas de São Paulo" },
      body: {
        en: "Street and travel photos from walks around the city. New ones show up in the Photography window.",
        pt: "Cenas de rua e viagem em caminhadas pela cidade. As novas aparecem na janela Fotografia.",
      },
      open: "photography",
    },
    {
      id: "building",
      icon: "hammer",
      label: { en: "Building", pt: "Construindo" },
      value: { en: "This site", pt: "Este site" },
      body: {
        en: "A desktop in the browser, a 3D version of me, and more widgets than anyone needs.",
        pt: "Uma área de trabalho no navegador, uma versão 3D de mim e mais widgets do que qualquer pessoa precisa.",
      },
      open: "projects",
    },
    {
      id: "where",
      icon: "pin",
      label: { en: "Where", pt: "Onde" },
      value: {
        en: "São Paulo, on London time",
        pt: "São Paulo, no horário de Londres",
      },
      body: {
        en: "The coffee level on the desktop is accurate.",
        pt: "O medidor de café na área de trabalho não mente.",
      },
    },
  ] satisfies NowItem[],
};
