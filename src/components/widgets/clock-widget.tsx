"use client";

import * as React from "react";
import { useI18n } from "@/i18n/context";
import { HTML_LANG } from "@/i18n/config";
import { WidgetFrame } from "./widget-frame";

function subscribe(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}
function useSeconds() {
  return React.useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 1000),
    () => null,
  );
}

const ZONES = [
  { key: "sp", short: "SP", zone: "America/Sao_Paulo" },
  { key: "ldn", short: "LDN", zone: "Europe/London" },
] as const;

export function ClockWidget({ inline }: { inline?: boolean }) {
  const { t, locale } = useI18n();
  const sec = useSeconds();
  const lang = HTML_LANG[locale];
  const now = sec === null ? null : new Date(sec * 1000);
  if (inline) {
    return (
      <WidgetFrame id="clock" title={t("widgets.clock.title")} inline>
        <div className="flex items-baseline justify-between gap-2">
          {ZONES.map((z) => (
            <p
              key={z.key}
              className="font-mono text-base leading-none font-semibold tabular-nums"
            >
              <span className="text-muted-foreground mr-1 font-sans text-[10px]">
                {z.short}
              </span>
              {now
                ? now.toLocaleTimeString(lang, {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    timeZone: z.zone,
                  })
                : "--:--"}
            </p>
          ))}
        </div>
      </WidgetFrame>
    );
  }

  return (
    <WidgetFrame id="clock" title={t("widgets.clock.title")} inline={inline}>
      <div className="flex items-end justify-between gap-3">
        {ZONES.map((z) => (
          <div key={z.key} className="min-w-0">
            <p className="text-muted-foreground text-[11px]">
              {t(`widgets.clock.${z.key}`)}
            </p>
            <p
              className={
                inline
                  ? "font-mono text-xl leading-none font-semibold tabular-nums"
                  : "font-mono text-2xl leading-none font-semibold tabular-nums"
              }
            >
              {now
                ? now.toLocaleTimeString(lang, {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    timeZone: z.zone,
                  })
                : "--:--"}
            </p>
          </div>
        ))}
      </div>
      <p
        className={inline ? "hidden" : "text-muted-foreground mt-2 text-[11px]"}
      >
        {now
          ? now.toLocaleDateString(lang, {
              weekday: "long",
              day: "numeric",
              month: "long",
              timeZone: "America/Sao_Paulo",
            })
          : ""}
      </p>
    </WidgetFrame>
  );
}
