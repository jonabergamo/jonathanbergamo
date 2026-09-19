"use client";

import * as React from "react";
import Image from "next/image";
import {
  Award,
  Bookmark,
  ExternalLink,
  Code2,
  Heart,
  MessageCircle,
  Pin,
} from "lucide-react";
import { useI18n } from "@/i18n/context";
import { allTags, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";
import { ProjectDetail } from "./project-detail";
import { ShotCarousel } from "./shot-carousel";

const HANDLE = "@jonabergamo";

// the projects window pretends to be a small social app. every project is a post by me
export default function ProjectsWindow() {
  const { t } = useI18n();
  const [tag, setTag] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<Project | null>(null);

  const feed = React.useMemo(() => {
    const list = tag ? projects.filter((p) => p.tags.includes(tag)) : projects;
    return [...list].sort(
      (a, b) => Number(!!b.featured) - Number(!!a.featured),
    );
  }, [tag]);

  return (
    <div className="bg-brand-ink/[0.04] dark:bg-brand-paper/[0.03] flex min-h-full flex-col">
      <header className="border-brand-ink/10 bg-card/80 sticky top-0 z-10 border-b backdrop-blur">
        <div className="mx-auto flex w-full max-w-[560px] items-center gap-3 px-4 py-3">
          <Image
            src="/portrait.webp"
            alt={profile.shortName}
            width={40}
            height={40}
            className="border-brand-ink/15 size-10 rounded-full border object-cover"
          />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="font-display truncate font-bold">
              {profile.shortName}
            </p>
            <p className="text-muted-foreground truncate text-xs">
              {HANDLE} · {projects.length} {t("projects.feed.posts")}
            </p>
          </div>
          <span className="text-muted-foreground font-mono text-[11px]">
            {t("projects.feed.title")}
          </span>
        </div>
        <div
          className="no-scrollbar mx-auto flex w-full max-w-[560px] gap-1.5 overflow-x-auto px-4 pb-3"
          role="radiogroup"
          aria-label={t("projects.filterLabel")}
        >
          <Chip active={tag === null} onClick={() => setTag(null)}>
            {t("projects.feed.forYou")}
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
      </header>

      {feed.length === 0 ? (
        <p className="text-muted-foreground p-6 text-center text-sm">
          {t("projects.empty")}
        </p>
      ) : (
        <ul className="mx-auto flex w-full max-w-[560px] flex-col gap-4 px-4 py-4">
          {feed.map((p) => (
            <Post key={p.id} project={p} onOpen={() => setSelected(p)} />
          ))}
          <li className="text-muted-foreground py-6 text-center text-xs">
            {t("projects.feed.end")}
          </li>
        </ul>
      )}

      <ProjectDetail project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function Post({
  project: p,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const { t, l } = useI18n();
  const [liked, setLiked] = useLocal(`like:${p.id}`);
  const [saved, setSaved] = useLocal(`save:${p.id}`);
  const shots = p.images ?? [];
  const live = p.links?.find((x) => x.label === "Live");
  const repo = p.links?.find((x) => x.label === "GitHub");
  const likes = seed(p.id) + (liked ? 1 : 0);

  return (
    <li
      className="border-brand-ink/10 bg-card dark:border-brand-paper/10 overflow-hidden rounded-2xl border"
      data-testid={`project-${p.id}`}
    >
      <div className="flex items-center gap-3 px-4 pt-4">
        <Image
          src="/portrait.webp"
          alt={profile.shortName}
          width={36}
          height={36}
          className="size-9 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm font-semibold">
            {profile.shortName}
            <span className="text-muted-foreground font-normal"> {HANDLE}</span>
          </p>
          <p className="text-muted-foreground text-xs">
            {p.period} · {t(`projects.status.${p.status}`)}
          </p>
        </div>
        {p.featured && (
          <span className="text-muted-foreground inline-flex items-center gap-1 text-[11px]">
            <Pin className="size-3.5" /> {t("projects.feed.pinned")}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="block w-full px-4 pt-3 text-left"
      >
        <h3 className="font-display text-lg leading-tight font-bold">
          {p.title}
        </h3>
        {p.award && (
          <p className="text-brand-deep dark:text-brand-mid mt-1 inline-flex items-center gap-1 text-xs font-semibold">
            <Award className="size-3.5" /> {l(p.award)}
          </p>
        )}
        <p className="mt-2 text-[15px] leading-relaxed">{l(p.summary)}</p>
      </button>

      {shots.length > 0 && (
        <ShotCarousel shots={shots} onOpen={onOpen} className="mt-3" />
      )}

      <div className="flex flex-wrap gap-1 px-4 pt-3">
        {p.tags.map((tg) => (
          <span
            key={tg}
            className="text-muted-foreground font-mono text-[11px]"
          >
            #{tg.replace(/[\s.]/g, "").toLowerCase()}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-1 px-2 pt-1 pb-2">
        <Action
          icon={
            <Heart className={cn("size-[18px]", liked && "fill-current")} />
          }
          label={t(liked ? "projects.feed.liked" : "projects.feed.like")}
          active={liked}
          onClick={() => setLiked(!liked)}
        >
          {likes}
        </Action>
        <Action
          icon={<MessageCircle className="size-[18px]" />}
          label={t("projects.feed.readMore")}
          onClick={onOpen}
        >
          {t("projects.feed.readMore")}
        </Action>
        {live && (
          <Action
            icon={<ExternalLink className="size-[18px]" />}
            label={t("projects.feed.open")}
            href={live.url}
          >
            {t("projects.feed.open")}
          </Action>
        )}
        {repo && (
          <Action
            icon={<Code2 className="size-[18px]" />}
            label={t("projects.feed.code")}
            href={repo.url}
          />
        )}
        <span className="flex-1" />
        <Action
          icon={
            <Bookmark className={cn("size-[18px]", saved && "fill-current")} />
          }
          label={t("projects.feed.save")}
          active={saved}
          onClick={() => setSaved(!saved)}
        />
      </div>
    </li>
  );
}

function Action({
  icon,
  label,
  active,
  onClick,
  href,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
  children?: React.ReactNode;
}) {
  const cls = cn(
    "hover:bg-brand-ink/5 dark:hover:bg-brand-paper/10 inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors",
    active ? "text-brand-accent" : "text-muted-foreground",
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cls}
        aria-label={label}
      >
        {icon}
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={cls}
      aria-label={label}
      aria-pressed={active}
    >
      {icon}
      {children}
    </button>
  );
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
        "focus-visible:outline-brand-mid h-7 shrink-0 rounded-full px-3 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1",
        active
          ? "bg-brand-ink text-brand-paper dark:bg-brand-paper dark:text-brand-ink"
          : "bg-brand-ink/5 hover:bg-brand-ink/10 dark:bg-brand-paper/10 dark:hover:bg-brand-paper/20",
      )}
    >
      {children}
    </button>
  );
}

// a stable made up like count per post, so the feed doesn't look empty on first visit
function seed(id: string) {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 997;
  return 12 + (h % 60);
}

// liked and saved flags live in localStorage. a tiny store so every post can subscribe
const listeners = new Set<() => void>();
const read = (key: string) => {
  try {
    return localStorage.getItem(`feed.${key}`) === "1";
  } catch {
    return false;
  }
};
const write = (key: string, v: boolean) => {
  try {
    localStorage.setItem(`feed.${key}`, v ? "1" : "0");
  } catch {}
  listeners.forEach((fn) => fn());
};
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

function useLocal(key: string) {
  const on = React.useSyncExternalStore(
    subscribe,
    () => read(key),
    () => false,
  );
  return [on, (v: boolean) => write(key, v)] as const;
}
