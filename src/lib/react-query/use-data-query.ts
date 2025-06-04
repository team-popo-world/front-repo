// TEST 코드
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/api/axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// 모든 포스트를 가져오는 쿼리
export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
      return data;
    },
    // 리패치 관련
    refetchOnWindowFocus: true, // 윈도우 포커스시  리페치, 기본값 true
    refetchOnMount: true, // 컴포넌트 마운트시  리페치, 기본값 true
    refetchOnReconnect: true, // 네트워크 재연결시  리페치, 기본값 true
    refetchInterval: 1000 * 60 * 5, // 5분마다  리페치, 기본값 false
    refetchIntervalInBackground: true, // 백그라운드에서  리페치, 기본값 false

    // 재시도 관련
    retry: 3, // 실패시 3번 재시도
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 지수 백오프
    // 기타
    enabled: true, // 쿼리 활성화 여부
    staleTime: 1000 * 60 * 5, // 데이터 신선도 유지 시간, 기본값 0
    gcTime: 1000 * 60 * 5, // 데이터 캐시 제거 시간, 기본값 5분
  });
};
