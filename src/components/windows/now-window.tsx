"use client";

import {
  Aperture,
  ArrowUpRight,
  BookOpen,
  Box,
  Camera,
  Dumbbell,
  Gamepad2,
  Hammer,
  MapPin,
  Music2,
  Search,
  type LucideIcon,
} from "lucide-react";
import { useI18n } from "@/i18n/context";
import { HTML_LANG } from "@/i18n/config";
import { now, type NowItem } from "@/data/now";
import { useWindowStore } from "@/store/window-store";

const ICONS: Record<NowItem["icon"], LucideIcon> = {
  book: BookOpen,
  gamepad: Gamepad2,
  cube: Box,
  music: Music2,
  camera: Camera,
  aperture: Aperture,
  dumbbell: Dumbbell,
  hammer: Hammer,
  search: Search,
  pin: MapPin,
};

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
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {now.items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <li
              key={item.id}
              className="border-brand-ink/25 flex gap-3 rounded-lg border-2 p-4"
            >
              <span className="border-brand-ink/60 bg-muted grid size-9 shrink-0 place-items-center rounded-md border-2">
                <Icon className="size-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-muted-foreground text-[11px] font-medium">
                  {l(item.label)}
                </p>
                <p className="font-display text-base leading-tight font-bold">
                  {l(item.value)}
                </p>
                <p className="text-muted-foreground mt-1 text-[13px] leading-relaxed">
                  {l(item.body)}
                  {item.open && (
                    <button
                      type="button"
                      onClick={() => open(item.open!)}
                      className="text-brand-accent dark:text-brand-mid ml-1.5 inline-flex items-center gap-0.5 hover:underline"
                    >
                      {t(`windows.${item.open}`)}{" "}
                      <ArrowUpRight className="size-3.5" />
                    </button>
                  )}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
