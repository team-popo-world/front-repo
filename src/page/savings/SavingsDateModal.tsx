import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SavingsDateModalProps {
  openPicker: "start" | "end" | null;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  onClose: () => void;
}

export default function SavingsDateModal({
  openPicker,
  selectedDate,
  onChange,
  onClose,
}: SavingsDateModalProps) {
  if (!openPicker) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            onChange(date);
            onClose();
          }}
          open
          onClickOutside={onClose}
          dateFormat="yyyy년 MM월 dd일"
          inline
        />
      </div>
    </>
  );
}