import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./page/main";
import Investing from "./page/investing";
import Market from "./page/market";
import Savings from "./page/savings";
import Quest from "./page/quest";
import Raising from "./page/raising";
import EmotionDiary from "./page/emotionDiary";
import Attandance from "./page/attandance";
import Quiz from "./page/quiz";
import NotFound from "./page/notfound";
import InvestingGame from "./page/investing/game";
function App() {
  return (
    <>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
