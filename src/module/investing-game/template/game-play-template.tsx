import { GamePlay } from "./game-template/game-play";
import type { GameState } from "@/page/investing/game/index";
import { IMAGE_URLS } from "@/lib/constants/constants";

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
          backgroundImage={IMAGE_URLS.investing_game.little_pig.little_pig_bg}
          characterImages={[
            IMAGE_URLS.investing_game.little_pig.little_pig_1,
            IMAGE_URLS.investing_game.little_pig.little_pig_2,
            IMAGE_URLS.investing_game.little_pig.little_pig_3,
          ]}
          titleTextColor="#c55e5e"
          textColor="#7b5025"
          buttonColor="#c55e5e"
          borderColor="#ff9d9d"
          borderStrokeColor="#7a5c34"
        />
      );
    case "truck":
      return (
        <GamePlay
          gameState={gameState}
          updateGameState={updateGameState}
          handleTurnFinish={handleTurnFinish}
          handleGameOut={handleGameOut}
          backgroundImage={IMAGE_URLS.investing_game.truck.truck_bg}
          characterImages={[
            IMAGE_URLS.investing_game.truck.taco_truck,
            IMAGE_URLS.investing_game.truck.sandwich_truck,
            IMAGE_URLS.investing_game.truck.icecream_truck,
          ]}
          titleTextColor="#1D79BA"
          textColor="#1D79BA"
          buttonColor="#1D79BA"
          borderColor="#518EB9"
          borderStrokeColor="#374752"
        />
      );
    case "ninja":
      return (
        <GamePlay
          gameState={gameState}
          updateGameState={updateGameState}
          handleTurnFinish={handleTurnFinish}
          handleGameOut={handleGameOut}
          backgroundImage={IMAGE_URLS.investing_game.ninja.ninja_bg}
          characterImages={[
            IMAGE_URLS.investing_game.ninja.ninja1,
            IMAGE_URLS.investing_game.ninja.ninja2,
            IMAGE_URLS.investing_game.ninja.ninja3,
          ]}
          titleTextColor="#7A5C34"
          textColor="#7A5C34"
          buttonColor="#7A5C34"
          borderColor="#A2A07C"
          borderStrokeColor="#555555"
        />
      );
    case "masic":
      return (
        <GamePlay
          gameState={gameState}
          updateGameState={updateGameState}
          handleTurnFinish={handleTurnFinish}
          handleGameOut={handleGameOut}
          backgroundImage={IMAGE_URLS.investing_game.masic.masic_bg}
          characterImages={[
            IMAGE_URLS.investing_game.masic.masic_1,
            IMAGE_URLS.investing_game.masic.masic_2,
            IMAGE_URLS.investing_game.masic.masic_3,
          ]}
          titleTextColor="#1D79BA"
          textColor="#000000"
          buttonColor="#1D79BA"
          borderColor="#518EB9"
          borderStrokeColor="#374752"
        />
      );
  }
};
