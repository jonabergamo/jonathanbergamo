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
    | "aperture"
    | "dumbbell"
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
  updated: "2026-09-19",
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
      id: "training",
      icon: "dumbbell",
      label: { en: "Training", pt: "Treinando" },
      value: {
        en: "Gym, 5 weeks straight",
        pt: "Academia, 5 semanas seguidas",
      },
      body: {
        en: "Five weeks without skipping a session. The streak is the whole point.",
        pt: "Cinco semanas sem furar nenhum treino. A sequência é o que importa.",
      },
    },
    {
      id: "camera",
      icon: "aperture",
      label: { en: "In the bag", pt: "Na mochila" },
      value: { en: "Nikon D3100, 35mm lens", pt: "Nikon D3100, lente 35mm" },
      body: {
        en: "An old DSLR and one prime lens. No zoom, so I walk until the frame is right.",
        pt: "Uma DSLR antiga e uma única lente fixa. Sem zoom, então eu ando até o enquadramento ficar certo.",
      },
      open: "photography",
    },
    {
      id: "building",
      icon: "hammer",
      label: { en: "Building", pt: "Construindo" },
      value: { en: "Kilobyte", pt: "Kilobyte" },
      body: {
        en: "Turning my 2023 college store into a real one. Next.js 16, Drizzle on Postgres, Stripe Checkout in test mode and a manager area.",
        pt: "Transformando minha loja da faculdade de 2023 numa loja de verdade. Next.js 16, Drizzle no Postgres, Stripe Checkout em modo de teste e uma área de gerente.",
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
