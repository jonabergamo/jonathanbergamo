"use client";

import * as React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useI18n } from "@/i18n/context";
import { HTML_LANG } from "@/i18n/config";
import {
  photos,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  type Photo,
} from "@/data/photos";
import { InstagramIcon } from "@/components/brand-icons";

export default function PhotographyWindow() {
  const { t, locale } = useI18n();
  const [open, setOpen] = React.useState<Photo | null>(null);
  const lang = HTML_LANG[locale];

  return (
    <div className="flex min-h-full flex-col">
      <header className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6 pb-4">
        <div className="max-w-[46ch]">
          <h2 className="font-display text-2xl leading-tight font-bold">
            {t("photography.heading")}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            {t("photography.intro")}
          </p>
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="border-brand-ink bg-card shadow-hard dark:border-brand-paper/30 inline-flex h-9 items-center gap-2 rounded-md border-2 px-3 text-sm font-semibold hover:-translate-y-0.5"
        >
          <InstagramIcon className="size-4" /> {INSTAGRAM_HANDLE}
        </a>
      </header>

      <ul className="grid grid-cols-2 gap-2 px-6 pb-6 sm:grid-cols-3">
        {photos.map((p) => (
          <li
            key={p.code}
            className="border-brand-ink/70 bg-muted relative aspect-square overflow-hidden rounded-md border-2"
          >
            <button
              type="button"
              data-testid={`photo-${p.code}`}
              onClick={() => setOpen(p)}
              className="group focus-visible:outline-brand-mid block size-full focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Image
                src={`/photos/${p.code}.thumb.webp`}
                alt={t("photography.alt", { date: fmt(p.date, lang) })}
                fill
                sizes="(max-width: 640px) 50vw, 240px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="border-brand-ink shadow-window max-h-[92dvh] overflow-hidden rounded-lg border-2 p-0 sm:max-w-3xl">
          {open && (
            <>
              <DialogTitle className="sr-only">
                {t("photography.alt", { date: fmt(open.date, lang) })}
              </DialogTitle>
              <div
                className="bg-brand-ink relative"
                style={{
                  aspectRatio: `${open.width} / ${open.height}`,
                  maxHeight: "80dvh",
                }}
              >
                <Image
                  src={`/photos/${open.code}.webp`}
                  alt={t("photography.alt", { date: fmt(open.date, lang) })}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                <span className="text-muted-foreground">
                  {fmt(open.date, lang)}
                </span>
                <a
                  href={`${INSTAGRAM_URL}p/${open.code}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium hover:underline"
                >
                  {t("photography.openInstagram")}{" "}
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function fmt(iso: string, lang: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(lang, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}
