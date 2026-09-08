"use client";

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
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="border-brand-navy shadow-window max-h-[85dvh] overflow-y-auto rounded-lg border-2 p-0 sm:max-w-2xl">
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
            <div className="space-y-5 px-6 py-5">
              {project.award && (
                <p className="bg-brand-red/10 text-brand-darkred dark:text-brand-cream inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold">
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
                    className="border-brand-navy/25 text-muted-foreground rounded-sm border px-1.5 py-0.5 font-mono text-[11px]"
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
                          className="border-brand-navy bg-card shadow-hard dark:border-brand-cream/30 inline-flex h-9 items-center gap-2 rounded-md border-2 px-3 text-sm font-semibold hover:-translate-y-0.5"
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
