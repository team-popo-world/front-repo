import { Background } from "@/components/layout/Background";
import { TextWithStroke } from "@/components/text/TextWithStroke";

import backgroundImage from "@/assets/image/investing-game/little_pig/little_pig_bg.webp";
import littlePig1 from "@/assets/image/investing-game/little_pig/little_pig_1.webp";
import littlePig2 from "@/assets/image/investing-game/little_pig/little_pig_2.webp";
import littlePig3 from "@/assets/image/investing-game/little_pig/little_pig_3.webp";

import { useState } from "react";
import { GameStartExplain } from "./game-start-explain";
import { BackArrow } from "@/components/button/BackArrow";

export const LittlePigGameStart = () => {
  const [isGameStartModalOpen, setIsGameStartModalOpen] = useState(false);

  // 맨 첫화면에서 게임 시작하기를 눌러 모달을 띄운다면 모달 화면을 보여준다.
  if (isGameStartModalOpen) {
    return (
      <Background backgroundImage={backgroundImage} backgroundClassName="flex flex-col items-center justify-center">
        <BackArrow />
        <GameStartExplain onClose={() => setIsGameStartModalOpen(false)} />
      </Background>
    );
  }

  // 모달 뜬것이 없다면 게임 시작화면을 보여준다.
  return (
    <Background backgroundImage={backgroundImage} backgroundClassName="flex flex-col items-center">
      <BackArrow />
      {/* 제목 */}
      {/* leading-[1.2] 줄간격 조정 */}
      <TextWithStroke
        text="아기돼지 삼형제"
        className="mt-12"
        textClassName="text-main-yellow-200 text-[3.5rem] font-bold leading-[1.2]"
        strokeClassName="text-main-brown-700 text-[3.5rem] font-bold text-stroke-width-[0.5rem] text-stroke-color-main-brown-700 leading-[1.2]"
      />
      <TextWithStroke
        text="가장 부자 돼지는 누구?"
        className="mb-9"
        textClassName="text-main-orange-400 text-[1.75rem] font-bold"
        strokeClassName="text-main-brown-700 text-[1.75rem] font-bold text-stroke-width-[0.3rem] text-stroke-color-main-brown-700"
      />
      {/* 돼지들 */}
      <div className="flex justify-center items-center gap-x-8 mb-5">
        {/* 돼지 한마리 */}
        <div className="relative flex flex-col justify-center items-center gap-y-0.5">
          <img src={littlePig1} alt="돼지1" className=" min-w-0 h-31 object-contain" />
          <div className="px-5  ml-3 bg-main-brown-500 rounded-lg border-3 xl:border-5 border-main-brown-600 text-center">
            <span className="text-white text-xs font-bold">고위험 고수익</span>
          </div>
        </div>
        {/* 돼지 한마리 */}
        <div className="relative flex flex-col justify-center items-center gap-y-0.5">
          <img src={littlePig2} alt="돼지2" className=" min-w-0 h-31 object-contain" />
          <div className="px-5  ml-3 bg-main-brown-500 rounded-lg border-3 xl:border-5 border-main-brown-600 text-center">
            <span className="text-white text-xs font-bold">균형형</span>
          </div>
        </div>
        {/* 돼지 한마리 */}
        <div className="relative flex flex-col justify-center items-center gap-y-0.5">
          <img src={littlePig3} alt="돼지3" className=" min-w-0 h-31 object-contain" />
          <div className="px-5  ml-3 bg-main-brown-500 rounded-lg border-3 xl:border-5 border-main-brown-600 text-center">
            <span className="text-white text-xs font-bold">장기 안정형</span>
          </div>
        </div>
      </div>
      {/* 버튼 */}
      <div
        className="px-6 py-2 bg-main-red-400 border-3 xl:border-5 border-main-orange-500 rounded-lg active:scale-95 transition-all duration-100"
        onClick={() => setIsGameStartModalOpen(true)}
      >
        <span className="text-white text-xl font-bold">투자 게임 시작</span>
      </div>
    </Background>
  );
};
