// src/page/main/index.tsx
import { useState } from "react";
import MainTemplate from "../../module/main/template";
import { useNavigate } from "react-router-dom";
import { useSoundStore } from "@/lib/zustand/soundStore";
import { useAuthStore } from "@/lib/zustand/store";

// 섬별 위치 정보
const ISLAND_POSITIONS = {
  market: { top: "4.25rem", left: "3.25rem" },
  emotionDiary: { top: "11rem", left: "3rem" },
  raising: { top: "13.75rem", left: "8.75rem" },
  savings: { top: "14.75rem", left: "19rem" },
  quest: { top: "12rem", left: "26rem" },
  investing: { top: "5rem", left: "26rem" },
} as const;

export default function Main() {
  const { logout } = useAuthStore();
  const { toggleMute, isMuted } = useSoundStore();

  const [isAnimating, setIsAnimating] = useState(false);
  const [targetPosition, setTargetPosition] = useState<{ top: string; left: string }>({
    top: "8rem",
    left: "14rem",
  });
  const [targetPath, setTargetPath] = useState<string>("");
  const [direction, setDirection] = useState<"left" | "right">("left");

  const navigate = useNavigate();

  const handleIslandClick = (
    island: keyof typeof ISLAND_POSITIONS,
    path: string,
    direction: "left" | "right" = "left"
  ) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTargetPosition(ISLAND_POSITIONS[island]);
    setTargetPath(path);
    setDirection(direction);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    setDirection("left");

    if (targetPath === "/market") {
      return navigate("/market", { state: { from: "main" } });
    }

    if (targetPath) {
      return navigate(targetPath);
    }
  };

  return (
    <MainTemplate
      isAnimating={isAnimating}
      targetPosition={targetPosition}
      direction={direction}
      isMuted={isMuted}
      handleIslandClick={handleIslandClick}
      handleAnimationComplete={handleAnimationComplete}
      toggleMute={toggleMute}
      logout={logout}
    />
  );
}
