import * as THREE from "three";

/*
 * Palette discipline: everything below is derived from the five brand colours.
 * The one documented exception is SKIN, a warm light tone; a cream skin looked
 * jaundiced under toon shading and a navy one is not a person.
 */
export type Brand = {
  deep: string;
  accent: string;
  paper: string;
  ink: string;
  mid: string;
};

/** Default palette; replaced at runtime by readBrand() so the avatar follows the active theme. */
export const BRAND: Brand = {
  deep: "#780000",
  accent: "#c1121f",
  paper: "#fdf0d5",
  ink: "#003049",
  mid: "#669bbc",
};

export function readBrand(): Brand {
  if (typeof window === "undefined") return BRAND;
  const cs = getComputedStyle(document.documentElement);
  const get = (v: string, fallback: string) =>
    cs.getPropertyValue(v).trim() || fallback;
  return {
    deep: get("--p-deep", BRAND.deep),
    accent: get("--p-accent", BRAND.accent),
    paper: get("--p-paper", BRAND.paper),
    ink: get("--p-ink", BRAND.ink),
    mid: get("--p-mid", BRAND.mid),
  };
}

export const SKIN = "#f2c9a6"; // exception, see above

function mix(a: string, b: string, t: number) {
  return new THREE.Color(a).lerp(new THREE.Color(b), t);
}

export function paletteColors(b: Brand) {
  return {
    skin: new THREE.Color(SKIN),
    // Hair and stubble stay a dark brown whatever the palette: it is a portrait.
    hair: new THREE.Color("#2b1d1a"),
    stubble: new THREE.Color("#2b1d1a"),
    jacket: new THREE.Color(b.ink).multiplyScalar(0.45),
    jacketTrim: new THREE.Color(b.ink).multiplyScalar(0.7),
    sweaterLight: new THREE.Color(b.paper),
    sweaterDark: new THREE.Color(b.ink),
    frames: new THREE.Color(b.ink).multiplyScalar(0.6),
    lens: new THREE.Color(b.mid),
    eye: new THREE.Color(b.ink).multiplyScalar(0.5),
    mouth: mix(b.deep, SKIN, 0.35),
    blush: new THREE.Color(b.accent),
    earring: new THREE.Color(b.paper),
  };
}

let gradient: THREE.DataTexture | null = null;
/** Three-step gradient for MeshToonMaterial: flat, readable, low-poly look. */
export function toonGradient() {
  if (gradient) return gradient;
  const data = new Uint8Array([
    90, 90, 90, 255, 170, 170, 170, 255, 255, 255, 255, 255,
  ]);
  gradient = new THREE.DataTexture(data, 3, 1, THREE.RGBAFormat);
  gradient.minFilter = THREE.NearestFilter;
  gradient.magFilter = THREE.NearestFilter;
  gradient.needsUpdate = true;
  return gradient;
}

export function toon(
  color: THREE.Color,
  extra?: Partial<THREE.MeshToonMaterialParameters>,
) {
  return new THREE.MeshToonMaterial({
    color,
    gradientMap: toonGradient(),
    ...extra,
  });
}

/** Horizontal paper/ink stripes for the sweater. */
export function stripeTexture(b: Brand, bands = 15) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = 8;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const h = size / bands;
  for (let i = 0; i < bands; i++) {
    ctx.fillStyle = i % 2 === 0 ? b.paper : b.ink;
    ctx.fillRect(0, i * h, 8, h);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  return tex;
}
