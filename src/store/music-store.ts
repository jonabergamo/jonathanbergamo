import { create } from "zustand";

type MusicStore = {
  /** True while the embedded player reports playback. The avatar dances to it. */
  playing: boolean;
  setPlaying: (v: boolean) => void;
};

export const useMusicStore = create<MusicStore>()((set) => ({
  playing: false,
  setPlaying: (playing) => set({ playing }),
}));
