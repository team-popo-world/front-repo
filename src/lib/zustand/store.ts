import { create } from "zustand";

// 상태 타입 정의 (선택)
type State = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

// 스토어 생성
export const useStore = create<State>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));
