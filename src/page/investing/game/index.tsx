import { useParams, useSearchParams } from "react-router-dom";
import { GameStartTemplate } from "../../../module/investing-game/template/game-start-template";
import { GamePlayTemplate } from "../../../module/investing-game/template/game-play-template";
import { GameEndTemplate } from "../../../module/investing-game/template/game-end-template";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// 게임 관련 타입 정의
interface Stock {
  name: string;
  risk_level: string;
  description: string;
  before_value: number;
  current_value: number;
  expectation: string;
}

interface Scenario {
  turn_number: number;
  result: string;
  news: string;
  news_hint: string;
  stocks: Stock[];
}

interface GameState {
  point: number;
  turn: number;
  turnMax: number;
  price: number[];
  buyPrice: number[];
  count: number[];
  beforeCount: number[];
  scenario: Scenario[];
  currentScenario: Scenario | null;
  isGameOver: boolean;
  isGameStart: boolean;
  turnFinish: boolean;
  plusClickCount: number[];
  minusClickCount: number[];
}

const INITIAL_POINT = 2000;
const INITIAL_GAME_STATE: GameState = {
  point: INITIAL_POINT,
  turn: 1,
  turnMax: 0,
  price: [0, 0, 0],
  buyPrice: [0, 0, 0],
  count: [0, 0, 0],
  beforeCount: [0, 0, 0],
  scenario: [],
  currentScenario: null,
  isGameOver: false,
  isGameStart: false,
  turnFinish: false,
  plusClickCount: [0, 0, 0],
  minusClickCount: [0, 0, 0],
};

export default function InvestingGame() {
  // 동적 파라미터useParams 가 없으면 빈 문자열로 초기화
  const { gametype = "" } = useParams() || {};
  // 쿼리 파라미터 가져오기
  const [searchParams] = useSearchParams();
  const gameStage = searchParams.get("stage") || "";
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const navigate = useNavigate();

  // 시나리오 데이터 로드
  useEffect(() => {
    if (gameStage === "game-play") {
      fetch("/src/module/investing-game/template/little-pig-template/scenario.json")
        .then((response) => response.json())
        .then((data) => {
          setGameState((prev) => ({
            ...prev,
            scenario: data,
            currentScenario: data[0],
            turnMax: data.length,
            price: data[0].stocks.map((stock: Stock) => stock.current_value),
          }));
        });
    }
  }, [gameStage]);

  // 게임 상태 업데이트 함수들
  const updateGameState = (updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  };

  const handleTurnFinish = () => {
    if (gameState.turn >= gameState.turnMax) {
      const lastPoint = gameState.count.reduce((acc, curr, index) => acc + gameState.price[index] * curr, 0);
      updateGameState({ isGameOver: true });
      // 게임 결과 페이지로 이동
      navigate(`/investing/game/little_pig?stage=game-end`);
      return;
    }

    // 다음 턴으로 이동
    const nextTurn = gameState.turn + 1;
    const nextScenario = gameState.scenario[nextTurn - 1];
    const nextPrices = nextScenario.stocks.map((stock) => stock.current_value);

    updateGameState({
      turn: nextTurn,
      currentScenario: nextScenario,
      beforeCount: [...gameState.count],
      price: nextPrices,
      buyPrice: gameState.buyPrice.map((price, index) => {
        const prev = gameState.beforeCount[index];
        const curr = gameState.count[index];
        const diff = curr - prev;
        return diff > 0 ? price + gameState.price[index] * diff : price;
      }),
    });
  };

  // 예시
  // http://localhost:5173/investing/game/little_pig?stage=game-start
  // gametype => little_pig
  // stage => game-start

  // 게임 타입에 따라 템플릿 렌더링
  switch (gameStage) {
    case "game-start":
      return <GameStartTemplate gameType={gametype} />;
    case "game-play":
      return (
        <GamePlayTemplate
          gameType={gametype}
          gameState={gameState}
          updateGameState={updateGameState}
          handleTurnFinish={handleTurnFinish}
        />
      );
    case "game-end":
      const lastPoint =
        gameState.point + gameState.price.reduce((acc, curr, index) => acc + curr * gameState.count[index], 0);
      const initialPoint = INITIAL_POINT;
      return <GameEndTemplate gameType={gametype} lastPoint={lastPoint} initialPoint={initialPoint} />;
    default:
      return null;
  }
}
