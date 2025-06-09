import { LittlePigGameStart } from "./little-pig-template/game-start";

interface GameStartTemplateProps {
  gameType: string;
}
// http://localhost:5173/investing/game/little-pig?stage=game-start
export const GameStartTemplate = ({ gameType }: GameStartTemplateProps) => {
  switch (gameType) {
    case "little-pig":
      return <LittlePigGameStart />;
    default:
      return null;
  }
};
