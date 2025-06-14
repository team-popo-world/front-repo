import { Background } from "@/components/layout/Background";
import { TextWithStroke } from "@/components/text/TextWithStroke";

import { IMAGE_URLS } from "@/lib/constants/constants";

import { useState } from "react";
import { GameStartExplain } from "./game-start-explain";
import { BackArrow } from "@/components/button/BackArrow";

interface GameCharacter {
  image: string;
  alt: string;
  label: string;
}

interface GameStartProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  characters: GameCharacter[];
  gameTitle: string;
  gameDescription: string;
  descriptions: {
    image: string;
    label: string;
    descriptions: string[];
  }[];
  gamePlayPath: string;
}

export const GameStart = ({
  backgroundImage,
  title,
  subtitle,
  characters,
  gameTitle,
  gameDescription,
  descriptions,
  gamePlayPath,
}: GameStartProps) => {
  // 게임 설명 모달 상태
  const [isGameStartModalOpen, setIsGameStartModalOpen] = useState(false);

  // 맨 첫화면에서 게임 시작하기를 눌러 모달을 띄운다면 모달 화면을 보여준다.
  if (isGameStartModalOpen) {
    return (
      <Background backgroundImage={backgroundImage} backgroundClassName="flex flex-col items-center justify-center">
        <BackArrow />
        <GameStartExplain
          onClose={() => setIsGameStartModalOpen(false)}
          gameTitle={gameTitle}
          gameDescription={gameDescription}
          descriptions={descriptions}
          gamePlayPath={gamePlayPath}
        />
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
        text={title}
        className="mt-12"
        textClassName="text-main-yellow-200 text-[3.5rem] font-bold leading-[1.2]"
        strokeClassName="text-main-brown-700 text-[3.5rem] font-bold text-stroke-width-[0.5rem] text-stroke-color-main-brown-700 leading-[1.2]"
      />
      <TextWithStroke
        text={subtitle}
        className="mb-9"
        textClassName="text-main-orange-400 text-[1.75rem] font-bold"
        strokeClassName="text-main-brown-700 text-[1.75rem] font-bold text-stroke-width-[0.3rem] text-stroke-color-main-brown-700"
      />
      {/* 돼지들 */}
      <section className="flex justify-center items-center gap-x-8 mb-5">
        {characters.map((char, index) => (
          <div key={index} className="relative flex flex-col justify-center items-center gap-y-0.5">
            <img src={char.image} alt={char.alt} className="min-w-0 h-31 object-contain" />
            <div className="px-5 ml-3 bg-main-brown-500 rounded-lg border-3 xl:border-5 border-main-brown-600 text-center">
              <span className="text-white text-xs font-bold">{char.label}</span>
            </div>
          </div>
        ))}
      </section>
      {/* 버튼 */}
      <button
        className="px-6 py-2 bg-main-red-400 border-3 xl:border-5 border-main-orange-500 rounded-lg active:scale-95 transition-all duration-100"
        onClick={() => setIsGameStartModalOpen(true)}
      >
        <span className="text-white text-xl font-bold">투자 게임 시작</span>
      </button>
    </Background>
  );
};
