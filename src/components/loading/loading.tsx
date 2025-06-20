import { IMAGE_URLS } from "@/lib/constants/constants";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Background } from "../layout/Background";

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

export const Loading = () => {
  return (
    <Background backgroundImage={IMAGE_URLS.common.loading_bg}>
      
      {/* 로딩 중인 포니 */}
      <motion.div
        className="absolute w-40 h-40"
        initial={{ left: "-10rem", top: "50%" }}
        animate={{
          left: ["-10rem", "calc(100% + 10rem)"],
          top: "50%",
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.img
          src={IMAGE_URLS.main.popo}
          alt="loading poni"
          className="w-full h-full object-contain"
          animate={{
            // 좌우로 살짝 기울어지는 효과
            rotate: [0, 5, -5, 5, 0],
            // 위 아래로 살짝 움직이는 효과
            y: [0, -8, 0, -8, 0],
            // 살짝 커졌다 작아지는 효과
            scale: [1, 1.1, 1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* 로딩 텍스트 */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.div
          className="text-white text-xl font-bold"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          로딩 중...
        </motion.div>
      </motion.div>
    </Background>
  );
};
