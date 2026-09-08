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

const COMPONENTS: Record<
  WidgetId,
  React.ComponentType<{ inline?: boolean }>
> = {
  clock: ClockWidget,
  weather: WeatherWidget,
  status: StatusWidget,
  github: GithubWidget,
};

/** Floating widgets on the desktop wallpaper, below windows, above the grid. */
export function WidgetLayer() {
  const hidden = useWidgetStore((s) => s.hidden);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const unsub = useWidgetStore.persist.onFinishHydration(() =>
      setReady(true),
    );
    void useWidgetStore.persist.rehydrate();
    return unsub;
  }, []);
  if (!ready) return null;
  return (
    <div
      className="absolute inset-0 bottom-12 z-[3]"
      data-testid="widget-layer"
    >
      {WIDGET_IDS.filter((id) => !hidden.includes(id)).map((id) => {
        const C = COMPONENTS[id];
        return <C key={id} />;
      })}
    </div>
  );
}

/** Compact, non-draggable strip for the phone home screen. */
export function MobileWidgets() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <ClockWidget inline />
      <WeatherWidget inline />
    </div>
  );
}
