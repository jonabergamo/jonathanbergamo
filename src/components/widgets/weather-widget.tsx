"use client";

import * as React from "react";
import { useI18n } from "@/i18n/context";
import { WidgetFrame } from "./widget-frame";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  Snowflake,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// São Paulo. Open-Meteo is free, keyless and CORS-friendly.
const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current=temperature_2m,apparent_temperature,weather_code,relative_humidity_2m&timezone=America%2FSao_Paulo";

type Weather = { temp: number; feels: number; code: number; humidity: number };

const cache: {
  value: Weather | null;
  at: number;
  promise: Promise<Weather | null> | null;
} = {
  value: null,
  at: 0,
  promise: null,
};

async function load(): Promise<Weather | null> {
  if (cache.value && Date.now() - cache.at < 10 * 60_000) return cache.value;
  if (cache.promise) return cache.promise;
  cache.promise = fetch(URL)
    .then((r) => (r.ok ? r.json() : null))
    .then((j) => {
      const c = j?.current;
      if (!c) return null;
      cache.value = {
        temp: Math.round(c.temperature_2m),
        feels: Math.round(c.apparent_temperature),
        code: Number(c.weather_code),
        humidity: Math.round(c.relative_humidity_2m),
      };
      cache.at = Date.now();
      return cache.value;
    })
    .catch(() => null)
    .finally(() => {
      cache.promise = null;
    });
  return cache.promise;
}

function icon(code: number): LucideIcon {
  if (code === 0) return Sun;
  if (code <= 2) return CloudSun;
  if (code === 3) return Cloud;
  if (code <= 49) return CloudFog;
  if (code <= 57) return CloudDrizzle;
  if (code <= 67) return CloudRain;
  if (code <= 77) return Snowflake;
  if (code <= 82) return CloudRain;
  return CloudLightning;
}

/** 0..1 along the ruler, 5°C = freezing Brazilian, 35°C = melting. */
function ratio(t: number) {
  return Math.max(0, Math.min(1, (t - 5) / 30));
}

function verdictKey(t: number) {
  if (t <= 12) return "freezing";
  if (t <= 17) return "cold";
  if (t <= 23) return "nice";
  if (t <= 29) return "warm";
  return "melting";
}

export function WeatherWidget({ inline }: { inline?: boolean }) {
  const { t } = useI18n();
  const [w, setW] = React.useState<Weather | null | undefined>(undefined);

  React.useEffect(() => {
    let alive = true;
    load().then((v) => {
      if (alive) setW(v);
    });
    const id = setInterval(
      () => load().then((v) => alive && setW(v)),
      10 * 60_000,
    );
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return (
    <WidgetFrame
      id="weather"
      title={t("widgets.weather.title")}
      inline={inline}
    >
      {w === undefined ? (
        <p className="text-muted-foreground text-sm">
          {t("widgets.weather.loading")}
        </p>
      ) : w === null ? (
        <p className="text-muted-foreground text-sm">
          {t("widgets.weather.offline")}
        </p>
      ) : (
        <>
          <div className="flex items-center gap-3">
            {React.createElement(icon(w.code), {
              className: "size-9 shrink-0 text-brand-ink dark:text-brand-mid",
              strokeWidth: 1.6,
              "aria-hidden": true,
            })}
            <div>
              <p className="font-mono text-2xl leading-none font-semibold tabular-nums">
                {w.temp}°C
              </p>
              <p className="text-muted-foreground mt-1 text-[11px]">
                {t("widgets.weather.feels", { temp: w.feels })} · {w.humidity}%
              </p>
            </div>
          </div>
          <div className={inline ? "hidden" : "mt-3"}>
            <div className="from-brand-mid via-brand-paper to-brand-accent ring-brand-ink/20 relative h-2 rounded-full bg-gradient-to-r ring-1">
              <span
                aria-hidden
                className="border-brand-ink bg-card absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                style={{ left: `${ratio(w.feels) * 100}%` }}
              />
            </div>
            <div className="text-muted-foreground mt-1 flex justify-between text-[10px]">
              <span>{t("widgets.weather.coldEnd")}</span>
              <span>{t("widgets.weather.hotEnd")}</span>
            </div>
          </div>
          <p className={cn("mt-2 text-xs font-medium")}>
            {t(`widgets.weather.${verdictKey(w.feels)}`)}
          </p>
        </>
      )}
    </WidgetFrame>
  );
}
