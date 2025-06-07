import { Background } from "../../components/layout/Background";
import background_img from "../../assets/image/savings/savings_background.webp";
import character_img from "../../assets/image/savings/savings_character.webp";
import star_img from "../../assets/image/savings/savings_star.webp";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import SavingsInputModal from "./SavingsInputModal";
import SavingsDateModal from "./SavingsDateModal";
import SavingsInfoBox from "./SavingsInfoBox";
import { useSavingsState } from "./useSavingsState";

export default function SavingsPage() {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    openPicker,
    setOpenPicker,
    openInput,
    setOpenInput,
    currentAmount,
    setCurrentAmount,
    goalAmount,
    setGoalAmount,
    depositAmount,
    setDepositAmount,
    inputValue,
    setInputValue,
    handleOverlayClick,
    handleOpenInput,
    handleSaveInput,
    handleDateChange,
  } = useSavingsState();

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
          <SavingsInfoBox
            startDate={startDate}
            endDate={endDate}
            currentAmount={currentAmount}
            goalAmount={goalAmount}
            depositAmount={depositAmount}
            onOpenDateModal={setOpenPicker}
            onOpenInputModal={handleOpenInput}
          />
          <div className="flex flex-col items-center justify-start mt-[-15rem]">
            <img src={character_img} alt="character" className="w-65" />
            <button className="bg-[#FDF0B7] text-[#573924] font-bold text-[1.2rem] rounded-4xl py-3 w-45 cursor-pointer">
              저축 통장 개설
            </button>
          </div>
        </div>
      </Background>
      {/* 달력 모달 */}
      <SavingsDateModal
        openPicker={openPicker}
        selectedDate={openPicker === "start" ? startDate : endDate}
        onChange={handleDateChange}
        onClose={handleOverlayClick}
      />
      {/* 입력 모달 */}
      <SavingsInputModal
        openInput={openInput}
        inputValue={inputValue}
        onChange={setInputValue}
        onConfirm={handleSaveInput}
        onClose={handleOverlayClick}
      />
    </>
  );
}
