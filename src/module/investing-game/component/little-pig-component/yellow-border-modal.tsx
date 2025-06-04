import type { ReactNode } from "react";
import sirenPig from "@/assets/image/investing-game/little_pig/little_siren_pig.webp";

interface YellowBorderModalProps {
  children: ReactNode;
  className?: string;
}

export const YellowBorderModal = ({ children, className = "" }: YellowBorderModalProps) => {
  return (
    <div className="relative flex items-center justify-center w-[33.5rem] h-[21.5rem] bg-main-yellow-200 border-2 sm:border-4 border-main-brown-575 rounded-4xl">
      <div
        className={`relative px-10 w-[32.25rem] h-[20.25rem] bg-white border-2 sm:border-4 border-main-brown-575 rounded-3xl ${className}`}
      >
        {children}
        <img src={sirenPig} alt="siren pig" className="absolute -bottom-6 -right-7 min-w-0 h-20 object-contain" />
      </div>
    </div>
  );
};
