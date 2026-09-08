"use client";

import { useI18n } from "@/i18n/context";
import { useWindowStore } from "@/store/window-store";
import { WINDOW_LIST } from "./window-registry";
import { DesktopIcon } from "./desktop-icon";

export function DesktopIcons() {
  const { t } = useI18n();
  const windows = useWindowStore((s) => s.windows);
  const open = useWindowStore((s) => s.open);
  return (
    <nav
      aria-label={t("os.windowMenu")}
      className="absolute top-3 left-2 z-[5] flex flex-col gap-1"
    >
      {WINDOW_LIST.filter((w) => w.desktop).map((w) => (
        <DesktopIcon
          key={w.id}
          testId={`icon-${w.id}`}
          label={t(w.titleKey)}
          icon={w.icon}
          running={windows[w.id].status !== "closed"}
          onOpen={() => open(w.id)}
        />
      ))}
    </nav>
  );
}
