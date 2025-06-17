// src/page/main/index.tsx
import { IMAGE_URLS } from "@/lib/constants/constants";
import { TextWithStroke } from "../../../components/text/TextWithStroke";
import { Background } from "../../../components/layout/Background";

import NameAndPoint from "@/components/user/NameAndPoint";
import { SpeechBubble } from "../components/SpeechBubble";
import { Indicator } from "../components/Indicator";
import { useState } from "react";
import clsx from "clsx";

interface TutorialProps {
  onComplete: () => void;
}

export default function Tutorial({ onComplete }: TutorialProps) {
  const tutorialOrder = {
    intro: "안녕하세요! 포포월드에 오신 것을 환영합니다!",
    investing: "모의투자를 통해 포포를 키우고 놀아주세요!",
    quiz: "퀴즈를 통해 포포를 키우고 놀아주세요!",
    attendance: "출석을 통해 포포를 키우고 놀아주세요!",
  };

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = Object.keys(tutorialOrder).length;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={handleNextStep}></div>
      <Background backgroundImage={IMAGE_URLS.main.bg}>
        {/* 여백 */}
        <div className="h-[1.9rem]"></div>
        {/* 제목 */}
        <div className="flex justify-center">
          <TextWithStroke
            text="포포월드"
            textClassName="text-main-yellow-800 text-[3.5rem]"
            strokeClassName="text-main-brown-800 text-[3.5rem] text-stroke-width-[0.4rem] text-stroke-color-main-brown-800"
          />
        </div>

        {/* 로그아웃 */}
        <div className="absolute left-[1rem] top-[0.5rem] flex items-center cursor-pointer">
          <img src={IMAGE_URLS.common.logout} alt="로그아웃" className="w-[1.6rem]" />
          <TextWithStroke
            text="로그아웃"
            className="mt-[0.1rem]"
            textClassName="text-main-pink-400 text-[0.9rem]"
            strokeClassName="text-main-brown-800 text-[0.9rem] text-stroke-width-[0.15rem] text-stroke-color-main-brown-800"
          />
        </div>
        {/* 퀴즈 */}
        <div>
          <div className="absolute top-[0.5rem] right-[9.8rem]  flex flex-col justify-center items-center ">
            <img src={IMAGE_URLS.main.quiz} alt="quiz" className="w-[1.8rem]" />
            <TextWithStroke
              text="퀴즈"
              textClassName="text-main-yellow-800 text-[0.9rem]"
              strokeClassName="text-main-brown-800 text-[0.9rem] text-stroke-width-[0.15rem] text-stroke-color-main-brown-800"
            />
          </div>
        </div>

        {/* 출석 */}
        <div className="absolute top-[0.6rem]  right-[7.6rem]  flex flex-col items-center justify-center ">
          <img src={IMAGE_URLS.main.attendance} alt="attendance" className="w-[1.8rem]" />
          <TextWithStroke
            text="출석"
            textClassName="text-main-blue-700 text-[0.88rem]"
            strokeClassName="text-main-blue-800 text-[0.88rem] text-stroke-width-[0.15rem] text-stroke-color-main-brown-800"
          />
        </div>

        {/* 이름과 포인트 */}
        <NameAndPoint />

        {/* 섬 */}

        {/* 시장 */}
        <div className="cursor-pointer">
          <img src={IMAGE_URLS.main.market} alt="market" className="absolute top-[3.5rem] left-[2.5rem] w-[8.1rem]" />
          <div className="absolute top-[10.25rem] left-[5.2rem] px-[0.7rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
            시장
          </div>
        </div>

        {/* 감정일기 */}
        <div className="cursor-pointer">
          <img
            src={IMAGE_URLS.main.diary}
            alt="emotionsDiary"
            className="w-[7.6rem] absolute left-[2rem] bottom-[4.7rem]"
          />
          <div className="absolute  bottom-[4.5rem] left-[3.4rem] pl-[0.7rem] pr-[0.6rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
            감정일기
          </div>
        </div>

        {/* 포포 키우기 */}
        <div className="cursor-pointer">
          <img
            src={IMAGE_URLS.main.raising}
            alt="raising"
            className="w-[8rem] absolute left-[8.75rem] bottom-[1.64rem]"
          />
          <div className="absolute bottom-[1.5rem] left-[10rem]  px-[0.7rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
            포포 키우기
          </div>
        </div>

        {/* 적금 */}
        <div className="cursor-pointer">
          <img
            src={IMAGE_URLS.main.saving}
            alt="savings"
            className={clsx("w-[8rem] right-[9.75rem] bottom-[0.9rem] absolute", currentStep === 4 && "z-100")}
          />
          <div
            className={clsx(
              "absolute bottom-[1rem] right-[12.27rem]  px-[0.85rem] text-[0.8rem] pt-[0.08rem]  font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg",
              currentStep === 4 && "z-100"
            )}
          >
            적금
          </div>
        </div>
        {currentStep === 4 && (
          <div className="w-[9rem] h-[9rem] rounded-full bg-white/40 absolute  right-[9.2rem] bottom-[0.3rem] z-90"></div>
        )}

        {/* 퀘스트 */}
        <div className="cursor-pointer">
          <img
            src={IMAGE_URLS.main.quest}
            alt="quest"
            className={clsx("w-[7.2rem] absolute right-[2.4rem] bottom-[6.25rem]", currentStep === 3 && "z-100")}
          />
          <div
            className={clsx(
              "absolute bottom-[6rem] right-[3.8rem]  px-[0.85rem] text-[0.8rem] pt-[0.08rem]   font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg",
              currentStep === 3 && "z-100"
            )}
          >
            퀘스트
          </div>
        </div>
        {currentStep === 3 && (
          <div className="w-[9rem] h-[9rem] rounded-full bg-white/40 absolute  right-[1.5rem] bottom-[4.8rem] z-90"></div>
        )}

        {/* 모의투자 */}
        <div className="cursor-pointer">
          <img
            src={IMAGE_URLS.main.investing}
            alt="quiz"
            className={clsx("w-[7.5rem] absolute  right-[2.75rem] top-[5.5rem]", currentStep === 2 && "z-100")}
          />
          <div
            className={clsx(
              "absolute top-[11.4rem] right-[4rem]  px-[0.85rem] text-[0.8rem] pt-[0.08rem] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg",
              currentStep === 2 && "z-100"
            )}
          >
            모의투자
          </div>
        </div>
        {currentStep === 2 && (
          <div className="w-[9rem] h-[9rem] rounded-full bg-white/40 absolute  right-[2rem] top-[5rem] z-90"></div>
        )}
        {/* 포니 */}
        <img src={IMAGE_URLS.main.popo} alt="poni" className="absolute w-40 h-40 top-[8rem] left-[14rem] z-100" />
        <SpeechBubble
          text={Object.values(tutorialOrder)[currentStep - 1]}
          className="absolute bottom-[19.5rem] left-[13rem] z-100"
        />
        <Indicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          className="absolute bottom-[1rem] left-1/2 -translate-x-1/2 z-100"
        />
      </Background>
    </>
  );
}
