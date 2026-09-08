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
                    ? "border-brand-ink bg-brand-ink text-brand-paper dark:border-brand-paper dark:bg-brand-paper dark:text-brand-ink font-semibold"
                    : "border-brand-ink/25 text-foreground/90",
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
