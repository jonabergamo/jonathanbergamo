import type { Locale } from "./config";

export type Localized<T = string> = { en: T; pt: T };

type Primitive = string | number | boolean;

/** "a.b.c" paths to every string leaf of an object type. */
export type DotPath<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends Primitive
    ? `${Prefix}${K}`
    : T[K] extends readonly unknown[]
      ? `${Prefix}${K}`
      : DotPath<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

export function getPath(dict: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, dict);
}

export function interpolate(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export function localize<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.en;
}

/** Every dot path whose leaf is a string, for parity checks. */
export function leafPaths(dict: unknown, prefix = ""): string[] {
  if (!dict || typeof dict !== "object") return [];
  return Object.entries(dict as Record<string, unknown>).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? leafPaths(v, `${prefix}${k}.`)
      : [`${prefix}${k}`],
  );
}
