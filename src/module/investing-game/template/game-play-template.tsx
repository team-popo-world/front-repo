import { GamePlay } from "./little-pig-template/game-play";
import type { GameState } from "@/page/investing/game/index";

// http://localhost:5173/investing/game/little-pig?stage=game-play

interface GamePlayTemplateProps {
  gameType: string;
  gameState: GameState;
  updateGameState: (updates: any) => void;
  handleTurnFinish: () => void;
  handleGameOut: () => void;
}

export const GamePlayTemplate = ({
  gameType,
  gameState,
  updateGameState,
  handleTurnFinish,
  handleGameOut,
}: GamePlayTemplateProps) => {
  switch (gameType) {
    case "little-pig":
      return (
        <GamePlay
          gameState={gameState}
          updateGameState={updateGameState}
          handleTurnFinish={handleTurnFinish}
          handleGameOut={handleGameOut}
        />
      );
    default:
      return null;
  }
};
