"use client";

import * as React from "react";
import { Award, ExternalLink, Link2Off } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { allTags, projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";
import { ProjectDetail } from "./project-detail";

export default function ProjectsWindow() {
  const { t, l } = useI18n();
  const [tag, setTag] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<Project | null>(null);

  const list = React.useMemo(() => {
    const filtered = tag
      ? projects.filter((p) => p.tags.includes(tag))
      : projects;
    return [...filtered].sort(
      (a, b) => Number(!!b.featured) - Number(!!a.featured),
    );
  }, [tag]);

  return (
    <div className="flex min-h-full flex-col">
      <div
        className="no-scrollbar border-brand-ink/10 flex shrink-0 gap-1.5 overflow-x-auto border-b-2 px-6 py-3"
        role="radiogroup"
        aria-label={t("projects.filterLabel")}
      >
        <Chip active={tag === null} onClick={() => setTag(null)}>
          {t("projects.all")}
        </Chip>
        {allTags.map((tg) => (
          <Chip
            key={tg}
            active={tag === tg}
            onClick={() => setTag(tg === tag ? null : tg)}
          >
            {tg}
          </Chip>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="text-muted-foreground p-6 text-sm">
          {t("projects.empty")}
        </p>
      ) : (
        <ul className="grid gap-4 p-6 sm:grid-cols-2">
          {list.map((p) => (
            <li key={p.id} className="flex">
              <button
                type="button"
                data-testid={`project-${p.id}`}
                onClick={() => setSelected(p)}
                className={cn(
                  "group border-brand-ink bg-card shadow-hard focus-visible:outline-brand-mid dark:border-brand-paper/30 flex w-full flex-col rounded-lg border-2 p-4 text-left transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-x-px active:translate-y-px active:shadow-none",
                  p.featured &&
                    "border-brand-accent dark:border-brand-accent sm:col-span-1",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg leading-tight font-bold">
                    {p.title}
                  </h3>
                  <span className="text-muted-foreground shrink-0 font-mono text-[11px]">
                    {p.period}
                  </span>
                </div>
                {p.award && (
                  <p className="text-brand-deep dark:text-brand-mid mt-1 inline-flex items-center gap-1 text-xs font-semibold">
                    <Award className="size-3.5" /> {l(p.award)}
                  </p>
                )}
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {l(p.summary)}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.tags.slice(0, 5).map((tg) => (
                    <span
                      key={tg}
                      className="bg-muted rounded-sm px-1.5 py-0.5 font-mono text-[10px]"
                    >
                      {tg}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-4 text-xs">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 font-medium",
                      statusTone(p.status),
                    )}
                  >
                    {t(`projects.status.${p.status}`)}
                  </span>
                  <span className="text-muted-foreground inline-flex items-center gap-1">
                    {p.links?.length ? (
                      <ExternalLink className="size-3.5" />
                    ) : (
                      <Link2Off className="size-3.5" />
                    )}
                    {p.links?.length
                      ? t("projects.details")
                      : t("projects.noLink")}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <ProjectDetail project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function statusTone(status: Project["status"]) {
  switch (status) {
    case "live":
      return "bg-brand-mid/25 text-brand-ink dark:text-brand-paper";
    case "wip":
      return "bg-brand-accent/15 text-brand-deep dark:text-brand-paper";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "focus-visible:outline-brand-mid h-7 shrink-0 rounded-full border px-2.5 font-mono text-[11px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1",
        active
          ? "border-brand-ink bg-brand-ink text-brand-paper dark:border-brand-paper dark:bg-brand-paper dark:text-brand-ink"
          : "border-brand-ink/25 hover:border-brand-ink/60",
      )}
    >
      {children}
    </button>
  );
}
