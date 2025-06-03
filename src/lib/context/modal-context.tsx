import React, { createContext, useContext, useState, type ReactNode } from "react";

// ModalContext의 타입 정의
interface ModalContextType {
  isOpen: boolean; // 모달이 열려있는지 여부
  openModal: () => void; // 모달을 여는 함수
  closeModal: () => void; // 모달을 닫는 함수
}

// ModalContext 생성
const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * ModalProvider 컴포넌트
 * 모달의 상태를 관리하고 하위 컴포넌트들에게 모달 관련 함수들을 제공합니다.
 */
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  // 모달의 열림/닫힘 상태를 관리하는 state
  const [isOpen, setIsOpen] = useState(false);

  // 모달을 여는 함수
  const openModal = () => setIsOpen(true);
  // 모달을 닫는 함수
  const closeModal = () => setIsOpen(false);

  return <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

/**
 * useModal 훅
 * ModalContext의 값들을 쉽게 사용할 수 있게 해주는 커스텀 훅
 * @throws Error - ModalProvider 외부에서 사용될 경우 에러 발생
 */
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
