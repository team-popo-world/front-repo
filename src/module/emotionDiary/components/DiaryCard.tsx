import type { Diary } from "../types/diary";
import { emotionList } from "../constants/emotionList";

interface DiaryCardProps {
  diary: Diary;
  order: number;
}

const formatDateToKorean = (dateStr: string): string => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

function getEmotionUrlByServer(server: string): string | undefined {
  const found = emotionList.find((emotion) => emotion.server === server);
  return found?.url;
}

export const DiaryCard = ({ diary, order }: DiaryCardProps) => {
  return (
    <div
      aria-label="일기 컴포넌트 전체 div"
      className="relative flex justify-between items-center bg-[#fffaf3] border border-[#f8e1b8] rounded-2xl py-[0.8rem] shadow-md w-full  mb-[0.5rem]"
    >
      {/* 왼쪽: 순서 + 내용 */}
      <div className="flex flex-col gap-[1rem] w-[21.6rem]">
        {/* 순서 */}
        <div className="text-[0.75rem] text-[#e28c5c]   bg-[#ffe8c2] px-[0.5rem] py-[0.1rem] rounded-full w-fit shadow-sm ml-[1rem]">
          기록 #{order}.
        </div>
        {/* 내용 */}
        <div className="text-[0.8rem] text-[#5e4632] font-medium mr-[0.5rem] ml-[1.3rem]">
          {diary.description}
        </div>
      </div>

      {/* 날짜 */}
      <div className="absolute text-[0.65rem] text-[#a07947] font-light  w-[9em] left-[5.6rem] top-[1.05rem]">
        {formatDateToKorean(diary.createdAt)}
      </div>

      {/* 감정 이미지 */}
      <div className="rounded-full bg-[#fff3d6] p-[0.3rem] border border-yellow-300 shadow-sm mr-[1rem]">
        <img
          src={getEmotionUrlByServer(diary.emotion)}
          alt="감정이미지"
          className="w-[3rem] object-contain"
        />
      </div>
    </div>
  );
};
