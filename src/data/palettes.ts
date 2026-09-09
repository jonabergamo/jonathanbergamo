export type PaletteId =
  | "slate"
  | "natoora"
  | "graphite"
  | "forest"
  | "plum"
  | "sand"
  | "midnight"
  | "rose"
  | "mono";
export type Mode = "light" | "dark";

export type Palette = {
  id: PaletteId;
  name: { en: string; pt: string };
  /** ink, mid, paper, accent, deep, in the same order as the CSS in globals.css. */
  swatches: [string, string, string, string, string];
};

// Hex values are duplicated from src/app/globals.css on purpose: CSS needs them
// before hydration, and the picker needs them as data.
export const PALETTES: Palette[] = [
  {
    id: "slate",
    name: { en: "Slate & teal", pt: "Ardósia e turquesa" },
    swatches: ["#1b2430", "#7c9bb5", "#f1f4f7", "#0e7c86", "#0a4f56"],
  },
  {
    id: "natoora",
    name: { en: "Cream & navy", pt: "Creme e marinho" },
    swatches: ["#003049", "#669bbc", "#fdf0d5", "#c1121f", "#780000"],
  },
  {
    id: "graphite",
    name: { en: "Graphite", pt: "Grafite" },
    swatches: ["#14110f", "#7e7f83", "#f3f3f4", "#d9c5b2", "#34312d"],
  },
  {
    id: "forest",
    name: { en: "Forest & rust", pt: "Floresta e ferrugem" },
    swatches: ["#1f3a2a", "#8bbf9f", "#f3f6ee", "#c2541b", "#7a3410"],
  },
  {
    id: "plum",
    name: { en: "Plum", pt: "Ameixa" },
    swatches: ["#2a1b33", "#a68bbf", "#f7f1e9", "#8a2f5b", "#5a1c3b"],
  },
  {
    id: "sand",
    name: { en: "Sand & olive", pt: "Areia e oliva" },
    swatches: ["#3a2e26", "#c2a878", "#f8f2e7", "#6b7f2a", "#46531b"],
  },
  {
    id: "midnight",
    name: { en: "Midnight & gold", pt: "Meia-noite e ouro" },
    swatches: ["#0d1b3d", "#5aa9e6", "#eef2f9", "#d4a017", "#8f6b0f"],
  },
  {
    id: "rose",
    name: { en: "Rose", pt: "Rosé" },
    swatches: ["#3a2430", "#d69fb4", "#fcf4f6", "#c43e63", "#86294a"],
  },
  {
    id: "mono",
    name: { en: "Paper & ink", pt: "Papel e tinta" },
    swatches: ["#111111", "#8a8a8a", "#ffffff", "#111111", "#000000"],
  },
];

export const DEFAULT_PALETTE: PaletteId = "slate";
export const THEMES = PALETTES.flatMap((p) => [
  `${p.id}-light`,
  `${p.id}-dark`,
]);

export function parseTheme(theme: string | undefined): {
  palette: PaletteId;
  mode: Mode;
} {
  const [palette, mode] = (theme ?? "").split("-");
  const known = PALETTES.some((p) => p.id === palette);
  return {
    palette: known ? (palette as PaletteId) : DEFAULT_PALETTE,
    mode: mode === "dark" ? "dark" : "light",
  };
}

export function themeId(palette: PaletteId, mode: Mode) {
  return `${palette}-${mode}`;
}
