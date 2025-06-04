import { TextWithStroke } from "../../../components/text/TextWithStroke";
import { Info } from "../components/Info";
import { Background } from "../../../components/layout/Background";

interface InvestingTemplateProps {
  onClickChapter?: (chapter: string) => void;
}

export const InvestingTemplate = ({
  onClickChapter,
}: InvestingTemplateProps) => {
  return (
    // 백그라운드 이미지
    <Background
      backgroundImage={
        "https://res.cloudinary.com/dgmbxvpv9/image/upload/v1748949363/investing_map_page.webp"
      }
    >
      {/* 모의투자 제목 + 보유 코인 div */}
      <div
        aria-label="페이지 제목과 보유 코인 정보 섹션"
        className="flex flex-col justify-center items-center mt-7"
      >
        {/* 모의투자 제목 */}
        <div aria-label="페이지 제목: 모의투자">
          <TextWithStroke
            text="모의투자"
            textClassName="text-main-yellow-800 text-[2rem]"
            strokeClassName="text-main-brown-800 text-[2rem] text-stroke-width-[0.4rem] text-stroke-color-main-brown-800"
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
              text="2000냥"
              className="ml-[0.2rem]"
              textClassName="text-main-yellow-800 text-[1.1rem]"
              strokeClassName="text-main-brown-800 text-[1.1rem] text-stroke-width-[0.2rem] text-stroke-color-main-brown-800"
            />
          </div>
        </div>
      </div>

      {/* 포니 */}
      <img
        src="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1748982403/investing-poni.webp"
        alt="포니 캐릭터"
        className="h-[11.25rem] absolute left-[14.75rem] top-[8.75rem]"
      />
      {/* 챕터 제목, 가격 */}
      <TextWithStroke
        text="아기돼지 삼형제"
        className="absolute left-[3.1rem] bottom-[5.45rem]"
        textClassName="text-main-yellow-150 text-[1.3rem]"
        strokeClassName="text-investing-orange-100 text-[1.3rem] text-stroke-width-[0.6rem] text-stroke-color-main-brown-800"
      />
      <Info price="700냥" className="absolute left-[5.1rem] top-[3.9rem]" />
      <TextWithStroke
        text="푸드트럭 왕국"
        className="absolute left-[18.7rem] bottom-[5.45rem]"
        textClassName="text-main-yellow-150 text-[1.3rem]"
        strokeClassName="text-investing-yellow-100 text-[1.3rem] text-stroke-width-[0.6rem] text-stroke-color-main-brown-800"
      />
      <Info price="1000냥" className="absolute right-[4.6rem] top-[3.75rem]" />
      <TextWithStroke
        text="마법 왕국"
        className="absolute right-[11.5rem] top-[14.75rem]"
        textClassName="text-main-yellow-150 text-[1.3rem]"
        strokeClassName="text-investing-purple-100 text-[1.3rem] text-stroke-width-[0.6rem] text-stroke-color-main-brown-800"
      />
      <Info price="700냥" className="absolute left-[5.1rem] bottom-[1.45rem]" />
      <TextWithStroke
        text="달빛 도둑"
        className="absolute left-[6.75rem] top-[14.75rem]"
        textClassName="text-main-yellow-150 text-[1.3rem]"
        strokeClassName="text-investing-blue-100 text-[1.3rem] text-stroke-width-[0.6rem] text-stroke-color-main-brown-800"
      />
      <Info
        price="2000냥"
        className="absolute right-[4.9rem] bottom-[1.45rem]"
      />

      {/* 챕터 클릭 포지션 */}
      <div
        aria-label="아기돼지 삼형제"
        className="w-[12.1rem] h-[12rem] absolute left-[1.5rem] top-[1.9rem] cursor-pointer"
        onClick={() => onClickChapter?.("chapter1")}
      ></div>
      <div
        aria-label="푸드트럭 왕국"
        className="w-[12.1rem] h-[12rem] absolute right-[1.5rem] top-[1.9rem] cursor-pointer"
        onClick={() => onClickChapter?.("chapter2")}
      ></div>
      <div
        aria-label="마법 왕국"
        className="w-[12.1rem] h-[12rem] absolute left-[1.5rem] top-[14.1rem] cursor-pointer"
        onClick={() => onClickChapter?.("chapter3")}
      ></div>
      <div
        aria-label="달빛 도둑"
        className="w-[12.1rem] h-[12rem] absolute right-[1.5rem] top-[14.1rem] cursor-pointer"
        onClick={() => onClickChapter?.("chapter4")}
      ></div>
    </Background>
  );
};
