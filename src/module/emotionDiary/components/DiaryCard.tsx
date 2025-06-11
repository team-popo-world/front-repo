import type { Diary } from "../types/diary";

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

export const DiaryCard = ({ diary, order }: DiaryCardProps) => {
  return (
    <div
      aria-label="일기 컴포넌트 전체 div"
      className="relative flex justify-between items-center bg-[#fffaf3] border border-[#f8e1b8] rounded-2xl pt-[1.4rem] pb-[1.5rem] shadow-md w-full h-[5rem] mb-[0.5rem]"
    >
      {/* 왼쪽: 순서 + 내용 */}
      <div className="flex flex-col gap-[1rem]">
        {/* 순서 */}
        <div className="text-[0.75rem] text-[#e28c5c] font-bold  bg-[#ffe8c2] px-[0.5rem] py-[0.1rem] rounded-full w-fit shadow-sm ml-[1rem]">
          {order}번째 일기
        </div>
        {/* 내용 */}
        <div className="text-[0.8rem] text-[#5e4632] font-medium ml-[1.2rem]">
          {diary.description}
        </div>
      </div>

      {/* 날짜 */}
      <div className="absolute text-[0.65rem] text-[#a07947] font-light  w-[9em] right-[4rem] top-[0.85rem]">
        {formatDateToKorean(diary.created_at)}
      </div>

      {/* 감정 이미지 */}
      <div className="rounded-full bg-[#fff3d6] p-[0.3rem] border border-yellow-300 shadow-sm mr-[1rem]">
        <img
          src="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749524170/ChatGPT_Image_2025%E1%84%82%E1%85%A7%E1%86%AB_6%E1%84%8B%E1%85%AF%E1%86%AF_10%E1%84%8B%E1%85%B5%E1%86%AF_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11_55_17-Photoroom_er3mem.webp"
          alt="감정이미지"
          className="w-[3rem] object-contain"
        />
      </div>
    </div>
  );
};
