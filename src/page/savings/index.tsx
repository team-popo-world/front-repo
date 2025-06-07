import { Background } from "../../components/layout/Background";
import background_img from "../../assets/image/savings/savings_background.webp";
import character_img from "../../assets/image/savings/savings_character.webp";
import star_img from "../../assets/image/savings/savings_star.webp";
import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./savings-input-hide-spin.css";

export default function SavingsPage() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [openPicker, setOpenPicker] = useState<"start" | "end" | null>(null);
  const [openInput, setOpenInput] = useState<
    "current" | "goal" | "deposit" | null
  >(null);
  const [currentAmount, setCurrentAmount] = useState<string>("");
  const [goalAmount, setGoalAmount] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const startPickerRef = useRef<any>(null);
  const endPickerRef = useRef<any>(null);

  // 오버레이 클릭 시 달력/입력창 닫기
  const handleOverlayClick = () => {
    setOpenPicker(null);
    setOpenInput(null);
  };

  // 입력창 열기
  const handleOpenInput = (type: "current" | "goal" | "deposit") => {
    setOpenInput(type);
    if (type === "current") setInputValue(currentAmount);
    if (type === "goal") setInputValue(goalAmount);
    if (type === "deposit") setInputValue(depositAmount);
  };

  // 입력값 저장
  const handleSaveInput = () => {
    if (openInput === "current") setCurrentAmount(inputValue);
    if (openInput === "goal") setGoalAmount(inputValue);
    if (openInput === "deposit") setDepositAmount(inputValue);
    setOpenInput(null);
  };

  return (
    <>
      <Background backgroundImage={background_img}>
        <div className="w-full flex flex-col items-center mt-8">
          <h1
            className="text-[2.3rem] font-extrabold text-white mb-2 text-center"
            // style={{ WebkitTextStroke: "2px #457E9E" }}
          >
            반짝반짝 <br />
            포포의 저축 통장
          </h1>
        </div>
        <div className="flex flex-row justify-between items-end w-full mx-auto mt-2">
          <div className="bg-[#FFF6D1] rounded-[3rem] ml-10 pl-9 py-6 w-90">
            <div className="grid grid-cols-2 gap-x-1 gap-y-1">
              {/* 1열 */}
              <div>
                <div className="font-bold text-lg text-[#BBA14F]">
                  시작 날짜
                </div>
                <div
                  onClick={() => setOpenPicker("start")}
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
                <div className="font-bold text-lg text-[#BBA14F]">
                  종료 날짜
                </div>
                <div
                  onClick={() => setOpenPicker("end")}
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
                <div className="font-bold text-lg text-[#BBA14F]">
                  현재 금액
                </div>
                <div
                  onClick={() => handleOpenInput("current")}
                  className="font-bold text-lg text-[#6F4223] bg-transparent outline-none cursor-pointer flex items-center h-8"
                >
                  {currentAmount ? currentAmount + "냥" : "입력"}
                </div>
              </div>
              {/* 2열 */}
              <div>
                <div className="font-bold text-lg text-[#BBA14F]">
                  목표 저축 금액
                </div>
                <div
                  onClick={() => handleOpenInput("goal")}
                  className="font-bold text-lg text-[#6F4223] bg-transparent outline-none cursor-pointer flex items-center h-8"
                >
                  {goalAmount ? goalAmount + "냥" : "입력"}
                </div>
              </div>
              {/* 1열 */}
              <div>
                <div className="font-bold text-lg text-[#BBA14F]">
                  입금 금액
                </div>
                <div
                  onClick={() => handleOpenInput("deposit")}
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
                <div className="font-bold text-lg text-[#6F4223]">
                  자동 생성
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start mt-[-15rem]">
            <img src={character_img} alt="character" className="w-65" />
            <button className="bg-[#FDF0B7] text-[#573924] font-bold text-[1.2rem] rounded-4xl py-3 w-45 cursor-pointer">
              저축 통장 개설
            </button>
          </div>
        </div>
      </Background>
      {/* 달력 모달 */}
      {openPicker && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={handleOverlayClick}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <DatePicker
              ref={openPicker === "start" ? startPickerRef : endPickerRef}
              selected={openPicker === "start" ? startDate : endDate}
              onChange={(date) => {
                if (openPicker === "start") setStartDate(date);
                else setEndDate(date);
                setOpenPicker(null);
              }}
              open
              onClickOutside={handleOverlayClick}
              dateFormat="yyyy년 MM월 dd일"
              inline
            />
          </div>
        </>
      )}
      {/* 입력 모달 */}
      {openInput && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={handleOverlayClick}
          ></div>
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
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="금액을 입력하세요"
                autoFocus
              />
              <button
                className="cursor-pointer bg-[#78CA7F] text-[#6F4223] font-bold rounded-xl px-6 py-2 mt-2 transition"
                onClick={handleSaveInput}
              >
                확인
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
