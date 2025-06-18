import { useNavigate } from "react-router-dom";
import backArrow from "@/assets/image/common/back_arrow.webp";
import { clsx } from "clsx";
import backSound from "@/assets/sound/back_click.mp3";
import { playButtonSound } from "@/lib/utils/sound";

interface BackArrowProps {
  onClick?: () => void;
  className?: string;
}

export const BackArrow = ({ onClick, className }: BackArrowProps) => {
  const navigate = useNavigate();
  return (
    <img
      src={backArrow}
      alt="backArrow"
      className={clsx(
        className
          ? className
          : "z-[100] absolute top-3 left-3 w-8 h-8 object-contain active:scale-95 transition-all duration-100"
      )}
      onClick={() => {
        playButtonSound(backSound, 0.3);
        onClick ? onClick() : navigate(-1);
      }}
    />
  );
};
