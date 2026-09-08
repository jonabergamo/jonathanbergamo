"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  FolderKanban,
  Mail,
  SquareTerminal,
  UserRound,
  Wrench,
} from "lucide-react";
import type { WindowId } from "@/store/window-defaults";
import type { MessageKey } from "@/i18n/context";

const AboutWindow = React.lazy(
  () => import("@/components/windows/about-window"),
);
const ExperienceWindow = React.lazy(
  () => import("@/components/windows/experience-window"),
);
const ProjectsWindow = React.lazy(
  () => import("@/components/windows/projects-window"),
);
const SkillsWindow = React.lazy(
  () => import("@/components/windows/skills-window"),
);
const ContactWindow = React.lazy(
  () => import("@/components/windows/contact-window"),
);
const TerminalWindow = React.lazy(
  () => import("@/components/windows/terminal-window"),
);

export type WindowMeta = {
  id: WindowId;
  icon: LucideIcon;
  titleKey: MessageKey;
  component: React.LazyExoticComponent<React.ComponentType>;
  /** Shown on the desktop icon grid and in launchers. */
  desktop: boolean;
};

export const WINDOW_REGISTRY: Record<WindowId, WindowMeta> = {
  about: {
    id: "about",
    icon: UserRound,
    titleKey: "windows.about",
    component: AboutWindow,
    desktop: true,
  },
  experience: {
    id: "experience",
    icon: Briefcase,
    titleKey: "windows.experience",
    component: ExperienceWindow,
    desktop: true,
  },
  projects: {
    id: "projects",
    icon: FolderKanban,
    titleKey: "windows.projects",
    component: ProjectsWindow,
    desktop: true,
  },
  skills: {
    id: "skills",
    icon: Wrench,
    titleKey: "windows.skills",
    component: SkillsWindow,
    desktop: true,
  },
  contact: {
    id: "contact",
    icon: Mail,
    titleKey: "windows.contact",
    component: ContactWindow,
    desktop: true,
  },
  terminal: {
    id: "terminal",
    icon: SquareTerminal,
    titleKey: "windows.terminal",
    component: TerminalWindow,
    desktop: true,
  },
};

export const WINDOW_LIST = Object.values(WINDOW_REGISTRY);
