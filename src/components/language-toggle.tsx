"use client";

import { useI18n } from "@/i18n/context";
import { LOCALES, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const LABEL: Record<Locale, string> = { en: "EN", pt: "PT" };

export function LanguageToggle({
  className,
  tone = "taskbar",
}: {
  className?: string;
  tone?: "taskbar" | "surface";
}) {
  const { locale, setLocale, t } = useI18n();
  const onTaskbar = tone === "taskbar";
  return (
    <div
      role="radiogroup"
      aria-label={t("os.language")}
      className={cn(
        "inline-flex h-8 items-center rounded-md p-0.5 font-mono text-xs",
        onTaskbar ? "bg-taskbar-foreground/10" : "bg-muted",
        className,
      )}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            role="radio"
            aria-checked={active}
            data-testid={`lang-${code}`}
            onClick={() => setLocale(code)}
            className={cn(
              "focus-visible:outline-brand-mid h-7 rounded-[5px] px-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1",
              active
                ? onTaskbar
                  ? "bg-brand-paper text-brand-ink"
                  : "bg-brand-ink text-brand-paper"
                : onTaskbar
                  ? "text-taskbar-foreground/70 hover:text-taskbar-foreground"
                  : "text-muted-foreground hover:text-foreground",
            )}
          >
            {LABEL[code]}
          </button>
        );
      })}
    </div>
  );
}
