import { motion } from "framer-motion";
import { IMAGE_URLS } from "@/lib/constants/constants";
import clsx from "clsx";

interface PoniProps {
  isAnimating: boolean;
  targetPosition: {
    top: string;
    left?: string;
  };
  direction?: "left" | "right";
  onAnimationComplete: () => void;
}

export const Poni = ({
  isAnimating,
  targetPosition,
  direction = "left",
  onAnimationComplete,
}: PoniProps) => {
  return (
    <motion.div
      className="absolute w-40 h-40"
      initial={{ top: "8rem", left: "14rem" }}
      animate={isAnimating ? targetPosition : { top: "8rem", left: "14rem" }}
      transition={{
        duration: 1.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      onAnimationComplete={onAnimationComplete}
    >
      <motion.img
        src={IMAGE_URLS.main.popo}
        alt="poni"
        className={clsx(
          "w-full h-full object-contain",
          direction === "right" ? "-scale-x-100" : "scale-x-100"
        )}
        animate={
          isAnimating
            ? {
                // 좌우로 살짝 기울어지는 효과 0도 -> 5도 -> -5도 -> 5도 0도
                rotate: [0, 5, -5, 5, 0],
                // 위 아래로 살짝 움직이는 효과
                y: [0, -5, 0, -5, 0],
                // 작아지기
                scale: 0.7,
              }
            : {}
        }
        transition={{
          duration: 1.5,
          repeat: 0,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};
