"use client";

import * as React from "react";
import Image from "next/image";
import {
  ChevronDown,
  Music2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/utils";
import { music } from "@/data/music";
import { WidgetFrame } from "./widget-frame";
import { useYouTubePlayer } from "./use-youtube-player";

function fmt(s: number) {
  if (!Number.isFinite(s) || s <= 0) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
}

export function MusicWidget({ inline }: { inline?: boolean }) {
  const { t } = useI18n();
  const host = React.useRef<HTMLDivElement>(null);
  const {
    ready,
    playing,
    track,
    progress,
    volume,
    toggle,
    next,
    prev,
    seek,
    setVolume,
  } = useYouTubePlayer(host);
  const [expanded, setExpanded] = React.useState(!inline);
  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;
  const cover = track?.videoId
    ? `https://i.ytimg.com/vi/${track.videoId}/mqdefault.jpg`
    : null;
  const pct = progress.duration
    ? (progress.current / progress.duration) * 100
    : 0;

  return (
    <WidgetFrame
      id="music"
      title={t("widgets.music.title")}
      inline={inline}
      className={inline ? undefined : "w-80"}
    >
      {/* The audio engine. 1x1, invisible, always mounted. */}
      <div
        ref={host}
        aria-hidden
        className="pointer-events-none absolute -top-px -left-px size-px overflow-hidden opacity-0"
      />

      <div className="flex items-center gap-3">
        <div className="border-brand-ink/60 bg-muted relative size-12 shrink-0 overflow-hidden rounded-md border-2">
          {cover ? (
            <Image
              src={cover}
              alt=""
              fill
              sizes="48px"
              unoptimized
              className="object-cover"
            />
          ) : (
            <Music2 className="text-muted-foreground absolute inset-0 m-auto size-5" />
          )}
          {playing && (
            <span
              aria-hidden
              className="bg-brand-ink/60 absolute inset-x-0 bottom-0 flex h-3 items-end justify-center gap-0.5 pb-0.5"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="bg-brand-paper w-0.5 animate-bounce rounded-sm"
                  style={{
                    height: `${5 + i * 2}px`,
                    animationDelay: `${i * 120}ms`,
                  }}
                />
              ))}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold" title={track?.title}>
            {track?.title || music.title}
          </p>
          <p className="text-muted-foreground truncate text-[11px]">
            {track
              ? [
                  track.author,
                  track.count ? `${track.index + 1}/${track.count}` : "",
                ]
                  .filter(Boolean)
                  .join(" · ")
              : ready
                ? music.title
                : t("widgets.music.loading")}
          </p>
        </div>
        <button
          type="button"
          data-testid="music-toggle"
          aria-label={
            playing ? t("widgets.music.pause") : t("widgets.music.play")
          }
          disabled={!ready}
          onClick={toggle}
          className={cn(
            "border-brand-ink shadow-hard grid size-10 shrink-0 place-items-center rounded-full border-2 transition-transform active:translate-x-px active:translate-y-px active:shadow-none disabled:opacity-50",
            "bg-brand-accent text-brand-accent-fg",
          )}
        >
          {playing ? (
            <Pause className="size-4" />
          ) : (
            <Play className="ml-0.5 size-4" />
          )}
        </button>
        {inline && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-label={t("widgets.music.toggle")}
            onClick={() => setExpanded((v) => !v)}
            className="hover:bg-muted grid size-8 shrink-0 place-items-center rounded-md"
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

      <div className={cn("mt-3 space-y-2", inline && !expanded && "hidden")}>
        {/* Progress */}
        <div className="text-muted-foreground flex items-center gap-2 font-mono text-[10px] tabular-nums">
          <span className="w-8">{fmt(progress.current)}</span>
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round(pct * 10)}
            aria-label={t("widgets.music.seek")}
            onChange={(e) => seek(Number(e.target.value) / 1000)}
            className="music-range flex-1"
            style={{ ["--fill" as string]: `${pct}%` }}
          />
          <span className="w-8 text-right">{fmt(progress.duration)}</span>
        </div>
        {/* Transport + volume */}
        <div className="flex items-center gap-1">
          <IconButton
            label={t("widgets.music.prev")}
            onClick={prev}
            disabled={!ready}
          >
            <SkipBack className="size-4" />
          </IconButton>
          <IconButton
            label={t("widgets.music.next")}
            onClick={next}
            disabled={!ready}
          >
            <SkipForward className="size-4" />
          </IconButton>
          <div className="ml-auto flex min-w-0 flex-1 items-center gap-1.5 pl-2">
            <button
              type="button"
              aria-label={t("widgets.music.mute")}
              onClick={() => setVolume(volume === 0 ? music.defaultVolume : 0)}
              className="hover:bg-muted grid size-7 shrink-0 place-items-center rounded-md"
            >
              <VolumeIcon className="size-4" />
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              data-testid="music-volume"
              aria-label={t("widgets.music.volume")}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="music-range w-full max-w-28"
              style={{ ["--fill" as string]: `${volume}%` }}
            />
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="hover:bg-muted grid size-8 place-items-center rounded-md disabled:opacity-40"
    >
      {children}
    </button>
  );
}
