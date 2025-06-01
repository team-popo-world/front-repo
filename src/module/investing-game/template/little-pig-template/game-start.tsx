import { Background } from "@/components/layout/Background";
import { TextWithStroke } from "@/components/text/TextWithStroke";

import backgroundImage from "@/assets/image/investing-game/little_pig/little_pig_bg.webp";
import littlePig1 from "@/assets/image/investing-game/little_pig/little_pig_1.webp";
import littlePig2 from "@/assets/image/investing-game/little_pig/little_pig_2.webp";
import littlePig3 from "@/assets/image/investing-game/little_pig/little_pig_3.webp";
import sirenPig from "@/assets/image/investing-game/little_pig/little_siren_pig.webp";

import { useState } from "react";
import { PinkBorderModal } from "@/module/investing-game/component/little-pig-component/pink-border-modal";
import { PigDescription } from "../../component/little-pig-component/pig-description";
import { Link } from "react-router-dom";

export const LittlePigGameStart = () => {
  const [isGameStartModalOpen, setIsGameStartModalOpen] = useState(false);

  // 맨 첫화면에서 게임 시작하기를 눌러 모달을 띄운다면 모달 화면을 보여준다.
  if (isGameStartModalOpen) {
    return (
      <Background backgroundImage={backgroundImage} backgroundClassName="flex flex-col items-center justify-center">
        <PinkBorderModal className="flex flex-col items-start">
          {/* 게임 설명 제목 */}
          <h1 className="text-main-pink-600 my-2 text-2xl font-extrabold self-center">게임 설명</h1>
          {/* 게임 설명 내용 */}
          {/* tracking-[0.02rem] 글자 간격 조정 */}
          <p className="text-main-pink-600 text-xs font-bold mb-3 letter-spacing: tracking-[0.02rem]">
            오늘은 아기돼지 삼형제가 각자 집을 짓기 시작했어요!
            <br />
            첫째 돼지는 지푸라기, 둘째 돼지는 나무, 셋째 돼지는 벽돌로 집을 지을거래요.
            <br />
            어떤 돼지가 더 많은 돈을 벌 수 있을까요?
          </p>
          {/* 모의투자에서 돼지들 설명 영역 */}
          <div className="flex flex-col gap-y-3">
            <PigDescription image={littlePig1} label="첫째 돼지">
              <li>무엇이든 빠르게 해요.</li>
              <li>집을 뚝딱 짓고, 빠르게 돈을 벌고 싶어해요.</li>
              <li>조금은 위험해도 괜찮다고 생각해요. 조금 망가져도 다시 빠르게 고치면 되니깐요!</li>
            </PigDescription>

            <PigDescription image={littlePig1} label="둘째 돼지">
              <li>이 정도면 괜찮아~" 하고 웃어요.</li>
              <li>조금 빠르게, 조금 튼튼하게! 둘 다 하고 싶어요.</li>
              <li>너무 오래 일하는건 싫어해요.</li>
            </PigDescription>

            <PigDescription image={littlePig1} label="셋째 돼지">
              <li>천천히 하지만 끝까지 잘해요.</li>
              <li>안전이 가장 중요하다고 생각해서, 집을 가장 튼튼하게 만들어요.</li>
              <li>나중을 미리 생각하며 힘든 일도 참을 수 있어요.</li>
            </PigDescription>
          </div>
          {/* 게임 시작 버튼 */}
          <Link to="/investing/game/little_pig?stage=game-play">
            <div className="absolute bottom-5 right-13.25 px-3 py-1.5 text-white text-[0.7rem] bg-main-pink-600 rounded-lg active:scale-95 transition-all duration-100">
              게임 시작
            </div>
          </Link>
        </PinkBorderModal>
      </Background>
    );
  }

  // 모달 뜬것이 없다면 게임 시작화면을 보여준다.
  return (
    <Background backgroundImage={backgroundImage} backgroundClassName="flex flex-col items-center">
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
            <span className="text-white text-xs font-bold">빠른성장형</span>
          </div>
        </div>
        {/* 돼지 한마리 */}
        <div className="relative flex flex-col justify-center items-center gap-y-0.5">
          <img src={littlePig2} alt="돼지2" className=" min-w-0 h-31 object-contain" />
          <div className="px-5  ml-3 bg-main-brown-500 rounded-lg border-3 xl:border-5 border-main-brown-600 text-center">
            <span className="text-white text-xs font-bold">빠른성장형</span>
          </div>
        </div>
        {/* 돼지 한마리 */}
        <div className="relative flex flex-col justify-center items-center gap-y-0.5">
          <img src={littlePig3} alt="돼지3" className=" min-w-0 h-31 object-contain" />
          <div className="px-5  ml-3 bg-main-brown-500 rounded-lg border-3 xl:border-5 border-main-brown-600 text-center">
            <span className="text-white text-xs font-bold">빠른성장형</span>
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
