import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { music } from "@/data/music";

type MusicStore = {
  /** True while the player reports playback. The avatar dances to it. */
  playing: boolean;
  volume: number;
  /** Tempo of the current track, when known. Drives the dance speed. */
  bpm: number | null;
  setPlaying: (v: boolean) => void;
  setVolume: (v: number) => void;
  setBpm: (v: number | null) => void;
};

export const useMusicStore = create<MusicStore>()(
  persist(
    (set) => ({
      playing: false,
      volume: music.defaultVolume,
      bpm: null,
      setPlaying: (playing) => set({ playing }),
      setBpm: (bpm) => set({ bpm }),
      setVolume: (volume) =>
        set({ volume: Math.max(0, Math.min(100, Math.round(volume))) }),
    }),
    {
      name: "jb-music",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ volume: s.volume }),
    },
  ),
);
