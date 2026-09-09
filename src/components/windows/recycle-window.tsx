"use client";

import * as React from "react";
import { FileX2, Trash2 } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { recycled } from "@/data/recycle";
import { cn } from "@/lib/utils";

export default function RecycleWindow() {
  const { t, l } = useI18n();
  const [selected, setSelected] = React.useState<string | null>(
    recycled[0]?.id ?? null,
  );
  const [message, setMessage] = React.useState<string | null>(null);
  const item = recycled.find((r) => r.id === selected) ?? null;

  const empty = () => {
    setMessage(t("recycle.emptied"));
    setTimeout(() => setMessage(null), 2600);
  };

  return (
    <div className="flex h-full min-h-full flex-col">
      <div className="border-brand-ink/10 flex flex-wrap items-center justify-between gap-3 border-b-2 px-6 py-3">
        <p className="text-muted-foreground text-sm">
          {t("recycle.intro", { n: recycled.length })}
        </p>
        <button
          type="button"
          data-testid="recycle-empty"
          onClick={empty}
          className="border-brand-ink bg-card shadow-hard dark:border-brand-paper/30 inline-flex h-8 items-center gap-2 rounded-md border-2 px-3 text-xs font-semibold active:translate-x-px active:translate-y-px active:shadow-none"
        >
          <Trash2 className="size-3.5" /> {t("recycle.empty")}
        </button>
      </div>

      <div className="grid flex-1 sm:grid-cols-[1fr_18rem]">
        <ul
          className="divide-brand-ink/10 divide-y"
          role="listbox"
          aria-label={t("windows.recycle")}
        >
          <li className="text-muted-foreground hidden grid-cols-[1fr_5rem_5rem] gap-3 px-6 py-2 font-mono text-[10px] uppercase sm:grid">
            <span>{t("recycle.name")}</span>
            <span>{t("recycle.deleted")}</span>
            <span className="text-right">{t("recycle.size")}</span>
          </li>
          {recycled.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                role="option"
                aria-selected={selected === r.id}
                data-testid={`recycle-${r.id}`}
                onClick={() => setSelected(r.id)}
                className={cn(
                  "hover:bg-muted grid w-full grid-cols-[1fr_5rem_5rem] items-center gap-3 px-6 py-2.5 text-left text-sm",
                  selected === r.id &&
                    "bg-brand-ink text-brand-paper hover:bg-brand-ink",
                )}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <FileX2 className="size-4 shrink-0 opacity-70" aria-hidden />
                  <span className="truncate font-mono text-xs">{r.name}</span>
                </span>
                <span
                  className={cn(
                    "font-mono text-xs",
                    selected !== r.id && "text-muted-foreground",
                  )}
                >
                  {r.deleted}
                </span>
                <span
                  className={cn(
                    "text-right font-mono text-xs",
                    selected !== r.id && "text-muted-foreground",
                  )}
                >
                  {r.size}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <aside className="border-brand-ink/10 border-t-2 p-5 sm:border-t-0 sm:border-l-2">
          {item && (
            <>
              <p className="text-muted-foreground font-mono text-xs">
                {l(item.kind)}
              </p>
              <h3 className="font-display mt-1 text-lg leading-tight font-bold break-all">
                {item.name}
              </h3>
              <dl className="text-muted-foreground mt-3 space-y-1 text-xs">
                <div className="flex justify-between gap-2">
                  <dt>{t("recycle.deleted")}</dt>
                  <dd className="font-mono">{item.deleted}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>{t("recycle.size")}</dt>
                  <dd className="font-mono">{item.size}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-relaxed">{l(item.reason)}</p>
              <p className="text-muted-foreground mt-4 text-xs">
                {t("recycle.noRestore")}
              </p>
            </>
          )}
        </aside>
      </div>

      {message && (
        <p
          role="status"
          className="border-brand-ink/10 bg-muted border-t-2 px-6 py-2 text-xs font-medium"
        >
          {message}
        </p>
      )}
    </div>
  );
}
