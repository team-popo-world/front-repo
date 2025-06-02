import { Background } from "@/components/layout/Background";

import backgroundImage from "@/assets/image/investing-game/little_pig/little_pig_bg.webp";
import littlePig1 from "@/assets/image/investing-game/little_pig/little_pig_1.webp";
import littlePig2 from "@/assets/image/investing-game/little_pig/little_pig_2.webp";
import littlePig3 from "@/assets/image/investing-game/little_pig/little_pig_3.webp";

import coin from "@/assets/image/common/common_coin.webp";
import box from "@/assets/image/investing-game/little_pig/little_pig_box.webp";

import { TextWithStroke } from "@/components/text/TextWithStroke";
import { PigCard } from "../../component/little-pig-component/pig-card";
import { NewsBox } from "../../component/little-pig-component/news-box";
import { useState } from "react";
import { PinkBorderModal } from "@/module/investing-game/component/little-pig-component/pink-border-modal";
import { Link } from "react-router-dom";

export const GamePlay = () => {
  const [turnFinish, setTurnFinish] = useState(false);
  const [buyPig, setBuyPig] = useState<number>(0);

  if (turnFinish) {
    return (
      <Background backgroundImage={backgroundImage} backgroundClassName="flex flex-col items-center justify-center">
        <PinkBorderModal className="flex flex-col items-start">
          <h1 className="self-center mt-3 mb-4 text-main-pink-600 text-[1.65rem] font-extrabold">1턴 종료!</h1>
          <div className="grid grid-cols-3 mb-2 gap-x-2 w-full">
            {/* 첫째 돼지 */}
            <div className="flex flex-col px-2">
              <img src={littlePig1} alt="첫째 돼지" className="mb-3 min-w-0 h-16 object-contain" />
              <h4 className="text-main-brown-575 text-[0.65rem] font-bold mb-1">종목명: 첫째 돼지</h4>
              <p className="text-main-brown-575 text-[0.5rem] font-bold">
                설명: 바람에 약하지만 귀여운 디자인으로 인기가 많아요
              </p>
              <div className="flex flex-col gap-y-0.5 mt-3 ">
                <div className="flex items-center gap-x-0.5">
                  <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
                  <span className=" text-main-brown-575 text-[0.5rem] font-bold">현재 가격: 1000냥</span>
                  <span className="pl-1.5 text-main-red-600 text-[0.5rem] font-bold">+5%</span>
                </div>
                <div className="flex items-center gap-x-0.5">
                  <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
                  <span className="text-main-brown-575 text-[0.5rem] font-bold">이전 가격: 1000냥</span>
                </div>
                <div className="flex items-center gap-x-0.5">
                  <img src={box} alt="물건" className="w-4 h-4 object-contain" />
                  <span className="text-main-brown-575 text-[0.5rem] font-bold">판매 수량: 3개</span>
                </div>
                <div className="flex items-center gap-x-0.5">
                  <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
                  <span className="text-main-brown-575 text-[0.5rem] font-bold">얻은 수익: 1000냥</span>
                </div>
              </div>
            </div>
            {/* 둘째 돼지 */}
            <div className="flex flex-col px-2">
              <img src={littlePig1} alt="첫째 돼지" className="mb-3 min-w-0 h-16 object-contain" />
              <h4 className="text-main-brown-575 text-[0.65rem] font-bold mb-1">종목명: 첫째 돼지</h4>
              <p className="text-main-brown-575 text-[0.5rem] font-bold">
                설명: 바람에 약하지만 귀여운 디자인으로 인기가 많아요
              </p>
              <div className="flex flex-col gap-y-0.5 mt-3">
                <div className="flex items-center gap-x-0.5">
                  <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
                  <span className=" text-main-brown-575 text-[0.5rem] font-bold">현재 가격: 1000냥</span>
                  <span className="pl-1.5 text-main-red-600 text-[0.5rem] font-bold">+5%</span>
                </div>
                <div className="flex items-center gap-x-0.5">
                  <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
                  <span className="text-main-brown-575 text-[0.5rem] font-bold">이전 가격: 1000냥</span>
                </div>
                <div className="flex items-center gap-x-0.5">
                  <img src={box} alt="물건" className="w-4 h-4 object-contain" />
                  <span className="text-main-brown-575 text-[0.5rem] font-bold">판매 수량: 3개</span>
                </div>
                <div className="flex items-center gap-x-0.5">
                  <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
                  <span className="text-main-brown-575 text-[0.5rem] font-bold">얻은 수익: 1000냥</span>
                </div>
              </div>
            </div>
            {/* 셋째 돼지 */}
            <div className="flex flex-col px-2">
              <img src={littlePig1} alt="첫째 돼지" className="mb-3 min-w-0 h-16 object-contain" />
              <h4 className="text-main-brown-575 text-[0.65rem] font-bold mb-1">종목명: 첫째 돼지</h4>
              <p className="text-main-brown-575 text-[0.5rem] font-bold">
                설명: 바람에 약하지만 귀여운 디자인으로 인기가 많아요
              </p>
              <div className="flex flex-col gap-y-0.5 mt-3 ">
                <div className="flex items-center gap-x-0.5">
                  <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
                  <span className=" text-main-brown-575 text-[0.5rem] font-bold">현재 가격: 1000냥</span>
                  <span className="pl-1.5 text-main-red-600 text-[0.5rem] font-bold">+5%</span>
                </div>
                <div className="flex items-center gap-x-0.5">
                  <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
                  <span className="text-main-brown-575 text-[0.5rem] font-bold">이전 가격: 1000냥</span>
                </div>
                <div className="flex items-center gap-x-0.5">
                  <img src={box} alt="물건" className="w-4 h-4 object-contain" />
                  <span className="text-main-brown-575 text-[0.5rem] font-bold">판매 수량: 3개</span>
                </div>
                <div className="flex items-center gap-x-0.5">
                  <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
                  <span className="text-main-brown-575 text-[0.5rem] font-bold">얻은 수익: 1000냥</span>
                </div>
              </div>
            </div>
          </div>
          <Link to="/investing/game/little_pig?stage=game-play">
            <div className="absolute bottom-2 right-13 px-3 py-1.5 text-white text-[0.7rem] bg-main-pink-600 rounded-lg active:scale-95 transition-all duration-100">
              다음 턴!
            </div>
          </Link>
        </PinkBorderModal>
      </Background>
    );
  }

  if (buyPig > 0) {
    return (
      <Background backgroundImage={backgroundImage} backgroundClassName="flex flex-col items-center justify-center">
        <PinkBorderModal className="flex flex-col items-center px-16 ">
          <h1 className="mt-5 mb-6 text-main-pink-600 text-[1.65rem] font-extrabold">지푸라기로 만든 집</h1>
          <div className="w-full grid grid-cols-[5fr_4fr] ">
            {/* 왼쪽 컨테이너 */}
            <div className="flex flex-col w-40">
              <img src={littlePig1} alt="첫째 돼지" className="self-center min-w-0 h-25 mb-2.5 object-contain" />
              <h4 className="mb-1 text-main-brown-575 text-[0.8rem] font-bold">종목명: 첫째 돼지</h4>
              <p className="text-main-brown-575 text-[0.7rem] font-bold leading-[1.1]">
                설명: 바람에 약하지만, 귀여운 디자인으로 인기가 많아요
              </p>
            </div>
            {/* 오른쪽 컨테이너 */}
            <div className="flex flex-col ">
              {/* 종목 가격, 보유 수량 */}
              <div className="flex flex-col gap-y-1 mt-3 mb-5">
                <div className="flex gap-x-0.5">
                  <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
                  <span className="text-main-brown-575 text-[0.65rem] font-bold">나의 보유 포인트: 1000냥</span>
                </div>
                <div className="flex gap-x-0.5">
                  <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
                  <span className=" text-main-brown-575 text-[0.65rem] font-bold">현재 가격: 1000냥</span>
                  <span className="pl-1.5 text-main-red-600 text-[0.65rem] font-bold">+5%</span>
                </div>
                <div className="flex gap-x-0.5">
                  <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
                  <span className="text-main-brown-575 text-[0.65rem] font-bold">이전 가격: 1000냥</span>
                </div>
                <div className="flex gap-x-0.5">
                  <img src={box} alt="물건" className="w-4 h-4 object-contain" />
                  <span className="text-main-brown-575 text-[0.65rem] font-bold">보유 수량: 10개</span>
                </div>
              </div>
              {/* 개수 선택, 구매 판매 */}
              <div className="w-fit flex flex-col  items-center">
                <div className="font-bold text-main-brown-575 text-[0.65rem]">개수 선택</div>
                {/* 개수 선택 버튼 */}
                <div className="flex w-28 mb-1.5 text-center text-xs font-bold border-2 xl:border-4 border-main-brown-350 rounded-md">
                  <div className="w-8 py-0.5 bg-main-yellow-150 rounded-l-md">-</div>
                  <div className="w-12 py-0.5 bg-white text-main-brown-575  border-x-2 xl:border-x-4 border-main-brown-300">
                    1
                  </div>
                  <div className="w-8 py-0.5 bg-main-yellow-150 rounded-r-md">+</div>
                </div>
                {/* 구매 판매 */}
                <div className="flex justify-between gap-x-2 w-full text-xs font-bold text-center text-white">
                  <div className="w-13 py-0.5 bg-main-blue-600 rounded-md">구매</div>
                  <div className="w-13 py-0.5 bg-main-red-600 rounded-md">판매</div>
                </div>
              </div>
            </div>
          </div>
        </PinkBorderModal>
      </Background>
    );
  }

  return (
    <Background backgroundImage={backgroundImage} backgroundClassName="flex flex-col items-center">
      {/* 우측 상단 턴과 포인트트 */}
      <div className="self-end mt-4 mr-6 mb-1">
        <TextWithStroke
          text="1턴 / 10턴"
          textClassName="text-main-yellow-200 text-[1rem] font-bold "
          strokeClassName="text-main-brown-700 text-[1rem] font-bold text-stroke-width-[0.2rem] text-stroke-color-main-brown-700 "
        />
        <div className="flex items-center justify-end gap-x-0.5">
          <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
          <TextWithStroke
            text="2000냥"
            textClassName="text-main-yellow-200 text-[0.65rem] font-bold tracking-[0.075rem]"
            strokeClassName="text-main-brown-700 text-[0.65rem] font-bold text-stroke-width-[0.15rem] text-stroke-color-main-brown-700 tracking-[0.075rem]"
          />
        </div>
      </div>
      {/* 뉴스 박스 */}
      <NewsBox
        title="내일은 마을에서 큰 축제가 열릴 거예요!"
        hint="힌트: 축제에 잘 어울리는 집이 인기를 끌 수 있어요!"
      />
      {/* 돼지 집 박스들 */}
      <div className="relative flex items-center justify-center gap-x-2.5">
        {/* 첫째 돼지  */}
        <PigCard
          pigImage={littlePig1}
          name="첫째 돼지"
          description="바람에 약하지만, 귀여운 디자인으로 인기가 많아요"
          currentPrice={1000}
          quantity={3}
          riskType="고위험고수익"
          onClickInvest={() => {}}
        />
        <PigCard
          pigImage={littlePig2}
          name="둘째 돼지"
          description="바람에 약하지만, 귀여운 디자인으로 인기가 많아요"
          currentPrice={1000}
          quantity={3}
          riskType="균형 추구형"
          onClickInvest={() => {}}
        />
        <PigCard
          pigImage={littlePig3}
          name="셋째 돼지"
          description="바람에 약하지만, 귀여운 디자인으로 인기가 많아요"
          currentPrice={1000}
          quantity={3}
          riskType="장기 투자형"
          onClickInvest={() => {}}
        />
      </div>
      <div className="self-end mx-2 my-1 px-4 py-0.5  font-bold bg-main-yellow-350 border-2 xl:border-5 border-main-brown-400 rounded-lg">
        턴 종료!
      </div>
    </Background>
  );
};
