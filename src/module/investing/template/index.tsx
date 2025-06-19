import { TextWithStroke } from "../../../components/text/TextWithStroke";
import { Info } from "../components/Info";
import { Background } from "../../../components/layout/Background";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { BackArrow } from "@/components/button/BackArrow";
import { motion, useAnimation } from "framer-motion";
import SoundButton from "@/components/button/SoundButton";

interface InvestingTemplateProps {
  onBack: () => void;
  onChapterClick: (chapter: string) => void;
  onAnimationComplete: () => void;
  point: number | null;
}

export const InvestingTemplate = ({
  onBack,
  onChapterClick,
  onAnimationComplete,
  point,
}: InvestingTemplateProps) => {
  const controls = useAnimation();

  return (
    // 백그라운드 이미지
    <Background backgroundImage={IMAGE_URLS.investing.bg}>
      {/* 뒤로가기 버튼 */}
      <BackArrow onClick={onBack} />
      {/* 음소거 버튼 */}
      <SoundButton />
      {/* 모의투자 제목 + 보유 코인 div */}
      <div
        aria-label="페이지 제목과 보유 코인 정보 섹션"
        className="flex flex-col justify-center items-center mt-[1.3rem]"
      >
        {/* 모의투자 제목 */}
        <div aria-label="페이지 제목: 모의투자">
          <TextWithStroke
            text="모의투자"
            textClassName="text-main-yellow-800 text-[2.1rem]"
            strokeClassName="text-main-brown-800 text-[2.1rem] text-stroke-width-[0.4rem] text-stroke-color-main-brown-800"
          />
        </div>
        {/* 보유 코인 */}
        <div
          aria-label="보유 코인 금액"
          className="mt-[0.4rem] bg-amber-100 rounded-2xl p-[0.15rem] border-[0.1rem] border-[#795c2d]"
        >
          <div className="flex justify-center items-center mr-[0.5rem]">
            <img
              src="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1748951657/common_coin_oii3sa.webp"
              alt="코인"
              className="h-[1.5rem]"
            />
            <TextWithStroke
              text={`${point?.toString()}냥`}
              className="ml-[0.2rem]"
              textClassName="text-main-yellow-800 text-[1.1rem]"
              strokeClassName="text-main-brown-800 text-[1.1rem] text-stroke-width-[0.2rem] text-stroke-color-main-brown-800"
            />
          </div>
        </div>
      </div>

      {/* 포니 */}
      <motion.img
        src={IMAGE_URLS.investing.poni}
        alt="포니 캐릭터"
        className="absolute h-[11.25rem] left-[14.5rem] top-[9rem]"
        animate={controls}
        transition={{ duration: 1 }}
        onAnimationComplete={onAnimationComplete}
      />
      {/* 챕터 제목, 가격 */}
      <TextWithStroke
        text="아기돼지 삼형제"
        className="absolute left-[2.7rem] bottom-[3.85rem]"
        textClassName="text-main-yellow-150 text-[1.3rem]"
        strokeClassName="text-investing-orange-100 text-[1.3rem] text-stroke-width-[0.6rem] text-stroke-color-main-brown-800"
      />
      <Info price="700냥" className="absolute left-[4.3rem] top-[1.7rem]" />
      <TextWithStroke
        text="푸드트럭 왕국"
        className="absolute left-[18.7rem] bottom-[3.85rem]"
        textClassName="text-main-yellow-150 text-[1.3rem]"
        strokeClassName="text-investing-yellow-100 text-[1.3rem] text-stroke-width-[0.6rem] text-stroke-color-main-brown-800"
      />
      <Info price="1000냥" className="absolute right-[4.6rem] top-[1.7rem]" />
      <TextWithStroke
        text="마법 왕국"
        className="absolute right-[12.1rem] top-[15.5rem]"
        textClassName="text-main-yellow-150 text-[1.3rem]"
        strokeClassName="text-investing-purple-100 text-[1.3rem] text-stroke-width-[0.6rem] text-stroke-color-main-brown-800"
      />
      <Info price="700냥" className="absolute left-[4.5rem] bottom-[1rem]" />
      <TextWithStroke
        text="달빛 도둑"
        className="absolute left-[7.4rem] top-[15.5rem]"
        textClassName="text-main-yellow-150 text-[1.3rem]"
        strokeClassName="text-investing-blue-100 text-[1.3rem] text-stroke-width-[0.6rem] text-stroke-color-main-brown-800"
      />

      <Info price="2000냥" className="absolute right-[4rem] bottom-[1rem]" />

      {/* 챕터 클릭 포지션 */}
      <div
        aria-label="아기돼지 삼형제"
        className="w-[12.1rem] h-[12rem] absolute left-[1.5rem] top-[1.9rem] cursor-pointer"
        onClick={() => onChapterClick("little-pig")}
      ></div>
      <div
        aria-label="푸드트럭 왕국"
        className="w-[12.1rem] h-[12rem] absolute right-[1.5rem] top-[1.9rem] cursor-pointer"
        onClick={() => onChapterClick?.("truck")}
      ></div>
      <div
        aria-label="마법 왕국"
        className="w-[12.1rem] h-[12rem] absolute left-[1.5rem] top-[14.1rem] cursor-pointer"
        onClick={() => onChapterClick?.("masic")}
      ></div>
      <div
        aria-label="달빛 도둑"
        className="w-[12.1rem] h-[12rem] absolute right-[1.5rem] top-[14.1rem] cursor-pointer"
        onClick={() => onChapterClick?.("ninja")}
      ></div>
    </Background>
  );
};
