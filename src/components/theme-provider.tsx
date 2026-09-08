"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { THEMES } from "@/data/palettes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="natoora-light"
      themes={THEMES}
      enableSystem={false}
      disableTransitionOnChange
      storageKey="jb-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
