"use client";

import { Check, Palette as PaletteIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PALETTES } from "@/data/palettes";
import { usePalette } from "@/hooks/use-palette";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/utils";

export function PalettePicker({
  tone = "taskbar",
}: {
  tone?: "taskbar" | "surface";
}) {
  const { palette, setPalette } = usePalette();
  const { t, l } = useI18n();
  const label = t("os.palette");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={label}
        title={label}
        data-testid="palette-picker"
        className={cn(
          "focus-visible:outline-brand-mid inline-flex size-9 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
          tone === "taskbar"
            ? "text-taskbar-foreground/80 hover:bg-taskbar-foreground/10 hover:text-taskbar-foreground"
            : "bg-muted text-foreground hover:bg-accent",
        )}
      >
        <PaletteIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-brand-ink shadow-window w-56 border-2"
      >
        {PALETTES.map((p) => (
          <DropdownMenuItem
            key={p.id}
            data-testid={`palette-${p.id}`}
            onClick={() => setPalette(p.id)}
            className="flex items-center gap-3"
          >
            <span className="border-foreground/30 flex overflow-hidden rounded-sm border">
              {p.swatches.map((c) => (
                <span
                  key={c}
                  className="size-4"
                  style={{ backgroundColor: c }}
                />
              ))}
            </span>
            <span className="flex-1 text-sm">{l(p.name)}</span>
            {palette === p.id && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
