import { describe, expect, it } from "vitest";
import { PALETTES, THEMES, parseTheme, themeId } from "./palettes";

describe("palettes", () => {
  it("every palette has five distinct swatches", () => {
    for (const p of PALETTES) expect(new Set(p.swatches).size).toBe(5);
  });
  it("themes enumerate light and dark per palette", () => {
    expect(THEMES).toHaveLength(PALETTES.length * 2);
    expect(THEMES).toContain("natoora-light");
    expect(THEMES).toContain("graphite-dark");
  });
  it("parseTheme round-trips and falls back", () => {
    expect(parseTheme(themeId("plum", "dark"))).toEqual({
      palette: "plum",
      mode: "dark",
    });
    expect(parseTheme(undefined)).toEqual({
      palette: "natoora",
      mode: "light",
    });
    expect(parseTheme("nope-dark")).toEqual({
      palette: "natoora",
      mode: "dark",
    });
  });
});
