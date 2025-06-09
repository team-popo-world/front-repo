import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  accessToken: string | null; // JWT 엑세스 토큰
  isAuthenticated: boolean; // 인증 상태 여부
  user: {
    email: string; // 사용자 이메일
    name: string; // 사용자 이름
  } | null; // 사용자 정보
}

interface AuthStore extends AuthState {
  setAccessToken: (accessToken: string) => void; // 액세스 토큰 설정 및 인증 상태 업데이트
  setUser: (user: AuthState["user"]) => void; // 사용자 정보 설정
  logout: () => void; // 로그아웃 처리 (모든 상태 초기화)
}

/**
 * 인증 상태의 초기값
 * 로그아웃 상태를 나타내는 기본값들로 구성
 */
const INITIAL_AUTH_STATE: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  user: null,
};

/**
 * 인증 스토어 생성
 * persist 미들웨어를 사용하여 상태를 localStorage에 저장
 *
 * persist 옵션:
 * - name: localStorage에 저장될 키 이름
 * - storage: localStorage를 사용하여 상태 저장
 * - partialize: 저장할 상태 필드 선택 (모든 상태를 저장하지 않고 필요한 것만 저장)
 */
export const useAuthStore = create<AuthStore>()(
  // set을 받아서 내부적으로 localStorage와 연결된 상태 관리 객체를 생성
  // set 호출될때 auth-storage에 저장
  persist(
    (set) => ({
      ...INITIAL_AUTH_STATE,
      // 액세스 토큰 설정 및 인증 상태 업데이트
      setAccessToken: (accessToken) =>
        set({
          accessToken,
          isAuthenticated: true,
        }),
      // 사용자 정보 설정
      setUser: (user) => set({ user }),
      // 로그아웃 처리 (모든 상태를 초기값으로 리셋)
      logout: () => set(INITIAL_AUTH_STATE),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // 저장할 상태 필드 선택
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
