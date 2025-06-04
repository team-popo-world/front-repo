import { useParams, useSearchParams } from "react-router-dom";
import { GameStartTemplate } from "../../../module/investing-game/template/game-start-template";
import { GamePlayTemplate } from "../../../module/investing-game/template/game-play-template";
import { GameEndTemplate } from "../../../module/investing-game/template/game-end-template";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { endGame } from "@/lib/api/investClearAPi";
import { getKSTDateTime } from "@/lib/utils/getKSTDateTime";
import { sendTurnData } from "@/lib/api/investTurnUpdate";

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

interface TurnData {
  started_at: string; // ISO datetime string
  ended_at: string; // ISO datetime string
  risk_level: string; // 예: "고위험 고수익"
  current_point: number;
  before_value: number;
  current_value: number;
  initial_value: number;
  number_of_shares: number;
  income: number;
  transaction_type: string; // 예: "buy" 또는 "sell"
  plus_click: number;
  minus_click: number;
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
  const [sessionId, setSessionId] = useState("");
  const [startedAt, setStartAt] = useState("");
  const [endedAt, setEndedAt] = useState("");
  // 시나리오 데이터 로드
  useEffect(() => {
    if (gameStage === "game-play") {
      fetch(
        "http://localhost:8080/api/invest/chapter?chapterId=a1111111-2222-3333-4444-555555555555"
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network error");
          }
          return response.json();
        })
        .then((data) => {
          const sessionId = data.sessionId;
          console.log(sessionId);
          setSessionId(sessionId);
          const story = JSON.parse(data.story); // <== 여기서 story만 추출
          console.log(story);
          setGameState((prev) => ({
            ...prev,
            scenario: story, // 이제 story만 넣음
            currentScenario: story[0],
            turnMax: story.length,
            price: story[0].stocks.map((stock: Stock) => stock.current_value),
          }));

          const nowKST = getKSTDateTime();
          setStartAt(nowKST);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }, [gameStage]);

  // 게임 상태 업데이트 함수들
  const updateGameState = (updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  };

  const handleTurnFinish = () => {
    // TurnData 생성
    const nowKST = getKSTDateTime();
    // 거래 타입 결정 헬퍼 함수
    const determineTransactionType = (
      beforeCount: number,
      currentCount: number
    ): string => {
      if (currentCount > beforeCount) {
        return "BUY";
      } else if (currentCount < beforeCount) {
        return "SELL";
      } else {
        return "KEEP";
      }
    };
    // 각 주식별로 TurnData 생성하고 전송
    gameState.currentScenario?.stocks.forEach((stock, index) => {
      const turnData: TurnData = {
        started_at: startedAt,
        ended_at: nowKST,
        risk_level: stock.risk_level,
        current_point: gameState.point,
        before_value: stock.before_value,
        current_value: stock.current_value,
        initial_value: 100, // 또는 stock.initial_value가 있다면 사용
        number_of_shares: gameState.count[index], // 해당 주식의 보유 수량
        income:
          (stock.current_value - stock.before_value) * gameState.count[index], // 해당 주식의 수익
        transaction_type: determineTransactionType(
          gameState.beforeCount[index],
          gameState.count[index]
        ),
        plus_click: gameState.plusClickCount[index],
        minus_click: gameState.minusClickCount[index],
      };

      // 각 주식별로 턴 데이터 전송
      console.log(turnData);
      sendTurnData(
        sessionId,
        "a1111111-2222-3333-4444-555555555555",
        gameState.turn,
        turnData
      );
    });

    // 턴 끝남
    if (gameState.turn >= gameState.turnMax) {
      const lastPoint =
        gameState.point +
        gameState.price.reduce(
          (acc, curr, index) => acc + curr * gameState.count[index],
          0
        );
      updateGameState({ isGameOver: true });
      // 게임 결과 페이지로 이동
      navigate(`/investing/game/little-pig?stage=game-end`);
      endGame(
        sessionId,
        "a1111111-2222-3333-4444-555555555555",
        true,
        lastPoint - INITIAL_POINT
      );
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
      plusClickCount: [0, 0, 0],
      minusClickCount: [0, 0, 0],
    });
  };

  // 예시
  // http://localhost:5173/investing/game/little-pig?stage=game-start
  // http://localhost:5173/investing/game/little-pig?stage=game-start
  // gametype => little_pig
  // stage => game-start
  // console.log(gameState.plusClickCount);
  // console.log(gameState.minusClickCount);
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
        gameState.point +
        gameState.price.reduce(
          (acc, curr, index) => acc + curr * gameState.count[index],
          0
        );
      const initialPoint = INITIAL_POINT;
      return (
        <GameEndTemplate
          gameType={gametype}
          lastPoint={lastPoint}
          initialPoint={initialPoint}
          sessionId={sessionId}
        />
      );
    default:
      return null;
  }
}
