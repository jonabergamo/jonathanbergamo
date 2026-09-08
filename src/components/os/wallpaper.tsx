"use client";

import { AvatarLazy } from "@/components/avatar/avatar-lazy";
import { profile } from "@/data/profile";

/**
 * The desktop backdrop: dot grid, a quiet nameplate, and the avatar standing
 * on the taskbar. Windows float above it.
 */
export function Wallpaper({ variant }: { variant: "desktop" | "mobile" }) {
  const mobile = variant === "mobile";
  return (
    <div className="desktop-grid absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className={
          mobile
            ? "pointer-events-none absolute inset-x-0 top-6 px-6"
            : "pointer-events-none absolute top-6 right-8 max-w-[42vw] text-right"
        }
      >
        <p className="font-display text-brand-ink/85 dark:text-brand-paper/85 text-[clamp(2rem,6vw,5.5rem)] leading-[0.92] font-bold tracking-tight">
          {profile.shortName.split(" ")[0]}
          <br />
          {profile.shortName.split(" ").slice(1).join(" ")}
        </p>
      </div>
      <div
        className={
          mobile
            ? "absolute inset-x-0 top-[6dvh] bottom-[32dvh]"
            : "absolute right-[4vw] bottom-0 h-[min(88vh,930px)] w-[min(64vw,920px)]"
        }
      >
        <AvatarLazy variant={mobile ? "mobile" : "wallpaper"} />
      </div>
    </div>
  );
}
