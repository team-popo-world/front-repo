import type { ReactNode } from "react";
import { IMAGE_URLS } from "@/lib/constants/constants";

interface PinkBorderModalProps {
  children: ReactNode;
  className?: string;
}

export const PinkBorderModal = ({ children, className = "" }: PinkBorderModalProps) => {
  return (
    <div className="relative flex items-center justify-center w-[33.5rem] h-[21.5rem] bg-main-pink-500 border-2 sm:border-4 border-main-brown-550 rounded-4xl">
      <div
        className={`relative px-10 w-[32.25rem] h-[20.25rem] bg-white border-2 sm:border-4 border-main-brown-550 rounded-3xl ${className}`}
      >
        {children}
        <img
          src={IMAGE_URLS.investing_game.little_pig.little_siren_pig}
          alt="siren pig"
          className="absolute -bottom-6 -right-7 min-w-0 h-20 object-contain"
        />
      </div>
    </div>
  );
};
