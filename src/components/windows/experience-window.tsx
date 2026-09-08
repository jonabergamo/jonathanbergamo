"use client";

import { ExternalLink } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { HTML_LANG } from "@/i18n/config";
import { experience } from "@/data/experience";

function fmt(ym: string, lang: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString(lang, {
    month: "short",
    year: "numeric",
  });
}

export default function ExperienceWindow() {
  const { t, l, locale } = useI18n();
  const lang = HTML_LANG[locale];
  return (
    <ol className="relative space-y-10 p-6 sm:p-8">
      <span
        aria-hidden
        className="bg-brand-navy/15 absolute top-8 bottom-8 left-[2.15rem] w-0.5 sm:left-[2.65rem]"
      />
      {experience.map((job, i) => (
        <li key={job.id} className="relative pl-9">
          <span
            aria-hidden
            className={`border-brand-navy absolute top-1.5 left-0 grid size-5 place-items-center rounded-full border-2 ${i === 0 ? "bg-brand-red" : "bg-brand-cream"}`}
          />
          <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-xl leading-tight font-bold">
              {job.url ? (
                <a
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  {job.company} <ExternalLink className="size-3.5 opacity-60" />
                </a>
              ) : (
                job.company
              )}
            </h3>
            <p className="text-muted-foreground font-mono text-xs tabular-nums">
              {fmt(job.start, lang)} –{" "}
              {job.end ? fmt(job.end, lang) : t("experience.present")}
            </p>
          </header>
          <p className="mt-0.5 text-sm font-medium">{l(job.role)}</p>
          <p className="text-muted-foreground text-xs">{l(job.location)}</p>
          <p className="text-muted-foreground mt-3 max-w-[64ch] text-sm leading-relaxed">
            {l(job.summary)}
          </p>
          <ul className="mt-3 max-w-[68ch] space-y-2 text-sm leading-relaxed">
            {l(job.bullets).map((b, idx) => (
              <li key={idx} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="bg-brand-blue mt-2 size-1.5 shrink-0 rounded-sm"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <ul
            className="mt-4 flex flex-wrap gap-1.5"
            aria-label={t("experience.stack")}
          >
            {job.stack.map((s) => (
              <li
                key={s}
                className="border-brand-navy/25 text-muted-foreground rounded-sm border px-1.5 py-0.5 font-mono text-[11px]"
              >
                {s}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
