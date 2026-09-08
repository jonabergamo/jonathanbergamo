import * as THREE from "three";

/*
 * Palette discipline: everything below is derived from the five brand colours.
 * The one documented exception is SKIN, a warm light tone; a cream skin looked
 * jaundiced under toon shading and a navy one is not a person.
 */
export const BRAND = {
  darkred: "#780000",
  red: "#c1121f",
  cream: "#fdf0d5",
  navy: "#003049",
  blue: "#669bbc",
} as const;

export const SKIN = "#f2c9a6"; // exception, see above

function mix(a: string, b: string, t: number) {
  return new THREE.Color(a).lerp(new THREE.Color(b), t);
}

export const COLORS = {
  skin: new THREE.Color(SKIN),
  hair: mix(BRAND.navy, BRAND.darkred, 0.42).multiplyScalar(0.42), // dark brown, palette-derived
  stubble: mix(BRAND.navy, BRAND.darkred, 0.42).multiplyScalar(0.5),
  jacket: new THREE.Color(BRAND.navy).multiplyScalar(0.45),
  jacketTrim: new THREE.Color(BRAND.navy).multiplyScalar(0.7),
  sweaterLight: new THREE.Color(BRAND.cream),
  sweaterDark: new THREE.Color(BRAND.navy),
  frames: new THREE.Color(BRAND.navy).multiplyScalar(0.6),
  lens: new THREE.Color(BRAND.blue),
  eye: new THREE.Color(BRAND.navy).multiplyScalar(0.5),
  mouth: mix(BRAND.darkred, SKIN, 0.35),
  blush: new THREE.Color(BRAND.red),
  earring: new THREE.Color(BRAND.cream),
};

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

/** Horizontal cream/navy stripes for the sweater. */
export function stripeTexture(bands = 15) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = 8;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const h = size / bands;
  for (let i = 0; i < bands; i++) {
    ctx.fillStyle = i % 2 === 0 ? BRAND.cream : BRAND.navy;
    ctx.fillRect(0, i * h, 8, h);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  return tex;
}
