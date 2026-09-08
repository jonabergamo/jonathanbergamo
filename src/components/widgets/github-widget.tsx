"use client";

import * as React from "react";
import { useI18n } from "@/i18n/context";
import { HTML_LANG } from "@/i18n/config";
import { profile } from "@/data/profile";
import { WidgetFrame } from "./widget-frame";

type Event = {
  type: string;
  repo: string;
  at: string;
  count?: number;
  daysAgo: number;
};

async function load(): Promise<Event | null> {
  try {
    const r = await fetch(
      "https://api.github.com/users/jonabergamo/events/public?per_page=10",
      {
        headers: { accept: "application/vnd.github+json" },
      },
    );
    if (!r.ok) return null;
    const list = (await r.json()) as Array<{
      type: string;
      repo: { name: string };
      created_at: string;
      payload?: { commits?: unknown[] };
    }>;
    const ev = list.find((e) => e.type === "PushEvent") ?? list[0];
    if (!ev) return null;
    return {
      type: ev.type,
      repo: ev.repo.name,
      at: ev.created_at,
      count: ev.payload?.commits?.length,
      daysAgo: Math.round(
        (new Date(ev.created_at).getTime() - Date.now()) / 86_400_000,
      ),
    };
  } catch {
    return null;
  }
}

export function GithubWidget({ inline }: { inline?: boolean }) {
  const { t, locale } = useI18n();
  const [ev, setEv] = React.useState<Event | null | undefined>(undefined);
  React.useEffect(() => {
    let alive = true;
    load().then((v) => alive && setEv(v));
    return () => {
      alive = false;
    };
  }, []);

  const when = ev
    ? new Intl.RelativeTimeFormat(HTML_LANG[locale], {
        numeric: "auto",
      }).format(ev.daysAgo, "day")
    : "";

  return (
    <WidgetFrame id="github" title={t("widgets.github.title")} inline={inline}>
      {ev === undefined ? (
        <p className="text-muted-foreground text-sm">
          {t("widgets.weather.loading")}
        </p>
      ) : ev === null ? (
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="text-sm underline"
        >
          {t("widgets.github.fallback")}
        </a>
      ) : (
        <>
          <p className="text-sm leading-snug">
            {ev.type === "PushEvent"
              ? t("widgets.github.pushed", { count: ev.count ?? 1 })
              : t("widgets.github.active")}
          </p>
          <a
            href={`https://github.com/${ev.repo}`}
            target="_blank"
            rel="noreferrer"
            className="text-brand-accent dark:text-brand-mid mt-1 block truncate font-mono text-xs hover:underline"
          >
            {ev.repo}
          </a>
          <p className="text-muted-foreground mt-1 text-[11px]">{when}</p>
        </>
      )}
    </WidgetFrame>
  );
}
