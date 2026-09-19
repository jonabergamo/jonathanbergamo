"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n/context";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";

type Shot = NonNullable<Project["images"]>[number];

// a strip of screenshots you can drag, swipe, click through with arrows or step with the keyboard
export function ShotCarousel({
  shots,
  onOpen,
  className,
  aspect = "aspect-[16/10]",
  fit = "cover",
}: {
  shots: Shot[];
  onOpen?: () => void;
  className?: string;
  aspect?: string;
  fit?: "cover" | "contain";
}) {
  const { l } = useI18n();
  const track = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(shots.length - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  // mouse drag. touch already scrolls natively. the move and up listeners live on the window so
  // a drag that wanders off the strip still finishes cleanly
  const down = (e: React.PointerEvent) => {
    const el = track.current;
    if (e.pointerType !== "mouse" || !el) return;
    const start = { x: e.clientX, left: el.scrollLeft, moved: false };
    el.style.scrollSnapType = "none";
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - start.x;
      if (Math.abs(dx) > 4) start.moved = true;
      el.scrollLeft = start.left - dx;
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      const dx = el.scrollLeft - start.left;
      const from = Math.round(start.left / el.clientWidth);
      // a short flick still turns the page. snap comes back only once the page has settled,
      // otherwise it pulls the strip back to where it started
      go(Math.abs(dx) > el.clientWidth * 0.15 ? from + Math.sign(dx) : from);
      window.setTimeout(() => {
        el.style.scrollSnapType = "";
      }, 500);
      if (!start.moved) onOpen?.();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const many = shots.length > 1;

  return (
    <div className={cn("group relative", className)}>
      <div
        ref={track}
        onScroll={onScroll}
        onPointerDown={down}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(index + 1);
          if (e.key === "ArrowLeft") go(index - 1);
        }}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        className={cn(
          "no-scrollbar bg-brand-ink/5 dark:bg-brand-paper/5 flex w-full snap-x snap-mandatory overflow-x-auto select-none",
          many ? "cursor-grab active:cursor-grabbing" : "cursor-pointer",
          aspect,
        )}
      >
        {shots.map((s) => (
          <div key={s.src} className="relative w-full shrink-0 snap-start">
            <Image
              src={s.src}
              alt={l(s.alt)}
              fill
              draggable={false}
              sizes="(max-width: 640px) 100vw, 640px"
              className={cn(
                fit === "cover" && s.wide !== false
                  ? "object-cover"
                  : "object-contain",
              )}
            />
          </div>
        ))}
      </div>
      {many && (
        <>
          <Arrow
            side="left"
            disabled={index === 0}
            onClick={() => go(index - 1)}
          />
          <Arrow
            side="right"
            disabled={index === shots.length - 1}
            onClick={() => go(index + 1)}
          />
          <div className="flex justify-center gap-1.5 py-2" role="tablist">
            {shots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={l(s.alt)}
                onClick={() => go(i)}
                className={cn(
                  "size-1.5 rounded-full transition-colors",
                  i === index
                    ? "bg-brand-accent"
                    : "bg-brand-ink/25 dark:bg-brand-paper/30",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Arrow({
  side,
  disabled,
  onClick,
}: {
  side: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={side === "left" ? "Previous" : "Next"}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "bg-card/90 text-foreground border-brand-ink/15 absolute top-[calc(50%-1.25rem)] flex size-9 items-center justify-center rounded-full border shadow transition-opacity",
        "opacity-0 group-hover:opacity-100 focus-visible:opacity-100 disabled:opacity-0 [@media(pointer:coarse)]:opacity-100",
        side === "left" ? "left-2" : "right-2",
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}
