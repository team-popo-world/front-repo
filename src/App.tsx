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
import LoginPage from './page/auth/login';
import RegisterPage from './page/auth/register';


function App() {
  return (
    <>
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
          </Routes>
        </ModalProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
