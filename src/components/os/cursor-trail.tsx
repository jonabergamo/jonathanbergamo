"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Point = { x: number; y: number; t: number };

const LIFETIME_MS = 1200;
const MAX_POINTS = 120;
const WIDTH = 3;

/**
 * A line that follows the mouse across the desktop and fades out behind it.
 * Drawn on a 2D canvas under the windows and widgets, so it reads as part of
 * the wallpaper. Respects reduced motion by not rendering at all.
 */
export function CursorTrail() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const { theme } = useTheme();

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let color = "#000";
    const readColor = () => {
      const probe = document.createElement("div");
      probe.style.color = getComputedStyle(document.documentElement)
        .getPropertyValue("--p-accent")
        .trim();
      probe.style.display = "none";
      document.body.appendChild(probe);
      const rgb = getComputedStyle(probe).color.match(/\d+(\.\d+)?/g);
      probe.remove();
      color = rgb ? `${rgb[0]},${rgb[1]},${rgb[2]}` : "0,0,0";
    };
    readColor();

    const points: Point[] = [];
    let raf: number | null = null;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      raf = null;
      const now = performance.now();
      while (points.length && now - points[0].t > LIFETIME_MS) points.shift();
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      if (points.length < 2) return;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        const age = (now - b.t) / LIFETIME_MS;
        const alpha = Math.max(0, 1 - age) * 0.7;
        ctx.strokeStyle = `rgba(${color},${alpha.toFixed(3)})`;
        ctx.lineWidth = WIDTH * (1 - age * 0.6);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      points.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        t: performance.now(),
      });
      if (points.length > MAX_POINTS) points.shift();
      if (raf == null) raf = requestAnimationFrame(draw);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      if (raf != null) cancelAnimationFrame(raf);
    };
    // `theme` is a dependency so the colour is re-read when the palette changes.
  }, [reduced, theme]);

  if (reduced) return null;
  return (
    <canvas
      ref={ref}
      aria-hidden
      data-testid="cursor-trail"
      className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[calc(100%-3rem)] w-full"
    />
  );
}
