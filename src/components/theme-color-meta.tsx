"use client";

import * as React from "react";
import { useTheme } from "next-themes";

/**
 * Keeps <meta name="theme-color"> equal to the taskbar colour of the active
 * palette, so Safari's toolbars (and Android's status bar) match the bars of
 * the desktop instead of showing a light strip under the bottom navigation.
 */
export function ThemeColorMeta() {
  const { theme } = useTheme();
  React.useEffect(() => {
    void theme;
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--taskbar")
      .trim();
    if (!color) return;
    // color-mix() strings are fine for CSS but not for the meta tag; resolve
    // them through a probe element.
    const probe = document.createElement("div");
    probe.style.color = color;
    probe.style.display = "none";
    document.body.appendChild(probe);
    const resolved = getComputedStyle(probe).color;
    probe.remove();
    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = resolved || color;
  }, [theme]);
  return null;
}
