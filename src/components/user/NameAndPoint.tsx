import { useAuthStore } from "@/lib/zustand/store";
import { TextWithStroke } from "../text/TextWithStroke";
import { IMAGE_URLS } from "@/lib/constants/constants";

const limitNameLength = (name: string) => {
  if (!name) return "";

  // 한글은 2글자,영어 소문자 1글자, 나머지 1.2글자로 계산
  let length = 0;
  let result = "";

  for (let i = 0; i < name.length; i++) {
    const char = name[i];
    // 한글인 경우 (가-힣 범위)
    if (/[가-힣]/.test(char)) {
      length += 2;
    } else if (/[a-z]/.test(char)) {
      length += 1;
    } else {
      length += 1.2;
    }

    if (length <= 8) {
      result += char;
    } else {
      break;
    }
  }

  return result;
};

export default function NameAndPoint() {
  const { name, point } = useAuthStore();

  return (
    <>
      <div className="absolute right-[0.7rem] top-[0.3rem]">
        <img src={IMAGE_URLS.common.name} alt="name" className="w-[6rem]" />
        <TextWithStroke
          className="absolute left-[2.1rem] bottom-[1.8rem]"
          text={limitNameLength(name || "")}
          textClassName="text-main-yellow-800 text-[0.8rem]"
          strokeClassName="text-main-brown-800 text-[0.8rem] text-stroke-width-[0.12rem] text-stroke-color-main-brown-800"
        />
      </div>

      <img src={IMAGE_URLS.common.coin} alt="coin" className="w-[1.2rem] absolute right-[4.4rem] top-[2.5em]" />
      <div className="absolute left-[34.6rem] top-[2.3rem]">
        <TextWithStroke
          text={point?.toString() || ""}
          textClassName="text-main-yellow-800 text-[0.7rem]"
          strokeClassName="text-main-brown-800 text-[0.7rem] text-stroke-width-[0.12rem] text-stroke-color-main-brown-800"
        />
      </div>
    </>
  );
}
