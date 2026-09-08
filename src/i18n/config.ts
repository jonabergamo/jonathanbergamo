export const LOCALES = ["en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "jb-locale";
export const HTML_LANG: Record<Locale, string> = { en: "en", pt: "pt-BR" };

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  );
}

export function detectLocale(language: string | undefined): Locale {
  return language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}
