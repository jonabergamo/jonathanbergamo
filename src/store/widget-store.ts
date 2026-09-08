import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const WIDGET_IDS = ["clock", "weather", "status", "github"] as const;
export type WidgetId = (typeof WIDGET_IDS)[number];

type Pos = { x: number; y: number };

/** Default column between the About window and the avatar. */
export function defaultWidgetPositions(width: number): Record<WidgetId, Pos> {
  const x = Math.max(680, Math.min(width - 560, width * 0.47));
  return {
    clock: { x, y: 32 },
    weather: { x, y: 172 },
    status: { x, y: 356 },
    github: { x, y: 484 },
  };
}

type WidgetStore = {
  positions: Record<WidgetId, Pos>;
  hidden: WidgetId[];
  move: (id: WidgetId, pos: Pos) => void;
  toggle: (id: WidgetId) => void;
  reset: (width: number) => void;
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
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
