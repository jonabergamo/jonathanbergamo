"use client";

import * as React from "react";
import { useI18n } from "@/i18n/context";
import { WidgetFrame } from "./widget-frame";

const COUNT = 8;

/** Picks a different line per hour, so the widget changes but stays stable within a visit. */
export function StatusWidget({ inline }: { inline?: boolean }) {
  const { t } = useI18n();
  const idx = React.useSyncExternalStore(
    () => () => {},
    () => Math.floor(Date.now() / 3_600_000) % COUNT,
    () => 0,
  );
  const line = t(`widgets.status.lines.${idx}` as never);
  const hour = React.useSyncExternalStore(
    () => () => {},
    () =>
      Number(
        new Date().toLocaleString("en-GB", {
          hour: "numeric",
          hour12: false,
          timeZone: "America/Sao_Paulo",
        }),
      ),
    () => 12,
  );
  const coffee =
    hour < 6 ? 0 : hour < 10 ? 3 : hour < 14 ? 2 : hour < 19 ? 1 : 0;

  return (
    <WidgetFrame id="status" title={t("widgets.status.title")} inline={inline}>
      <p className="text-sm leading-snug">{line}</p>
      <div className="text-muted-foreground mt-3 flex items-center justify-between text-[11px]">
        <span>{t("widgets.status.coffee")}</span>
        <span aria-label={`${coffee}/3`} className="font-mono tracking-widest">
          {"●".repeat(coffee)}
          {"○".repeat(3 - coffee)}
        </span>
      </div>
    </WidgetFrame>
  );
}
