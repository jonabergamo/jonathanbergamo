"use client";

import * as React from "react";
import { Maximize2, Minimize2, Minus, X, type LucideIcon } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  title: string;
  icon: LucideIcon;
  maximized: boolean;
  focused: boolean;
  draggable: boolean;
  onPointerDown?: (e: React.PointerEvent) => void;
  onDoubleClick?: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
  onNudge?: (dx: number, dy: number) => void;
};

export function WindowTitleBar({
  id,
  title,
  icon: Icon,
  maximized,
  focused,
  draggable,
  onPointerDown,
  onDoubleClick,
  onMinimize,
  onToggleMaximize,
  onClose,
  onNudge,
}: Props) {
  const { t } = useI18n();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!onNudge || maximized) return;
    const step = e.shiftKey ? 50 : 10;
    const map: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const d = map[e.key];
    if (d) {
      e.preventDefault();
      onNudge(d[0], d[1]);
    }
  };

  return (
    <div
      data-window-titlebar
      className={cn(
        "text-titlebar-foreground flex h-10 shrink-0 items-center gap-2 pr-1 pl-3 select-none",
        focused ? "bg-titlebar" : "bg-titlebar/80",
        draggable && !maximized && "cursor-grab active:cursor-grabbing",
      )}
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
    >
      <Icon className="size-4 shrink-0 opacity-90" aria-hidden />
      <h2
        id={`${id}-title`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="font-display focus-visible:decoration-brand-mid min-w-0 flex-1 truncate text-sm font-semibold tracking-tight outline-none focus-visible:underline focus-visible:decoration-2 focus-visible:underline-offset-4"
      >
        {title}
      </h2>
      <div
        className="flex items-center"
        onPointerDown={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        <TitleButton
          label={t("os.minimize")}
          onClick={onMinimize}
          testId="win-minimize"
        >
          <Minus className="size-3.5" />
        </TitleButton>
        <TitleButton
          label={maximized ? t("os.restore") : t("os.maximize")}
          onClick={onToggleMaximize}
          testId="win-maximize"
        >
          {maximized ? (
            <Minimize2 className="size-3.5" />
          ) : (
            <Maximize2 className="size-3.5" />
          )}
        </TitleButton>
        <TitleButton
          label={t("os.close")}
          onClick={onClose}
          danger
          testId="win-close"
        >
          <X className="size-4" />
        </TitleButton>
      </div>
    </div>
  );
}

function TitleButton({
  label,
  onClick,
  danger,
  children,
  testId,
}: {
  label: string;
  onClick: () => void;
  danger?: boolean;
  children: React.ReactNode;
  testId?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      data-testid={testId}
      onClick={onClick}
      className={cn(
        "focus-visible:outline-brand-mid inline-flex size-8 items-center justify-center rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
        danger
          ? "hover:bg-brand-accent hover:text-brand-paper"
          : "hover:bg-titlebar-foreground/15",
      )}
    >
      {children}
    </button>
  );
}
