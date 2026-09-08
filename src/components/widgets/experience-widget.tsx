"use client";

import * as React from "react";
import { useI18n } from "@/i18n/context";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { WidgetFrame } from "./widget-frame";

function ym(s: string) {
  const [y, m] = s.split("-").map(Number);
  return new Date(y, m - 1, 1);
}

/** Whole months between two dates. */
function monthsBetween(a: Date, b: Date) {
  return (
    (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
  );
}

function subscribe(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}

/**
 * Time in the industry, live. Years, months and days since the first role,
 * plus a tenure bar per company. It is the one place on the site where the
 * numbers are the point.
 */
export function ExperienceWidget({ inline }: { inline?: boolean }) {
  const { t, l } = useI18n();
  const now = React.useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 1000),
    () => null,
  );
  const start = new Date(profile.since.year, profile.since.month - 1, 1);
  const today = now === null ? null : new Date(now * 1000);

  let years = 0;
  let months = 0;
  let days = 0;
  if (today) {
    const total =
      monthsBetween(start, today) - (today.getDate() < start.getDate() ? 1 : 0);
    years = Math.floor(total / 12);
    months = total % 12;
    const anchor = new Date(start);
    anchor.setMonth(start.getMonth() + total);
    days = Math.floor((today.getTime() - anchor.getTime()) / 86_400_000);
  }

  const jobs = experience.map((job) => {
    const from = ym(job.start);
    const to = job.end ? ym(job.end) : (today ?? from);
    return { job, months: Math.max(1, monthsBetween(from, to)) };
  });
  const longest = Math.max(...jobs.map((j) => j.months));
  const tenure = (m: number) => {
    const y = Math.floor(m / 12);
    const r = m % 12;
    const parts: string[] = [];
    if (y) parts.push(t("widgets.experience.yShort", { n: y }));
    if (r || !y) parts.push(t("widgets.experience.mShort", { n: r }));
    return parts.join(" ");
  };

  return (
    <WidgetFrame
      id="experience"
      title={t("widgets.experience.title")}
      inline={inline}
    >
      <div
        className={cn(
          "flex items-baseline font-mono tabular-nums",
          inline ? "gap-2" : "gap-3",
        )}
      >
        <Unit
          value={years}
          label={t("widgets.experience.years", { n: years })}
          big={!inline}
        />
        <Unit
          value={months}
          label={t("widgets.experience.months", { n: months })}
        />
        <Unit value={days} label={t("widgets.experience.days", { n: days })} />
        {inline && (
          <span className="text-muted-foreground ml-auto max-w-[45%] text-right font-sans text-[10px] leading-tight">
            {t("widgets.experience.since")}
          </span>
        )}
      </div>
      {!inline && (
        <p className="text-muted-foreground mt-1 text-[11px]">
          {t("widgets.experience.since")}
        </p>
      )}
      <ul className={cn("mt-3 space-y-1.5", inline && "hidden")}>
        {jobs.map(({ job, months: m }) => (
          <li key={job.id} className="text-[11px]">
            <div className="flex justify-between gap-2">
              <span className="truncate font-medium">{job.company}</span>
              <span className="text-muted-foreground shrink-0">
                {job.end
                  ? tenure(m)
                  : `${tenure(m)} · ${t("experience.present")}`}
              </span>
            </div>
            <div className="bg-brand-ink/15 mt-0.5 h-1.5 rounded-full">
              <div
                className={cn(
                  "h-full rounded-full",
                  job.end ? "bg-brand-mid" : "bg-brand-accent",
                )}
                style={{ width: `${(m / longest) * 100}%` }}
                aria-hidden
              />
            </div>
            <span className="sr-only">{l(job.role)}</span>
          </li>
        ))}
      </ul>
    </WidgetFrame>
  );
}

function Unit({
  value,
  label,
  big,
}: {
  value: number;
  label: string;
  big?: boolean;
}) {
  return (
    <div className="min-w-0">
      <span
        className={cn(
          "block leading-none font-semibold",
          big ? "text-3xl" : "text-xl",
        )}
      >
        {value}
      </span>
      <span className="text-muted-foreground block text-[10px]">{label}</span>
    </div>
  );
}
