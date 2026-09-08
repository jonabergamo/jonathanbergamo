"use client";

import * as React from "react";
import { music } from "@/data/music";
import { useMusicStore } from "@/store/music-store";

/* Minimal typing of the parts of the YouTube IFrame Player API we use. */
type YTPlayer = {
  playVideo: () => void;
  playVideoAt: (i: number) => void;
  pauseVideo: () => void;
  nextVideo: () => void;
  previousVideo: () => void;
  seekTo: (s: number, allowSeekAhead: boolean) => void;
  setVolume: (v: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlaylist: () => string[] | null;
  getPlaylistIndex: () => number;
  getVideoData: () => { title?: string; author?: string; video_id?: string };
  getPlayerState: () => number;
  destroy: () => void;
};
type YTNamespace = {
  Player: new (
    el: HTMLElement,
    opts: {
      width: number;
      height: number;
      playerVars: Record<string, string | number>;
      events: {
        onReady: () => void;
        onStateChange: (e: { data: number }) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: {
    PLAYING: number;
    PAUSED: number;
    ENDED: number;
    BUFFERING: number;
    CUED: number;
  };
};

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: YTNamespace;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;
function loadApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    window.onYouTubeIframeAPIReady = () => resolve(window.YT!);
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    document.body.appendChild(s);
  });
  return apiPromise;
}

export type Track = {
  title: string;
  author: string;
  videoId: string;
  index: number;
  count: number;
};

/**
 * Drives a hidden YouTube player as an audio engine and exposes a small,
 * declarative API for the custom controls. Mount `hostRef` on an element that
 * stays in the DOM; the iframe inside it is 1x1 and invisible.
 */
export function useYouTubePlayer(
  hostRef: React.RefObject<HTMLDivElement | null>,
) {
  const player = React.useRef<YTPlayer | null>(null);
  const [ready, setReady] = React.useState(false);
  const [track, setTrack] = React.useState<Track | null>(null);
  const [progress, setProgress] = React.useState({ current: 0, duration: 0 });
  const [ids, setIds] = React.useState<string[]>([]);
  const playing = useMusicStore((s) => s.playing);
  const setPlaying = useMusicStore((s) => s.setPlaying);
  const volume = useMusicStore((s) => s.volume);
  const setVolumeStore = useMusicStore((s) => s.setVolume);

  const refreshTrack = React.useCallback(() => {
    const p = player.current;
    if (!p) return;
    const data = p.getVideoData();
    const list = p.getPlaylist() ?? [];
    setIds((prev) =>
      prev.length === list.length && prev.every((v, i) => v === list[i])
        ? prev
        : list,
    );
    setTrack({
      title:
        (data.title ?? "")
          .replace(
            /\s*[([].*?(official|video|audio|lyric|visualizer).*?[)\]]\s*/gi,
            "",
          )
          .trim() ||
        (data.title ?? ""),
      author: (data.author ?? "").replace(/\s*-\s*Topic$/i, ""),
      videoId: data.video_id ?? "",
      index: Math.max(0, p.getPlaylistIndex()),
      count: list.length,
    });
  }, []);

  React.useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    const mount = document.createElement("div");
    host.appendChild(mount);
    loadApi().then((YT) => {
      if (cancelled) return;
      player.current = new YT.Player(mount, {
        width: 1,
        height: 1,
        playerVars: {
          listType: "playlist",
          list: music.youtubePlaylistId,
          playsinline: 1,
          rel: 0,
          controls: 0,
          disablekb: 1,
        },
        events: {
          onReady: () => {
            player.current?.setVolume(useMusicStore.getState().volume);
            setReady(true);
            // Playlist metadata arrives a moment after ready.
            setTimeout(refreshTrack, 400);
          },
          onStateChange: (e) => {
            setPlaying(e.data === YT.PlayerState.PLAYING);
            if (
              e.data === YT.PlayerState.PLAYING ||
              e.data === YT.PlayerState.CUED
            )
              refreshTrack();
          },
        },
      });
    });
    return () => {
      cancelled = true;
      player.current?.destroy();
      player.current = null;
      host.replaceChildren();
      setPlaying(false);
    };
  }, [hostRef, refreshTrack, setPlaying]);

  // Progress polling while playing.
  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      const p = player.current;
      if (!p) return;
      setProgress({
        current: p.getCurrentTime() || 0,
        duration: p.getDuration() || 0,
      });
    }, 500);
    return () => clearInterval(id);
  }, [playing]);

  const api = React.useMemo(
    () => ({
      toggle: () =>
        useMusicStore.getState().playing
          ? player.current?.pauseVideo()
          : player.current?.playVideo(),
      next: () => player.current?.nextVideo(),
      playAt: (i: number) => player.current?.playVideoAt(i),
      prev: () => player.current?.previousVideo(),
      seek: (fraction: number) => {
        const p = player.current;
        if (!p) return;
        const d = p.getDuration() || 0;
        p.seekTo(d * fraction, true);
        setProgress({ current: d * fraction, duration: d });
      },
      setVolume: (v: number) => {
        setVolumeStore(v);
        player.current?.setVolume(Math.round(v));
      },
    }),
    [setVolumeStore],
  );

  return { ready, playing, track, progress, volume, ids, ...api };
}
