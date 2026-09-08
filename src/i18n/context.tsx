"use client";

import * as React from "react";
import { HTML_LANG, type Locale } from "./config";
import { messages, type Messages } from "./messages";
import {
  getPath,
  interpolate,
  localize,
  type DotPath,
  type Localized,
} from "./t";
import { localeStore } from "./locale-store";

export type MessageKey = DotPath<Messages>;

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
  l: <T>(value: Localized<T>) => T;
};

const I18nContext = React.createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = React.useSyncExternalStore(
    localeStore.subscribe,
    localeStore.getSnapshot,
    localeStore.getServerSnapshot,
  );

  React.useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
  }, [locale]);

  const setLocale = React.useCallback(
    (next: Locale) => localeStore.set(next),
    [],
  );

  const value = React.useMemo<I18nValue>(() => {
    const dict = messages[locale];
    return {
      locale,
      setLocale,
      t: (key, vars) => {
        const found = getPath(dict, key) ?? getPath(messages.en, key);
        return typeof found === "string" ? interpolate(found, vars) : key;
      },
      l: (v) => localize(v, locale),
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
