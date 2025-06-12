import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

/**
 * API 에러를 처리하기 위한 커스텀 에러 클래스
 */
export class ApiError extends Error {
  constructor(public status: number, public message: string, public data?: any) {
    super(message);
    this.name = "ApiError";
  }
}

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 갱신 중에 들어온 요청들을 저장할 큐
let refreshSubscribers: ((token: string) => void)[] = [];

// 토큰 갱신 구독자 추가
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// 토큰 갱신 후 저장된 요청들 실행
const onRefreshToken = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 토큰 저장 함수
const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

// 토큰 삭제 함수
const removeTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  Cookies.remove("token");
};

/**
 * Axios 인스턴스 생성
 * 기본 설정:
 * - baseURL: 환경 변수에서 API URL을 가져오거나 기본값 사용
 * - timeout: 5초
 * - withCredentials: true (CORS 요청에서 쿠키 전송 허용)
 * - 기본 헤더: Content-Type: application/json
 */

const API_URL = "http://52.78.53.247:8080";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // CORS 요청에서 쿠키 전송을 허용
});

// 토큰 갱신 함수
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("리프레시 토큰이 없습니다.");
    }

    const response = await axios.post(
      `${API_URL}/auth/refresh`,
      { refreshToken },
      { withCredentials: true }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    setTokens(accessToken, newRefreshToken);
    return accessToken;
  } catch (error) {
    removeTokens();
    window.location.href = "/login";
    throw error;
  }
};

/**
 * 요청 인터셉터
 * 모든 요청이 서버로 전송되기 전에 실행됨
 * 주요 기능:
 * 1. 인증 토큰 처리
 * 2. Content-Type 헤더 동적 설정
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    // 요청 설정 중 에러 발생 시 처리
    return Promise.reject(new ApiError(0, "요청 설정 중 오류가 발생했습니다."));
  }
);

/**
 * 응답 인터셉터
 * 서버로부터 응답을 받은 후 실행됨
 * 주요 기능:
 * 1. 네트워크 에러 처리
 * 2. HTTP 상태 코드별 에러 처리
 * 3. 인증 에러 시 자동 로그아웃
 */
apiClient.interceptors.response.use(
  (response) => {
    // 성공적인 응답은 그대로 반환
    return response;
  },
  async (error: AxiosError) => {
    // 1. 네트워크 에러 처리
    // error.response는 서버의 응답 메시지
    if (!error.response) {
      return Promise.reject(new ApiError(0, "네트워크 연결을 확인해주세요."));
    }

    const { status } = error.response;
    const originalRequest = error.config;

    if (status === 401 && originalRequest) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const newToken = await refreshAccessToken();
          isRefreshing = false;
          onRefreshToken(newToken);

          // 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(new ApiError(401, "인증이 필요합니다."));
        }
      } else {
        // 토큰 갱신 중인 경우, 요청을 큐에 저장
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(apiClient(originalRequest));
          });
        });
      }
    }

    // 2. HTTP 상태 코드별 에러 처리
    switch (status) {
      case 400:
        // 잘못된 요청
        return Promise.reject(new ApiError(status, "잘못된 요청입니다."));
      case 403:
        // 권한 에러
        return Promise.reject(new ApiError(status, "접근 권한이 없습니다."));
      case 404:
        // 리소스를 찾을 수 없음
        return Promise.reject(new ApiError(status, "요청한 리소스를 찾을 수 없습니다."));
      case 500:
        // 서버 에러
        return Promise.reject(new ApiError(status, "서버 에러가 발생했습니다."));
      default:
        // 기타 에러
        return Promise.reject(new ApiError(status, "알 수 없는 에러가 발생했습니다."));
    }
  }
);

export default apiClient;
