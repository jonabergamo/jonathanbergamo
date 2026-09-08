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
      onDoubleClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="group text-foreground focus-visible:bg-brand-blue/20 focus-visible:outline-brand-blue flex w-20 flex-col items-center gap-1.5 rounded-md p-2 outline-none focus-visible:outline-2"
    >
      <span
        className={cn(
          "border-brand-navy bg-brand-cream text-brand-navy shadow-hard dark:bg-brand-cream grid size-12 place-items-center rounded-lg border-2 transition-transform group-hover:-translate-y-0.5 group-active:translate-x-px group-active:translate-y-px group-active:shadow-none",
        )}
      >
        <Icon className="size-6" strokeWidth={1.8} />
      </span>
      <span className="max-w-full truncate text-center text-[11px] leading-tight font-medium">
        {label}
      </span>
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full transition-opacity",
          running ? "bg-brand-red opacity-100" : "opacity-0",
        )}
      />
    </button>
  );
}
