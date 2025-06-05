// src/module/investing-game/component/little-pig-component/pig-card.tsx
import coin from "@/assets/image/common/common_coin.webp";
import box from "@/assets/image/investing-game/little_pig/little_pig_box.webp";
import clsx from "clsx";

interface PigCardProps {
  image: string;
  name: string;
  description: string;
  priceChange: number;
  countChange: number;
}

export const TurnFinishPigCard = ({ image, name, description, priceChange, countChange }: PigCardProps) => {
  return (
    <div className="flex flex-col px-1">
      <img src={image} alt={name} className="mb-3 min-w-0 h-16 object-contain" />
      <h4 className="text-main-brown-575 text-[0.65rem] font-bold mb-1">{name}</h4>
      <p className="text-main-brown-575 text-[0.5rem] font-bold">{description}</p>
      <div className="flex flex-col gap-y-0.5 mt-3">
        <div className="flex items-center gap-x-0.5">
          <img src={coin} alt="코인" className="w-4 h-4 object-contain" />
          <span className="text-main-brown-575 text-[0.5rem] font-bold">가격 변동: </span>
          <span
            className={clsx("pl-1.5 text-[0.5rem] font-bold", {
              "text-main-red-600": priceChange > 0,
              "text-main-blue-600": priceChange < 0,
              "text-main-brown-575": priceChange === 0,
            })}
          >
            {priceChange > 0 ? `+${priceChange}냥` : priceChange < 0 ? `-${Math.abs(priceChange)}냥` : "0냥"}
          </span>
        </div>
        <div className="flex items-center gap-x-0.5">
          <img src={box} alt="물건" className="w-4 h-4 object-contain" />
          <span className="text-main-brown-575 text-[0.5rem] font-bold"> 수량: </span>
          <span
            className={clsx("pl-1.5 text-[0.5rem] font-bold", {
              "text-main-red-600": countChange > 0,
              "text-main-blue-600": countChange < 0,
              "text-main-brown-575": countChange === 0,
            })}
          >
            {countChange > 0 ? `+${countChange}개` : countChange < 0 ? `-${Math.abs(countChange)}개` : "0개"}
          </span>
        </div>
      </div>
    </div>
  );
};
