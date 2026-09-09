import type { Rect, Size } from "@/lib/rect";

export const WINDOW_IDS = [
  "about",
  "photography",
  "experience",
  "projects",
  "skills",
  "contact",
  "terminal",
  "volunteering",
  "now",
  "recycle",
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
  photography: { w: 360, h: 320 },
  experience: { w: 360, h: 300 },
  projects: { w: 380, h: 320 },
  skills: { w: 320, h: 260 },
  contact: { w: 320, h: 260 },
  terminal: { w: 320, h: 220 },
  volunteering: { w: 360, h: 300 },
  now: { w: 340, h: 280 },
  recycle: { w: 420, h: 300 },
};

const DEFAULT_SIZE: Record<WindowId, Size> = {
  about: { w: 560, h: 500 },
  photography: { w: 720, h: 600 },
  experience: { w: 640, h: 560 },
  projects: { w: 700, h: 580 },
  skills: { w: 560, h: 420 },
  contact: { w: 460, h: 420 },
  terminal: { w: 520, h: 340 },
  volunteering: { w: 620, h: 520 },
  now: { w: 560, h: 520 },
  recycle: { w: 680, h: 460 },
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
  const skillsTop = gap + 8 + about.h + gap;
  const skills = {
    w: about.w,
    h: Math.max(
      260,
      Math.min(DEFAULT_SIZE.skills.h, bounds.h - skillsTop - gap),
    ),
  };
  const rects: Record<WindowId, Rect> = {
    about: { x: pad, y: gap + 8, ...about },
    photography: {
      x: Math.max(pad + 80, bounds.w - 720 - gap * 2),
      y: gap + 24,
      ...fit(DEFAULT_SIZE.photography),
    },
    projects: {
      x: Math.max(pad + 40, bounds.w - projects.w - gap),
      y: gap + 48,
      ...projects,
    },
    experience: { x: pad + 60, y: gap + 40, ...fit(DEFAULT_SIZE.experience) },
    skills: { x: pad, y: skillsTop, ...skills },
    contact: { x: pad + 180, y: gap + 120, ...fit(DEFAULT_SIZE.contact) },
    volunteering: {
      x: pad + 80,
      y: gap + 60,
      ...fit(DEFAULT_SIZE.volunteering),
    },
    now: { x: pad + 140, y: gap + 100, ...fit(DEFAULT_SIZE.now) },
    recycle: {
      x: Math.max(pad, bounds.w - 680 - gap * 3),
      y: Math.max(gap, bounds.h - 460 - gap * 2),
      ...fit(DEFAULT_SIZE.recycle),
    },
    terminal: {
      x: pad + 40,
      y: Math.max(gap, bounds.h - 340 - gap),
      ...fit(DEFAULT_SIZE.terminal),
    },
  };
  return rects;
}

/** Which windows start open on a fresh visit for this viewport. */
/** Which windows start open on a fresh visit for this viewport. */
export function defaultOpen(bounds: Size): WindowId[] {
  // On laptops there is no room for windows, the widget column and the
  // avatar side by side, so the desktop starts clear and the avatar shows.
  if (bounds.w >= 1380 && bounds.h >= 800) return ["skills", "about"];
  return [];
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
