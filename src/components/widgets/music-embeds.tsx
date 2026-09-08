"use client";

import * as React from "react";
import { music } from "@/data/music";
import { useMusicStore } from "@/store/music-store";

/* ---------- Spotify (iFrame API) ---------- */

type SpotifyController = {
  addListener: (
    event: "playback_update" | "ready",
    cb: (e: { data: { isPaused: boolean } }) => void,
  ) => void;
  destroy: () => void;
};
type SpotifyIFrameAPI = {
  createController: (
    el: HTMLElement,
    options: {
      uri: string;
      width: string | number;
      height: string | number;
      theme?: "dark" | "light";
    },
    cb: (controller: SpotifyController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
    __spotifyApi?: SpotifyIFrameAPI;
  }
}

let spotifyPromise: Promise<SpotifyIFrameAPI> | null = null;
function loadSpotify(): Promise<SpotifyIFrameAPI> {
  if (window.__spotifyApi) return Promise.resolve(window.__spotifyApi);
  if (spotifyPromise) return spotifyPromise;
  spotifyPromise = new Promise((resolve) => {
    window.onSpotifyIframeApiReady = (api) => {
      window.__spotifyApi = api;
      resolve(api);
    };
    const s = document.createElement("script");
    s.src = "https://open.spotify.com/embed/iframe-api/v1";
    s.async = true;
    document.body.appendChild(s);
  });
  return spotifyPromise;
}

export function SpotifyEmbed({ height }: { height: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const setPlaying = useMusicStore((s) => s.setPlaying);

  React.useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let controller: SpotifyController | null = null;
    let cancelled = false;
    const mount = document.createElement("div");
    host.appendChild(mount);
    loadSpotify().then((api) => {
      if (cancelled) return;
      api.createController(
        mount,
        { uri: music.spotifyUri, width: "100%", height },
        (c) => {
          controller = c;
          c.addListener("playback_update", (e) => setPlaying(!e.data.isPaused));
        },
      );
    });
    return () => {
      cancelled = true;
      controller?.destroy();
      host.replaceChildren();
      setPlaying(false);
    };
  }, [height, setPlaying]);

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden rounded-md"
      style={{ minHeight: height }}
    />
  );
}
