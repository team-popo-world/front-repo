import { GamePlay } from "./little-pig-template/game-play";

interface GamePlayTemplateProps {
  gameType: string;
  gameState: {
    point: number;
    turn: number;
    turnMax: number;
    price: number[];
    buyPrice: number[];
    count: number[];
    beforeCount: number[];
    scenario: any[];
    currentScenario: any;
    isGameOver: boolean;
    isGameStart: boolean;
    turnFinish: boolean;
    plusClickCount: number[];
    minusClickCount: number[];
  };
  updateGameState: (updates: any) => void;
  handleTurnFinish: () => void;
}

export const GamePlayTemplate = ({ gameType, gameState, updateGameState, handleTurnFinish }: GamePlayTemplateProps) => {
  switch (gameType) {
    case "little_pig":
      return <GamePlay gameState={gameState} updateGameState={updateGameState} handleTurnFinish={handleTurnFinish} />;
    default:
      return null;
  }
};
