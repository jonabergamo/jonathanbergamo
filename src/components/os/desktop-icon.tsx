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
};

export function DesktopIcon({
  label,
  icon: Icon,
  running,
  onOpen,
  testId,
}: Props) {
  return (
    <button
      type="button"
      data-testid={testId}
      aria-label={label}
      onClick={onOpen}
      className="group text-foreground focus-visible:bg-brand-mid/20 focus-visible:outline-brand-mid flex w-20 flex-col items-center gap-1.5 rounded-md p-2 outline-none focus-visible:outline-2"
    >
      <span
        className={cn(
          "border-brand-ink bg-brand-paper text-brand-ink shadow-hard dark:bg-brand-paper grid size-12 place-items-center rounded-lg border-2 transition-transform group-hover:-translate-y-0.5 group-active:translate-x-px group-active:translate-y-px group-active:shadow-none",
        )}
      >
        <Icon className="size-6" strokeWidth={1.8} />
      </span>
      <span className="line-clamp-2 max-w-full text-center text-[11px] leading-tight font-medium">
        {label}
      </span>
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full transition-opacity",
          running ? "bg-brand-accent opacity-100" : "opacity-0",
        )}
      />
    </button>
  );
}
