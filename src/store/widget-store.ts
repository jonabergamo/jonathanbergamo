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
 * Default layout, taken from Jonathan's own arrangement on a 1408x1227 window:
 * a column between the About window and the avatar, with the music player to
 * its right at the top. Shorter screens get a tighter column that still ends
 * above the taskbar.
 */
export function defaultWidgetPositions(
  width: number,
  height = 1227,
): Record<WidgetId, Pos> {
  const x = Math.max(680, Math.min(width - 560, width * 0.47));
  const tall = height >= 1000;
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
      reset: (width) =>
        set({ positions: defaultWidgetPositions(width), hidden: [] }),
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
