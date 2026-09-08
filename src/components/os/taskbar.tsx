"use client";

import * as React from "react";
import { useShallow } from "zustand/react/shallow";
import { RotateCcw } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/utils";
import { useWindowStore, selectRunning } from "@/store/window-store";
import { WINDOW_REGISTRY } from "./window-registry";
import { StartMenu } from "./start-menu";
import { Clock } from "./clock";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Taskbar() {
  const { t } = useI18n();
  const running = useWindowStore(useShallow(selectRunning));
  const windows = useWindowStore((s) => s.windows);
  const focused = useWindowStore((s) => s.focused);
  const taskbarClick = useWindowStore((s) => s.taskbarClick);
  const resetLayout = useWindowStore((s) => s.resetLayout);

  return (
    <div
      role="toolbar"
      aria-label={t("os.system")}
      data-testid="taskbar"
      className="border-brand-navy/40 bg-taskbar text-taskbar-foreground absolute inset-x-0 bottom-0 z-[100] flex h-12 items-center gap-2 border-t-2 px-2"
    >
      <StartMenu />
      <div className="bg-taskbar-foreground/20 mx-1 h-6 w-px" />
      <div
        className="no-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto"
        aria-label={t("os.running")}
      >
        {running.map((id) => {
          const meta = WINDOW_REGISTRY[id];
          const Icon = meta.icon;
          const state = windows[id];
          const active = focused === id && state.status === "open";
          return (
            <button
              key={id}
              type="button"
              data-testid={`task-${id}`}
              data-active={active}
              data-minimized={state.status === "minimized"}
              aria-pressed={active}
              onClick={() => taskbarClick(id)}
              className={cn(
                "focus-visible:outline-brand-blue relative flex h-9 shrink-0 items-center gap-2 rounded-md px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
                active
                  ? "bg-taskbar-foreground/15"
                  : "hover:bg-taskbar-foreground/10",
                state.status === "minimized" && "text-taskbar-foreground/60",
              )}
            >
              <Icon className="size-4" aria-hidden />
              <span className="hidden font-medium sm:inline">
                {t(meta.titleKey)}
              </span>
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-3 bottom-0.5 h-0.5 rounded-full",
                  active ? "bg-brand-red" : "bg-taskbar-foreground/40",
                )}
              />
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-1">
        <LanguageToggle />
        <ThemeToggle />
        <Tooltip>
          <TooltipTrigger
            render={
              <button
                type="button"
                aria-label={t("os.resetLayout")}
                data-testid="reset-layout"
                onClick={resetLayout}
                className="text-taskbar-foreground/80 hover:bg-taskbar-foreground/10 hover:text-taskbar-foreground focus-visible:outline-brand-blue inline-flex size-9 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              />
            }
          >
            <RotateCcw className="size-4" />
          </TooltipTrigger>
          <TooltipContent>{t("os.resetLayout")}</TooltipContent>
        </Tooltip>
        <Clock />
      </div>
    </div>
  );
}
