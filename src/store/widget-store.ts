import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const WIDGET_IDS = [
  "clock",
  "weather",
  "status",
  "github",
  "music",
  "experience",
] as const;
export type WidgetId = (typeof WIDGET_IDS)[number];

type Pos = { x: number; y: number };

/**
 * Default layout by screen size.
 * - Wide and tall (Jonathan's 1408x1227): his own arrangement, a column right
 *   of the About window with the music player beside it.
 * - Wide but shorter (e.g. 1440x900): the same column, tightened.
 * - Laptops (narrower than 1380 or shorter than 820): no windows open by
 *   default, so the widgets take the left side in two columns and the avatar
 *   keeps the right side.
 */
export function defaultWidgetPositions(
  width: number,
  height = 1227,
): Record<WidgetId, Pos> {
  const wide = width >= 1380;
  const tall = height >= 1000;
  const short = height < 820;
  if (wide && !short) {
    const x = Math.min(680, Math.max(360, width - 600));
    return tall
      ? {
          experience: { x, y: 34 },
          clock: { x, y: 290 },
          weather: { x, y: 426 },
          status: { x, y: 623 },
          github: { x, y: 780 },
          music: { x: x + 248, y: 35 },
        }
      : {
          experience: { x, y: 24 },
          clock: { x, y: 292 },
          weather: { x, y: 428 },
          status: { x, y: 612 },
          github: { x, y: 744 },
          music: { x: x + 248, y: 24 },
        };
  }
  const x1 = 104;
  const x2 = 352;
  return {
    experience: { x: x1, y: 24 },
    clock: { x: x1, y: 292 },
    weather: { x: x1, y: 428 },
    music: { x: x2, y: 24 },
    status: { x: x2, y: 372 },
    github: { x: x2, y: 506 },
  };
}

type WidgetStore = {
  positions: Record<WidgetId, Pos>;
  hidden: WidgetId[];
  move: (id: WidgetId, pos: Pos) => void;
  toggle: (id: WidgetId) => void;
  reset: (width: number, height?: number) => void;
};

export const useWidgetStore = create<WidgetStore>()(
  persist(
    (set) => ({
      positions: defaultWidgetPositions(1440),
      hidden: [],
      move: (id, pos) =>
        set((s) => ({ positions: { ...s.positions, [id]: pos } })),
      toggle: (id) =>
        set((s) => ({
          hidden: s.hidden.includes(id)
            ? s.hidden.filter((w) => w !== id)
            : [...s.hidden, id],
        })),
      reset: (width, height) =>
        set({ positions: defaultWidgetPositions(width, height), hidden: [] }),
    }),
    {
      name: "jb-widgets",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      // Older saves may lack widgets added later; fill them from the defaults.
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<WidgetStore>;
        const defaults =
          typeof window === "undefined"
            ? defaultWidgetPositions(1440)
            : defaultWidgetPositions(window.innerWidth, window.innerHeight);
        const positions = { ...defaults };
        for (const id of WIDGET_IDS) {
          const pos = p.positions?.[id];
          if (pos && typeof pos.x === "number" && typeof pos.y === "number")
            positions[id] = pos;
        }
        const hidden = Array.isArray(p.hidden)
          ? p.hidden.filter((id): id is WidgetId =>
              (WIDGET_IDS as readonly string[]).includes(id),
            )
          : [];
        return { ...current, positions, hidden };
      },
    },
  ),
);
