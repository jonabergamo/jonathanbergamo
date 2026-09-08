"use client";

import * as React from "react";
import { useWindowStore } from "@/store/window-store";

/** Desktop-wide shortcuts: Ctrl+` cycles windows. */
export function useDesktopKeyboard(enabled: boolean) {
  const cycleFocus = useWindowStore((s) => s.cycleFocus);
  React.useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        cycleFocus(e.shiftKey ? -1 : 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, cycleFocus]);
}
