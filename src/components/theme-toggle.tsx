"use client";

import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { usePalette } from "@/hooks/use-palette";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { toggleMode } = usePalette();
  const { t } = useI18n();
  const label = t("os.theme");

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      data-testid="theme-toggle"
      className={cn(
        "text-taskbar-foreground/80 hover:bg-taskbar-foreground/10 hover:text-taskbar-foreground focus-visible:outline-brand-mid inline-flex size-9 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      onClick={toggleMode}
    >
      {/* Swapped by CSS rather than state so the icon is right on first paint. */}
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </button>
  );
}
