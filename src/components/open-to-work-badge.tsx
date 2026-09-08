"use client";

import { useI18n } from "@/i18n/context";

export function OpenToWorkBadge({ compact }: { compact?: boolean }) {
  const { t } = useI18n();
  return (
    <span
      data-testid="open-to-work"
      className="border-brand-red/70 bg-brand-red/10 text-brand-darkred dark:border-brand-red dark:bg-brand-red/20 dark:text-brand-cream inline-flex items-center gap-2 rounded-full border-2 py-1 pr-3 pl-2 text-xs font-semibold"
    >
      <span className="relative flex size-2">
        <span className="bg-brand-red absolute inline-flex size-full animate-ping rounded-full opacity-70 motion-reduce:hidden" />
        <span className="bg-brand-red relative inline-flex size-2 rounded-full" />
      </span>
      {compact ? t("about.status").split(" ")[0] : t("about.status")}
    </span>
  );
}
