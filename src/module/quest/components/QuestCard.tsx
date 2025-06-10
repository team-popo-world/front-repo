import type { Quest } from "../types/quest";
import React from "react";

interface QuestCardProps {
  quest: Quest;
  onComplete: () => void;
}

const formatDateToKorean = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

export const QuestCard = React.memo(({ quest, onComplete }: QuestCardProps) => {
  const statusColor = {
    수락하기: "bg-red-300",
    "다 했어요": "bg-yellow-300",
    "기다리는 중": "bg-blue-300",
    "돈 받기": "bg-green-300",
  };

  const handleClick = () => {
    if (quest.state === "돈 받기") {
      onComplete();
    }
  };

  return (
    <div className="flex items-center justify-between p-[1rem] mb-[0.35rem] bg-[#fff7ea] rounded-xl shadow-md h-[3.1rem] w-full ">
      <div className="flex items-center gap-3">
        <img
          src={
            quest.imageUrl ??
            "https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749099020/Rectangle_411_2_kfgmot.webp"
          }
          alt="퀘스트 이미지"
          className="w-[2.5rem] h-[2.5rem] rounded-lg object-cover border-2 border-white shadow"
        />
        <div className="flex flex-col">
          <span className="font-bold text-[0.67rem]">{quest.name}</span>
          <span className="text-[0.6rem] text-gray-600">
            {quest.description}
          </span>
          <span className="text-[0.5rem] text-gray-500">
            기한: {formatDateToKorean(quest.end_date)}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div
          className={`text-white cursor-pointer text-[0.67rem] px-[0.23rem] py-[0.06rem] rounded ${
            statusColor[quest.state]
          }`}
          onClick={handleClick}
        >
          {quest.state}
        </div>
        <div className="text-[0.6rem] mt-[0.3rem] flex justify-center items-center">
          <img
            src="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1748951657/common_coin_oii3sa.webp"
            alt="코인"
            className="h-[0.75rem]"
          />
          <div className="mt-[0.1rem] ml-[0.15rem]">{quest.reward}냥</div>
        </div>
      </div>
    </div>
  );
});
