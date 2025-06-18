import { useSoundStore } from "../zustand/soundStore";

export const playButtonSound = (url: string, volume: number = 1) => {
  const { isMuted } = useSoundStore.getState();
  if (isMuted) return;

  const audio = new Audio(url);
  audio.volume = volume;
  audio.play();
};
