// src/module/investing-game/template/little-pig-template/game-play-turn-finish.tsx
import { PinkBorderModal } from "@/module/investing-game/component/little-pig-component/pink-border-modal";
import { TurnFinishPigCard } from "@/module/investing-game/component/little-pig-component/turn-finish-pig-card";
import coin from "@/assets/image/common/common_coin.webp";

// 돼지 데이터 타입 정의
interface PigData {
  image: string;
  name: string;
  priceChange: number;
  countChange: number;
}

interface GamePlayTurnFinishProps {
  onNextTurn: () => void;
  turn: number;
  pigData: PigData[];
  result: string;
  totalPoint: number;
}

export const GamePlayTurnFinish = ({ onNextTurn, turn, pigData, result, totalPoint }: GamePlayTurnFinishProps) => {
  return (
    <PinkBorderModal className="flex flex-col items-start">
      <h1 className="self-center mt-2.5 mb-1.5 text-main-pink-600 text-[1.65rem] font-extrabold">
        {turn + 1 <= 7 ? turn + 1 : turn}
        {turn + 1 <= 7 ? "턴 시작!" : "턴 종료!"}
      </h1>
      <p className="mb-4 text-main-brown-575 text-[0.75rem] font-bold ">{result}</p>

      <section className="mb-4 grid grid-cols-3 gap-x-2 w-full">
        {pigData.map((pig, index) => (
          <TurnFinishPigCard key={index} {...pig} />
        ))}
      </section>

      <div className="flex items-center gap-x-1 self-center">
        <img src={coin} alt="코인" className="w-8 h-8 object-contain" />
        <p className="text-main-brown-575 text-lg font-bold">총 자산: {totalPoint}냥</p>
      </div>

      <button
        className="absolute bottom-2 right-13 px-3 py-1.5 text-white text-[0.7rem] font-bold bg-main-pink-600 rounded-lg active:scale-95 transition-all duration-100"
        onClick={onNextTurn}
      >
        Let's 투자!
      </button>
    </PinkBorderModal>
  );
};
