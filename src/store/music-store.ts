import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { music } from "@/data/music";

type MusicStore = {
  /** True while the player reports playback. The avatar dances to it. */
  playing: boolean;
  volume: number;
  setPlaying: (v: boolean) => void;
  setVolume: (v: number) => void;
};

export const useMusicStore = create<MusicStore>()(
  persist(
    (set) => ({
      playing: false,
      volume: music.defaultVolume,
      setPlaying: (playing) => set({ playing }),
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
