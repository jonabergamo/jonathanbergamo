import type { Localized } from "@/i18n/t";

export type { Localized };

export type Link = { label: string; url: string };

export type ProjectStatus = "live" | "archived" | "wip";

export type Project = {
  id: string;
  title: string;
  summary: Localized;
  /** Markdown. */
  description: Localized;
  tags: string[];
  links?: Link[];
  image?: string;
  /** Screenshots shown in the detail dialog. */
  images?: { src: string; alt: Localized; wide?: boolean }[];
  period: string;
  status: ProjectStatus;
  featured?: boolean;
  award?: Localized;
};

export type Experience = {
  id: string;
  company: string;
  location: Localized;
  role: Localized;
  start: string; // YYYY-MM
  end: string | null; // null = present
  summary: Localized;
  bullets: Localized<string[]>;
  stack: string[];
  url?: string;
};

export type Skill = { name: string; core?: boolean };

export type SkillGroup = {
  id: string;
  label: Localized;
  skills: Skill[];
};
