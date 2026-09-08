import { describe, expect, it } from "vitest";
import { CLIP_BPM, danceSpeed } from "./avatar";

describe("danceSpeed", () => {
  it("is neutral when the tempo is unknown", () => {
    expect(danceSpeed(null)).toBe(1);
    expect(danceSpeed(0)).toBe(1);
  });
  it("matches the clip tempo exactly", () => {
    expect(danceSpeed(CLIP_BPM)).toBe(1);
  });
  it("folds fast songs to half time and slow songs to double time", () => {
    expect(danceSpeed(150)).toBeCloseTo(0.75); // 150 -> half time
    expect(danceSpeed(89)).toBeCloseTo(0.89);
    expect(danceSpeed(55)).toBeCloseTo(1.1); // 55 -> double time
  });
  it("clamps extremes", () => {
    expect(danceSpeed(400)).toBeLessThanOrEqual(1.6);
    expect(danceSpeed(20)).toBeGreaterThanOrEqual(0.6);
  });
});
