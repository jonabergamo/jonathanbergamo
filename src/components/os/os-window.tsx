"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/i18n/context";
import { resizeRect, type Rect, type ResizeEdge } from "@/lib/rect";
import { cn } from "@/lib/utils";
import { MIN_SIZE, type WindowId } from "@/store/window-defaults";
import { useWindowStore } from "@/store/window-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { WINDOW_REGISTRY } from "./window-registry";
import { WindowTitleBar } from "./window-title-bar";
import { WindowResizeHandles } from "./window-resize-handles";
import { useDrag } from "./use-drag";
import { WindowSkeleton } from "./window-skeleton";

type Props = { id: WindowId; zIndex: number };

export function OsWindow({ id, zIndex }: Props) {
  const win = useWindowStore((s) => s.windows[id]);
  const focused = useWindowStore((s) => s.focused === id);
  const { focus, close, minimize, toggleMaximize, move, resize } =
    useWindowStore.getState();
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const meta = WINDOW_REGISTRY[id];
  const Content = meta.component;

  const rootRef = React.useRef<HTMLDivElement>(null);
  const startRect = React.useRef<Rect>(win.rect);

  // Drag: write a transform during the gesture, commit once on release.
  const drag = useDrag({
    disabled: win.maximized,
    onStart: () => {
      startRect.current = win.rect;
      focus(id);
    },
    onMove: (dx, dy) => {
      if (rootRef.current)
        rootRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    },
    onEnd: (dx, dy, moved) => {
      if (rootRef.current) rootRef.current.style.transform = "";
      if (moved)
        move(id, { x: startRect.current.x + dx, y: startRect.current.y + dy });
    },
  });

  // Resize: mutate geometry during the gesture, commit once on release.
  const edgeRef = React.useRef<ResizeEdge>("se");
  const resizeDrag = useDrag({
    disabled: win.maximized,
    onStart: () => {
      startRect.current = win.rect;
      focus(id);
    },
    onMove: (dx, dy) => {
      const el = rootRef.current;
      if (!el) return;
      const r = resizeRect(
        startRect.current,
        edgeRef.current,
        dx,
        dy,
        MIN_SIZE[id],
      );
      el.style.left = `${r.x}px`;
      el.style.top = `${r.y}px`;
      el.style.width = `${r.w}px`;
      el.style.height = `${r.h}px`;
    },
    onEnd: (dx, dy, moved) => {
      if (moved)
        resize(
          id,
          resizeRect(startRect.current, edgeRef.current, dx, dy, MIN_SIZE[id]),
        );
      const el = rootRef.current;
      if (el) {
        // React owns these again; clear the inline overrides so the store wins.
        el.style.left = el.style.top = el.style.width = el.style.height = "";
      }
    },
  });

  const onResizeStart = (edge: ResizeEdge, e: React.PointerEvent) => {
    edgeRef.current = edge;
    resizeDrag.onPointerDown(e);
  };

  // Focus the window when it opens or becomes focused via the taskbar.
  React.useEffect(() => {
    if (!focused || win.status !== "open") return;
    const el = rootRef.current;
    if (el && !el.contains(document.activeElement))
      el.focus({ preventScroll: true });
  }, [focused, win.status]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Escape" || e.defaultPrevented) return;
    const target = e.target as HTMLElement;
    // A nested dialog (e.g. project details) handles its own Escape.
    if (
      target.closest(
        "[data-slot='dialog-content'], [data-slot='sheet-content']",
      )
    )
      return;
    e.preventDefault();
    close(id);
  };

  const visible = win.status === "open";
  const style: React.CSSProperties = win.maximized
    ? { inset: 0, zIndex }
    : {
        left: win.rect.x,
        top: win.rect.y,
        width: win.rect.w,
        height: win.rect.h,
        zIndex,
      };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key={id}
          ref={rootRef}
          role="dialog"
          aria-labelledby={`${id}-title`}
          tabIndex={-1}
          data-window={id}
          data-focused={focused ? "true" : "false"}
          data-maximized={win.maximized ? "true" : "false"}
          className={cn(
            "absolute flex flex-col outline-none",
            win.maximized ? "" : "will-change-transform",
          )}
          style={style}
          initial={reduced ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.16 }}
          onPointerDownCapture={() => focus(id)}
          onKeyDown={onKeyDown}
        >
          <motion.div
            initial={reduced ? false : { scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { scale: 0.96, y: 24 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 32,
              mass: 0.8,
            }}
            className={cn(
              "bg-card text-card-foreground relative flex h-full min-h-0 flex-col overflow-hidden border-2",
              win.maximized ? "border-titlebar" : "border-titlebar rounded-lg",
              !win.maximized &&
                (focused ? "shadow-window-focus" : "shadow-window"),
            )}
          >
            <WindowTitleBar
              id={id}
              title={t(meta.titleKey)}
              icon={meta.icon}
              maximized={win.maximized}
              focused={focused}
              draggable
              onPointerDown={drag.onPointerDown}
              onDoubleClick={() => toggleMaximize(id)}
              onMinimize={() => minimize(id)}
              onToggleMaximize={() => toggleMaximize(id)}
              onClose={() => close(id)}
              onNudge={(dx, dy) =>
                move(id, { x: win.rect.x + dx, y: win.rect.y + dy })
              }
            />
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <React.Suspense fallback={<WindowSkeleton />}>
                <Content />
              </React.Suspense>
            </div>
            {!win.maximized && (
              <WindowResizeHandles onPointerDown={onResizeStart} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
