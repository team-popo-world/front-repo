import React from "react";

interface SavingsInfoBoxProps {
  startDate: Date | null;
  endDate: Date | null;
  currentAmount: string;
  goalAmount: string;
  depositAmount: string;
  onOpenDateModal: (type: "start" | "end") => void;
  onOpenInputModal: (type: "current" | "goal" | "deposit") => void;
}

export default function SavingsInfoBox({
  startDate,
  endDate,
  currentAmount,
  goalAmount,
  depositAmount,
  onOpenDateModal,
  onOpenInputModal,
}: SavingsInfoBoxProps) {
  return (
    <div className="bg-[#FFF6D1] rounded-[3rem] ml-10 pl-9 py-6 w-90">
      <div className="grid grid-cols-2 gap-x-1 gap-y-1">
        {/* 1열 */}
        <div>
          <div className="font-bold text-lg text-[#BBA14F]">시작 날짜</div>
          <div
            onClick={() => onOpenDateModal("start")}
            className="font-bold text-lg text-[#6F4223] bg-transparent outline-none cursor-pointer flex items-center h-8"
          >
            {startDate
              ? new Date(startDate).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }) + ""
              : "날짜 선택"}
          </div>
        </div>
        {/* 2열 */}
        <div>
          <div className="font-bold text-lg text-[#BBA14F]">종료 날짜</div>
          <div
            onClick={() => onOpenDateModal("end")}
            className="font-bold text-lg text-[#6F4223] bg-transparent outline-none cursor-pointer flex items-center h-8"
          >
            {endDate
              ? new Date(endDate).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }) + ""
              : "날짜 선택"}
          </div>
        </div>
        {/* 1열 */}
        <div>
          <div className="font-bold text-lg text-[#BBA14F]">현재 금액</div>
          <div
            onClick={() => onOpenInputModal("current")}
            className="font-bold text-lg text-[#6F4223] bg-transparent outline-none cursor-pointer flex items-center h-8"
          >
            {currentAmount ? currentAmount + "냥" : "입력"}
          </div>
        </div>
        {/* 2열 */}
        <div>
          <div className="font-bold text-lg text-[#BBA14F]">목표 저축 금액</div>
          <div
            onClick={() => onOpenInputModal("goal")}
            className="font-bold text-lg text-[#6F4223] bg-transparent outline-none cursor-pointer flex items-center h-8"
          >
            {goalAmount ? goalAmount + "냥" : "입력"}
          </div>
        </div>
        {/* 1열 */}
        <div>
          <div className="font-bold text-lg text-[#BBA14F]">입금 금액</div>
          <div
            onClick={() => onOpenInputModal("deposit")}
            className="font-bold text-lg text-[#6F4223] bg-transparent outline-none cursor-pointer flex items-center h-8"
          >
            {depositAmount ? depositAmount + "냥" : "입력"}
          </div>
        </div>
        {/* 2열 */}
        <div>
          <div className="font-bold text-lg text-[#BBA14F]">
            목표 달성시 보상
          </div>
          <div className="font-bold text-lg text-[#6F4223]">자동 생성</div>
        </div>
      </div>
    </div>
  );
}
