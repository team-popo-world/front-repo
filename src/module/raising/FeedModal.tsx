import React from "react";
import carrot_img from "../../assets/image/raising/raising_carrot.webp";
import bread_img from "../../assets/image/raising/raising_bread.webp";
import apple_img from "../../assets/image/raising/raising_apple.webp";
import watermelon_img from "../../assets/image/raising/raising_watermelon.webp";
import broccoli_img from "../../assets/image/raising/raising_broccoli.webp";

const feedList = [
  { name: "carrot", img: carrot_img, count: 3 },
  { name: "bread", img: bread_img, count: 0 },
  { name: "bread", img: bread_img, count: 1 },
  { name: "apple", img: apple_img, count: 1 },
  { name: "watermelon", img: watermelon_img, count: 5 },
  { name: "broccoli", img: broccoli_img, count: 3 },
];

export default function FeedModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="relative bg-[#FFF6D1]/100 rounded-3xl px-10 py-8 min-w-[420px]">
        <div className="absolute left-1/2 -top-8 -translate-x-1/2 bg-[#EBD057] px-8 py-2 rounded-xl font-bold text-2xl text-[#834400]">
          먹이 선택하기
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-8 mb-6">
          {feedList.map((feed) => (
            <div
              key={feed.name}
              className="flex items-center bg-white rounded-xl px-4 py-2 shadow"
            >
              <img src={feed.img} alt={feed.name} className="w-8 h-8 mr-2" />
              <span className="font-bold ml-5 text-lg text-[#6F4223]">
                {feed.count}개
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <button
            className="bg-[#EBD057] text-[#834400] font-bold px-6 py-1 rounded-xl text-xl shadow"
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className="bg-[#EBD057] text-[#834400] font-bold px-6 py-1 rounded-xl text-xl shadow"
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
