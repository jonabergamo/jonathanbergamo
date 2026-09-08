"use client";

import { useTheme } from "next-themes";
import {
  parseTheme,
  themeId,
  type Mode,
  type PaletteId,
} from "@/data/palettes";

/** Palette + light/dark mode on top of next-themes' single theme string. */
export function usePalette() {
  const { theme, setTheme } = useTheme();
  const { palette, mode } = parseTheme(theme);
  return {
    palette,
    mode,
    setPalette: (p: PaletteId) => setTheme(themeId(p, mode)),
    setMode: (m: Mode) => setTheme(themeId(palette, m)),
    toggleMode: () =>
      setTheme(themeId(palette, mode === "dark" ? "light" : "dark")),
  };
}
