"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, RotateCcw } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { useWindowStore } from "@/store/window-store";
import { useWidgetStore } from "@/store/widget-store";
import { WINDOW_LIST } from "./window-registry";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function StartMenu() {
  const { t, locale } = useI18n();
  const [open, setOpen] = React.useState(false);
  const openWindow = useWindowStore((s) => s.open);
  const resetWindows = useWindowStore((s) => s.resetLayout);
  const resetWidgets = useWidgetStore((s) => s.reset);
  const resetLayout = () => {
    resetWindows();
    resetWidgets(window.innerWidth, window.innerHeight);
  };
  const windows = useWindowStore((s) => s.windows);
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        data-testid="start-button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "font-display focus-visible:outline-brand-mid flex h-9 items-center gap-2 rounded-md px-3 text-sm font-bold tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
          open
            ? "bg-brand-paper text-brand-ink"
            : "bg-brand-accent text-brand-paper hover:brightness-110",
        )}
      >
        <span className="bg-brand-paper text-brand-accent grid size-5 place-items-center rounded-sm text-[10px] font-black">
          JB
        </span>
        {t("os.start")}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            data-testid="start-menu"
            initial={
              reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            className="border-brand-ink bg-card text-card-foreground shadow-window absolute bottom-12 left-0 w-72 origin-bottom-left overflow-hidden rounded-lg border-2"
          >
            <div className="bg-titlebar text-titlebar-foreground px-4 py-3">
              <p className="font-display text-base leading-tight font-bold">
                {profile.shortName}
              </p>
              <p className="text-xs opacity-80">{t("about.role")}</p>
            </div>
            <div className="p-2">
              <p className="text-muted-foreground px-2 pt-1 pb-1 text-[11px] font-medium">
                {t("os.windowMenu")}
              </p>
              {WINDOW_LIST.map((w) => {
                const Icon = w.icon;
                const running = windows[w.id].status !== "closed";
                return (
                  <button
                    key={w.id}
                    type="button"
                    role="menuitem"
                    data-testid={`start-${w.id}`}
                    onClick={() => {
                      openWindow(w.id);
                      setOpen(false);
                    }}
                    className="hover:bg-accent focus-visible:bg-accent flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm focus-visible:outline-none"
                  >
                    <Icon className="text-brand-ink dark:text-brand-mid size-4" />
                    <span className="flex-1">{t(w.titleKey)}</span>
                    {running && (
                      <span
                        aria-hidden
                        className="bg-brand-accent size-1.5 rounded-full"
                      />
                    )}
                  </button>
                );
              })}
              <div className="bg-border my-2 h-px" />
              <p className="text-muted-foreground px-2 pb-1 text-[11px] font-medium">
                {t("os.system")}
              </p>
              <a
                role="menuitem"
                href={profile.cv[locale]}
                download
                className="hover:bg-accent focus-visible:bg-accent flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm focus-visible:outline-none"
              >
                <Download className="text-brand-ink dark:text-brand-mid size-4" />
                {t("os.downloadCv")}
              </a>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  resetLayout();
                  setOpen(false);
                }}
                className="hover:bg-accent focus-visible:bg-accent flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm focus-visible:outline-none"
              >
                <RotateCcw className="text-brand-ink dark:text-brand-mid size-4" />
                {t("os.resetLayout")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
