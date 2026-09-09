"use client";

import { useI18n } from "@/i18n/context";
import { useWindowStore } from "@/store/window-store";
import { WINDOW_LIST, WINDOW_REGISTRY } from "./window-registry";
import { DesktopIcon } from "./desktop-icon";

export function DesktopIcons() {
  const { t } = useI18n();
  const windows = useWindowStore((s) => s.windows);
  const open = useWindowStore((s) => s.open);
  const recycle = WINDOW_REGISTRY.recycle;
  return (
    <>
      <nav
        aria-label={t("os.windowMenu")}
        className="absolute top-2 bottom-14 left-2 z-[5] flex flex-col flex-wrap content-start gap-0.5"
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
      {/* The bin lives where bins live. */}
      <div className="absolute right-3 bottom-14 z-[5]">
        <DesktopIcon
          testId="icon-recycle"
          label={t(recycle.titleKey)}
          icon={recycle.icon}
          running={windows.recycle.status !== "closed"}
          onOpen={() => open("recycle")}
        />
      </div>
    </>
  );
}
