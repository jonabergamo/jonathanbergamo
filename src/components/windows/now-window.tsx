"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { HTML_LANG } from "@/i18n/config";
import { now } from "@/data/now";
import { useWindowStore } from "@/store/window-store";

export default function NowWindow() {
  const { t, l, locale } = useI18n();
  const open = useWindowStore((s) => s.open);
  const updated = new Date(`${now.updated}T12:00:00Z`).toLocaleDateString(
    HTML_LANG[locale],
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
  return (
    <div className="p-6 sm:p-8">
      <p className="text-muted-foreground text-xs">
        {t("now.updated", { date: updated })}
      </p>
      <p className="text-muted-foreground mt-2 max-w-[56ch] text-sm leading-relaxed">
        {t("now.intro")}
      </p>
      <dl className="divide-brand-ink/10 mt-6 divide-y-2">
        {now.items.map((item) => (
          <div
            key={item.id}
            className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4"
          >
            <dt className="font-display text-base font-bold">
              {l(item.label)}
            </dt>
            <dd className="text-sm leading-relaxed">
              {l(item.body)}
              {item.open && (
                <button
                  type="button"
                  onClick={() => open(item.open!)}
                  className="text-brand-accent dark:text-brand-mid ml-2 inline-flex items-center gap-0.5 hover:underline"
                >
                  {t(`windows.${item.open}`)}{" "}
                  <ArrowUpRight className="size-3.5" />
                </button>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
