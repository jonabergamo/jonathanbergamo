export type Rect = { x: number; y: number; w: number; h: number };
export type Size = { w: number; h: number };

export const SNAP_PX = 12;
/** Minimum horizontal sliver of the title bar that must remain reachable. */
export const MIN_VISIBLE_PX = 64;

export function clampRect(rect: Rect, bounds: Size, min: Size): Rect {
  const w = Math.max(min.w, Math.min(rect.w, bounds.w));
  const h = Math.max(min.h, Math.min(rect.h, bounds.h));
  const x = Math.min(
    Math.max(rect.x, MIN_VISIBLE_PX - w),
    bounds.w - MIN_VISIBLE_PX,
  );
  const y = Math.min(Math.max(rect.y, 0), Math.max(0, bounds.h - 40));
  return {
    x: Math.round(x),
    y: Math.round(y),
    w: Math.round(w),
    h: Math.round(h),
  };
}

export function snapRect(rect: Rect, bounds: Size, snap = SNAP_PX): Rect {
  let { x, y } = rect;
  if (Math.abs(x) <= snap) x = 0;
  if (Math.abs(y) <= snap) y = 0;
  if (Math.abs(bounds.w - (x + rect.w)) <= snap) x = bounds.w - rect.w;
  if (Math.abs(bounds.h - (y + rect.h)) <= snap) y = bounds.h - rect.h;
  return { ...rect, x, y };
}

export function centerRect(size: Size, bounds: Size): Rect {
  return {
    x: Math.round((bounds.w - size.w) / 2),
    y: Math.round((bounds.h - size.h) / 2),
    w: size.w,
    h: size.h,
  };
}

/** Offsets `rect` until it does not sit exactly on any of `others`. */
export function cascadeRect(
  rect: Rect,
  others: Rect[],
  step = 32,
  bounds?: Size,
): Rect {
  let next = { ...rect };
  let guard = 0;
  const overlaps = (r: Rect) =>
    others.some(
      (o) => Math.abs(o.x - r.x) < step / 2 && Math.abs(o.y - r.y) < step / 2,
    );
  while (overlaps(next) && guard < 20) {
    next = { ...next, x: next.x + step, y: next.y + step };
    if (bounds && (next.x + next.w > bounds.w || next.y + next.h > bounds.h)) {
      next = { ...next, x: step * (guard % 4), y: step * (guard % 4) };
    }
    guard++;
  }
  return next;
}

export function isOffscreen(rect: Rect, bounds: Size): boolean {
  return (
    rect.x + rect.w < MIN_VISIBLE_PX ||
    rect.x > bounds.w - MIN_VISIBLE_PX ||
    rect.y < 0 ||
    rect.y > bounds.h - 40
  );
}

export type ResizeEdge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export function resizeRect(
  start: Rect,
  edge: ResizeEdge,
  dx: number,
  dy: number,
  min: Size,
): Rect {
  let { x, y, w, h } = start;
  if (edge.includes("e")) w = Math.max(min.w, start.w + dx);
  if (edge.includes("s")) h = Math.max(min.h, start.h + dy);
  if (edge.includes("w")) {
    w = Math.max(min.w, start.w - dx);
    x = start.x + (start.w - w);
  }
  if (edge.includes("n")) {
    h = Math.max(min.h, start.h - dy);
    y = start.y + (start.h - h);
  }
  return { x, y, w, h };
}
