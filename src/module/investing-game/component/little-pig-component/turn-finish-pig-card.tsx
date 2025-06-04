// src/module/investing-game/component/little-pig-component/pig-card.tsx
import coin from "@/assets/image/common/common_coin.webp";
import box from "@/assets/image/investing-game/little_pig/little_pig_box.webp";

interface PigCardProps {
  image: string;
  name: string;
  description: string;
  currentPrice: number;
  previousPrice: number;
  priceChange: number;
  soldQuantity: number;
  buyPrice: number;
  profit: number;
}

export const TurnFinishPigCard = ({
  image,
  name,
  description,
  currentPrice,
  previousPrice,
  priceChange,
  soldQuantity,
  buyPrice,
  profit,
}: PigCardProps) => {
  return (
    <div className="flex flex-col px-1">
      <img src={image} alt={name} className="mb-3 min-w-0 h-16 object-contain" />
      <h4 className="text-main-brown-575 text-[0.65rem] font-bold mb-1">종목명: {name}</h4>
      <p className="text-main-brown-575 text-[0.5rem] font-bold">설명: {description}</p>
      <div className="flex flex-col gap-y-0.5 mt-3">
        <div className="flex items-center gap-x-0.5">
          <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
          <span className="text-main-brown-575 text-[0.5rem] font-bold">현재 가격: {currentPrice}냥</span>
          {priceChange !== 0 && (
            <span
              className={`pl-1.5 text-[0.5rem] font-bold ${
                priceChange >= 0 ? "text-main-red-600" : "text-main-blue-600"
              }`}
            >
              {priceChange >= 0 ? "+" : ""}
              {priceChange}%
            </span>
          )}
        </div>
        <div className="flex items-center gap-x-0.5">
          <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
          <span className="text-main-brown-575 text-[0.5rem] font-bold">이전 가격: {previousPrice}냥</span>
        </div>
        <div className="flex items-center gap-x-0.5">
          <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
          <span className="text-main-brown-575 text-[0.5rem] font-bold">구매 가격: {buyPrice}냥</span>
        </div>
        <div className="flex items-center gap-x-0.5">
          <img src={box} alt="물건" className="w-4 h-4 object-contain" />
          <span className="text-main-brown-575 text-[0.5rem] font-bold">판매 수량: {soldQuantity}개</span>
        </div>
        <div className="flex items-center gap-x-0.5">
          <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
          <span className="text-main-brown-575 text-[0.5rem] font-bold">얻은 수익: {profit}냥</span>
        </div>
      </div>
    </div>
  );
};
