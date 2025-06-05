import { GamePlay } from "./little-pig-template/game-play";
import type { GameState } from "@/page/investing/game/index";

interface GamePlayTemplateProps {
  gameType: string;
  gameState: GameState;
  updateGameState: (updates: any) => void;
  handleTurnFinish: () => void;
}

export const GamePlayTemplate = ({ gameType, gameState, updateGameState, handleTurnFinish }: GamePlayTemplateProps) => {
  switch (gameType) {
    case "little-pig":
      return <GamePlay gameState={gameState} updateGameState={updateGameState} handleTurnFinish={handleTurnFinish} />;
    default:
      return null;
  }
};
