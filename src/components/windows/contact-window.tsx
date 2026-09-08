"use client";

import * as React from "react";
import { Check, Copy, Download, ExternalLink, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { useI18n } from "@/i18n/context";
import { profile } from "@/data/profile";
import { OpenToWorkBadge } from "@/components/open-to-work-badge";

export default function ContactWindow() {
  const { t, locale } = useI18n();
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked: the mailto link still works.
    }
  };

  return (
    <div className="flex h-full flex-col gap-6 p-6 sm:p-8">
      <div className="space-y-3">
        {profile.openToWork && <OpenToWorkBadge />}
        <h2 className="font-display text-3xl leading-tight font-bold">
          {t("contact.heading")}
        </h2>
        <p className="text-muted-foreground max-w-[52ch] text-sm leading-relaxed">
          {t("contact.body")}
        </p>
      </div>

      <div className="border-brand-navy shadow-hard dark:border-brand-cream/30 flex items-stretch overflow-hidden rounded-md border-2">
        <a
          href={`mailto:${profile.email}`}
          className="bg-primary text-primary-foreground flex min-w-0 flex-1 items-center gap-3 px-4 py-3 hover:brightness-110"
        >
          <Mail className="size-5 shrink-0" />
          <span className="truncate font-mono text-sm">{profile.email}</span>
        </a>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? t("contact.copied") : t("contact.copy")}
          className="border-brand-navy bg-card hover:bg-accent dark:border-brand-cream/30 grid w-12 place-items-center border-l-2"
        >
          {copied ? (
            <Check className="text-brand-red size-4" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      </div>

      <ul className="grid gap-2 sm:grid-cols-3">
        <ContactLink
          href={profile.linkedin}
          icon={LinkedinIcon}
          label={t("contact.linkedin")}
        />
        <ContactLink
          href={profile.github}
          icon={GithubIcon}
          label={t("contact.github")}
        />
        <ContactLink
          href={profile.cv[locale]}
          icon={Download}
          label={t("contact.cv")}
          download
        />
      </ul>

      <div className="border-brand-navy/15 mt-auto border-t-2 pt-4 text-sm">
        <p className="text-muted-foreground mb-1 text-xs font-medium">
          {t("contact.languages")}
        </p>
        <p>{t("contact.portuguese")}</p>
        <p>{t("contact.english")}</p>
      </div>
    </div>
  );
}

function ContactLink({
  href,
  icon: Icon,
  label,
  download,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  download?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        download={download ? true : undefined}
        target={download ? undefined : "_blank"}
        rel={download ? undefined : "noreferrer"}
        className="border-brand-navy/30 hover:border-brand-navy hover:bg-accent dark:hover:border-brand-cream/60 flex h-11 items-center gap-2 rounded-md border-2 px-3 text-sm font-medium"
      >
        <Icon className="size-4" />
        <span className="flex-1">{label}</span>
        {!download && <ExternalLink className="size-3.5 opacity-50" />}
      </a>
    </li>
  );
}
