"use client";

import { ArrowRight, Mail } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { profile } from "@/data/profile";
import { useWindowStore } from "@/store/window-store";
import { AvatarPortrait } from "@/components/avatar/avatar-fallback";
import { OpenToWorkBadge } from "@/components/open-to-work-badge";

export default function AboutWindow() {
  const { t, l } = useI18n();
  const open = useWindowStore((s) => s.open);
  const now = new Date();
  const months =
    (now.getFullYear() - profile.since.year) * 12 +
    (now.getMonth() + 1 - profile.since.month);
  const years = Math.floor(months / 6) / 2;

  return (
    <article className="flex h-full flex-col gap-6 p-6 sm:p-8">
      <header className="flex items-start gap-5">
        <div className="border-brand-navy bg-brand-blue/20 hidden size-24 shrink-0 overflow-hidden rounded-lg border-2 sm:block">
          <AvatarPortrait className="size-full" />
        </div>
        <div className="min-w-0 space-y-2">
          {profile.openToWork && <OpenToWorkBadge />}
          <h2 className="font-display text-3xl leading-[1.05] font-bold tracking-tight sm:text-4xl">
            {t("about.greeting")}
          </h2>
          <p className="text-muted-foreground text-base">
            {t("about.role")} · {t("about.location")}
          </p>
        </div>
      </header>

      <p className="max-w-[62ch] text-[15px] leading-relaxed">
        {l(profile.summary)}
      </p>

      <dl className="border-brand-navy/15 grid grid-cols-3 gap-3 border-y-2 py-4">
        <Stat
          value={`${years.toFixed(1).replace(/\.0$/, "")}+`}
          label={t("about.yearsLabel")}
        />
        <Stat
          value={profile.stats.incidents}
          label={t("about.incidentsLabel")}
        />
        <Stat value={profile.stats.regions} label={t("about.regionsLabel")} />
      </dl>

      <div className="mt-auto flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => open("contact")}
          className="border-brand-navy bg-primary text-primary-foreground shadow-hard dark:border-brand-cream/30 inline-flex h-10 items-center gap-2 rounded-md border-2 px-4 text-sm font-semibold transition-transform hover:-translate-y-0.5 active:translate-x-px active:translate-y-px active:shadow-none"
        >
          <Mail className="size-4" /> {t("about.cta")}
        </button>
        <button
          type="button"
          onClick={() => open("projects")}
          className="border-brand-navy bg-card shadow-hard dark:border-brand-cream/30 inline-flex h-10 items-center gap-2 rounded-md border-2 px-4 text-sm font-semibold transition-transform hover:-translate-y-0.5 active:translate-x-px active:translate-y-px active:shadow-none"
        >
          {t("about.seeProjects")} <ArrowRight className="size-4" />
        </button>
        <p className="text-muted-foreground w-full text-xs sm:ml-auto sm:w-auto">
          {t("about.statusHint")}
        </p>
      </div>
    </article>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0">
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-2xl leading-none font-bold tabular-nums sm:text-3xl">
        {value}
      </dd>
      <dd className="text-muted-foreground mt-1 text-xs leading-snug">
        {label}
      </dd>
    </div>
  );
}
