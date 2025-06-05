// src/module/investing-game/template/little-pig-template/game-play-turn-finish.tsx
import { PinkBorderModal } from "@/module/investing-game/component/little-pig-component/pink-border-modal";
import { TurnFinishPigCard } from "@/module/investing-game/component/little-pig-component/turn-finish-pig-card";

// 돼지 데이터 타입 정의
interface PigData {
  image: string;
  name: string;
  description: string;
  priceChange: number;
  countChange: number;
}

interface GamePlayTurnFinishProps {
  onNextTurn: () => void;
  turn: number;
  pigData: PigData[];
  result: string;
}

export const GamePlayTurnFinish = ({ onNextTurn, turn, pigData, result }: GamePlayTurnFinishProps) => {
  return (
    <PinkBorderModal className="flex flex-col items-start">
      <h1 className="self-center mt-3 mb-4 text-main-pink-600 text-[1.65rem] font-extrabold">{turn}턴 결과!</h1>
      <div className="text-main-brown-575 text-[0.7rem] font-bold">{result}</div>
      <div className="grid grid-cols-3 mb-2 gap-x-2 w-full">
        {pigData.map((pig, index) => (
          <TurnFinishPigCard key={index} {...pig} />
        ))}
      </div>
      <div
        className="absolute bottom-2 right-13 px-3 py-1.5 text-white text-[0.7rem] font-bold bg-main-pink-600 rounded-lg active:scale-95 transition-all duration-100"
        onClick={() => {
          onNextTurn();
        }}
      >
        다음 턴!
      </div>
    </PinkBorderModal>
  );
};
