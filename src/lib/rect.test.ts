import { describe, expect, it } from "vitest";
import {
  cascadeRect,
  centerRect,
  clampRect,
  isOffscreen,
  resizeRect,
  snapRect,
} from "./rect";

const bounds = { w: 1000, h: 800 };
const min = { w: 200, h: 150 };

describe("clampRect", () => {
  it("enforces min size and caps to bounds", () => {
    expect(clampRect({ x: 0, y: 0, w: 50, h: 50 }, bounds, min)).toMatchObject({
      w: 200,
      h: 150,
    });
    expect(
      clampRect({ x: 0, y: 0, w: 5000, h: 5000 }, bounds, min),
    ).toMatchObject({ w: 1000, h: 800 });
  });
  it("keeps the title bar reachable", () => {
    const r = clampRect({ x: -900, y: -50, w: 400, h: 300 }, bounds, min);
    expect(r.x).toBe(64 - 400);
    expect(r.y).toBe(0);
    const far = clampRect({ x: 5000, y: 5000, w: 400, h: 300 }, bounds, min);
    expect(far.x).toBe(1000 - 64);
    expect(far.y).toBe(760);
  });
});

describe("snapRect", () => {
  it("snaps to edges within tolerance", () => {
    expect(snapRect({ x: 8, y: 5, w: 100, h: 100 }, bounds)).toMatchObject({
      x: 0,
      y: 0,
    });
    expect(snapRect({ x: 895, y: 300, w: 100, h: 100 }, bounds).x).toBe(900);
    expect(snapRect({ x: 300, y: 300, w: 100, h: 100 }, bounds)).toMatchObject({
      x: 300,
      y: 300,
    });
  });
});

describe("centerRect", () => {
  it("centres", () => {
    expect(centerRect({ w: 200, h: 100 }, bounds)).toEqual({
      x: 400,
      y: 350,
      w: 200,
      h: 100,
    });
  });
});

describe("cascadeRect", () => {
  it("offsets when sitting on another window", () => {
    const r = cascadeRect({ x: 100, y: 100, w: 300, h: 200 }, [
      { x: 100, y: 100, w: 300, h: 200 },
    ]);
    expect(r).toMatchObject({ x: 132, y: 132 });
  });
  it("leaves free positions alone", () => {
    const r = cascadeRect({ x: 100, y: 100, w: 300, h: 200 }, [
      { x: 500, y: 500, w: 300, h: 200 },
    ]);
    expect(r).toMatchObject({ x: 100, y: 100 });
  });
});

describe("isOffscreen", () => {
  it("detects rects the user could not grab", () => {
    expect(isOffscreen({ x: -500, y: 0, w: 300, h: 200 }, bounds)).toBe(true);
    expect(isOffscreen({ x: 100, y: 100, w: 300, h: 200 }, bounds)).toBe(false);
  });
});

describe("resizeRect", () => {
  const start = { x: 100, y: 100, w: 400, h: 300 };
  it("grows from the south-east", () => {
    expect(resizeRect(start, "se", 50, 20, min)).toEqual({
      x: 100,
      y: 100,
      w: 450,
      h: 320,
    });
  });
  it("moves origin when resizing from north-west", () => {
    expect(resizeRect(start, "nw", 50, 20, min)).toEqual({
      x: 150,
      y: 120,
      w: 350,
      h: 280,
    });
  });
  it("respects min size from the west", () => {
    expect(resizeRect(start, "w", 350, 0, min)).toEqual({
      x: 300,
      y: 100,
      w: 200,
      h: 300,
    });
  });
});
