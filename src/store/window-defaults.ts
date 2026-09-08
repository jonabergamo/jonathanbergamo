import type { Rect, Size } from "@/lib/rect";

export const WINDOW_IDS = [
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
  "terminal",
] as const;
export type WindowId = (typeof WINDOW_IDS)[number];

export type WindowStatus = "open" | "minimized" | "closed";

export type WindowState = {
  id: WindowId;
  status: WindowStatus;
  maximized: boolean;
  rect: Rect;
};

export const MIN_SIZE: Record<WindowId, Size> = {
  about: { w: 360, h: 320 },
  experience: { w: 360, h: 300 },
  projects: { w: 380, h: 320 },
  skills: { w: 320, h: 260 },
  contact: { w: 320, h: 260 },
  terminal: { w: 320, h: 220 },
};

const DEFAULT_SIZE: Record<WindowId, Size> = {
  about: { w: 600, h: 560 },
  experience: { w: 640, h: 560 },
  projects: { w: 700, h: 580 },
  skills: { w: 560, h: 480 },
  contact: { w: 460, h: 420 },
  terminal: { w: 520, h: 340 },
};

export function defaultRects(bounds: Size): Record<WindowId, Rect> {
  const pad = 88; // leave room for the desktop icon column
  const gap = 24;
  const fit = (size: Size): Size => ({
    w: Math.min(size.w, Math.max(320, bounds.w - pad - gap)),
    h: Math.min(size.h, Math.max(260, bounds.h - gap * 2)),
  });
  const about = fit(DEFAULT_SIZE.about);
  const projects = fit(DEFAULT_SIZE.projects);
  const rects: Record<WindowId, Rect> = {
    about: { x: pad, y: gap + 8, ...about },
    projects: {
      x: Math.max(pad + 40, bounds.w - projects.w - gap),
      y: gap + 48,
      ...projects,
    },
    experience: { x: pad + 60, y: gap + 40, ...fit(DEFAULT_SIZE.experience) },
    skills: { x: pad + 120, y: gap + 80, ...fit(DEFAULT_SIZE.skills) },
    contact: { x: pad + 180, y: gap + 120, ...fit(DEFAULT_SIZE.contact) },
    terminal: {
      x: pad + 40,
      y: Math.max(gap, bounds.h - 340 - gap),
      ...fit(DEFAULT_SIZE.terminal),
    },
  };
  return rects;
}

/** Which windows start open on a fresh visit for this viewport. */
export function defaultOpen(bounds: Size): WindowId[] {
  // The 3D avatar lives on the right of the desktop, so only About opens by
  // default and sits on the left. Everything else is one double-click away.
  void bounds;
  return ["about"];
}

export function defaultWindows(bounds: Size): Record<WindowId, WindowState> {
  const rects = defaultRects(bounds);
  const open = new Set(defaultOpen(bounds));
  const maximizeAll = bounds.w < 1024;
  return Object.fromEntries(
    WINDOW_IDS.map((id) => [
      id,
      {
        id,
        status: open.has(id) ? "open" : "closed",
        maximized: maximizeAll && open.has(id),
        rect: rects[id],
      } satisfies WindowState,
    ]),
  ) as Record<WindowId, WindowState>;
}
