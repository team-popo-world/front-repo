import { BackArrow } from "@/components/button/BackArrow";
import { Background } from "@/components/layout/Background";

const emotionList = [
  {
    url: "https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749623811/emotion-happy_b57kwc.webp",
    label: "기쁨",
  },
  {
    url: "https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749623428/emotion-angry_yrpv3l.webp",
    label: "화남",
  },
  {
    url: "https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749623512/emotion-sad_ahoplf.webp",
    label: "슬픔",
  },
  {
    url: "https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749623755/emotion-soso_n5tczw.webp",
    label: "평온",
  },
  {
    url: "https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749623669/emotion-love_zljlxe.webp",
    label: "사랑",
  },
  {
    url: "https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749623606/emotion-embarrassed_npzyuk.webp",
    label: "당황",
  },
];

interface DiaryWriteTemplateProps {
  onBack: () => void;
}
export const DiaryWriteTemplate = ({ onBack }: DiaryWriteTemplateProps) => {
  return (
    <Background backgroundImage="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749622517/diary-write-bg_bld452.webp">
      {/* 뒤로가기 */}
      <BackArrow onClick={onBack} />

      {/* 제목 */}
      <div
        aria-label="제목: 오늘의 일기"
        className="flex justify-start items-center mt-[4rem] text-4xl font-bold pl-[5rem] text-[#df782d]"
      >
        오늘의 일기
      </div>

      {/* 감정 목록 */}
      <div
        aria-label="감정 목록"
        className="grid grid-cols-3 mr-[15rem] ml-[4rem] px-[1rem] mt-[1rem] gap-y-[0.3rem]"
      >
        {emotionList.map((emotion, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <img src={emotion.url} alt="감정 이미지" className="w-[5rem]" />
            <span className="text-[0.7rem]">{emotion.label}</span>
          </div>
        ))}
      </div>

      {/* 일기 한줄 쓰기 */}
      {/* 안내 텍스트 */}
      <div
        aria-label="일기 쓰기 안내"
        className="text-[0.65rem] mr-[15rem] ml-[4rem] flex justify-center mt-[0.45rem]"
      >
        오늘 기분이 어때? 한 줄로 나타내봐!
      </div>
      {/* 일기 쓰기 */}
      <div
        aria-label="일기 쓰기"
        className="h-[1.8rem] mt-[0.3rem] mr-[15rem] ml-[4rem] flex justify-center items-center"
      >
        <div className="px-[0.6rem] w-[18rem] flex justify-center items-center h-full rounded-2xl border-[0.15rem] border-[#aadf8f] bg-[#ffffffa9]">
          <input
            type="text"
            placeholder="여기에 한 줄 일기를 적어줘!"
            className="w-full h-full bg-transparent border-none outline-none text-[0.75rem] text-[#5e4632] font-medium placeholder-[#b2b2b2]"
          />
        </div>
      </div>

      {/* 일기 작성 완료 버튼 */}
      <div
        aria-label="완료 버튼"
        className="absolute right-[4.5rem] bottom-[3rem] border-[0.18rem] text-[#5a471e] text-[1rem] rounded-3xl border-[#aee466] bg-[#fff3ac] px-[1rem] py-[0.3rem] cursor-pointer"
      >
        기록하기
      </div>

      {/* 포포 ~ */}
      <div aria-label="포포" className="absolute bottom-[5rem] right-[1rem]">
        <img
          src="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749625181/emotion-popo_wpurr1.webp"
          alt="포포"
          className="w-[13rem]"
        />
      </div>
      {/* 포포 말풍선 */}
      <div
        aria-label="포포 말풍선"
        className="absolute right-[1.5rem] top-[3rem] w-[10rem] "
      >
        <img
          src="https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749625685/image-removebg-preview_22_1_sajx43.webp"
          alt="포포 말풍선"
          className="w-full"
        />
        <p className="absolute top-[2rem] left-[2.4rem] text-[0.9rem] text-[#5e4632] font-semibold leading-snug whitespace-pre-line">
          오늘의 기분을{"\n"}기록해보자!
        </p>
      </div>
    </Background>
  );
};
