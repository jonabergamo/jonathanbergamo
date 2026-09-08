"use client";

import * as React from "react";
import { useI18n } from "@/i18n/context";
import { HTML_LANG } from "@/i18n/config";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}

/** Minute-precision timestamp; null on the server so the markup matches. */
function useNow() {
  return React.useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 60_000) * 60_000,
    () => null,
  );
}

export function Clock() {
  const { locale } = useI18n();
  const ts = useNow();
  if (ts === null) return <span className="w-14" aria-hidden />;
  const now = new Date(ts);
  return (
    <time
      dateTime={now.toISOString()}
      className="text-taskbar-foreground/90 hidden min-w-14 px-2 text-right font-mono text-xs tabular-nums sm:block"
    >
      {now.toLocaleTimeString(HTML_LANG[locale], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </time>
  );
}
