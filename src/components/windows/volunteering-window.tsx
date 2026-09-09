"use client";

import { ExternalLink, HeartHandshake } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { volunteering } from "@/data/volunteering";

export default function VolunteeringWindow() {
  const { t, l } = useI18n();
  return (
    <div className="space-y-8 p-6 sm:p-8">
      <p className="text-muted-foreground max-w-[60ch] text-sm leading-relaxed">
        {t("volunteering.intro")}
      </p>
      {volunteering.map((v) => (
        <article key={v.id}>
          <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-xl leading-tight font-bold">
              {v.url ? (
                <a
                  href={v.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  {v.organisation}{" "}
                  <ExternalLink className="size-3.5 opacity-60" />
                </a>
              ) : (
                v.organisation
              )}
            </h3>
            <p className="text-muted-foreground font-mono text-xs tabular-nums">
              {v.period}
            </p>
          </header>
          <p className="mt-0.5 text-sm font-medium">{l(v.role)}</p>
          <p className="text-muted-foreground text-xs">{l(v.location)}</p>
          <p className="text-muted-foreground mt-3 max-w-[64ch] text-sm leading-relaxed">
            {l(v.summary)}
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {l(v.initiatives).map((i) => (
              <li
                key={i.title}
                className="border-brand-ink/25 rounded-lg border-2 p-4"
              >
                <HeartHandshake
                  className="text-brand-accent mb-2 size-5"
                  aria-hidden
                />
                <h4 className="font-display text-base leading-tight font-bold">
                  {i.title}
                </h4>
                <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {i.body}
                </p>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
