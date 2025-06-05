import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "@/page/main";
import Investing from "@/page/investing";
import Market from "@/page/market";
import Savings from "@/page/savings";
import Quest from "@/page/quest";
import Raising from "@/page/raising";
import EmotionDiary from "@/page/emotionDiary";
import Attandance from "@/page/attandance";
import Quiz from "@/page/quiz";
import NotFound from "@/page/notfound";
import InvestingGame from "@/page/investing/game";
import { ModalProvider } from "@/lib/context/modal-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReatQueryTestPage } from "@/page/test/reatQueryText";
import { ZustandTest } from "@/page/test/zustandtest";
// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 실패시 1번만 재시도
      refetchOnWindowFocus: false, // 윈도우 포커스시 자동 리페치 비활성화
      staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 신선한 상태로 유지
    },
  },
});
import LoginPage from "./page/auth/login";
import RegisterPage from "./page/auth/register";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/investing">
              <Route index element={<Investing />} />
              <Route path="game/:gametype" element={<InvestingGame />} />
            </Route>

            <Route path="/market" element={<Market />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/quest" element={<Quest />} />
            <Route path="/raising" element={<Raising />} />
            <Route path="/emotionDiary" element={<EmotionDiary />} />
            <Route path="/attandance" element={<Attandance />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />

            <Route path="/test">
              <Route path="reatQueryText" element={<ReatQueryTestPage />} />
              <Route path="zustand" element={<ZustandTest />} />
            </Route>
          </Routes>
        </ModalProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
