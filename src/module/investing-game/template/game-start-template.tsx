import { LittlePigGameStart } from "./little-pig-template/game-start";
import { TruckGameStart } from "./truck-game-template/game-start";
import { NinjaGameStart } from "./ninja-game-template/game-start";
import { MasicGameStart } from "./masic-game-template/game-start";

interface GameStartTemplateProps {
  gameType: string;
}
// http://localhost:5173/investing/game/little-pig?stage=game-start

export const GameStartTemplate = ({ gameType }: GameStartTemplateProps) => {
  switch (gameType) {
    case "little-pig":
      return <LittlePigGameStart />;
    case "truck":
      return <TruckGameStart />;
    case "ninja":
      return <NinjaGameStart />;
    case "masic":
      return <MasicGameStart />;
    default:
      return null;
  }
};
