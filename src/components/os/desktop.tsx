"use client";

import * as React from "react";
import { useHydrated } from "@/hooks/use-hydrated";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useWindowStore } from "@/store/window-store";
import { cn } from "@/lib/utils";
import { StoreHydrator } from "./store-hydrator";
import { Wallpaper } from "./wallpaper";
import { DesktopIcons } from "./desktop-icons";
import { WindowLayer } from "./window-layer";
import { Taskbar } from "./taskbar";
import { WidgetLayer } from "@/components/widgets/widget-layer";
import { MobileShell } from "./mobile-shell";
import { useDesktopKeyboard } from "./use-window-keyboard";
import { useI18n } from "@/i18n/context";

export function Desktop() {
  const hydrated = useHydrated();
  const storeReady = useWindowStore((s) => s.hydrated);
  const isMobile = useIsMobile();
  const ready = hydrated && storeReady;
  useDesktopKeyboard(ready && !isMobile);
  const { t } = useI18n();

  return (
    <main
      className={cn(
        "relative h-dvh w-full overflow-hidden transition-opacity duration-300",
        ready ? "opacity-100" : "opacity-0",
      )}
    >
      <StoreHydrator />
      <h1 className="sr-only">{t("meta.title")}</h1>
      {!ready ? null : isMobile ? (
        <MobileShell />
      ) : (
        <>
          <Wallpaper variant="desktop" />
          <WidgetLayer />
          <DesktopIcons />
          <WindowLayer />
          <Taskbar />
        </>
      )}
    </main>
  );
}
