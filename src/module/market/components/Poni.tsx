import { motion } from "framer-motion";
import poniImage from "@/assets/image/main/main_poni.webp";
import clsx from "clsx";

interface PoniProps {
  initialPosition: {
    top: string;
    left?: string;
  };
  isAnimating: boolean;
  targetPosition: {
    top: string;
    left?: string;
  };
  direction?: "left" | "right";
  onAnimationComplete: () => void;
}

export const Poni = ({
  initialPosition,
  isAnimating,
  targetPosition,
  direction = "left",
  onAnimationComplete,
}: PoniProps) => {
  return (
    <motion.div
      className="absolute w-20 h-20"
      initial={initialPosition}
      animate={isAnimating ? targetPosition : { top: "8rem", left: "14rem" }}
      transition={{
        duration: 1.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      onAnimationComplete={onAnimationComplete}
    >
      <motion.img
        src={poniImage}
        alt="poni"
        className={clsx("w-full h-full object-contain", direction === "right" ? "-scale-x-100" : "scale-x-100")}
        transition={{
          duration: 1,
          repeat: 0,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};
