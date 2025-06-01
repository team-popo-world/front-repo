import { useParams, useSearchParams } from "react-router-dom";
import { GameStartTemplate } from "../../../module/investing-game/template/game-start-template";
import { GamePlayTemplate } from "../../../module/investing-game/template/game-play-template";
import { GameEndTemplate } from "../../../module/investing-game/template/game-end-template";

export default function InvestingGame() {
  // 동적 파라미터useParams 가 없으면 빈 문자열로 초기화
  const { gametype = "" } = useParams() || {};
  // 쿼리 파라미터 가져오기
  const [searchParams] = useSearchParams();
  const gameStage = searchParams.get("stage") || "";
  // 예시
  // http://localhost:5173/investing/game/little_pig?stage=game-start
  // gametype => little_pig
  // stage => game-start

  // 게임 타입에 따라 템플릿 렌더링
  switch (gameStage) {
    case "game-start":
      return <GameStartTemplate gameType={gametype} />;
    case "game-play":
      return <GamePlayTemplate gameType={gametype} />;
    case "game-end":
      return <GameEndTemplate gameType={gametype} />;
    default:
      return null;
  }
}
