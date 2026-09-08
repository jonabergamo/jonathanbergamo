"use client";

import * as React from "react";

export type DragHandlers = {
  onPointerDown: (e: React.PointerEvent) => void;
};

type Options = {
  disabled?: boolean;
  onStart?: () => void;
  /** Called at most once per animation frame with the total delta. */
  onMove: (dx: number, dy: number) => void;
  onEnd: (dx: number, dy: number, moved: boolean) => void;
};

/**
 * Pointer-capture based drag. Works for mouse, touch and pen. The caller
 * decides what to do with the delta (usually write a transform to the DOM
 * during the gesture and commit to the store once on pointer up).
 */
export function useDrag({
  disabled,
  onStart,
  onMove,
  onEnd,
}: Options): DragHandlers {
  const state = React.useRef<{
    id: number;
    startX: number;
    startY: number;
    dx: number;
    dy: number;
    raf: number | null;
    moved: boolean;
    el: HTMLElement | null;
  } | null>(null);

  const latest = React.useRef({ onStart, onMove, onEnd });
  React.useLayoutEffect(() => {
    latest.current = { onStart, onMove, onEnd };
  });

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const el = e.currentTarget as HTMLElement;
      el.setPointerCapture(e.pointerId);
      state.current = {
        id: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        dx: 0,
        dy: 0,
        raf: null,
        moved: false,
        el,
      };
      latest.current.onStart?.();

      const move = (ev: PointerEvent) => {
        const s = state.current;
        if (!s || ev.pointerId !== s.id) return;
        s.dx = ev.clientX - s.startX;
        s.dy = ev.clientY - s.startY;
        if (!s.moved && (Math.abs(s.dx) > 2 || Math.abs(s.dy) > 2))
          s.moved = true;
        if (s.raf == null) {
          s.raf = requestAnimationFrame(() => {
            s.raf = null;
            latest.current.onMove(s.dx, s.dy);
          });
        }
      };
      const end = (ev: PointerEvent) => {
        const s = state.current;
        if (!s || ev.pointerId !== s.id) return;
        if (s.raf != null) cancelAnimationFrame(s.raf);
        cleanup();
        state.current = null;
        latest.current.onEnd(s.dx, s.dy, s.moved);
      };
      const cleanup = () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", end);
        el.removeEventListener("pointercancel", end);
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {
          // already released
        }
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", end);
      el.addEventListener("pointercancel", end);
    },
    [disabled],
  );

  return { onPointerDown };
}
