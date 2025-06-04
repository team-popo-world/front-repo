import { RaisingTemplate } from "../../module/raising/template";
import { Background } from "../../components/layout/Background";
import backgroundImage from "../../assets/image/raising/raising_background.webp";
import character1_img from "../../assets/image/raising/raising_character1.webp";
import nest_img from "../../assets/image/raising/raising_nest.webp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedModal from "../../module/raising/FeedModal";


export default function RaisingPage() {
  const [level, setLevel] = useState(5);
  const [exp, setExp] = useState(70);
  const [maxExp, setMaxExp] = useState(100);
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);


  return (
    <Background backgroundImage={backgroundImage}>
      <div className="flex flex-col items-center">
        <h1 className="mt-9 text-[2rem] font-bold text-[#834400] bg-[#EBD057] px-8 py-1 rounded-[1rem]">
          포포 키우기
        </h1>
        <div className="relative w-[13rem] h-[13rem] flex items-end justify-center mt-5">
          <img
            src={character1_img}
            alt="character1"
            className="absolute left-1/2 top-0 -translate-x-1/2 w-[13rem] z-1"
          />
          <img
            src={nest_img}
            alt="nest"
            className="absolute left-1/2 top-40 -translate-x-1/2 w-[12rem] z-0"
          />
        </div>
        <div className="w-full max-w-xl mx-auto mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-2xl text-[#6F4223]">
              Level {level}
            </span>
            <button
              className="bg-yellow-300 text-[#834400] font-bold px-6 py-1 rounded-xl text-xl shadow"
              onClick={() => setIsFeedModalOpen(true)}
            >
              먹이 주기
            </button>
            <span className="font-bold text-2xl text-[#6F4223]">
              {exp}/{maxExp}
            </span>
          </div>
          <div className="w-full h-5 bg-green-100 rounded-full shadow-inner overflow-hidden">
            <div
              className="h-full bg-green-300 rounded-full transition-all duration-300"
              style={{ width: `${(exp / maxExp) * 100}%` }}
            />
          </div>
        </div>
        {isFeedModalOpen && (
          <FeedModal
            onCancel={() => setIsFeedModalOpen(false)}
            onConfirm={() => {
              // 여기서 먹이 선택 처리/경험치 증가 등 로직 추가 가능
              setIsFeedModalOpen(false);
            }}
          />
        )}
      </div>
    </Background>
  );
}
