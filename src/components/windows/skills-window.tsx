"use client";

import { useI18n } from "@/i18n/context";
import { skills } from "@/data/skills";
import { cn } from "@/lib/utils";

export default function SkillsWindow() {
  const { t, l } = useI18n();
  return (
    <div className="space-y-7 p-6 sm:p-8">
      <p className="text-muted-foreground max-w-[60ch] text-sm">
        {t("skills.intro")}
      </p>
      {skills.map((group) => (
        <section key={group.id}>
          <h3 className="font-display mb-2 text-base font-bold">
            {l(group.label)}
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {group.skills.map((s) => (
              <li
                key={s.name}
                className={cn(
                  "rounded-md border px-2 py-1 text-[13px] leading-none",
                  s.core
                    ? "border-brand-navy bg-brand-navy text-brand-cream dark:border-brand-cream dark:bg-brand-cream dark:text-brand-navy font-semibold"
                    : "border-brand-navy/25 text-foreground/90",
                )}
              >
                {s.name}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
