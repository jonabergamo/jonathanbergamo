"use client";

import { ArrowRight, Mail } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { profile } from "@/data/profile";
import { useWindowStore } from "@/store/window-store";
import Image from "next/image";
import { OpenToWorkBadge } from "@/components/open-to-work-badge";

export default function AboutWindow() {
  const { t, l } = useI18n();
  const open = useWindowStore((s) => s.open);
  return (
    <article className="flex h-full flex-col gap-6 p-6 sm:p-8">
      <header className="flex items-start gap-5">
        <div className="border-brand-ink bg-brand-mid/20 shadow-hard hidden size-24 shrink-0 overflow-hidden rounded-lg border-2 sm:block">
          <Image
            src="/portrait.webp"
            alt={profile.shortName}
            width={192}
            height={192}
            priority
            className="size-full object-cover"
          />
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

      <ul className="border-brand-ink/15 grid gap-4 border-y-2 py-5 sm:grid-cols-3">
        {l(profile.traits).map((tr) => (
          <li key={tr.title}>
            <h3 className="font-display text-base leading-tight font-bold">
              {tr.title}
            </h3>
            <p className="text-muted-foreground mt-1 text-[13px] leading-relaxed">
              {tr.body}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => open("contact")}
          className="border-brand-ink bg-primary text-primary-foreground shadow-hard dark:border-brand-paper/30 inline-flex h-10 items-center gap-2 rounded-md border-2 px-4 text-sm font-semibold transition-transform hover:-translate-y-0.5 active:translate-x-px active:translate-y-px active:shadow-none"
        >
          <Mail className="size-4" /> {t("about.cta")}
        </button>
        <button
          type="button"
          onClick={() => open("projects")}
          className="border-brand-ink bg-card shadow-hard dark:border-brand-paper/30 inline-flex h-10 items-center gap-2 rounded-md border-2 px-4 text-sm font-semibold transition-transform hover:-translate-y-0.5 active:translate-x-px active:translate-y-px active:shadow-none"
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
