// src/module/investing-game/component/little-pig-component/game-out-modal.tsx
import sirenPig from "@/assets/image/investing-game/little_pig/little_siren_pig.webp";
import closePig from "@/assets/image/investing-game/little_pig/little_pig_close.webp";
import { memo } from "react";

interface GameOutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const GameOutModal = memo(({ onConfirm, onCancel }: GameOutModalProps) => {
  return (
    <div className="relative flex flex-col items-start px-11 mb-5 pt-7 pb-5 justify-between w-[24rem] h-[12rem]  bg-main-yellow-200 rounded-2xl border-2 lg:border-5 border-main-yellow-500">
      <h2 className="text-main-brown-850 text-xl font-bold">게임 종료</h2>
      <span className="text-main-brown-850 text-[0.8rem] font-bold">
        정말 종료하시겠습니까? 게임 할때 투자한 시드머니를 모두 잃습니다. 한번 더 확인해주세요.
      </span>

      {/* 버튼 컨테이너 */}
      <div className="flex gap-x-4 mt-2 self-end">
        <button onClick={onConfirm} className="px-4 py-1 bg-main-red-500 text-white rounded-lg text-sm font-bold  ">
          나가기
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-1 bg-main-yellow-300 text-main-brown-850 rounded-lg text-sm font-bold  "
        >
          취소
        </button>
      </div>

      <img src={closePig} alt="닫기 돼지" className="absolute -top-4 -left-5 min-w-0 h-15 object-contain" />
      <img src={sirenPig} alt="사이렌 돼지" className="absolute -bottom-6 -right-4 min-w-0 h-16 object-contain" />
    </div>
  );
});
