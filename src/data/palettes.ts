export type PaletteId = "natoora" | "graphite" | "forest" | "slate" | "plum";
export type Mode = "light" | "dark";

export type Palette = {
  id: PaletteId;
  name: { en: string; pt: string };
  /** ink, mid, paper, accent, deep — same order as the CSS in globals.css. */
  swatches: [string, string, string, string, string];
};

// Hex values are duplicated from src/app/globals.css on purpose: CSS needs them
// before hydration, and the picker needs them as data.
export const PALETTES: Palette[] = [
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
    name: { en: "Forest & brick", pt: "Floresta e tijolo" },
    swatches: ["#1e2d24", "#7fa08a", "#f2efe6", "#b3402e", "#6e2418"],
  },
  {
    id: "slate",
    name: { en: "Slate & teal", pt: "Ardósia e turquesa" },
    swatches: ["#1b2430", "#7c9bb5", "#f1f4f7", "#0e7c86", "#0a4f56"],
  },
  {
    id: "plum",
    name: { en: "Plum", pt: "Ameixa" },
    swatches: ["#2a1b33", "#a68bbf", "#f7f1e9", "#8a2f5b", "#5a1c3b"],
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
