import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/lib/zustand/store";

/**
 * API 에러를 처리하기 위한 커스텀 에러 클래스
 */
export class ApiError extends Error {
  constructor(public status: number, public message: string, public data?: any) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Axios 인스턴스 생성
 * 기본 설정:
 * - baseURL: 환경 변수에서 API URL을 가져오거나 기본값 사용
 * - timeout: 환경 변수에서 타임아웃 값을 가져오거나 기본값 사용
 * - withCredentials: true (CORS 요청에서 쿠키 전송 허용)
 * - 기본 헤더: Content-Type: application/json
 */

const API_URL = import.meta.env.VITE_API_URL || "/api";
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 5000;

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 개발 환경에서만 요청/응답 로깅
if (import.meta.env.DEV) {
  apiClient.interceptors.request.use((config) => {
    console.log("Request:", config);
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => {
      console.log("Response:", response);
      return response;
    },
    (error) => {
      console.error("Response Error:", error);
      return Promise.reject(error);
    }
  );
}

/**
 * 요청 인터셉터
 * 모든 요청이 서버로 전송되기 전에 실행됨
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // FormData 처리
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(new ApiError(0, "요청 설정 중 오류가 발생했습니다."));
  }
);

/**
 * 응답 인터셉터
 * 서버로부터 응답을 받은 후 실행됨
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject(new ApiError(0, "네트워크 연결을 확인해주세요."));
    }

    const { status } = error.response;

    // 토큰 갱신 처리
    if (status === 401) {
      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }

        const response = await apiClient.post(`/auth/token/refresh`, 
          { refreshToken }, 
          { 
            withCredentials: true,
            headers: {
              "x-skip-proxy": "true" // 토큰 갱신 요청은 프록시 스킵
            }
          }
        );

        const newAccessToken = response.headers["authorization"]?.replace("Bearer ", "");
        if (newAccessToken) {
          useAuthStore.getState().setAccessToken(newAccessToken);
          
          // 원래 요청 재시도
          if (error.config) {
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(error.config);
          }
        }
      } catch (refreshError) {
        Cookies.remove("refreshToken");
        useAuthStore.getState().logout();
        return Promise.reject(new ApiError(401, "세션이 만료되었습니다. 다시 로그인해주세요."));
      }
    }

    // HTTP 상태 코드별 에러 처리
    const errorMessages: Record<number, string> = {
      400: "잘못된 요청입니다.",
      403: "접근 권한이 없습니다.",
      404: "요청한 리소스를 찾을 수 없습니다.",
      500: "서버 에러가 발생했습니다."
    };

    const message = errorMessages[status] || "알 수 없는 에러가 발생했습니다.";
    return Promise.reject(new ApiError(status, message, error.response.data));
  }
);

export default apiClient;
