export type PaletteId = "natoora" | "sunset" | "amber" | "harbor" | "graphite";
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
    id: "sunset",
    name: { en: "Sunset", pt: "Pôr do sol" },
    swatches: ["#264653", "#2a9d8f", "#e9c46a", "#e76f51", "#f4a261"],
  },
  {
    id: "amber",
    name: { en: "Amber", pt: "Âmbar" },
    swatches: ["#14213d", "#e5e5e5", "#ffffff", "#fca311", "#000000"],
  },
  {
    id: "harbor",
    name: { en: "Harbor", pt: "Porto" },
    swatches: ["#0b2545", "#8da9c4", "#eef4ed", "#134074", "#13315c"],
  },
  {
    id: "graphite",
    name: { en: "Graphite", pt: "Grafite" },
    swatches: ["#14110f", "#7e7f83", "#f3f3f4", "#d9c5b2", "#34312d"],
  },
];

export const DEFAULT_PALETTE: PaletteId = "natoora";
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
