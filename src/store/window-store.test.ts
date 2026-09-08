import { beforeEach, describe, expect, it } from "vitest";
import { useWindowStore } from "./window-store";

const bounds = { w: 1400, h: 900 };

beforeEach(() => {
  useWindowStore.setState((s) => ({ ...s }));
  useWindowStore.getState().setBounds(bounds);
  useWindowStore.getState().resetLayout();
});

describe("defaults", () => {
  it("opens About and Skills on a fresh visit, About focused", () => {
    const s = useWindowStore.getState();
    expect(s.windows.about.status).toBe("open");
    expect(s.windows.skills.status).toBe("open");
    expect(s.windows.projects.status).toBe("closed");
    expect(s.focused).toBe("about");
    expect(s.order).toEqual(["skills", "about"]);
  });
  it("resetLayout reopens About and Skills only", () => {
    useWindowStore.getState().open("projects");
    useWindowStore.getState().close("skills");
    useWindowStore.getState().resetLayout();
    const s = useWindowStore.getState();
    expect(s.windows.projects.status).toBe("closed");
    expect(s.windows.skills.status).toBe("open");
    expect(s.windows.about.status).toBe("open");
  });
});

describe("open / close / focus", () => {
  it("opens a closed window on top and cascades away from others", () => {
    useWindowStore.getState().open("skills");
    const s = useWindowStore.getState();
    expect(s.windows.skills.status).toBe("open");
    expect(s.order.at(-1)).toBe("skills");
    expect(s.focused).toBe("skills");
  });
  it("closing focuses the next visible window and keeps the rect", () => {
    useWindowStore.getState().open("projects");
    useWindowStore.getState().focus("about");
    const before = useWindowStore.getState().windows.about.rect;
    useWindowStore.getState().close("about");
    const s = useWindowStore.getState();
    expect(s.windows.about.status).toBe("closed");
    expect(s.windows.about.rect).toEqual(before);
    expect(s.focused).toBe("projects");
    expect(s.order).not.toContain("about");
  });
  it("focus moves to the top of the order", () => {
    useWindowStore.getState().open("projects");
    useWindowStore.getState().focus("about");
    useWindowStore.getState().focus("projects");
    expect(useWindowStore.getState().order.at(-1)).toBe("projects");
    expect(useWindowStore.getState().focused).toBe("projects");
  });
});

describe("minimize / restore / maximize", () => {
  it("minimize hides but keeps the window running; restore brings it back on top", () => {
    useWindowStore.getState().open("projects");
    useWindowStore.getState().focus("about");
    useWindowStore.getState().minimize("about");
    let s = useWindowStore.getState();
    expect(s.windows.about.status).toBe("minimized");
    expect(s.order).toContain("about");
    expect(s.focused).toBe("projects");
    useWindowStore.getState().restore("about");
    s = useWindowStore.getState();
    expect(s.windows.about.status).toBe("open");
    expect(s.focused).toBe("about");
  });
  it("taskbar click follows minimize/restore/focus semantics", () => {
    useWindowStore.getState().open("projects");
    useWindowStore.getState().focus("about");
    useWindowStore.getState().taskbarClick("about"); // focused -> minimize
    expect(useWindowStore.getState().windows.about.status).toBe("minimized");
    useWindowStore.getState().taskbarClick("about"); // minimized -> restore
    expect(useWindowStore.getState().windows.about.status).toBe("open");
    useWindowStore.getState().taskbarClick("projects"); // unfocused -> focus
    expect(useWindowStore.getState().focused).toBe("projects");
  });
  it("maximize keeps the normal rect", () => {
    const rect = useWindowStore.getState().windows.about.rect;
    useWindowStore.getState().toggleMaximize("about");
    expect(useWindowStore.getState().windows.about.maximized).toBe(true);
    expect(useWindowStore.getState().windows.about.rect).toEqual(rect);
    useWindowStore.getState().toggleMaximize("about");
    expect(useWindowStore.getState().windows.about.maximized).toBe(false);
  });
});

describe("move / resize / bounds", () => {
  it("clamps moves so the title bar stays reachable", () => {
    useWindowStore.getState().move("about", { x: -5000, y: -100 });
    const r = useWindowStore.getState().windows.about.rect;
    expect(r.x).toBe(64 - r.w);
    expect(r.y).toBe(0);
  });
  it("snaps to the top-left corner", () => {
    useWindowStore.getState().move("about", { x: 6, y: 9 });
    expect(useWindowStore.getState().windows.about.rect).toMatchObject({
      x: 0,
      y: 0,
    });
  });
  it("resize enforces the minimum size", () => {
    useWindowStore.getState().resize("about", { x: 10, y: 10, w: 10, h: 10 });
    expect(useWindowStore.getState().windows.about.rect).toMatchObject({
      w: 360,
      h: 320,
    });
  });
  it("shrinking the viewport re-clamps every window", () => {
    useWindowStore.getState().open("projects");
    useWindowStore.getState().move("projects", { x: 1200, y: 700 });
    useWindowStore.getState().setBounds({ w: 800, h: 600 });
    const r = useWindowStore.getState().windows.projects.rect;
    expect(r.x + 64).toBeLessThanOrEqual(800);
    expect(r.y).toBeLessThanOrEqual(560);
  });
});

describe("cycleFocus", () => {
  it("rotates through open windows", () => {
    useWindowStore.getState().open("projects");
    useWindowStore.getState().cycleFocus();
    expect(useWindowStore.getState().focused).toBe("skills");
  });
});
