"use client";

import * as React from "react";
import { GripHorizontal, X } from "lucide-react";
import { useDrag } from "@/components/os/use-drag";
import { useWidgetStore, type WidgetId } from "@/store/widget-store";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/utils";

type Props = {
  id: WidgetId;
  title: string;
  children: React.ReactNode;
  className?: string;
  /** Fixed layout (mobile): no drag, no absolute positioning. */
  inline?: boolean;
};

/** A small floating "screen" on the wallpaper. Draggable, dismissible, remembered. */
export function WidgetFrame({ id, title, children, className, inline }: Props) {
  const pos = useWidgetStore((s) => s.positions[id]);
  const move = useWidgetStore((s) => s.move);
  const toggle = useWidgetStore((s) => s.toggle);
  const { t } = useI18n();
  const ref = React.useRef<HTMLDivElement>(null);
  const start = React.useRef(pos);

  const drag = useDrag({
    disabled: inline,
    onStart: () => {
      start.current = pos;
    },
    onMove: (dx, dy) => {
      if (ref.current)
        ref.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    },
    onEnd: (dx, dy, moved) => {
      if (ref.current) ref.current.style.transform = "";
      if (moved) {
        const parent = ref.current?.parentElement;
        const maxX = (parent?.clientWidth ?? 9999) - 80;
        const maxY = (parent?.clientHeight ?? 9999) - 40;
        move(id, {
          x: Math.max(0, Math.min(maxX, start.current.x + dx)),
          y: Math.max(0, Math.min(maxY, start.current.y + dy)),
        });
      }
    },
  });

  return (
    <div
      ref={ref}
      data-widget={id}
      className={cn(
        "group border-brand-ink/70 bg-card/85 text-card-foreground shadow-hard w-56 overflow-hidden rounded-lg border-2 backdrop-blur-sm",
        inline ? "relative w-full" : "absolute",
        className,
      )}
      style={inline ? undefined : { left: pos.x, top: pos.y }}
    >
      <div
        className={cn(
          "border-brand-ink/15 text-muted-foreground flex h-7 items-center gap-1 border-b px-2 text-[11px] font-medium select-none",
          !inline && "cursor-grab active:cursor-grabbing",
        )}
        style={{ touchAction: inline ? undefined : "none" }}
        onPointerDown={drag.onPointerDown}
      >
        {!inline && (
          <GripHorizontal className="size-3.5 opacity-60" aria-hidden />
        )}
        <span className="flex-1 truncate">{title}</span>
        {!inline && (
          <button
            type="button"
            aria-label={t("os.close")}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => toggle(id)}
            className="hover:bg-brand-accent hover:text-brand-accent-fg grid size-5 place-items-center rounded-sm opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          >
            <X className="size-3" />
          </button>
        )}
      </div>
      <div className={inline ? "p-2.5" : "p-3"}>{children}</div>
    </div>
  );
}
