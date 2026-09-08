"use client";

import * as React from "react";
import { ChevronDown, Music2 } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/utils";
import { music } from "@/data/music";
import { useMusicStore } from "@/store/music-store";
import { WidgetFrame } from "./widget-frame";
import { SpotifyEmbed } from "./music-embeds";

export function MusicWidget({ inline }: { inline?: boolean }) {
  const { t } = useI18n();
  const playing = useMusicStore((s) => s.playing);
  const [expanded, setExpanded] = React.useState(!inline);
  const height = inline ? 80 : 152;

  return (
    <WidgetFrame
      id="music"
      title={t("widgets.music.title")}
      inline={inline}
      className={inline ? undefined : "w-80"}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "border-brand-ink/60 grid size-8 shrink-0 place-items-center rounded-md border-2",
            playing ? "bg-brand-accent text-brand-accent-fg" : "bg-muted",
          )}
          aria-hidden
        >
          <Music2 className={cn("size-4", playing && "animate-pulse")} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{music.title}</p>
          <p className="text-muted-foreground truncate text-[11px]">
            {playing ? t("widgets.music.playing") : t("widgets.music.hint")}
          </p>
        </div>
        {inline && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-label={t("widgets.music.toggle")}
            onClick={() => setExpanded((v) => !v)}
            className="hover:bg-muted grid size-8 place-items-center rounded-md"
          >
            <ChevronDown
              className={cn(
                "size-4 transition-transform",
                expanded && "rotate-180",
              )}
            />
          </button>
        )}
      </div>
      <div className={cn("mt-3", inline && !expanded && "hidden")}>
        <SpotifyEmbed height={height} />
      </div>
    </WidgetFrame>
  );
}
