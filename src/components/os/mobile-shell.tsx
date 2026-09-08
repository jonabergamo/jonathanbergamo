"use client";

import * as React from "react";
import { useShallow } from "zustand/react/shallow";
import { AnimatePresence, motion } from "motion/react";
import { Home, LayoutGrid, X } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/utils";
import { useWindowStore, selectRunning } from "@/store/window-store";
import type { WindowId } from "@/store/window-defaults";
import { WINDOW_LIST, WINDOW_REGISTRY } from "./window-registry";
import { Wallpaper } from "./wallpaper";
import { WindowSkeleton } from "./window-skeleton";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Download, RotateCcw } from "lucide-react";

/**
 * Phone edition of the OS. Same store: "open" windows are running apps, the
 * top of `order` is the one on screen. Windows render as full-screen sheets.
 */
export function MobileShell() {
  const { t, locale } = useI18n();
  const running = useWindowStore(useShallow(selectRunning));
  const windows = useWindowStore((s) => s.windows);
  const order = useWindowStore((s) => s.order);
  const open = useWindowStore((s) => s.open);
  const minimize = useWindowStore((s) => s.minimize);
  const close = useWindowStore((s) => s.close);
  const restore = useWindowStore((s) => s.restore);
  const resetLayout = useWindowStore((s) => s.resetLayout);
  const reduced = useReducedMotion();
  const [menu, setMenu] = React.useState(false);
  // Every visit starts on the home screen; running apps stay running behind it.
  const [home, setHome] = React.useState(true);

  const top =
    [...order].reverse().find((id) => windows[id].status === "open") ?? null;
  const current = home ? null : top;
  const goHome = () => {
    setHome(true);
    setMenu(false);
  };
  const launch = (id: WindowId) => {
    open(id);
    setHome(false);
    setMenu(false);
  };

  const visibleTabs = running.slice(0, 4);

  return (
    <div
      className="relative h-dvh w-full overflow-hidden"
      data-testid="mobile-shell"
    >
      <Wallpaper variant="mobile" />

      {/* Home screen */}
      <div className="absolute inset-x-0 top-0 bottom-16 flex flex-col justify-end px-5 pb-4">
        <p className="text-muted-foreground mb-2 text-xs">
          {t("mobile.homeHint")}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {WINDOW_LIST.map((w) => {
            const Icon = w.icon;
            return (
              <button
                key={w.id}
                type="button"
                data-testid={`icon-${w.id}`}
                onClick={() => launch(w.id)}
                className="border-brand-navy bg-card text-card-foreground shadow-hard flex flex-col items-center gap-1.5 rounded-lg border-2 p-3 active:translate-x-px active:translate-y-px active:shadow-none"
              >
                <Icon
                  className="text-brand-navy dark:text-brand-blue size-6"
                  strokeWidth={1.8}
                />
                <span className="text-xs font-medium">{t(w.titleKey)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current app sheet */}
      <AnimatePresence initial={false}>
        {current && (
          <motion.section
            key={current}
            role="dialog"
            aria-labelledby={`${current}-title`}
            data-testid={`sheet-${current}`}
            initial={reduced ? { opacity: 0 } : { y: "100%" }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            className="bg-card text-card-foreground absolute inset-x-0 top-0 bottom-16 z-20 flex flex-col"
          >
            <div className="bg-titlebar text-titlebar-foreground flex h-12 shrink-0 items-center gap-2 pr-2 pl-4">
              {React.createElement(WINDOW_REGISTRY[current].icon, {
                className: "size-4",
                "aria-hidden": true,
              })}
              <h2
                id={`${current}-title`}
                className="font-display flex-1 truncate text-sm font-semibold"
              >
                {t(WINDOW_REGISTRY[current].titleKey)}
              </h2>
              <button
                type="button"
                aria-label={t("os.close")}
                data-testid="sheet-close"
                onClick={() => close(current)}
                className="hover:bg-brand-red inline-flex size-9 items-center justify-center rounded-md"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <React.Suspense fallback={<WindowSkeleton />}>
                {React.createElement(WINDOW_REGISTRY[current].component)}
              </React.Suspense>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Start sheet */}
      <AnimatePresence>
        {menu && (
          <>
            <motion.button
              type="button"
              aria-label={t("os.close")}
              className="bg-brand-navy/40 absolute inset-0 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenu(false)}
            />
            <motion.div
              role="menu"
              data-testid="mobile-start-menu"
              initial={reduced ? { opacity: 0 } : { y: "100%" }}
              animate={reduced ? { opacity: 1 } : { y: 0 }}
              exit={reduced ? { opacity: 0 } : { y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              className="border-brand-navy bg-card text-card-foreground absolute inset-x-0 bottom-16 z-40 rounded-t-xl border-2 border-b-0 p-3"
            >
              <p className="font-display px-2 pb-2 text-base font-bold">
                {profile.shortName}
              </p>
              <div className="grid grid-cols-2 gap-1">
                {WINDOW_LIST.map((w) => {
                  const Icon = w.icon;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      role="menuitem"
                      data-testid={`mstart-${w.id}`}
                      onClick={() => launch(w.id)}
                      className="hover:bg-accent flex items-center gap-2 rounded-md px-2 py-2 text-left text-sm"
                    >
                      <Icon className="text-brand-navy dark:text-brand-blue size-4" />
                      {t(w.titleKey)}
                    </button>
                  );
                })}
              </div>
              <div className="bg-border my-2 h-px" />
              <div className="flex flex-wrap items-center gap-2 px-1">
                <LanguageToggle tone="surface" />
                <span className="bg-brand-navy rounded-md">
                  <ThemeToggle />
                </span>
                <a
                  href={profile.cv[locale]}
                  download
                  className="bg-muted inline-flex h-8 items-center gap-2 rounded-md px-3 text-xs font-medium"
                >
                  <Download className="size-3.5" /> {t("os.downloadCv")}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    resetLayout();
                    setMenu(false);
                  }}
                  className="bg-muted inline-flex h-8 items-center gap-2 rounded-md px-3 text-xs font-medium"
                >
                  <RotateCcw className="size-3.5" /> {t("os.resetLayout")}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom nav */}
      <nav
        aria-label={t("os.system")}
        data-testid="bottom-nav"
        className="pb-safe border-brand-navy/40 bg-taskbar text-taskbar-foreground absolute inset-x-0 bottom-0 z-50 flex h-16 items-stretch border-t-2"
      >
        <NavButton
          label={t("os.home")}
          active={!current && !menu}
          onClick={goHome}
          testId="nav-home"
        >
          <Home className="size-5" />
        </NavButton>
        {visibleTabs.map((id) => {
          const Icon = WINDOW_REGISTRY[id].icon;
          const active = current === id;
          return (
            <NavButton
              key={id}
              label={t(WINDOW_REGISTRY[id].titleKey)}
              active={active}
              onClick={() => {
                if (active) {
                  minimize(id);
                  setHome(true);
                } else {
                  restore(id);
                  setHome(false);
                }
              }}
              testId={`nav-${id}`}
            >
              <Icon className="size-5" />
            </NavButton>
          );
        })}
        <NavButton
          label={t("os.start")}
          active={menu}
          onClick={() => setMenu((v) => !v)}
          testId="nav-start"
        >
          <LayoutGrid className="size-5" />
        </NavButton>
      </nav>
    </div>
  );
}

function NavButton({
  label,
  active,
  onClick,
  children,
  testId,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  testId?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? "page" : undefined}
      data-testid={testId}
      onClick={onClick}
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium",
        active ? "text-brand-cream" : "text-taskbar-foreground/60",
      )}
    >
      {children}
      <span className="max-w-full truncate px-1">{label}</span>
      <span
        aria-hidden
        className={cn(
          "mt-0.5 h-0.5 w-6 rounded-full",
          active ? "bg-brand-red" : "bg-transparent",
        )}
      />
    </button>
  );
}
