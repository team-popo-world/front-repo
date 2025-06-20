import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MarketTemplate } from "../../module/market/template";
import { preload } from "react-dom";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { setNewAudio, stopBackgroundMusic } from "@/lib/utils/sound";
import { useSoundStore } from "@/lib/zustand/soundStore";
import MarketBackgroundMusic from "@/assets/sound/market.mp3";

const marketPageImages = [
  IMAGE_URLS.market.bg,
  IMAGE_URLS.market.popo,
  IMAGE_URLS.market.npc_shop,
  IMAGE_URLS.market.inventory,
  IMAGE_URLS.market.parent_shop,
];
export default function MarketPage() {
  const { isMuted, audio } = useSoundStore();

    // 첫페이지 로드시 배경음악 설정
    useEffect(() => {
      setNewAudio(MarketBackgroundMusic, 0.8);
    }, []);
  
    // 음소거 상태 변경시 배경음악 정지 또는 재생
    useEffect(() => {
      if (isMuted && audio) stopBackgroundMusic();
      if (isMuted && !audio) return;
  
      if (audio && !isMuted) {
        audio.play();
      }
    }, [isMuted, audio]);

  marketPageImages.forEach((image) => {
    preload(image, { as: "image" });
  });

  const { state } = useLocation();
  const from = state?.from;
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const navigate = useNavigate();

  // 맨처음 페이지 방문했을때 from이 어떤 페이지로 부터 왔는지 보여주는데
  // useEffect로 main 페이지에서 왔으면 포니 배태우고 오는것
  useEffect(() => {
    if (from === "main") {
      setIsAnimating(true);
      setDirection("right");
    }
  }, [from]);

  // 뒤로가기 버튼 눌렀을때 포니 배타고 나가는것
  const handleBack = () => {
    setIsAnimating(true);
    setDirection("left");
  };

  // 방향에 따라 애니메이션
  const handleAnimationComplete = () => {
    // 오른쪽으로 이동할때는 맨처음 페이지 방문했을때 포니 배타고 오는것
    if (direction === "right") {
      setIsAnimating(false);
    }
    // 왼쪽으로 이동할때는 뒤로가기 버튼 눌렀을때 포니 배타고 나가는것
    if (direction === "left") {
      setIsAnimating(false);
      navigate("/");
    }
  };

  return (
    <MarketTemplate
      isAnimating={isAnimating}
      direction={direction}
      handleBack={handleBack}
      handleAnimationComplete={handleAnimationComplete}
    />
  );
}
