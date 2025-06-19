import { useNavigate } from "react-router-dom";
import { InvestingTemplate } from "../../module/investing/template";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/zustand/store";

export default function InvestingPage() {
  const navigate = useNavigate();
  const animation = useAnimation();
  const { point } = useAuthStore();

  const chapterPositions: Record<string, { x: number; y: number }> = {
    "little-pig": { x: -210, y: -120 },
    truck: { x: 170, y: -100 },
    masic: { x: -180, y: 100 },
    ninja: { x: 180, y: 100 },
  };

  const handleChapterClick = async (chapter: string) => {
    const { x, y } = chapterPositions[chapter];
    await animation.start({
      rotate: Array.from({ length: 37 }, (_, i) => i * 25),
      scale: [1, 0.95, 0.8, 0.5],
      opacity: [1, 0.8, 0.5],
      x,
      y,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    });
    navigate(`/investing/game/${chapter}?stage=game-start`);
  };

  const handleBack = () => {
    navigate("/");
  };

  //페이지 진입 시 애니메이션
  useEffect(() => {
    animation.set({ opacity: 0, x: 0, y: 200 });

    const keyframes = {
      x: [0, 10, -40, 5],
      y: [200, 110, 60, 10],
      opacity: [0.5, 1],
    };

    animation.start({
      ...keyframes,
      transition: {
        duration: 1.2,
        ease: "linear",
      },
    });
  }, []);

  return (
    <InvestingTemplate
      onBack={handleBack}
      onChapterClick={handleChapterClick}
      onAnimationComplete={() => {}}
      point={point}
    />
  );
}
