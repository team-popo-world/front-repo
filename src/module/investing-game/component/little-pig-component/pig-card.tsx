import box from "@/assets/image/investing-game/little_pig/little_pig_box.webp";
import bulb from "@/assets/image/investing-game/little_pig/little_pig_bulb.webp";
import coin from "@/assets/image/common/common_coin.webp";

interface PigCardProps {
  pigImage: string;
  name: string;
  description: string;
  currentPrice: number;
  quantity: number;
  riskType: string;
  onClickInvest: () => void;
}

export const PigCard = ({
  pigImage,
  name,
  description,
  currentPrice,
  quantity,
  riskType,
  onClickInvest,
}: PigCardProps) => {
  return (
    <div className="relative flex flex-col items-start px-4 py-2 w-44 h-55 bg-main-yellow-300 border-2 xl:border-5 border-main-brown-450 rounded-xl">
      <img src={pigImage} alt={name} className="self-center min-w-0 h-14 object-contain mt-4 mb-2" />
      <h4 className="mb-0.5 text-main-brown-575 text-[0.7rem] font-bold">종목명: {name}</h4>
      <p className="mb-1 text-main-brown-575 text-[0.55rem] font-bold leading-[1.1]">설명: {description}</p>
      <div className="flex items-center gap-x-0.5 mb-0.5">
        <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
        <span className="text-main-brown-575 text-[0.55rem] font-bold">현재가격: {currentPrice}냥</span>
      </div>
      <div className="flex items-center gap-x-0.5">
        <img src={box} alt="물건" className="w-4.5 h-4.5 object-contain" />
        <span className="text-main-brown-575 text-[0.55rem] font-bold">보유수량: {quantity}개</span>
      </div>
      <div
        className="self-center mt-auto px-3 py-0.5 text-white text-[0.7rem] bg-main-pink-600 rounded-md active:scale-95 transition-all duration-100 cursor-pointer"
        onClick={onClickInvest}
      >
        투자하기
      </div>
      <div className="absolute top-1.5 right-2 px-1.5 py-0.5 bg-black/20 rounded-md text-[0.45rem] font-bold text-white">
        {riskType}
      </div>
      <div className="absolute top-6 right-3 flex items-center">
        <img src={bulb} alt="전구" className="w-4 h-4 object-contain" />
        <span className="-ml-0.5 text-main-yellow-400 text-[0.4rem] font-bold">힌트</span>
      </div>
    </div>
  );
};
