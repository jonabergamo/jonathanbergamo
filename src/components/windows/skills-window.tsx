"use client";

import { Download } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { howIWork } from "@/data/how-i-work";
import { profile } from "@/data/profile";

/** Window id stays "skills" for saved layouts; the content is how I work. */
export default function SkillsWindow() {
  const { t, l, locale } = useI18n();
  return (
    <div className="p-6 sm:p-8">
      <p className="text-muted-foreground max-w-[60ch] text-sm leading-relaxed">
        {t("skills.intro")}
      </p>
      <ol className="mt-6 space-y-6">
        {howIWork.map((p) => (
          <li key={p.id} className="max-w-[66ch]">
            <h3 className="font-display text-lg leading-tight font-bold">
              {l(p.title)}
            </h3>
            <p className="mt-1.5 text-[15px] leading-relaxed">{l(p.body)}</p>
          </li>
        ))}
      </ol>
      <p className="border-brand-ink/10 text-muted-foreground mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 border-t-2 pt-4 text-xs">
        {t("skills.cvNote")}
        <a
          href={profile.cv[locale]}
          download
          className="text-foreground inline-flex items-center gap-1 font-medium hover:underline"
        >
          <Download className="size-3.5" /> {t("contact.cv")}
        </a>
      </p>
    </div>
  );
}
