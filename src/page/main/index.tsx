// src/page/main/index.tsx
import { useState, useEffect } from "react";
import MainTemplate from "../../module/main/template";
import { useNavigate } from "react-router-dom";
import { lazyLoad } from "../../lib/utils/lazy-load";
// Lazy loaded pages

const MarketPage = lazyLoad(() => import("../market"));
const EmotionDiaryPage = lazyLoad(() => import("../emotionDiary"));
const RaisingPage = lazyLoad(() => import("../raising"));
const SavingsPage = lazyLoad(() => import("../savings"));
const QuestPage = lazyLoad(() => import("../quest"));
const InvestingPage = lazyLoad(() => import("../investing"));
const QuizPage = lazyLoad(() => import("../quiz"));
const AttendancePage = lazyLoad(() => import("../attandance"));

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
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetPosition, setTargetPosition] = useState<{ top: string; left: string }>({
    top: "8rem",
    left: "14rem",
  });
  const [targetPath, setTargetPath] = useState<string>("");
  const [direction, setDirection] = useState<"left" | "right">("left");
  const navigate = useNavigate();

  // 페이지 로드 시 모든 페이지 프리로드
  useEffect(() => {
    // 모든 페이지 프리로드
    MarketPage.preload();
    EmotionDiaryPage.preload();
    RaisingPage.preload();
    SavingsPage.preload();
    QuestPage.preload();
    InvestingPage.preload();
    QuizPage.preload();
    AttendancePage.preload();
  }, []);

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
    if (targetPath) {
      navigate(targetPath);
    }
  };

  return (
    <MainTemplate
      isAnimating={isAnimating}
      targetPosition={targetPosition}
      direction={direction}
      handleIslandClick={handleIslandClick}
      handleAnimationComplete={handleAnimationComplete}
    />
  );
}
