import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  cascadeRect,
  clampRect,
  isOffscreen,
  snapRect,
  type Rect,
  type Size,
} from "@/lib/rect";
import {
  MIN_SIZE,
  WINDOW_IDS,
  defaultOpen,
  defaultRects,
  defaultWindows,
  type WindowId,
  type WindowState,
} from "./window-defaults";

export type { WindowId, WindowState };

const FALLBACK_BOUNDS: Size = { w: 1280, h: 800 };

export type WindowStore = {
  windows: Record<WindowId, WindowState>;
  /** z-order, last item is on top. Only open/minimized windows are listed. */
  order: WindowId[];
  focused: WindowId | null;
  bounds: Size;
  hydrated: boolean;

  open: (id: WindowId) => void;
  close: (id: WindowId) => void;
  minimize: (id: WindowId) => void;
  restore: (id: WindowId) => void;
  toggleMaximize: (id: WindowId) => void;
  focus: (id: WindowId) => void;
  /** Taskbar semantics: restore if minimized, minimize if focused, else focus. */
  taskbarClick: (id: WindowId) => void;
  move: (id: WindowId, xy: { x: number; y: number }) => void;
  resize: (id: WindowId, rect: Rect) => void;
  setBounds: (bounds: Size) => void;
  resetLayout: () => void;
  cycleFocus: (dir?: 1 | -1) => void;
  setHydrated: (v: boolean) => void;
};

function withoutId(order: WindowId[], id: WindowId) {
  return order.filter((w) => w !== id);
}

function topVisible(
  windows: Record<WindowId, WindowState>,
  order: WindowId[],
): WindowId | null {
  for (let i = order.length - 1; i >= 0; i--) {
    if (windows[order[i]].status === "open") return order[i];
  }
  return null;
}

export const useWindowStore = create<WindowStore>()(
  persist(
    (set, get) => ({
      windows: defaultWindows(FALLBACK_BOUNDS),
      order: defaultOpen(FALLBACK_BOUNDS),
      focused: defaultOpen(FALLBACK_BOUNDS).at(-1) ?? null,
      bounds: FALLBACK_BOUNDS,
      hydrated: false,

      open: (id) =>
        set((s) => {
          const win = s.windows[id];
          if (win.status === "open") {
            return { order: [...withoutId(s.order, id), id], focused: id };
          }
          const others = s.order
            .filter((w) => w !== id && s.windows[w].status !== "closed")
            .map((w) => s.windows[w].rect);
          let rect = win.rect;
          if (win.status === "closed") {
            if (isOffscreen(rect, s.bounds)) rect = defaultRects(s.bounds)[id];
            rect = clampRect(
              cascadeRect(rect, others, 32, s.bounds),
              s.bounds,
              MIN_SIZE[id],
            );
          }
          return {
            windows: { ...s.windows, [id]: { ...win, status: "open", rect } },
            order: [...withoutId(s.order, id), id],
            focused: id,
          };
        }),

      close: (id) =>
        set((s) => {
          const order = withoutId(s.order, id);
          const windows = {
            ...s.windows,
            [id]: {
              ...s.windows[id],
              status: "closed" as const,
              maximized: false,
            },
          };
          return { windows, order, focused: topVisible(windows, order) };
        }),

      minimize: (id) =>
        set((s) => {
          const windows = {
            ...s.windows,
            [id]: { ...s.windows[id], status: "minimized" as const },
          };
          // Keep it in `order` so the taskbar keeps its position; move to bottom.
          const order = [id, ...withoutId(s.order, id)];
          return { windows, order, focused: topVisible(windows, order) };
        }),

      restore: (id) =>
        set((s) => ({
          windows: { ...s.windows, [id]: { ...s.windows[id], status: "open" } },
          order: [...withoutId(s.order, id), id],
          focused: id,
        })),

      toggleMaximize: (id) =>
        set((s) => ({
          windows: {
            ...s.windows,
            [id]: {
              ...s.windows[id],
              maximized: !s.windows[id].maximized,
              status: "open",
            },
          },
          order: [...withoutId(s.order, id), id],
          focused: id,
        })),

      focus: (id) =>
        set((s) => {
          if (s.windows[id].status !== "open") return {};
          if (s.focused === id && s.order.at(-1) === id) return {};
          return { order: [...withoutId(s.order, id), id], focused: id };
        }),

      taskbarClick: (id) => {
        const s = get();
        const win = s.windows[id];
        if (win.status === "minimized" || win.status === "closed")
          return win.status === "closed" ? s.open(id) : s.restore(id);
        if (s.focused === id) return s.minimize(id);
        return s.focus(id);
      },

      move: (id, xy) =>
        set((s) => {
          const win = s.windows[id];
          const rect = clampRect(
            snapRect({ ...win.rect, ...xy }, s.bounds),
            s.bounds,
            MIN_SIZE[id],
          );
          return { windows: { ...s.windows, [id]: { ...win, rect } } };
        }),

      resize: (id, next) =>
        set((s) => {
          const win = s.windows[id];
          const rect = clampRect(next, s.bounds, MIN_SIZE[id]);
          return { windows: { ...s.windows, [id]: { ...win, rect } } };
        }),

      setBounds: (bounds) =>
        set((s) => {
          if (bounds.w <= 0 || bounds.h <= 0) return {};
          const defaults = defaultRects(bounds);
          const windows = Object.fromEntries(
            WINDOW_IDS.map((id) => {
              const win = s.windows[id];
              const base = isOffscreen(win.rect, bounds)
                ? defaults[id]
                : win.rect;
              return [
                id,
                { ...win, rect: clampRect(base, bounds, MIN_SIZE[id]) },
              ];
            }),
          ) as Record<WindowId, WindowState>;
          return { bounds, windows };
        }),

      resetLayout: () =>
        set((s) => {
          const windows = defaultWindows(s.bounds);
          const order = defaultOpen(s.bounds);
          return { windows, order, focused: order.at(-1) ?? null };
        }),

      cycleFocus: (dir = 1) =>
        set((s) => {
          const visible = s.order.filter((w) => s.windows[w].status === "open");
          if (visible.length < 2) return {};
          const next = dir === 1 ? visible[0] : visible[visible.length - 2];
          return { order: [...withoutId(s.order, next), next], focused: next };
        }),

      setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: "jb-windows",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({
        windows: s.windows,
        order: s.order,
        focused: s.focused,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<
          Pick<WindowStore, "windows" | "order" | "focused">
        >;
        const windows = { ...current.windows };
        if (p.windows && typeof p.windows === "object") {
          for (const id of WINDOW_IDS) {
            const w = p.windows[id];
            if (
              w &&
              typeof w.rect?.x === "number" &&
              typeof w.rect?.w === "number"
            ) {
              windows[id] = { ...current.windows[id], ...w, id };
            }
          }
        }
        const order = Array.isArray(p.order)
          ? p.order.filter(
              (id): id is WindowId =>
                (WINDOW_IDS as readonly string[]).includes(id) &&
                windows[id].status !== "closed",
            )
          : current.order;
        const focused = topVisible(windows, order);
        return { ...current, windows, order, focused };
      },
    },
  ),
);

/** Selectors */
export const selectVisibleOrder = (s: WindowStore) =>
  s.order.filter((id) => s.windows[id].status !== "closed");
export const selectRunning = (s: WindowStore) =>
  WINDOW_IDS.filter((id) => s.windows[id].status !== "closed");
