import { useState } from "react";

export function useSavingsState() {
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

  const handleDateChange = (date: Date | null) => {
    if (openPicker === "start") setStartDate(date);
    else if (openPicker === "end") setEndDate(date);
  };

  return {
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
  };
}
