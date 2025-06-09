import { useNavigate } from "react-router-dom";
import backArrow from "@/assets/image/common/back_arrow.webp";
import { clsx } from "clsx";
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
      onClick={() => (onClick ? onClick() : navigate(-1))}
    />
  );
};
