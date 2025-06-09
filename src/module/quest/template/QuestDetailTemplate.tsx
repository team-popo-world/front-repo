import { Background } from "@/components/layout/Background";
import { TextWithStroke } from "@/components/text/TextWithStroke";
import { dailyQuests } from "../dummy/dailyDummy";
import { QuestCard } from "../components/QuestCard";
import { BackArrow } from "@/components/button/BackArrow";

interface QuestDetailTemplateProps {
  questType: string;
  onComplete: () => void;
  onBack: () => void;
}
export const QuestDetailTemplate = ({
  questType,
  onBack,
  onComplete,
}: QuestDetailTemplateProps) => {
  return (
    // 배경 이미지
    <Background backgroundImage="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749086237/iPad_Pro_12.9__-_63_fl49sp.webp">
      <BackArrow onClick={onBack} />
      {/* 포포 이미지 */}
      <img
        src="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749107825/ChatGPT_Image_May_26__2025__04_02_46_PM-removebg-preview_1_1_swqc8d.webp"
        alt="포포 캐릭터"
        className="absolute z-20 h-[15rem] left-[27rem] top-[13rem]"
      />
      <div className="absolute left-[30rem] top-[13rem] z-20 bg-[#ffffffa6] rounded-2xl pl-[0.5rem] pr-[0.5rem] p-[0.1rem]">
        <TextWithStroke
          text="하나씩 해볼까?"
          textClassName="text-main-yellow-200
           text-[1rem]"
          strokeClassName=" text-main-brown-800 text-[1rem] text-stroke-width-[0.2rem]  text-stroke-color-main-brown-800"
        />
      </div>
      {/* 퀘스트 목록 표지판 */}

      <img
        src="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749086355/image_437_pgtezv.webp"
        alt="퀘스트 목록 표지판"
        className="absolute w-[27rem] h-[21rem] left-[6rem] top-[4rem] "
      />

      {/* 퀘스트 제목 - 부모퀘스트 / 일일퀘스트 */}
      <div
        aria-label="퀘스트 제목"
        className=" flex justify-center mt-[1.5rem]"
      >
        <TextWithStroke
          text={questType === "daily" ? "일일퀘스트" : "부모퀘스트"}
          textClassName="text-main-yellow-500
           text-[2.7rem]"
          strokeClassName=" text-main-brown-800 text-[2.7rem] text-stroke-width-[0.3rem]  text-stroke-color-main-brown-800"
        />
      </div>

      {/* 리스트 */}
      <div className="flex justify-center ">
        <div className="mt-[2.4rem] z-[10] w-[17rem] h-[11rem] ml-[0.5rem] overflow-scroll  ">
          {dailyQuests.map((quest) => (
            <QuestCard
              key={quest.quest_id}
              quest={quest}
              onComplete={onComplete}
            />
          ))}
        </div>
      </div>
    </Background>
  );
};
