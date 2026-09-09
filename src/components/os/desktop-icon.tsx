"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  icon: LucideIcon;
  running: boolean;
  onOpen: () => void;
  testId?: string;
  className?: string;
};

export function DesktopIcon({
  label,
  icon: Icon,
  running,
  onOpen,
  testId,
  className,
}: Props) {
  return (
    <button
      type="button"
      data-testid={testId}
      aria-label={label}
      onClick={onOpen}
      className={cn(
        "group text-foreground focus-visible:bg-brand-mid/20 focus-visible:outline-brand-mid flex w-20 flex-col items-center gap-1 rounded-md p-1.5 outline-none focus-visible:outline-2",
        className,
      )}
    >
      <span
        className={cn(
          "border-brand-ink bg-brand-paper text-brand-ink shadow-hard dark:bg-brand-paper grid size-10 place-items-center rounded-lg border-2 transition-transform group-hover:-translate-y-0.5 group-active:translate-x-px group-active:translate-y-px group-active:shadow-none",
          running &&
            "ring-brand-accent ring-offset-desktop ring-2 ring-offset-1",
        )}
      >
        <Icon className="size-5" strokeWidth={1.8} />
      </span>
      <span className="line-clamp-2 max-w-full text-center text-[11px] leading-tight font-medium">
        {label}
      </span>
    </button>
  );
}
