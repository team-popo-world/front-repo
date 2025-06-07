import React from "react";

interface SavingsInputModalProps {
  openInput: "current" | "goal" | "deposit" | null;
  inputValue: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export default function SavingsInputModal({
  openInput,
  inputValue,
  onChange,
  onConfirm,
  onClose,
}: SavingsInputModalProps) {
  if (!openInput) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-[#FFF6D5] rounded-2xl p-8 shadow-xl flex flex-col items-center w-[16rem]">
          <div className="text-xl font-bold mb-4 text-[#6F4223]">
            {openInput === "current" && "현재 금액"}
            {openInput === "goal" && "목표 저축 금액"}
            {openInput === "deposit" && "입금 금액"}
          </div>
          <input
            type="number"
            style={{ appearance: "textfield", MozAppearance: "textfield" }}
            className="bg-white border-4 border-[#BBA14F] rounded-lg px-4 py-2 text-lg text-center mb-4 focus:outline-none w-full"
            value={inputValue}
            onChange={(e) => onChange(e.target.value)}
            placeholder="금액을 입력하세요"
            autoFocus
          />
          <button
            className="cursor-pointer bg-[#78CA7F] text-[#6F4223] font-bold rounded-xl px-6 py-2 mt-2 transition"
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
}
