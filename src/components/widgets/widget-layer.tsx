"use client";

import * as React from "react";
import {
  useWidgetStore,
  WIDGET_IDS,
  type WidgetId,
} from "@/store/widget-store";
import { ClockWidget } from "./clock-widget";
import { WeatherWidget } from "./weather-widget";
import { StatusWidget } from "./status-widget";
import { GithubWidget } from "./github-widget";
import { MusicWidget } from "./music-widget";
import { ExperienceWidget } from "./experience-widget";

const COMPONENTS: Record<
  WidgetId,
  React.ComponentType<{ inline?: boolean }>
> = {
  clock: ClockWidget,
  weather: WeatherWidget,
  status: StatusWidget,
  github: GithubWidget,
  music: MusicWidget,
  experience: ExperienceWidget,
};

/** Floating widgets on the desktop wallpaper, below windows, above the grid. */
export function WidgetLayer() {
  const hidden = useWidgetStore((s) => s.hidden);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    // Read before rehydrating: persist writes the state to storage as part of
    // hydration, so afterwards the key always exists.
    let firstVisit = true;
    try {
      firstVisit = localStorage.getItem("jb-widgets") === null;
    } catch {
      // storage blocked: keep defaults
    }
    const unsub = useWidgetStore.persist.onFinishHydration(() => {
      if (firstVisit)
        useWidgetStore.getState().reset(window.innerWidth, window.innerHeight);
      setReady(true);
    });
    void useWidgetStore.persist.rehydrate();
    return unsub;
  }, []);
  if (!ready) return null;
  return (
    <div
      className="pointer-events-none absolute inset-0 bottom-12 z-[3]"
      data-testid="widget-layer"
    >
      {WIDGET_IDS.filter((id) => !hidden.includes(id)).map((id) => {
        const C = COMPONENTS[id];
        return <C key={id} />;
      })}
    </div>
  );
}

/** Compact, non-draggable cards for the phone home screen. */
export function MobileWidgets() {
  return (
    <div className="pointer-events-none space-y-2">
      <ExperienceWidget inline />
      <MusicWidget inline />
    </div>
  );
}
