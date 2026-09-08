import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  detectLocale,
  isLocale,
  type Locale,
} from "./config";
import { readString, writeString } from "@/lib/storage";

/**
 * Tiny external store for the current locale so components can subscribe via
 * useSyncExternalStore. The server snapshot is always the default locale; the
 * client snapshot reads localStorage (then the browser language) once.
 */
let current: Locale | null = null;
const listeners = new Set<() => void>();

function read(): Locale {
  if (current) return current;
  const stored = readString(LOCALE_STORAGE_KEY);
  current = isLocale(stored)
    ? stored
    : detectLocale(
        typeof navigator !== "undefined" ? navigator.language : undefined,
      );
  return current;
}

export const localeStore = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  getSnapshot: read,
  getServerSnapshot: () => DEFAULT_LOCALE,
  set(next: Locale) {
    current = next;
    writeString(LOCALE_STORAGE_KEY, next);
    listeners.forEach((cb) => cb());
  },
};
