"use client";

import * as React from "react";
import { usePalette } from "@/hooks/use-palette";
import { PALETTES, type PaletteId } from "@/data/palettes";
import { useI18n } from "@/i18n/context";
import { isLocale } from "@/i18n/config";
import { profile } from "@/data/profile";
import { WINDOW_IDS, type WindowId } from "@/store/window-defaults";
import { useWindowStore } from "@/store/window-store";

type Line = { kind: "in" | "out"; text: string };

export default function TerminalWindow() {
  const { t, setLocale } = useI18n();
  const { setMode, setPalette } = usePalette();
  const open = useWindowStore((s) => s.open);
  const [lines, setLines] = React.useState<Line[]>([
    { kind: "out", text: t("terminal.welcome") },
  ]);
  const [input, setInput] = React.useState("");
  const endRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const run = (raw: string) => {
    const [cmd, ...args] = raw.trim().split(/\s+/);
    const out: string[] = [];
    switch (cmd) {
      case "":
        break;
      case "help":
        out.push(t("terminal.help"));
        break;
      case "whoami":
        out.push(`${profile.name} — ${t("about.role")}`, profile.email);
        break;
      case "ls":
        out.push(WINDOW_IDS.join("  "));
        break;
      case "open": {
        const name = args[0] as WindowId | undefined;
        if (name && (WINDOW_IDS as readonly string[]).includes(name)) {
          open(name);
          out.push(t("terminal.opened", { name }));
        } else out.push(t("terminal.notFound", { name: args[0] ?? "" }));
        break;
      }
      case "lang":
        if (isLocale(args[0])) {
          setLocale(args[0]);
          out.push(t("terminal.langSet", { lang: args[0] }));
        } else out.push(t("terminal.help"));
        break;
      case "theme":
        if (args[0] === "light" || args[0] === "dark") {
          setMode(args[0]);
          out.push(t("terminal.themeSet", { theme: args[0] }));
        } else out.push(t("terminal.help"));
        break;
      case "palette": {
        const id = PALETTES.find((p) => p.id === args[0])?.id as
          PaletteId | undefined;
        if (id) {
          setPalette(id);
          out.push(t("terminal.paletteSet", { palette: id }));
        } else out.push(PALETTES.map((p) => p.id).join("  "));
        break;
      }
      case "clear":
        setLines([]);
        return;
      default:
        out.push(t("terminal.unknown", { cmd }));
    }
    setLines((prev) => [
      ...prev,
      { kind: "in", text: raw },
      ...out.map((text) => ({ kind: "out" as const, text })),
    ]);
  };

  return (
    <div
      className="bg-brand-ink text-brand-paper flex h-full flex-col p-4 font-mono text-[13px] leading-relaxed"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="min-h-0 flex-1 overflow-y-auto">
        {lines.map((l, i) => (
          <p
            key={i}
            className={
              l.kind === "in"
                ? "text-brand-mid"
                : "text-brand-paper/90 whitespace-pre-wrap"
            }
          >
            {l.kind === "in" ? `${t("terminal.prompt")} $ ${l.text}` : l.text}
          </p>
        ))}
        <div ref={endRef} />
      </div>
      <form
        className="mt-2 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
          setInput("");
        }}
      >
        <label htmlFor="terminal-input" className="text-brand-mid shrink-0">
          {t("terminal.prompt")} $
        </label>
        <input
          id="terminal-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          className="text-brand-paper caret-brand-accent min-w-0 flex-1 bg-transparent outline-none"
        />
      </form>
    </div>
  );
}
