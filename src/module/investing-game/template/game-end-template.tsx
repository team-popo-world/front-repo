import { LittlePigGameEnd } from "./little-pig-template/game-end";

interface GameEndTemplateProps {
  gameType: string;
  lastPoint: number;
  initialPoint: number;
}
// http://localhost:5173/investing/game/little_pig?stage=game-end
export const GameEndTemplate = ({ gameType, lastPoint, initialPoint }: GameEndTemplateProps) => {
  switch (gameType) {
    case "little_pig":
      return <LittlePigGameEnd lastPoint={lastPoint} initialPoint={initialPoint} />;
    default:
      return null;
  }
};
