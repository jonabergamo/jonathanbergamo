"use client";

import { useState } from "react";
import Image from "next/image";
import Markdown from "react-markdown";
import { Award, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useI18n } from "@/i18n/context";
import type { Project } from "@/data/types";

export function ProjectDetail({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { t, l } = useI18n();
  const [shot, setShot] = useState<[string | undefined, number]>([
    undefined,
    0,
  ]);
  const shots = project?.images ?? [];
  const idx = shot[0] === project?.id ? shot[1] : 0;
  const current = shots[idx];
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="border-brand-ink shadow-window max-h-[85dvh] overflow-y-auto rounded-lg border-2 p-0 sm:max-w-2xl">
        {project && (
          <>
            <DialogHeader className="bg-titlebar text-titlebar-foreground space-y-1 px-6 py-4 text-left">
              <DialogTitle className="font-display text-2xl font-bold">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-titlebar-foreground/80">
                {project.period} · {t(`projects.status.${project.status}`)}
              </DialogDescription>
            </DialogHeader>
            {current && (
              <figure className="bg-brand-ink/5 dark:bg-brand-paper/5 border-brand-ink/15 m-0 w-full max-w-full min-w-0 overflow-hidden border-b">
                <div className="flex h-56 w-full min-w-0 items-center justify-center overflow-hidden p-3 sm:h-80">
                  <Image
                    key={current.src}
                    src={current.src}
                    alt={l(current.alt)}
                    width={current.wide === false ? 600 : 1600}
                    height={current.wide === false ? 1298 : 1000}
                    className="border-brand-ink/20 block h-auto max-h-full w-auto max-w-full rounded-md border object-contain"
                  />
                </div>
                {shots.length > 1 && (
                  <figcaption className="flex min-w-0 items-center justify-between gap-3 px-4 pb-3 text-xs">
                    <span className="text-muted-foreground min-w-0 truncate">
                      {l(current.alt)}
                    </span>
                    <span className="flex shrink-0 gap-1.5" role="tablist">
                      {shots.map((s, i) => (
                        <button
                          key={s.src}
                          type="button"
                          role="tab"
                          aria-selected={i === idx}
                          aria-label={l(s.alt)}
                          onClick={() => setShot([project.id, i])}
                          className={
                            i === idx
                              ? "bg-brand-accent size-2.5 rounded-full"
                              : "bg-brand-ink/25 hover:bg-brand-ink/50 dark:bg-brand-paper/30 size-2.5 rounded-full"
                          }
                        />
                      ))}
                    </span>
                  </figcaption>
                )}
              </figure>
            )}
            <div className="space-y-5 px-6 py-5">
              {project.award && (
                <p className="bg-brand-accent/10 text-brand-deep dark:text-brand-paper inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold">
                  <Award className="size-4" /> {l(project.award)}
                </p>
              )}
              <div className="prose-sm [&_strong]:font-display max-w-[66ch] space-y-3 text-[15px] leading-relaxed [&_strong]:text-base [&_strong]:font-bold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
                <Markdown>{l(project.description)}</Markdown>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((tg) => (
                  <li
                    key={tg}
                    className="border-brand-ink/25 text-muted-foreground rounded-sm border px-1.5 py-0.5 font-mono text-[11px]"
                  >
                    {tg}
                  </li>
                ))}
              </ul>
              {project.links?.length ? (
                <div>
                  <p className="text-muted-foreground mb-2 text-xs font-medium">
                    {t("projects.links")}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {project.links.map((lnk) => (
                      <li key={lnk.url}>
                        <a
                          href={lnk.url}
                          target="_blank"
                          rel="noreferrer"
                          className="border-brand-ink bg-card shadow-hard dark:border-brand-paper/30 inline-flex h-9 items-center gap-2 rounded-md border-2 px-3 text-sm font-semibold hover:-translate-y-0.5"
                        >
                          {lnk.label} <ExternalLink className="size-3.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-muted-foreground text-xs">
                  {t("projects.noLink")}
                </p>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
