import { describe, expect, it } from "vitest";
import { getPath, interpolate, leafPaths, localize } from "./t";
import { en } from "../../messages/en";
import { pt } from "../../messages/pt";

describe("getPath", () => {
  it("resolves nested keys", () => {
    expect(getPath({ a: { b: { c: "x" } } }, "a.b.c")).toBe("x");
  });
  it("returns undefined for missing keys", () => {
    expect(getPath({ a: {} }, "a.b")).toBeUndefined();
    expect(getPath(null, "a")).toBeUndefined();
  });
});

describe("interpolate", () => {
  it("replaces known variables and leaves unknown ones", () => {
    expect(interpolate("Hi {name}, {x}", { name: "Jo" })).toBe("Hi Jo, {x}");
  });
  it("returns template when no vars", () => {
    expect(interpolate("plain")).toBe("plain");
  });
});

describe("localize", () => {
  it("picks the locale and falls back to en", () => {
    expect(localize({ en: "a", pt: "b" }, "pt")).toBe("b");
    expect(localize({ en: "a", pt: "" as string }, "pt")).toBe("");
    // @ts-expect-error missing pt on purpose
    expect(localize({ en: "a" }, "pt")).toBe("a");
  });
});

describe("message parity", () => {
  it("pt has every en key and no empty strings", () => {
    const enKeys = leafPaths(en).sort();
    const ptKeys = leafPaths(pt).sort();
    expect(ptKeys).toEqual(enKeys);
    for (const key of ptKeys) {
      const value = getPath(pt, key);
      expect(value, key).not.toBe("");
    }
  });
});
