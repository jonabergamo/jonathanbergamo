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

/** Default column between the About window and the avatar. */
export function defaultWidgetPositions(width: number): Record<WidgetId, Pos> {
  const x = Math.max(680, Math.min(width - 560, width * 0.47));
  return {
    experience: { x, y: 24 },
    clock: { x, y: 292 },
    weather: { x, y: 428 },
    status: { x, y: 612 },
    github: { x, y: 744 },
    music: { x: Math.max(x + 280, width - 352), y: 196 },
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
      version: 2,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      // Older saves may lack widgets added later; fill them from the defaults.
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<WidgetStore>;
        const defaults = defaultWidgetPositions(
          typeof window === "undefined" ? 1440 : window.innerWidth,
        );
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
