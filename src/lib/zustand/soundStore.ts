import { create } from "zustand";

interface SoundState {
  isMuted: boolean;
  toggleMute: () => void;
  audio: HTMLAudioElement | null;
  setAudio: (audio: HTMLAudioElement | null) => void;
}

export const useSoundStore = create<SoundState>()((set) => ({
  isMuted: true,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  audio: null,
  setAudio: (audio: HTMLAudioElement | null) => set({ audio }),
}));
